import React from 'react';
import { Loader2, BookOpen, Search } from 'lucide-react';

/**
 * Loading state component for research page with skeleton cards
 */
const ResearchLoadingState: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Loading Header */}
      <div className="text-center py-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          <Search className="w-6 h-6 text-slate-400" />
          <BookOpen className="w-6 h-6 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Searching Academic Databases
        </h3>
        <p className="text-slate-600 max-w-md mx-auto">
          We're finding the best geography research papers from multiple sources 
          including OpenAlex, Semantic Scholar, and our curated database.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="max-w-md mx-auto">
        <div className="bg-slate-200 rounded-full h-2 overflow-hidden">
          <div className="bg-blue-600 h-full rounded-full animate-pulse" style={{ width: '70%' }} />
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-2">
          <span>Searching...</span>
          <span>Processing results...</span>
        </div>
      </div>

      {/* Skeleton Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, index) => (
          <SkeletonCard key={index} delay={index * 100} />
        ))}
      </div>

      {/* Loading Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
        <h4 className="font-semibold text-blue-900 mb-2">
          While you wait, here's what we're doing:
        </h4>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• Searching OpenAlex database for geography research</li>
          <li>• Finding papers with student-friendly abstracts</li>
          <li>• Prioritizing open access and recent publications</li>
          <li>• Generating educational summaries and key findings</li>
        </ul>
      </div>
    </div>
  );
};

/**
 * Individual skeleton card with animation
 */
const SkeletonCard: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  return (
    <div 
      className="bg-white rounded-lg border border-slate-200 shadow-sm animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header with badges */}
      <div className="flex gap-2 p-3 border-b bg-slate-50">
        <div className="h-6 bg-slate-200 rounded w-20"></div>
        <div className="h-6 bg-slate-200 rounded w-16"></div>
        <div className="h-6 bg-slate-200 rounded w-12"></div>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="space-y-2">
          <div className="h-5 bg-slate-200 rounded w-full"></div>
          <div className="h-5 bg-slate-200 rounded w-3/4"></div>
        </div>
        
        {/* Authors */}
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        
        {/* Abstract/Summary */}
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-2/3"></div>
        </div>
        
        {/* Tags */}
        <div className="flex gap-2">
          <div className="h-6 bg-slate-200 rounded w-16"></div>
          <div className="h-6 bg-slate-200 rounded w-20"></div>
          <div className="h-6 bg-slate-200 rounded w-14"></div>
        </div>
        
        {/* Methodology badge */}
        <div className="h-6 bg-slate-200 rounded w-24"></div>
        
        {/* Footer */}
        <div className="flex justify-between items-center pt-2">
          <div className="flex gap-4">
            <div className="h-4 bg-slate-200 rounded w-16"></div>
            <div className="h-4 bg-slate-200 rounded w-12"></div>
          </div>
          <div className="h-8 bg-slate-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

/**
 * Simple loading spinner for inline use
 */
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg', className?: string }> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <Loader2 className={`animate-spin text-blue-600 ${sizeClasses[size]} ${className}`} />
  );
};

/**
 * Loading state for search results
 */
export const SearchLoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-3" />
        <h3 className="text-lg font-medium text-slate-900 mb-1">
          Searching...
        </h3>
        <p className="text-slate-600">
          Finding relevant research papers
        </p>
      </div>
    </div>
  );
};

/**
 * Loading state for individual paper details
 */
export const PaperLoadingState: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-8 bg-slate-200 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-2/3"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-slate-200 rounded w-16"></div>
          <div className="h-6 bg-slate-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default ResearchLoadingState;
