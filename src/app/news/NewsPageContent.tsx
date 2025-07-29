'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { NewsFilters as NewsFiltersType, NewsCategory, TimeRange, SourceType, ReadingLevel, NewsArticle, NewsError } from '@/types/news.types';
import { getGeographyNews } from './actions';
import NewsHeader from '@/components/news/NewsHeader';
import NewsFilters from '@/components/news/NewsFilters';
import NewsList from '@/components/news/NewsList';

const DEFAULT_FILTERS: NewsFiltersType = {
  category: 'all',
  timeRange: 'week',
  sourceType: 'all',
  readingLevel: 'general'
};

export default function NewsPageContent() {
  const [filters, setFilters] = useState<NewsFiltersType>(DEFAULT_FILTERS);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<NewsError | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchNews = async (currentFilters: NewsFiltersType = filters) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getGeographyNews(
        currentFilters.category,
        currentFilters.timeRange,
        currentFilters.sourceType
      );

      setArticles(result.articles);
      setError(result.error);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Failed to fetch news:', err);
      setError({
        type: 'api_error' as any,
        message: 'Unable to load news at this time. Please try again later.',
        retryable: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchNews();
  }, []);

  // Fetch when filters change
  useEffect(() => {
    fetchNews(filters);
  }, [filters]);

  const handleFiltersChange = (newFilters: NewsFiltersType) => {
    setFilters(newFilters);
  };

  const handleRetry = () => {
    fetchNews();
  };

  const handleRefresh = () => {
    fetchNews();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header with Back to Map */}
      <header className="bg-white border-b border-slate-200">
        <div className="px-4 py-6 mx-auto max-w-7xl">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 mb-4 transition-colors text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Interactive Map
          </Link>
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-4 text-sm text-slate-500">
            <Link href="/" className="transition-colors hover:text-slate-700">
              Human Geography Map
            </Link>
            <span>/</span>
            <span className="font-medium text-slate-900">News</span>
          </nav>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold text-slate-900">Geography News</h1>
              <p className="text-xl text-slate-600">Current events and educational resources</p>
            </div>
            
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border rounded-lg text-slate-600 border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          <p className='mt-2 text-sm italic text-slate-500'>
            Note: Limit 100 requests per day on free API key. But cached for maximum usage within free tier.
          </p>

          {/* Last Updated */}
          {lastUpdated && (
            <p className="mt-2 text-sm text-slate-500">
              Last updated: {lastUpdated}
            </p>
          )}

          
        </div>
      </header>

      <main className="px-4 py-8 mx-auto max-w-7xl">
        {/* Educational Header */}
        <NewsHeader />

        {/* Main Content Layout */}
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <NewsFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>
          </aside>

          {/* News Content */}
          <main className="lg:col-span-3">
            <NewsList
              articles={articles}
              isLoading={isLoading}
              error={error}
              onRetry={handleRetry}
            />
          </main>
        </div>

        {/* Educational Footer */}
        <section className="p-8 mt-12 text-center text-white rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600">
          <h2 className="mb-4 text-2xl font-semibold">Keep Learning</h2>
          <p className="max-w-3xl mx-auto mb-6 text-blue-100">
            Remember: the best geographers don't just read the news—they question it, 
            analyze it, and connect it to broader patterns and processes. Practice these 
            skills with every article you read.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/resources"
              className="px-6 py-3 font-medium text-blue-600 transition-colors bg-white rounded-lg hover:bg-blue-50"
            >
              Educational Resources
            </Link>
            <Link
              href="/research"
              className="px-6 py-3 font-medium text-white transition-colors border border-white rounded-lg hover:bg-white hover:text-blue-600"
            >
              Research Methods
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
