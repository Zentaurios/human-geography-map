'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ResearchPaper, ResearchFilters } from '@/types/research.types';
import { searchResearchPapers } from './actions';
import ResearchHeader from '@/components/research/ResearchHeader';
import ResearchFiltersComponent from '@/components/research/ResearchFilters';
import ResearchGrid from '@/components/research/ResearchGrid';
import ResearchLoadingState from '@/components/research/ResearchLoadingState';
import DataVisualization from '@/components/research/DataVisualization';
import { ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui';

const ResearchPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('human geography');
  const [initialized, setInitialized] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [filters, setFilters] = useState<ResearchFilters>({
    topics: [],
    publicationDateRange: {
      start: 2020,
      end: new Date().getFullYear(),
    },
    academicLevel: ['undergraduate', 'graduate'],
    openAccess: false,
    citationRange: {
      min: 0,
      max: 1000,
    },
    methodology: [],
    geographySubfield: [],
  });

  // Initialize state from URL parameters
  useEffect(() => {
    const query = searchParams.get('q') || 'human geography';
    const openAccess = searchParams.get('open') === 'true';
    const yearFrom = parseInt(searchParams.get('year_from') || '2020');
    const yearTo = parseInt(searchParams.get('year_to') || new Date().getFullYear().toString());
    const levels = searchParams.get('levels')?.split(',') || ['undergraduate', 'graduate'];
    const methods = searchParams.get('methods')?.split(',').filter(Boolean) || [];
    const subfields = searchParams.get('subfields')?.split(',').filter(Boolean) || [];
    const citationMin = parseInt(searchParams.get('citation_min') || '0');
    const citationMax = parseInt(searchParams.get('citation_max') || '1000');

    setSearchQuery(query);
    setFilters({
      topics: [],
      publicationDateRange: {
        start: yearFrom,
        end: yearTo,
      },
      academicLevel: levels as ('undergraduate' | 'graduate' | 'advanced')[],
      openAccess,
      citationRange: {
        min: citationMin,
        max: citationMax,
      },
      methodology: methods as ('quantitative' | 'qualitative' | 'mixed' | 'theoretical')[],
      geographySubfield: subfields,
    });
    setInitialized(true);
  }, [searchParams]);

  // Update URL with current search parameters
  // URL structure: /research?q=query&levels=undergraduate,graduate&open=true&year_from=2020&year_to=2024&methods=quantitative&subfields=urban+geography&citation_min=0&citation_max=1000
  const updateURL = useCallback((query: string, currentFilters: ResearchFilters) => {
    const params = new URLSearchParams();
    
    // Add search query
    if (query && query !== 'human geography') {
      params.set('q', query);
    }
    
    // Add filters only if they differ from defaults
    if (currentFilters.openAccess) {
      params.set('open', 'true');
    }
    
    if (currentFilters.publicationDateRange.start !== 2020) {
      params.set('year_from', currentFilters.publicationDateRange.start.toString());
    }
    
    if (currentFilters.publicationDateRange.end !== new Date().getFullYear()) {
      params.set('year_to', currentFilters.publicationDateRange.end.toString());
    }
    
    const defaultLevels = ['undergraduate', 'graduate'];
    if (currentFilters.academicLevel.length !== defaultLevels.length || 
        !defaultLevels.every(level => currentFilters.academicLevel.includes(level as any))) {
      params.set('levels', currentFilters.academicLevel.join(','));
    }
    
    if (currentFilters.methodology.length > 0) {
      params.set('methods', currentFilters.methodology.join(','));
    }
    
    if (currentFilters.geographySubfield.length > 0) {
      params.set('subfields', currentFilters.geographySubfield.join(','));
    }
    
    if (currentFilters.citationRange.min !== 0) {
      params.set('citation_min', currentFilters.citationRange.min.toString());
    }
    
    if (currentFilters.citationRange.max !== 1000) {
      params.set('citation_max', currentFilters.citationRange.max.toString());
    }
    
    // Update URL without triggering a page reload
    const newURL = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newURL, { scroll: false });
  }, [router, pathname]);

  // Load research papers when search query or filters change
  useEffect(() => {
    if (!initialized) return; // Don't load until URL params are initialized
    
    const loadResearch = async () => {
      setLoading(true);
      try {
        const results = await searchResearchPapers(searchQuery, filters);
        setPapers(results);
      } catch (error) {
        console.error('Failed to load research:', error);
        setPapers([]);
      } finally {
        setLoading(false);
      }
    };

    loadResearch();
  }, [searchQuery, filters, initialized]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    updateURL(query, filters);
  };

  const handleFilterChange = (newFilters: ResearchFilters) => {
    setFilters(newFilters);
    updateURL(searchQuery, newFilters);
  };

  const handleShareResults = async () => {
    try {
      if (navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Use native sharing on mobile devices
        await navigator.share({
          title: `Geography Research Results - ${searchQuery}`,
          text: `Check out these ${papers.length} research papers about ${searchQuery}`,
          url: window.location.href,
        });
      } else {
        // Copy to clipboard on desktop
        await navigator.clipboard.writeText(window.location.href);
        setShowCopyNotification(true);
        setTimeout(() => setShowCopyNotification(false), 3000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: just copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShowCopyNotification(true);
        setTimeout(() => setShowCopyNotification(false), 3000);
      } catch (clipboardError) {
        console.error('Clipboard access failed:', clipboardError);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
                <ArrowLeft className="w-4 h-4" />
                Back to Map
              </Button>
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-500">
                {papers.length} papers found
                {searchQuery !== 'human geography' && (
                  <span className="ml-2 text-blue-600">for "{searchQuery}"</span>
                )}
              </div>
              
              {(searchQuery !== 'human geography' || papers.length > 0) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShareResults}
                  className="text-slate-600 hover:text-slate-900"
                  title="Share these results"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <ResearchHeader />

        {/* Search and Filters */}
        <ResearchFiltersComponent
          searchQuery={searchQuery}
          filters={filters}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          loading={loading}
        />

        {/* Research Papers Grid */}
        <div className="space-y-8">
          {loading ? (
            <ResearchLoadingState />
          ) : (
            <ResearchGrid papers={papers} />
          )}
        </div>

        {/* Data Visualization Dashboard - Moved to bottom */}
        <div className="mt-16">
          <DataVisualization papers={papers} />
        </div>

        {/* Footer with Academic Attribution */}
        <footer className="mt-16 pt-8 border-t border-slate-200">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Academic Sources</h3>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto">
              Research papers are sourced from Semantic Scholar, OpenAlex, and CrossRef APIs. 
              All papers are presented with educational enhancements to support learning.
            </p>
            <div className="flex justify-center items-center gap-6 text-xs text-slate-500">
              <span>Semantic Scholar</span>
              <span>•</span>
              <span>OpenAlex API</span>
              <span>•</span>
              <span>CrossRef</span>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Copy Notification */}
      {showCopyNotification && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg z-50 transition-opacity duration-300">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Link copied to clipboard!
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchPageContent;
