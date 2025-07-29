import { NewsAPIResponse, NewsArticle, NewsErrorType, NewsError, NewsCategory, TimeRange, SourceType } from '@/types/news.types';
import { FALLBACK_ARTICLES, getFallbackArticlesByCategory, ERROR_MESSAGES } from './fallbackNews';

const NEWS_API_CONFIG = {
  baseUrl: 'https://newsapi.org/v2/everything',
  apiKey: process.env.NEWS_API_KEY || process.env.NEXT_PUBLIC_NEWS_API_KEY,
  timeout: 10000,
  retries: 2,
  defaultParams: {
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: 20,
  }
};

const GEOGRAPHY_KEYWORDS = [
  'geography',
  'climate change',
  'urban development', 
  'population growth',
  'migration patterns',
  'sustainable development',
  'human geography',
  'demographic trends',
  'urbanization',
  'environmental geography'
];

const EDUCATIONAL_DOMAINS = [
  'nationalgeographic.com',
  'worldbank.org', 
  'unesco.org',
  'bbc.com',
  'scientificamerican.com',
  'earth.org',
  'un.org',
  'ipcc.ch',
  'nature.com'
];

const EXCLUDE_DOMAINS = [
  'dailymail.co.uk',
  'buzzfeed.com',
  'tmz.com',
  'entertainment.com'
];

// Cache configuration
const CACHE_DURATION = {
  articles: 6 * 60 * 60 * 1000, // 6 hours
  categories: 24 * 60 * 60 * 1000, // 24 hours
};

interface CachedArticles {
  articles: NewsArticle[];
  timestamp: number;
  category: NewsCategory;
  timeRange: TimeRange;
}

class NewsCache {
  private cache = new Map<string, CachedArticles>();

  private getCacheKey(category: NewsCategory, timeRange: TimeRange): string {
    return `${category}-${timeRange}`;
  }

  get(category: NewsCategory, timeRange: TimeRange): NewsArticle[] | null {
    const key = this.getCacheKey(category, timeRange);
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    const age = Date.now() - cached.timestamp;
    if (age > CACHE_DURATION.articles) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.articles;
  }

  set(category: NewsCategory, timeRange: TimeRange, articles: NewsArticle[]): void {
    const key = this.getCacheKey(category, timeRange);
    this.cache.set(key, {
      articles,
      timestamp: Date.now(),
      category,
      timeRange
    });
  }

  clear(): void {
    this.cache.clear();
  }

  getStats(): { size: number; oldestEntry: number } {
    const now = Date.now();
    let oldestAge = 0;
    
    for (const cached of this.cache.values()) {
      const age = now - cached.timestamp;
      oldestAge = Math.max(oldestAge, age);
    }
    
    return {
      size: this.cache.size,
      oldestEntry: oldestAge
    };
  }
}

const newsCache = new NewsCache();

export class NewsAPIService {
  private async makeRequest(url: string): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), NEWS_API_CONFIG.timeout);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Authorization': `Bearer ${NEWS_API_CONFIG.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private getTimeRangeFilter(timeRange: TimeRange): string {
    const now = new Date();
    let fromDate: Date;

    switch (timeRange) {
      case '24h':
        fromDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case 'week':
        fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        fromDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    return fromDate.toISOString();
  }

  private getCategoryKeywords(category: NewsCategory): string[] {
    const categoryKeywords: Record<NewsCategory, string[]> = {
      'all': GEOGRAPHY_KEYWORDS,
      'climate-environment': ['climate change', 'environmental geography', 'sustainability', 'global warming', 'renewable energy'],
      'urban-development': ['urban development', 'urbanization', 'city planning', 'smart cities', 'infrastructure'],
      'population-migration': ['population growth', 'migration patterns', 'demographic trends', 'immigration', 'refugees'],
      'economic-geography': ['economic geography', 'globalization', 'trade patterns', 'development', 'inequality'],
      'cultural-geography': ['cultural geography', 'cultural diversity', 'social geography', 'human settlements'],
      'educational-resources': ['geography education', 'teaching geography', 'educational content', 'research methods']
    };

    return categoryKeywords[category] || GEOGRAPHY_KEYWORDS;
  }

  private evaluateEducationalValue(article: NewsArticle): 'high' | 'medium' | 'low' {
    const domain = this.extractDomain(article.url);
    
    if (EDUCATIONAL_DOMAINS.some(edu => domain.includes(edu))) {
      return 'high';
    }
    
    // Check for educational keywords in title/description
    const content = `${article.title} ${article.description}`.toLowerCase();
    const educationalKeywords = ['research', 'study', 'analysis', 'university', 'academic', 'scientific'];
    
    if (educationalKeywords.some(keyword => content.includes(keyword))) {
      return 'medium';
    }
    
    return 'low';
  }

  private extractDomain(url: string): string {
    try {
      return new URL(url).hostname.toLowerCase();
    } catch {
      return '';
    }
  }

  private filterAndEnhanceArticles(articles: NewsArticle[]): NewsArticle[] {
    return articles
      .filter(article => {
        const domain = this.extractDomain(article.url);
        
        // Exclude problematic domains
        if (EXCLUDE_DOMAINS.some(excluded => domain.includes(excluded))) {
          return false;
        }
        
        // Require basic article data
        if (!article.title || !article.description || article.title.length < 10) {
          return false;
        }
        
        return true;
      })
      .map(article => ({
        ...article,
        educationalValue: this.evaluateEducationalValue(article),
        geographyTopics: this.extractGeographyTopics(article)
      }))
      .sort((a, b) => {
        // Prioritize educational value
        const valueScore = { high: 3, medium: 2, low: 1 };
        const aScore = valueScore[a.educationalValue || 'low'];
        const bScore = valueScore[b.educationalValue || 'low'];
        
        if (aScore !== bScore) {
          return bScore - aScore;
        }
        
        // Then sort by date
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
  }

  private extractGeographyTopics(article: NewsArticle): string[] {
    const content = `${article.title} ${article.description}`.toLowerCase();
    const topics: string[] = [];
    
    const topicKeywords = {
      'climate': ['climate', 'weather', 'temperature', 'carbon', 'emission'],
      'urban': ['city', 'urban', 'metropolitan', 'downtown', 'municipal'],
      'population': ['population', 'demographic', 'birth', 'death', 'aging'],
      'migration': ['migration', 'immigrant', 'refugee', 'diaspora', 'movement'],
      'economic': ['economic', 'trade', 'gdp', 'income', 'poverty', 'development'],
      'environment': ['environment', 'ecology', 'conservation', 'biodiversity', 'pollution']
    };
    
    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some(keyword => content.includes(keyword))) {
        topics.push(topic);
      }
    }
    
    return topics;
  }

  private createNewsError(type: NewsErrorType, message: string): NewsError {
    return {
      type,
      message,
      retryable: type !== NewsErrorType.API_RATE_LIMIT
    };
  }

  async fetchArticles(
    category: NewsCategory = 'all',
    timeRange: TimeRange = 'week',
    sourceType: SourceType = 'all'
  ): Promise<{ articles: NewsArticle[]; error: NewsError | null }> {
    
    // Check cache first
    const cachedArticles = newsCache.get(category, timeRange);
    if (cachedArticles) {
      return { articles: cachedArticles, error: null };
    }

    // If no API key, return fallback content
    if (!NEWS_API_CONFIG.apiKey) {
      const fallbackArticles = getFallbackArticlesByCategory(category);
      return { 
        articles: fallbackArticles as unknown as NewsArticle[], 
        error: this.createNewsError(NewsErrorType.API_ERROR, ERROR_MESSAGES.api_error)
      };
    }

    try {
      const keywords = this.getCategoryKeywords(category);
      const query = keywords.slice(0, 3).join(' OR '); // Limit query complexity
      const fromDate = this.getTimeRangeFilter(timeRange);

      const params = new URLSearchParams({
        q: query,
        from: fromDate,
        sortBy: NEWS_API_CONFIG.defaultParams.sortBy,
        language: NEWS_API_CONFIG.defaultParams.language,
        pageSize: NEWS_API_CONFIG.defaultParams.pageSize.toString(),
      });

      // Add domain filtering for educational sources if requested
      if (sourceType === 'educational') {
        params.append('domains', EDUCATIONAL_DOMAINS.slice(0, 5).join(','));
      }

      const url = `${NEWS_API_CONFIG.baseUrl}?${params.toString()}`;
      const response = await this.makeRequest(url);

      if (response.status === 429) {
        // Rate limit exceeded
        const fallbackArticles = getFallbackArticlesByCategory(category);
        return { 
          articles: fallbackArticles as unknown as NewsArticle[], 
          error: this.createNewsError(NewsErrorType.API_RATE_LIMIT, ERROR_MESSAGES.rate_limit)
        };
      }

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data: NewsAPIResponse = await response.json();
      
      if (!data.articles || data.articles.length === 0) {
        const fallbackArticles = getFallbackArticlesByCategory(category);
        return { 
          articles: fallbackArticles as unknown as NewsArticle[], 
          error: this.createNewsError(NewsErrorType.NO_CONTENT, ERROR_MESSAGES.no_content)
        };
      }

      const processedArticles = this.filterAndEnhanceArticles(data.articles);
      
      // Cache the results
      newsCache.set(category, timeRange, processedArticles);
      
      return { articles: processedArticles, error: null };

    } catch (error) {
      console.error('NewsAPI fetch error:', error);
      
      const fallbackArticles = getFallbackArticlesByCategory(category);
      
      const errorType = error instanceof Error && error.name === 'AbortError' 
        ? NewsErrorType.NETWORK_ERROR 
        : NewsErrorType.API_ERROR;
      
      return { 
        articles: fallbackArticles as unknown as NewsArticle[], 
        error: this.createNewsError(errorType, ERROR_MESSAGES.api_error)
      };
    }
  }

  // Utility methods
  getCacheStats() {
    return newsCache.getStats();
  }

  clearCache() {
    newsCache.clear();
  }
}

// Export singleton instance
export const newsAPI = new NewsAPIService();
