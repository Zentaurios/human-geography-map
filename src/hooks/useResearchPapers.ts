'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ResearchPaper, ResearchFilters } from '@/types/research.types';
import { searchOpenAlexByTopic } from '@/lib/apis/openAlexApi';
// Removed Semantic Scholar import - using OpenAlex exclusively
import { 
  combineApiResults, 
  filterGeographyRelevant, 
  enhancePaperData,
  optimizeSearchQuery 
} from '@/lib/utils/researchHelpers';

interface UseResearchPapersReturn {
  papers: ResearchPaper[];
  loading: boolean;
  error: string | null;
  searchHistory: string[];
  apiStatus: {
    lastSuccessfulApi: 'openalex' | null;
    openAlexStatus: 'working' | 'rate-limited' | 'error' | 'untested';
    lastApiCall: Date | null;
  };
  searchPapers: (query: string, filters?: ResearchFilters) => Promise<void>;
  clearResults: () => void;
  retrySearch: () => Promise<void>;
}

// In-memory cache to avoid excessive API calls
const searchCache = new Map<string, { results: ResearchPaper[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useResearchPapers(): UseResearchPapersReturn {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [apiStatus, setApiStatus] = useState({
    lastSuccessfulApi: null as 'openalex' | null,
    openAlexStatus: 'untested' as 'working' | 'rate-limited' | 'error' | 'untested',
    lastApiCall: null as Date | null,
  });

  const currentSearchRef = useRef<string>('');
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load default papers on mount
  useEffect(() => {
    loadDefaultPapers();
  }, []);

  const loadDefaultPapers = async () => {
    setLoading(true);
    try {
      // Load with popular human geography topics using new inclusive defaults
      await searchPapers('human geography', {
        topics: [],
        publicationDateRange: { start: 2000, end: new Date().getFullYear() }, // Use new inclusive range
        academicLevel: ['undergraduate', 'graduate', 'advanced'], // Include all levels
        openAccess: false,
        citationRange: { min: 0, max: 10000 }, // Use new inclusive range
        methodology: [],
        geographySubfield: [],
        enhanceWithGeography: true,
      });
    } catch (err) {
      console.error('Error loading default papers:', err);
    }
  };

  const createCacheKey = (query: string, filters?: ResearchFilters): string => {
    return JSON.stringify({ query, filters });
  };

  const getCachedResults = (cacheKey: string): ResearchPaper[] | null => {
    const cached = searchCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('📦 Using cached results for:', cacheKey);
      return cached.results;
    }
    return null;
  };

  const setCachedResults = (cacheKey: string, results: ResearchPaper[]) => {
    searchCache.set(cacheKey, { results, timestamp: Date.now() });
  };

  const applyFilters = (papers: ResearchPaper[], filters?: ResearchFilters): ResearchPaper[] => {
    if (!filters) {
      console.log('🔍 No filters provided, returning all papers');
      return papers;
    }

    console.log('🔍 Starting filter application with:');
    console.log('  - Academic levels:', filters.academicLevel);
    console.log('  - Open access:', filters.openAccess);
    console.log('  - Citation range:', filters.citationRange);
    console.log('  - Publication date range:', filters.publicationDateRange);
    console.log('  - Geography subfields:', filters.geographySubfield);
    console.log('  - Methodologies:', filters.methodology);

    let currentPapers = papers;
    console.log(`🔍 Starting with ${currentPapers.length} papers`);

    return currentPapers.filter((paper, index) => {
      const reasons = [];
      
      // Academic level filter
      if (filters.academicLevel.length > 0 && 
          !filters.academicLevel.includes(paper.academicLevel)) {
        reasons.push(`academic level ${paper.academicLevel} not in ${filters.academicLevel}`);
        return false;
      }

      // Open access filter
      if (filters.openAccess && paper.openAccessStatus === 'closed') {
        reasons.push('not open access');
        return false;
      }

      // Citation range filter
      if (paper.citationCount < filters.citationRange.min || 
          paper.citationCount > filters.citationRange.max) {
        reasons.push(`citations ${paper.citationCount} outside range ${filters.citationRange.min}-${filters.citationRange.max}`);
        return false;
      }

      // Geography subfield filter
      if (filters.geographySubfield.length > 0) {
        const hasMatchingSubfield = filters.geographySubfield.some(subfield =>
          paper.geographySubfields.some(paperSubfield =>
            paperSubfield.toLowerCase().includes(subfield.toLowerCase())
          )
        );
        if (!hasMatchingSubfield) {
          reasons.push(`subfields ${paper.geographySubfields} don't match ${filters.geographySubfield}`);
          return false;
        }
      }

      // Methodology filter
      if (filters.methodology.length > 0) {
        const methodologyMapping: Record<string, string[]> = {
          quantitative: ['statistical', 'regression', 'survey', 'gis', 'quantitative'],
          qualitative: ['interview', 'ethnograph', 'case study', 'qualitative'],
          mixed: ['mixed methods', 'mixed'],
          theoretical: ['theoretical', 'review', 'meta-analysis', 'literature'],
        };

        const hasMatchingMethodology = filters.methodology.some(filterMethod => {
          const keywords = methodologyMapping[filterMethod] || [filterMethod];
          return keywords.some(keyword =>
            paper.methodology.toLowerCase().includes(keyword.toLowerCase())
          );
        });
        if (!hasMatchingMethodology) {
          reasons.push(`methodology ${paper.methodology} doesn't match ${filters.methodology}`);
          return false;
        }
      }

      // Publication date filter
      if (filters.publicationDateRange) {
        const paperYear = new Date(paper.publicationDate).getFullYear();
        if (paperYear < filters.publicationDateRange.start || 
            paperYear > filters.publicationDateRange.end) {
          reasons.push(`year ${paperYear} outside range ${filters.publicationDateRange.start}-${filters.publicationDateRange.end}`);
          return false;
        }
      }

      // If we get here, paper passed all filters
      if (index < 5) {
        console.log(`✅ Paper ${index + 1} passed all filters: "${paper.title.substring(0, 50)}..."`);
      }
      return true;
    });
  };

  const searchPapers = useCallback(async (query: string, filters?: ResearchFilters) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setLoading(true);
    setError(null);
    currentSearchRef.current = query;

    try {
      // Check cache first
      const cacheKey = createCacheKey(query, filters);
      const cachedResults = getCachedResults(cacheKey);
      
      if (cachedResults) {
        setPapers(cachedResults);
        setLoading(false);
        return;
      }

      console.log('🔍 Starting fresh search for:', query);
      
      // Optimize the search query for better API results
      const optimizedQuery = optimizeSearchQuery(query, filters?.enhanceWithGeography ?? true);
      
      let openAlexResults: ResearchPaper[] = [];

      // Update API status
      setApiStatus(prev => ({ ...prev, lastApiCall: new Date() }));

      // Use OpenAlex as the primary and only source (no rate limits!)
      try {
        console.log('🌍 Searching OpenAlex (Primary and only source)...');
        openAlexResults = await searchOpenAlexByTopic(optimizedQuery, {
          openAccess: filters?.openAccess,
          yearFrom: filters?.publicationDateRange?.start,
          yearTo: filters?.publicationDateRange?.end,
        }, filters?.enhanceWithGeography ?? true);
        
        if (signal.aborted) return;
        
        console.log(`✅ OpenAlex: ${openAlexResults.length} papers`);
        setApiStatus(prev => ({
          ...prev,
          openAlexStatus: 'working',
          lastSuccessfulApi: 'openalex'
        }));
      } catch (openAlexError) {
        console.warn('⚠️ OpenAlex failed:', openAlexError);
        setApiStatus(prev => ({
          ...prev,
          openAlexStatus: (openAlexError instanceof Error && openAlexError.message?.includes('rate')) ? 'rate-limited' : 'error'
        }));
      }

      if (signal.aborted) return;

      // Check if we have any results
      if (openAlexResults.length === 0) {
        console.log('❌ No results from OpenAlex');
        setError(`No research papers found for "${query}". Try different search terms or check your connection.`);
        setPapers([]);
        setLoading(false);
        return;
      }

      console.log(`🎆 OpenAlex returned ${openAlexResults.length} papers`);

      // Process results using helper functions
      console.log('🔄 Processing OpenAlex results...');
      console.log(`📊 Input: ${openAlexResults.length} OpenAlex papers`);
      
      // Use OpenAlex results directly (no need to combine since it's the only source)
      const combinedResults = openAlexResults;
      console.log(`🔄 Results ready: ${combinedResults.length} total papers`);

      // Filter for geography relevance (only if geography enhancement is enabled)
      if (filters?.enhanceWithGeography !== false) {
        console.log('🌍 Filtering for geography relevance...');
        const geographyRelevant = filterGeographyRelevant(combinedResults);
        console.log(`🌍 After geography filter: ${geographyRelevant.length} papers`);
        
        // Enhance paper data
        console.log('✨ Enhancing paper data...');
        const enhancedResults = geographyRelevant.map(enhancePaperData);
        console.log(`✨ After enhancement: ${enhancedResults.length} papers`);
        
        // Apply user filters
        console.log('🔍 Applying user filters...');
        console.log('🔍 Filter settings:', filters);
        const filteredResults = applyFilters(enhancedResults, filters);
        console.log(`🔍 After user filters: ${filteredResults.length} papers`);
        
        // Cache and set results
        setCachedResults(cacheKey, filteredResults);
        setPapers(filteredResults);
        
        // Update search history
        if (query && query !== 'human geography') {
          setSearchHistory(prev => {
            const newHistory = [query, ...prev.filter(q => q !== query)].slice(0, 10);
            return newHistory;
          });
        }
        
        // Set error if no results
        if (filteredResults.length === 0) {
          setError(`No papers found for "${query}". Try broader search terms or different filters.`);
        }
      } else {
        console.log('🚫 Skipping geography filtering (enhancement disabled)');
        
        // Enhance paper data without geography filtering
        console.log('✨ Enhancing paper data...');
        const enhancedResults = combinedResults.map(enhancePaperData);
        console.log(`✨ After enhancement: ${enhancedResults.length} papers`);
        
        // Apply user filters
        console.log('🔍 Applying user filters...');
        const filteredResults = applyFilters(enhancedResults, filters);
        console.log(`🔍 After user filters: ${filteredResults.length} papers`);
        
        // Cache and set results
        setCachedResults(cacheKey, filteredResults);
        setPapers(filteredResults);
        
        // Update search history
        if (query && query !== 'human geography') {
          setSearchHistory(prev => {
            const newHistory = [query, ...prev.filter(q => q !== query)].slice(0, 10);
            return newHistory;
          });
        }
        
        // Set error if no results
        if (filteredResults.length === 0) {
          setError(`No papers found for "${query}". Try different search terms.`);
        }
      }

    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('🚫 Search aborted');
        return;
      }

      console.error('❌ Search error:', err);
      setError(`Search failed: ${err.message || 'Unknown error'}. Please try again or check your connection.`);
      
      // Clear results on error
      setPapers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setPapers([]);
    setError(null);
    currentSearchRef.current = '';
  }, []);

  const retrySearch = useCallback(async () => {
    if (currentSearchRef.current) {
      await searchPapers(currentSearchRef.current);
    }
  }, [searchPapers]);

  return {
    papers,
    loading,
    error,
    searchHistory,
    apiStatus,
    searchPapers,
    clearResults,
    retrySearch,
  };
}