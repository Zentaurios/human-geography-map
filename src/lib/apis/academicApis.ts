// Academic API configuration and constants
import { AcademicAPIs } from '@/types/research.types';

export const ACADEMIC_APIS: AcademicAPIs = {
  // Removed Semantic Scholar - not suitable for multi-user applications due to rate limits
  openAlex: {
    baseUrl: 'https://api.openalex.org',
    rateLimit: '100,000 requests/day',
    politePool: true, // Requires email parameter
    contactEmail: process.env.CONTACT_EMAIL || 'geography-learning@example.com',
  },
  crossRef: {
    baseUrl: 'https://api.crossref.org',
    rateLimit: 'Unlimited (reasonable use)',
    politePool: true, // Requires User-Agent with email
  },
};

export const API_USAGE_STRATEGY = {
  openAlex: {
    dailyLimit: 100000,
    requestsPerHour: 4000, // Conservative estimate
    cacheDuration: 24 * 60 * 60 * 1000, // 24 hours
    useFor: 'Primary research source - unlimited and reliable',
    priority: 1, // Primary source
  },
  // Removed Semantic Scholar strategy - using OpenAlex exclusively
  crossRef: {
    unlimited: true,
    cacheDuration: 7 * 24 * 60 * 60 * 1000, // 7 days
    useFor: 'Metadata validation and DOI resolution',
    priority: 2, // Metadata only (promoted from priority 3)
  },
};

export const CACHE_STRATEGY = {
  popular_searches: '7 days',      // Common geography topics
  paper_details: '30 days',        // Individual paper data
  search_results: '24 hours',      // Search result sets
  visualizations: '12 hours',      // Chart data
};

export const ACCESSIBILITY_FEATURES = {
  summaryLevels: {
    'expert': 'Original abstract',
    'student': 'Simplified summary', 
    'beginner': 'Plain language explanation',
  },
  vocabularySupport: {
    academicTerms: 'Hover definitions',
    methodologyExplanations: 'Interactive guides',
    statisticalConcepts: 'Visual explanations',
  },
  readingSupport: {
    estimatedTime: 'Reading time estimates',
    difficultyLevel: 'Academic level indicators',
    prerequisites: 'Background knowledge needed',
  },
};
