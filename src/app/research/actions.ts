'use server';

import { ResearchPaper, ResearchFilters } from '@/types/research.types';
import { fetchFromOpenAlex, searchOpenAlexByTopic } from '@/lib/apis/openAlexApi';
import { fetchFromSemanticScholar } from '@/lib/apis/semanticScholarApi';
import { getFallbackResearch } from '@/lib/apis/fallbackResearch';

/**
 * Search for research papers using multiple APIs with fallback strategy
 * Primary: Semantic Scholar (reliable, good abstracts)
 * Fallback: OpenAlex (experimental)
 * Final: Curated database
 */
export async function searchResearchPapers(
  query: string, 
  filters?: ResearchFilters
): Promise<ResearchPaper[]> {
  console.log('🔍 Starting research search for:', query, 'with filters:', filters);
  
  try {
    // Primary: Try Semantic Scholar first (more reliable for geography research)
    console.log('📖 Attempting Semantic Scholar API call...');
    const semanticResults = await fetchFromSemanticScholar(query);
    console.log(`📚 Semantic Scholar raw results: ${semanticResults.length} papers`);
    
    if (semanticResults.length > 0) {
      const filteredResults = applyClientFilters(semanticResults, filters);
      console.log(`✅ Semantic Scholar filtered results: ${filteredResults.length} papers`);
      
      // Combine with some curated papers for better results
      const curatedResults = getFallbackResearch(query).slice(0, 6);
      const combinedResults = [...filteredResults, ...curatedResults]
        .filter((paper, index, self) => 
          index === self.findIndex(p => p.id === paper.id)
        ) // Remove duplicates
        .slice(0, 50); // Limit total results
      
      console.log(`🎯 Combined results: ${combinedResults.length} papers`);
      return combinedResults;
    }

    // Secondary: Try OpenAlex as fallback (experimental)
    console.log('🌐 Falling back to OpenAlex...');
    const openAlexResults = await searchOpenAlexByTopic(query, {
      openAccess: filters?.openAccess,
      yearFrom: filters?.publicationDateRange?.start,
      yearTo: filters?.publicationDateRange?.end,
    });
    
    console.log(`📚 OpenAlex raw results: ${openAlexResults.length} papers`);
    
    if (openAlexResults.length > 0) {
      const filteredResults = applyClientFilters(openAlexResults, filters);
      console.log(`✅ OpenAlex filtered results: ${filteredResults.length} papers`);
      
      // Combine with curated papers
      const curatedResults = getFallbackResearch(query).slice(0, 6);
      const combinedResults = [...filteredResults, ...curatedResults]
        .filter((paper, index, self) => 
          index === self.findIndex(p => p.id === paper.id)
        )
        .slice(0, 50);
      
      console.log(`🎯 Combined results: ${combinedResults.length} papers`);
      return combinedResults;
    }

    // Final fallback: Use expanded curated research database
    console.log('📚 Using expanded curated research database...');
    const fallbackResults = getFallbackResearch(query);
    console.log(`✅ Curated database results: ${fallbackResults.length} papers`);
    
    const filteredResults = applyClientFilters(fallbackResults, filters);
    console.log(`🎯 Final filtered results: ${filteredResults.length} papers`);
    
    return filteredResults;
    
  } catch (error) {
    console.error('❌ Error searching research papers:', error);
    
    // Always return fallback content on error
    console.log('🔄 Falling back to curated database due to error...');
    const fallbackResults = getFallbackResearch(query);
    const filteredResults = applyClientFilters(fallbackResults, filters);
    console.log(`🎯 Error fallback results: ${filteredResults.length} papers`);
    
    return filteredResults;
  }
}

/**
 * Get research papers by specific geography category
 */
export async function getResearchByCategory(category: string): Promise<ResearchPaper[]> {
  const categoryQueries: Record<string, string> = {
    'Urban Geography': 'urban geography cities urbanization',
    'Climate Geography': 'climate change geography adaptation',
    'Population Studies': 'population geography migration demographics',
    'Economic Geography': 'economic geography trade development',
    'Cultural Geography': 'cultural geography identity place',
    'Political Geography': 'political geography borders geopolitics',
  };

  const query = categoryQueries[category] || category;
  return searchResearchPapers(query);
}

/**
 * Get trending research topics based on recent publications
 */
export async function getTrendingResearch(): Promise<ResearchPaper[]> {
  const trendingTopics = [
    'climate migration',
    'smart cities',
    'urban heat islands',
    'gentrification',
    'renewable energy geography'
  ];
  
  const allResults: ResearchPaper[] = [];
  
  for (const topic of trendingTopics) {
    try {
      // Use Semantic Scholar as primary for trending research too
      const results = await fetchFromSemanticScholar(topic);
      allResults.push(...results.slice(0, 2)); // Take top 2 from each topic
    } catch (error) {
      console.error(`Error fetching trending topic ${topic}:`, error);
      // Fallback to curated content for this topic
      const fallbackResults = getFallbackResearch(topic).slice(0, 1);
      allResults.push(...fallbackResults);
    }
  }
  
  // Sort by relevance score and return top results
  return allResults
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 10);
}

/**
 * Get research recommendations based on user's current viewing
 */
export async function getResearchRecommendations(
  currentPaper: ResearchPaper
): Promise<ResearchPaper[]> {
  const searchTerms = [
    ...currentPaper.geographySubfields,
    currentPaper.methodology,
  ].join(' ');
  
  const recommendations = await searchResearchPapers(searchTerms);
  
  // Filter out the current paper and return similar ones
  return recommendations
    .filter(paper => paper.id !== currentPaper.id)
    .slice(0, 5);
}

/**
 * Apply client-side filters to research results
 */
function applyClientFilters(
  papers: ResearchPaper[], 
  filters?: ResearchFilters
): ResearchPaper[] {
  if (!filters) return papers;

  return papers.filter(paper => {
    // Academic level filter
    if (filters.academicLevel.length > 0 && 
        !filters.academicLevel.includes(paper.academicLevel)) {
      return false;
    }

    // Citation count filter
    if (paper.citationCount < filters.citationRange.min || 
        paper.citationCount > filters.citationRange.max) {
      return false;
    }

    // Geography subfield filter
    if (filters.geographySubfield.length > 0) {
      const hasMatchingSubfield = filters.geographySubfield.some(subfield =>
        paper.geographySubfields.some(paperSubfield =>
          paperSubfield.toLowerCase().includes(subfield.toLowerCase())
        )
      );
      if (!hasMatchingSubfield) return false;
    }

    // Methodology filter (simplified mapping)
    if (filters.methodology.length > 0) {
      const methodologyMapping: Record<string, string[]> = {
        quantitative: ['statistical', 'regression', 'survey', 'gis'],
        qualitative: ['interview', 'ethnograph', 'case study'],
        mixed: ['mixed methods'],
        theoretical: ['theoretical', 'review', 'meta-analysis'],
      };

      const hasMatchingMethodology = filters.methodology.some(filterMethod => {
        const keywords = methodologyMapping[filterMethod] || [filterMethod];
        return keywords.some(keyword =>
          paper.methodology.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      if (!hasMatchingMethodology) return false;
    }

    return true;
  })
  .sort((a, b) => {
    // Sort by relevance score, then citation count
    if (a.relevanceScore !== b.relevanceScore) {
      return b.relevanceScore - a.relevanceScore;
    }
    return b.citationCount - a.citationCount;
  });
}

/**
 * Get research statistics for visualization
 */
export async function getResearchStatistics(): Promise<{
  publicationTrends: Array<{ year: number; count: number }>;
  topicDistribution: Array<{ topic: string; count: number }>;
  methodologyBreakdown: Array<{ methodology: string; count: number }>;
  openAccessProgress: Array<{ year: number; percentage: number }>;
}> {
  // This would typically come from API aggregations
  // For now, return sample data that would be realistic
  return {
    publicationTrends: [
      { year: 2020, count: 1250 },
      { year: 2021, count: 1380 },
      { year: 2022, count: 1520 },
      { year: 2023, count: 1690 },
      { year: 2024, count: 1845 },
    ],
    topicDistribution: [
      { topic: 'Urban Geography', count: 2840 },
      { topic: 'Climate Geography', count: 2156 },
      { topic: 'Population Studies', count: 1923 },
      { topic: 'Economic Geography', count: 1654 },
      { topic: 'Cultural Geography', count: 1432 },
      { topic: 'Political Geography', count: 1287 },
    ],
    methodologyBreakdown: [
      { methodology: 'Statistical Analysis', count: 3456 },
      { methodology: 'GIS and Spatial Analysis', count: 2987 },
      { methodology: 'Qualitative Interviews', count: 2234 },
      { methodology: 'Case Study Approach', count: 1876 },
      { methodology: 'Literature Review', count: 1543 },
      { methodology: 'Mixed Methods', count: 1298 },
    ],
    openAccessProgress: [
      { year: 2020, percentage: 45 },
      { year: 2021, percentage: 52 },
      { year: 2022, percentage: 58 },
      { year: 2023, percentage: 64 },
      { year: 2024, percentage: 71 },
    ],
  };
}
