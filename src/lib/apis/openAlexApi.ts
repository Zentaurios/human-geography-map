'use server';

import { ResearchPaper } from '@/types/research.types';
import { ACADEMIC_APIS } from './academicApis';

// OpenAlex API integration for academic papers - SIMPLIFIED AND MORE INCLUSIVE
export async function fetchFromOpenAlex(query: string, enhanceWithGeography: boolean = true): Promise<ResearchPaper[]> {
  try {
    console.log('🔍 OpenAlex basic search for:', query);
    
    // Don't automatically add geography - let users search for what they want
    const searchQuery = query; // Use original query
    
    // Much simpler parameters
    const params = new URLSearchParams({
      search: searchQuery,
      per_page: '30',
      sort: 'cited_by_count:desc',
      mailto: ACADEMIC_APIS.openAlex.contactEmail || 'contact@example.com',
    });

    const response = await fetch(
      `${ACADEMIC_APIS.openAlex.baseUrl}/works?${params}`,
      {
        headers: {
          'User-Agent': `HumanGeographyLearning/1.0 (${ACADEMIC_APIS.openAlex.contactEmail || 'contact@example.com'})`,
        },
        next: { revalidate: 3600 }, // 1 hour cache
      }
    );

    if (!response.ok) {
      console.warn('⚠️ OpenAlex basic search failed:', response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    console.log('📊 OpenAlex basic search results:', data.results?.length || 0);
    
    const allResults = data.results?.map((work: any) => transformOpenAlexWork(work)) || [];
    
    // Much more lenient filtering
    if (!enhanceWithGeography) {
      return allResults;
    }
    
    // Very inclusive geography filtering
    const filteredResults = allResults.filter((paper: ResearchPaper) => {
      const searchText = `${paper.title} ${paper.abstract}`.toLowerCase();
      
      // Super broad terms that include most social science research
      const inclusiveTerms = [
        'geography', 'geographic', 'spatial', 'urban', 'rural', 'city', 'cities',
        'human', 'people', 'society', 'social', 'community', 'population',
        'environment', 'climate', 'development', 'culture', 'economic', 'political',
        'study', 'research', 'analysis', 'location', 'place', 'area', 'region'
      ];
      
      const isRelevant = inclusiveTerms.some(term => searchText.includes(term));
      
      // Include any paper with a decent abstract
      const hasGoodContent = paper.abstract && paper.abstract.length > 30;
      
      return isRelevant || hasGoodContent;
    });
    
    console.log('🌍 After basic geography filter:', filteredResults.length);
    return filteredResults;
    
  } catch (error) {
    console.error('❌ OpenAlex basic search error:', error);
    return [];
  }
}

// Transform OpenAlex data to our ResearchPaper format
function transformOpenAlexWork(work: any): ResearchPaper {
  const openAccessStatus = getOpenAccessStatus(work.open_access);
  const academicLevel = determineAcademicLevel(work.abstract_inverted_index);
  const abstract = reconstructAbstract(work.abstract_inverted_index);
  
  return {
    id: work.id,
    title: work.title || 'Untitled',
    authors: work.authorships?.map((authorship: any) => ({
      name: authorship.author?.display_name || 'Unknown Author',
      affiliation: authorship.institutions?.[0]?.display_name,
      orcidId: authorship.author?.orcid,
    })) || [],
    abstract: abstract || 'No abstract available',
    publicationDate: work.publication_date || new Date().toISOString(),
    journal: work.primary_location?.source?.display_name || work.host_venue?.display_name,
    doi: work.doi,
    url: extractBestUrl(work),
    citationCount: work.cited_by_count || 0,
    openAccessStatus,
    geographySubfields: extractGeographySubfields(work.topics || work.concepts),
    academicLevel,
    summary: generateStudentSummary(abstract),
    keyFindings: extractKeyFindings(abstract),
    methodology: identifyMethodology(abstract),
    relevanceScore: calculateRelevanceScore(work),
  };
}

// Extract the best available URL for accessing the paper
function extractBestUrl(work: any): string | undefined {
  // Priority order for URLs:
  // 1. Open access PDF URL
  // 2. Open access landing page URL  
  // 3. Publisher landing page URL
  // 4. DOI URL (constructed)
  // 5. OpenAlex page URL (fallback)
  // 6. No search URL fallbacks
  
  // Check for open access PDF
  if (work.open_access?.oa_url) {
    return work.open_access.oa_url;
  }
  
  // Check for publisher landing page
  if (work.host_venue?.url) {
    return work.host_venue.url;
  }
  
  // Construct DOI URL if DOI exists and is valid
  if (work.doi) {
    // Remove any existing URL prefix from DOI
    const cleanDoi = work.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '');
    
    // Basic DOI validation - should have format like "10.xxxx/xxxxx"
    if (cleanDoi.match(/^10\.[0-9]{4,}\/[\S]+/)) {
      return `https://doi.org/${cleanDoi}`;
    } else {
      // If DOI format is invalid, don't use it
      // Invalid DOI format detected
    }
  }
  
  // Check for any location URLs
  if (work.locations && work.locations.length > 0) {
    const availableLocation = work.locations.find((loc: any) => 
      loc.landing_page_url && !loc.landing_page_url.includes('openalex.org')
    );
    if (availableLocation) {
      return availableLocation.landing_page_url;
    }
  }
  
  // Fallback to OpenAlex page URL (better than nothing)
  if (work.id) {
    return work.id; // OpenAlex IDs are already URLs
  }
  
  // Return undefined instead of search URL - let UI handle missing links
  return undefined;
}

// Helper functions for data transformation
function getOpenAccessStatus(openAccess: any): 'gold' | 'green' | 'bronze' | 'closed' {
  if (!openAccess || !openAccess.is_oa) return 'closed';
  
  switch (openAccess.oa_status) {
    case 'gold': return 'gold';
    case 'green': return 'green';
    case 'bronze': return 'bronze';
    default: return 'closed';
  }
}

function reconstructAbstract(invertedIndex: any): string {
  if (!invertedIndex) return '';
  
  const words: string[] = [];
  for (const [word, positions] of Object.entries(invertedIndex)) {
    for (const position of positions as number[]) {
      words[position] = word;
    }
  }
  
  return words.filter(Boolean).join(' ');
}

function determineAcademicLevel(abstract: any): 'undergraduate' | 'graduate' | 'advanced' {
  const text = reconstructAbstract(abstract).toLowerCase();
  
  // Simple heuristic based on complexity indicators
  const advancedKeywords = ['theoretical framework', 'epistemological', 'ontological', 'meta-analysis'];
  const graduateKeywords = ['methodology', 'empirical', 'hypothesis', 'statistical significance'];
  
  if (advancedKeywords.some(keyword => text.includes(keyword))) {
    return 'advanced';
  }
  if (graduateKeywords.some(keyword => text.includes(keyword))) {
    return 'graduate';
  }
  
  return 'undergraduate';
}

function extractGeographySubfields(topicsOrConcepts: any[]): string[] {
  if (!topicsOrConcepts) return [];
  
  // Handle both new topics and legacy concepts
  const geographyFields = topicsOrConcepts
    .filter(item => {
      if (item.level !== undefined && item.level <= 2) return true; // Legacy concepts
      if (item.score !== undefined && item.score > 0.3) return true; // Topics
      return false;
    })
    .map(item => item.display_name)
    .filter(name => {
      const lowerName = name.toLowerCase();
      return lowerName.includes('geograph') || 
             ['urban', 'climate', 'population', 'economic', 'cultural', 'political', 'spatial', 'environmental'].some(
               field => lowerName.includes(field)
             );
    })
    .slice(0, 3); // Limit to 3 subfields
    
  return geographyFields.length > 0 ? geographyFields : ['Human Geography'];
}

function generateStudentSummary(abstract: string): string {
  if (!abstract) return 'This research explores important concepts in human geography.';
  
  // Simple summarization - in production, this would use AI
  const sentences = abstract.split('. ');
  const firstTwoSentences = sentences.slice(0, 2).join('. ');
  
  // Simplify language (basic implementation)
  return firstTwoSentences
    .replace(/methodology/gi, 'research method')
    .replace(/empirical/gi, 'based on real data')
    .replace(/theoretical/gi, 'based on ideas and concepts')
    .replace(/epistemological/gi, 'about how we know things')
    + '.';
}

function extractKeyFindings(abstract: string): string[] {
  if (!abstract) return ['Research findings will be summarized here'];
  
  // Extract sentences that contain finding indicators
  const sentences = abstract.split('. ');
  const findings = sentences
    .filter(sentence => 
      sentence.match(/found|show|demonstrate|reveal|indicate|suggest|conclude/i)
    )
    .slice(0, 3)
    .map(finding => finding.trim());
    
  return findings.length > 0 ? findings : ['Key findings are being analyzed'];
}

function identifyMethodology(abstract: string): string {
  const text = abstract.toLowerCase();
  
  if (text.includes('survey') || text.includes('questionnaire')) {
    return 'Survey research';
  }
  if (text.includes('interview') || text.includes('ethnograph')) {
    return 'Qualitative interviews';
  }
  if (text.includes('gis') || text.includes('spatial analysis')) {
    return 'GIS and spatial analysis';
  }
  if (text.includes('statistical') || text.includes('regression')) {
    return 'Statistical analysis';
  }
  if (text.includes('case study')) {
    return 'Case study approach';
  }
  if (text.includes('review') || text.includes('meta-analysis')) {
    return 'Literature review';
  }
  
  return 'Mixed methods';
}

function calculateRelevanceScore(work: any): number {
  let score = 5; // Base score
  
  // Boost for open access
  if (work.open_access?.is_oa) score += 2;
  
  // Boost for recent publications
  const publicationYear = new Date(work.publication_date).getFullYear();
  const currentYear = new Date().getFullYear();
  if (currentYear - publicationYear <= 2) score += 1;
  
  // Boost for high citations relative to age
  const yearsOld = currentYear - publicationYear + 1;
  const citationsPerYear = work.cited_by_count / yearsOld;
  if (citationsPerYear > 10) score += 2;
  else if (citationsPerYear > 5) score += 1;
  
  return Math.min(10, score);
}

// Search for papers by topic - MUCH MORE INCLUSIVE VERSION
export async function searchOpenAlexByTopic(topic: string, filters?: {
  openAccess?: boolean;
  yearFrom?: number;
  yearTo?: number;
}, enhanceWithGeography: boolean = true): Promise<ResearchPaper[]> {
  try {
    console.log('🔍 OpenAlex search starting for:', topic);
    
    // DON'T automatically add geography to every search - this was too restrictive
    const searchTopic = topic; // Use the original topic as-is
    
    const filterParams: string[] = [];
    
    // Only add filters if explicitly requested
    if (filters?.openAccess) {
      filterParams.push('is_oa:true');
    }
    
    // Be more lenient with date filters 
    if (filters?.yearFrom && filters.yearFrom > 1900) {
      filterParams.push(`from_publication_date:${filters.yearFrom}-01-01`);
    }
    
    if (filters?.yearTo && filters.yearTo <= new Date().getFullYear()) {
      filterParams.push(`to_publication_date:${filters.yearTo}-12-31`);
    }
    
    // Create a much simpler parameter set
    const params = new URLSearchParams({
      search: searchTopic,
      per_page: '50', // Get more results
      sort: 'cited_by_count:desc',
      mailto: ACADEMIC_APIS.openAlex.contactEmail || 'contact@example.com',
    });
    
    // Only add filters if they exist
    if (filterParams.length > 0) {
      params.append('filter', filterParams.join(','));
    }
    
    console.log('🌐 Calling OpenAlex with URL:', `${ACADEMIC_APIS.openAlex.baseUrl}/works?${params}`);
    
    const response = await fetch(
      `${ACADEMIC_APIS.openAlex.baseUrl}/works?${params}`,
      {
        headers: {
          'User-Agent': `HumanGeographyLearning/1.0 (${ACADEMIC_APIS.openAlex.contactEmail})`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour instead of 24
      }
    );
    
    console.log('📡 OpenAlex response status:', response.status);
    
    if (!response.ok) {
      console.warn(`⚠️ OpenAlex API error: ${response.status} ${response.statusText}`);
      return [];
    }
    
    const data = await response.json();
    console.log('📊 OpenAlex raw results count:', data.results?.length || 0);
    
    if (!data.results || data.results.length === 0) {
      console.warn('⚠️ OpenAlex returned no results');
      return [];
    }
    
    // Transform all results
    const allResults = data.results.map((work: any) => transformOpenAlexWork(work));
    console.log('🔄 Transformed results count:', allResults.length);
    
    // MUCH MORE LENIENT filtering - only filter if geography enhancement is enabled AND it's not a geography search
    if (enhanceWithGeography && !topic.toLowerCase().includes('geography')) {
      console.log('🌍 Applying lenient geography filter...');
      
      const filteredResults = allResults.filter((paper: ResearchPaper) => {
        // Be much more inclusive - check for any social science or spatial terms
        const searchText = `${paper.title} ${paper.abstract}`.toLowerCase();
        
        // Very broad geography and social science keywords
        const relevantTerms = [
          'geography', 'geographic', 'spatial', 'urban', 'rural', 'city', 'cities',
          'population', 'climate', 'environment', 'social', 'society', 'community',
          'development', 'planning', 'migration', 'settlement', 'human', 'people',
          'cultural', 'economic', 'political', 'location', 'place', 'region',
          'land', 'area', 'territory', 'study', 'analysis', 'research'
        ];
        
        const isRelevant = relevantTerms.some(term => searchText.includes(term));
        
        // Also include papers with substantial abstracts (likely academic papers)
        const hasSubstantialContent = paper.abstract && paper.abstract.length > 50;
        
        return isRelevant || hasSubstantialContent;
      });
      
      console.log('🌍 After geography filter:', filteredResults.length);
      return filteredResults;
    } else {
      console.log('🚫 Skipping geography filter');
      return allResults;
    }
    
  } catch (error) {
    console.error('❌ OpenAlex search error:', error);
    return [];
  }
}
