import { ResearchPaper } from '@/types/research.types';

/**
 * Helper utilities for processing research results from multiple APIs
 */

/**
 * Calculate similarity between two paper titles using a simple algorithm
 */
export function calculateTitleSimilarity(title1: string, title2: string): number {
  const normalize = (str: string) => str.toLowerCase().replace(/[^\w\s]/g, '').trim();
  
  const t1 = normalize(title1);
  const t2 = normalize(title2);
  
  if (t1 === t2) return 1.0;
  
  // Check for very similar titles (> 90% word overlap)
  const words1 = t1.split(/\s+/);
  const words2 = t2.split(/\s+/);
  
  const commonWords = words1.filter(word => 
    word.length > 3 && words2.includes(word)
  ).length;
  
  const totalWords = Math.max(words1.length, words2.length);
  
  return commonWords / totalWords;
}

/**
 * Remove duplicate papers based on title similarity and DOI matching
 */
export function deduplicatePapers(papers: ResearchPaper[]): ResearchPaper[] {
  const unique: ResearchPaper[] = [];
  const seenDOIs = new Set<string>();
  
  for (const paper of papers) {
    // Check for exact DOI match first
    if (paper.doi && seenDOIs.has(paper.doi)) {
      continue;
    }
    
    // Check for title similarity with existing papers
    const isDuplicate = unique.some(existingPaper => {
      const similarity = calculateTitleSimilarity(paper.title, existingPaper.title);
      return similarity > 0.85; // 85% similarity threshold
    });
    
    if (!isDuplicate) {
      unique.push(paper);
      if (paper.doi) {
        seenDOIs.add(paper.doi);
      }
    }
  }
  
  return unique;
}

/**
 * Combine results from OpenAlex and deduplicate
 * (Simplified since we only use OpenAlex now)
 */
export function combineApiResults(
  _semanticResults: ResearchPaper[], // Deprecated parameter - kept for compatibility
  openAlexResults: ResearchPaper[],
  _fallbackResults: ResearchPaper[] // Deprecated parameter - kept for compatibility
): ResearchPaper[] {
  // Since we only use OpenAlex now, just return those results
  // Mark papers with their source for transparency
  const markedOpenAlex = openAlexResults.map(paper => ({
    ...paper,
    id: `openalex-${paper.id}`,
  }));
  
  // Deduplicate (though less necessary with single source)
  const deduplicated = deduplicatePapers(markedOpenAlex);
  
  // Sort by relevance score then citations
  return deduplicated.sort((a, b) => {
    if (a.relevanceScore !== b.relevanceScore) {
      return b.relevanceScore - a.relevanceScore;
    }
    
    return b.citationCount - a.citationCount;
  });
}

/**
 * Enhance paper data with additional computed fields
 */
export function enhancePaperData(paper: ResearchPaper): ResearchPaper {
  return {
    ...paper,
    // Add reading time estimate (words per minute calculation)
    estimatedReadingTime: estimateReadingTime(paper.abstract),
    
    // Enhance academic level detection
    academicLevel: paper.academicLevel || detectAcademicLevel(paper.abstract),
    
    // Improve methodology classification
    methodology: paper.methodology || detectMethodology(paper.abstract),
    
    // Calculate freshness score
    freshnessScore: calculateFreshnessScore(paper.publicationDate),
  };
}

/**
 * Estimate reading time for abstract (assuming 200 words per minute)
 */
function estimateReadingTime(abstract: string): number {
  if (!abstract) return 1;
  
  const wordCount = abstract.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 200);
  
  return Math.max(1, minutes); // Minimum 1 minute
}

/**
 * Detect academic level based on abstract complexity
 */
function detectAcademicLevel(abstract: string): 'undergraduate' | 'graduate' | 'advanced' {
  if (!abstract) return 'undergraduate';
  
  const text = abstract.toLowerCase();
  
  // Advanced indicators
  const advancedKeywords = [
    'theoretical framework', 'epistemological', 'ontological', 'meta-analysis',
    'systematic review', 'longitudinal study', 'multivariate analysis'
  ];
  
  // Graduate indicators
  const graduateKeywords = [
    'methodology', 'empirical', 'hypothesis', 'statistical significance',
    'correlation', 'regression', 'sample size'
  ];
  
  const advancedMatches = advancedKeywords.filter(keyword => text.includes(keyword)).length;
  const graduateMatches = graduateKeywords.filter(keyword => text.includes(keyword)).length;
  
  if (advancedMatches >= 2) return 'advanced';
  if (graduateMatches >= 2) return 'graduate';
  
  return 'undergraduate';
}

/**
 * Detect research methodology from abstract
 */
function detectMethodology(abstract: string): string {
  if (!abstract) return 'Research analysis';
  
  const text = abstract.toLowerCase();
  
  const methodologyMap = [
    { keywords: ['mixed method'], result: 'Mixed methods' },
    { keywords: ['survey', 'questionnaire'], result: 'Survey research' },
    { keywords: ['interview', 'ethnograph', 'focus group'], result: 'Qualitative interviews' },
    { keywords: ['gis', 'spatial analysis', 'geographic information'], result: 'GIS and spatial analysis' },
    { keywords: ['statistical', 'regression', 'correlation'], result: 'Statistical analysis' },
    { keywords: ['case study'], result: 'Case study approach' },
    { keywords: ['review', 'meta-analysis', 'synthesis'], result: 'Literature review' },
    { keywords: ['experiment', 'trial', 'control group'], result: 'Experimental research' },
  ];
  
  for (const method of methodologyMap) {
    if (method.keywords.some(keyword => text.includes(keyword))) {
      return method.result;
    }
  }
  
  return 'Research analysis';
}

/**
 * Calculate freshness score based on publication date (0-1 scale)
 */
function calculateFreshnessScore(publicationDate: string): number {
  const pubDate = new Date(publicationDate);
  const currentDate = new Date();
  const daysSincePublication = (currentDate.getTime() - pubDate.getTime()) / (1000 * 60 * 60 * 24);
  
  // Fresh if published within last 2 years
  if (daysSincePublication <= 730) return 1.0;
  
  // Gradually decrease score for older papers
  const maxAge = 10 * 365; // 10 years
  const score = Math.max(0, 1 - (daysSincePublication - 730) / (maxAge - 730));
  
  return Math.round(score * 100) / 100; // Round to 2 decimal places
}

/**
 * Filter papers by geography relevance (MUCH more inclusive filtering)
 */
export function filterGeographyRelevant(papers: ResearchPaper[]): ResearchPaper[] {
  console.log(`🌍 Starting geography relevance filter with ${papers.length} papers`);
  
  // Super expanded and inclusive geography keywords
  const inclusiveKeywords = [
    // Core geography terms
    'geography', 'geographic', 'geographical', 'spatial', 'geospatial', 'cartography',
    // Settlement and urbanization
    'urban', 'rural', 'city', 'cities', 'town', 'village', 'metropolitan', 'suburb',
    'settlement', 'housing', 'neighborhood', 'community', 'district', 'area', 'zone',
    // Population and society
    'population', 'demographic', 'migration', 'people', 'residents', 'inhabitants',
    'society', 'social', 'cultural', 'ethnic', 'identity', 'diversity', 'human',
    // Environment and climate
    'climate', 'environmental', 'environment', 'ecosystem', 'landscape', 'land use',
    'natural', 'resource', 'sustainability', 'green', 'ecology', 'biodiversity',
    // Economic and development
    'economic', 'economy', 'development', 'growth', 'trade', 'industry', 'business',
    'employment', 'income', 'poverty', 'inequality', 'globalization',
    // Political and governance
    'political', 'governance', 'government', 'policy', 'planning', 'public',
    'administration', 'democracy', 'power', 'authority', 'institution',
    // Physical features
    'physical', 'terrain', 'topography', 'geology', 'water', 'river', 'ocean',
    'mountain', 'forest', 'desert', 'coast', 'coastal', 'marine',
    // Technology and methods
    'gis', 'remote sensing', 'mapping', 'map', 'satellite', 'data', 'analysis',
    // Scale and location
    'location', 'place', 'space', 'territory', 'border', 'boundary', 'frontier',
    'region', 'regional', 'local', 'global', 'national', 'international',
    'country', 'nation', 'state', 'province', 'county',
    // Academic and research terms
    'study', 'research', 'analysis', 'investigation', 'examination', 'survey',
    'case', 'empirical', 'evidence', 'findings', 'results'
  ];
  
  const filtered = papers.filter(paper => {
    // Check if paper has any meaningful content first
    const hasContent = paper.title && paper.abstract && paper.abstract.length > 20;
    
    if (!hasContent) {
      console.log(`❌ Filtered out: "${paper.title?.substring(0, 40)}..." - insufficient content`);
      return false;
    }
    
    const searchText = `${paper.title} ${paper.abstract} ${paper.geographySubfields.join(' ')}`.toLowerCase();
    
    // Very inclusive keyword matching
    const hasRelevantKeyword = inclusiveKeywords.some(keyword => searchText.includes(keyword));
    
    // Accept papers that are obviously academic research
    const hasAcademicMarkers = [
      'university', 'college', 'journal', 'proceedings', 'conference',
      'thesis', 'dissertation', 'review', 'meta-analysis'
    ].some(marker => searchText.includes(marker));
    
    // Accept papers with substantial abstracts (likely real research)
    const hasSubstantialContent = paper.abstract.length > 100;
    
    // Accept papers with good citation counts (indicates quality research)
    const isWellCited = paper.citationCount > 5;
    
    // Very inclusive criteria - accept if ANY condition is met
    const isRelevant = hasRelevantKeyword || hasAcademicMarkers || (hasSubstantialContent && isWellCited);
    
    if (!isRelevant) {
      console.log(`❌ Filtered out: "${paper.title.substring(0, 50)}..." - no relevant keywords or academic markers`);
    } else {
      console.log(`✅ Kept: "${paper.title.substring(0, 50)}..." - relevant content found`);
    }
    
    return isRelevant;
  });
  
  const keepPercentage = papers.length > 0 ? ((filtered.length / papers.length) * 100).toFixed(1) : '0';
  console.log(`🌍 Geography filter: ${papers.length} -> ${filtered.length} papers (${keepPercentage}% kept)`);
  
  // If we're filtering out more than 80% of papers, just return all papers with decent content
  if (filtered.length < papers.length * 0.2 && papers.length > 5) {
    console.log(`⚠️ Filter too restrictive! Returning papers with basic content requirements...`);
    return papers.filter(paper => 
      paper.title && 
      paper.abstract && 
      paper.abstract.length > 30
    );
  }
  
  return filtered;
}

/**
 * Score papers for educational value
 */
export function scoreEducationalValue(paper: ResearchPaper): number {
  let score = 5; // Base score
  
  // Boost for open access
  if (paper.openAccessStatus === 'gold' || paper.openAccessStatus === 'green') {
    score += 2;
  }
  
  // Boost for appropriate academic level
  if (paper.academicLevel === 'undergraduate') {
    score += 1; // Easier for students
  }
  
  // Boost for good abstracts
  if (paper.abstract && paper.abstract.length > 200) {
    score += 1;
  }
  
  // Boost for clear methodology
  if (paper.methodology && !paper.methodology.includes('analysis')) {
    score += 1;
  }
  
  // Boost for recent papers
  const freshnessScore = calculateFreshnessScore(paper.publicationDate);
  score += freshnessScore * 2;
  
  return Math.min(10, Math.round(score));
}

/**
 * Transform search query to be more effective for academic APIs
 */
export function optimizeSearchQuery(query: string, enhanceWithGeography: boolean = true): string {
  // Remove common words that don't help academic search
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  
  const words = query.toLowerCase().split(/\s+/)
    .filter(word => !stopWords.includes(word) && word.length > 2);
  
  // Only add geography context if enhancement is enabled
  if (enhanceWithGeography) {
    const hasGeographyContext = words.some(word => 
      ['geography', 'geographic', 'spatial', 'urban', 'rural', 'climate', 'population'].includes(word)
    );
    
    if (!hasGeographyContext && words.length > 0) {
      words.push('geography');
    }
  }
  
  return words.join(' ');
}