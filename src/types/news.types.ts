// News data types for NewsAPI integration and educational content

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
  };
  educationalValue?: 'high' | 'medium' | 'low';
  geographyTopics?: string[];
  content?: string; // For fallback articles
}

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface NewsFilters {
  category: NewsCategory;
  timeRange: TimeRange;
  sourceType: SourceType;
  readingLevel: ReadingLevel;
}

export type NewsCategory = 
  | 'all'
  | 'climate-environment'
  | 'urban-development'
  | 'population-migration'
  | 'economic-geography'
  | 'cultural-geography'
  | 'educational-resources';

export type TimeRange = 
  | '24h'
  | 'week'
  | 'month';

export type SourceType = 
  | 'all'
  | 'educational'
  | 'research'
  | 'news';

export type ReadingLevel = 
  | 'general'
  | 'academic'
  | 'student-friendly';

export enum NewsErrorType {
  API_RATE_LIMIT = 'rate_limit',
  API_ERROR = 'api_error',
  NETWORK_ERROR = 'network',
  NO_CONTENT = 'no_content'
}

export interface NewsError {
  type: NewsErrorType;
  message: string;
  retryable: boolean;
}

export interface NewsState {
  articles: NewsArticle[];
  filters: NewsFilters;
  isLoading: boolean;
  error: NewsError | null;
  lastUpdated: string | null;
  totalResults: number;
}

// Educational article content for fallbacks
export interface EducationalArticle extends Omit<NewsArticle, 'url'> {
  id: string;
  content: string;
  estimatedReadTime: number;
  difficulty: ReadingLevel;
  relatedTopics: string[];
  sources: string[];
}

// API configuration
export interface NewsAPIConfig {
  baseUrl: string;
  apiKey: string;
  timeout: number;
  retries: number;
  defaultParams: {
    language: string;
    sortBy: string;
    pageSize: number;
  };
}

// Cache configuration
export interface NewsCacheConfig {
  articles: number;
  categories: number;
  requestSchedule: {
    morning: string;
    afternoon: string;
    evening: string;
  };
}
