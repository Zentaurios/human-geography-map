'use server';

import { ResearchPaper } from '@/types/research.types';
import { ACADEMIC_APIS } from './academicApis';

/**
 * Fetch research papers from Semantic Scholar API (primary source)
 * Semantic Scholar provides reliable access to academic papers with good
 * abstracts and citation data, making it ideal for educational use.
 */
export async function fetchFromSemanticScholar(query: string): Promise<ResearchPaper[]> {
  try {
    const params = new URLSearchParams({
      query: query,
      limit: '25',
      fields: 'paperId,title,abstract,authors,year,venue,citationCount,isOpenAccess,openAccessPdf,fieldsOfStudy',
    });

    const response = await fetch(
      `${ACADEMIC_APIS.semanticScholar.baseUrl}/paper/search?${params}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 43200 }, // Cache for 12 hours
      }
    );

    if (!response.ok) {
      throw new Error(`Semantic Scholar API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.data || data.data.length === 0) {
      return [];
    }

    return data.data
      .filter((paper: any) => paper.abstract && paper.title) // Only papers with abstracts
      .map((paper: any) => transformSemanticScholarPaper(paper));
      
  } catch (error) {
    console.error('Semantic Scholar API error:', error);
    return [];
  }
}

/**
 * Transform Semantic Scholar data to our ResearchPaper format
 */
function transformSemanticScholarPaper(paper: any): ResearchPaper {
  const openAccessStatus = getOpenAccessStatus(paper.isOpenAccess, paper.openAccessPdf);
  const academicLevel = determineAcademicLevel(paper.abstract);
  const geographySubfields = extractGeographySubfields(paper.fieldsOfStudy);
  
  return {
    id: paper.paperId,
    title: paper.title,
    authors: paper.authors?.map((author: any) => ({
      name: author.name,
      affiliation: undefined, // Semantic Scholar doesn't provide affiliation in search results
    })) || [],
    abstract: paper.abstract,
    publicationDate: paper.year ? `${paper.year}-01-01` : new Date().toISOString(),
    journal: paper.venue,
    doi: undefined, // Not provided in search results
    url: extractBestSemanticScholarUrl(paper),
    citationCount: paper.citationCount || 0,
    openAccessStatus,
    geographySubfields,
    academicLevel,
    summary: generateStudentSummary(paper.abstract),
    keyFindings: extractKeyFindings(paper.abstract),
    methodology: identifyMethodology(paper.abstract),
    relevanceScore: calculateRelevanceScore(paper),
  };
}

// Extract the best available URL for accessing the paper from Semantic Scholar
function extractBestSemanticScholarUrl(paper: any): string | undefined {
  // Priority order for URLs:
  // 1. Open access PDF URL
  // 2. DOI URL (construct from paper ID if available)
  // 3. Semantic Scholar page URL (fallback)
  
  // Check for open access PDF
  if (paper.openAccessPdf?.url) {
    return paper.openAccessPdf.url;
  }
  
  // Many Semantic Scholar papers don't have DOIs in search results
  // But we can try to get more details if we have the paper ID
  if (paper.paperId) {
    // Create Semantic Scholar paper page URL as fallback
    return `https://www.semanticscholar.org/paper/${paper.paperId}`;
  }
  
  // Final fallback: construct a search URL if we have enough info
  if (paper.title) {
    const searchQuery = encodeURIComponent(paper.title);
    return `https://scholar.google.com/scholar?q=${searchQuery}`;
  }
  
  return undefined;
}

/**
 * Helper functions for data transformation
 */
function getOpenAccessStatus(isOpenAccess: boolean, openAccessPdf: any): 'gold' | 'green' | 'bronze' | 'closed' {
  if (!isOpenAccess) return 'closed';
  if (openAccessPdf && openAccessPdf.url) return 'gold';
  return 'green'; // Assume green if open access but no PDF URL
}

function determineAcademicLevel(abstract: string): 'undergraduate' | 'graduate' | 'advanced' {
  const text = abstract.toLowerCase();
  
  // Advanced level indicators
  const advancedKeywords = ['theoretical framework', 'epistemological', 'ontological', 'meta-analysis', 'systematic review'];
  // Graduate level indicators  
  const graduateKeywords = ['methodology', 'empirical', 'hypothesis', 'statistical significance', 'regression analysis'];
  
  if (advancedKeywords.some(keyword => text.includes(keyword))) {
    return 'advanced';
  }
  if (graduateKeywords.some(keyword => text.includes(keyword))) {
    return 'graduate';
  }
  
  return 'undergraduate';
}

function extractGeographySubfields(fieldsOfStudy: any[]): string[] {
  if (!fieldsOfStudy) return ['Human Geography'];
  
  const geographyFields = fieldsOfStudy
    .map(field => field.name || field)
    .filter(name => {
      const lowerName = name.toLowerCase();
      return lowerName.includes('geograph') || 
             ['urban', 'climate', 'population', 'economic', 'cultural', 'political', 'environmental'].some(
               field => lowerName.includes(field)
             );
    })
    .slice(0, 3);
    
  return geographyFields.length > 0 ? geographyFields : ['Human Geography'];
}

function generateStudentSummary(abstract: string): string {
  if (!abstract) return 'This research explores important concepts in human geography.';
  
  // Simple summarization - take first two sentences and simplify language
  const sentences = abstract.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const firstTwoSentences = sentences.slice(0, 2).join('. ') + '.';
  
  // Basic language simplification
  return firstTwoSentences
    .replace(/\bmethodology\b/gi, 'research method')
    .replace(/\bempirical\b/gi, 'based on real data')
    .replace(/\btheoretical\b/gi, 'based on ideas and concepts')
    .replace(/\bepistemological\b/gi, 'about how we know things')
    .replace(/\bontological\b/gi, 'about what exists')
    .replace(/\bparadigm\b/gi, 'approach or way of thinking');
}

function extractKeyFindings(abstract: string): string[] {
  if (!abstract) return ['Research findings will be summarized here'];
  
  // Extract sentences that contain finding indicators
  const sentences = abstract.split(/[.!?]+/);
  const findings = sentences
    .filter(sentence => {
      const lowerSentence = sentence.toLowerCase();
      return lowerSentence.match(/\b(found|show|shows|demonstrate|demonstrates|reveal|reveals|indicate|indicates|suggest|suggests|conclude|concludes|results? show|evidence suggests)\b/);
    })
    .slice(0, 3)
    .map(finding => finding.trim())
    .filter(finding => finding.length > 10); // Filter out very short findings
    
  return findings.length > 0 ? findings : ['Key findings are being analyzed'];
}

function identifyMethodology(abstract: string): string {
  const text = abstract.toLowerCase();
  
  // Order matters - more specific first
  if (text.includes('mixed method')) {
    return 'Mixed methods';
  }
  if (text.includes('survey') || text.includes('questionnaire')) {
    return 'Survey research';
  }
  if (text.includes('interview') || text.includes('ethnograph') || text.includes('qualitative')) {
    return 'Qualitative interviews';
  }
  if (text.includes('gis') || text.includes('spatial analysis') || text.includes('geospatial')) {
    return 'GIS and spatial analysis';
  }
  if (text.includes('statistical') || text.includes('regression') || text.includes('quantitative')) {
    return 'Statistical analysis';
  }
  if (text.includes('case study')) {
    return 'Case study approach';
  }
  if (text.includes('review') || text.includes('meta-analysis') || text.includes('synthesis')) {
    return 'Literature review';
  }
  if (text.includes('experiment') || text.includes('trial')) {
    return 'Experimental research';
  }
  
  return 'Research analysis';
}

function calculateRelevanceScore(paper: any): number {
  let score = 5; // Base score
  
  // Boost for open access
  if (paper.isOpenAccess) score += 2;
  
  // Boost for recent publications
  const currentYear = new Date().getFullYear();
  if (paper.year && currentYear - paper.year <= 2) score += 1;
  
  // Boost for high citations relative to age
  if (paper.year && paper.citationCount) {
    const yearsOld = currentYear - paper.year + 1;
    const citationsPerYear = paper.citationCount / yearsOld;
    if (citationsPerYear > 10) score += 2;
    else if (citationsPerYear > 5) score += 1;
  }
  
  // Boost for having abstract (indicates more complete data)
  if (paper.abstract && paper.abstract.length > 100) score += 1;
  
  return Math.min(10, score);
}

/**
 * Get related papers based on a paper's characteristics
 */
export async function getRelatedPapers(paper: ResearchPaper): Promise<ResearchPaper[]> {
  try {
    // Create search query from paper's subfields
    const searchTerms = paper.geographySubfields.join(' ');
    const relatedPapers = await fetchFromSemanticScholar(searchTerms);
    
    // Filter out the original paper and return top 5
    return relatedPapers
      .filter(p => p.id !== paper.id)
      .slice(0, 5);
      
  } catch (error) {
    console.error('Error fetching related papers:', error);
    return [];
  }
}
