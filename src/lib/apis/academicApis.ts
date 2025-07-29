// Academic API configuration and constants
import { AcademicAPIs } from '@/types/research.types';

export const ACADEMIC_APIS: AcademicAPIs = {
  semanticScholar: {
    baseUrl: 'https://api.semanticscholar.org/graph/v1',
    rateLimit: '100 requests/5 minutes',
    requiresAuth: false,
  },
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
  semanticScholar: {
    rateLimit: '100 per 5 minutes',
    cacheDuration: 12 * 60 * 60 * 1000, // 12 hours
    useFor: 'Primary research source with AI summaries and related papers',
    priorityTopics: ['human geography', 'urban planning', 'climate geography'],
  },
  openAlex: {
    dailyLimit: 100000,
    requestsPerHour: 4000, // Conservative estimate
    cacheDuration: 24 * 60 * 60 * 1000, // 24 hours
    useFor: 'Fallback research source and metadata validation',
  },
  crossRef: {
    unlimited: true,
    cacheDuration: 7 * 24 * 60 * 60 * 1000, // 7 days
    useFor: 'Metadata validation and DOI resolution',
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
