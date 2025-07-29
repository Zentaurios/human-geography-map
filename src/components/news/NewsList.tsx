import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { NewsArticle, NewsError } from '@/types/news.types';
import NewsCard from './NewsCard';
import NewsLoadingState from './NewsLoadingState';

interface NewsListProps {
  articles: NewsArticle[];
  isLoading: boolean;
  error: NewsError | null;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<{ error: NewsError; onRetry?: () => void }> = ({ error, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white border border-red-200 rounded-lg">
      <AlertCircle className="w-12 h-12 mb-4 text-red-500" />
      <h3 className="mb-2 text-lg font-semibold text-red-900">Unable to Load News</h3>
      <p className="mb-4 text-red-700">{error.message}</p>
      {error.retryable && onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
};

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-slate-200 rounded-lg">
      <div className="w-16 h-16 mb-4 bg-slate-100 rounded-full flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900">No Articles Found</h3>
      <p className="text-slate-600">
        Try adjusting your filters or check back later for new content.
      </p>
    </div>
  );
};

export const NewsList: React.FC<NewsListProps> = ({ 
  articles, 
  isLoading, 
  error, 
  onRetry,
  className = '' 
}) => {
  if (isLoading) {
    return <NewsLoadingState />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={onRetry} />;
  }

  if (!articles || articles.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={className}>
      {/* Article Count */}
      <div className="mb-6">
        <p className="text-sm text-slate-600">
          Showing {articles.length} article{articles.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {articles.map((article, index) => (
          <NewsCard
            key={`${article.url}-${index}`}
            article={article}
            className="h-full"
          />
        ))}
      </div>

      {/* Educational Note for Fallback Content */}
      {articles.some(article => article.source.name === 'Educational Content') && (
        <div className="p-4 mt-8 border rounded-lg bg-blue-50 border-blue-200">
          <h4 className="mb-2 text-sm font-semibold text-blue-900">Educational Content Notice</h4>
          <p className="text-sm text-blue-800">
            Some articles shown are educational resources from our curated collection. 
            These provide valuable geography insights while we work to bring you the latest news updates.
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsList;
