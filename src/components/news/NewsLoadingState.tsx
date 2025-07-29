import React from 'react';

const NewsCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-slate-200 rounded-t-lg"></div>
      
      {/* Content placeholder */}
      <div className="p-6">
        {/* Header row with source and badge */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-20 h-4 bg-slate-200 rounded"></div>
            <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
            <div className="w-16 h-4 bg-slate-200 rounded"></div>
          </div>
          <div className="w-24 h-6 bg-slate-200 rounded"></div>
        </div>

        {/* Title placeholder */}
        <div className="mb-3 space-y-2">
          <div className="w-full h-5 bg-slate-200 rounded"></div>
          <div className="w-3/4 h-5 bg-slate-200 rounded"></div>
        </div>

        {/* Description placeholder */}
        <div className="mb-4 space-y-2">
          <div className="w-full h-4 bg-slate-200 rounded"></div>
          <div className="w-full h-4 bg-slate-200 rounded"></div>
          <div className="w-2/3 h-4 bg-slate-200 rounded"></div>
        </div>

        {/* Tags placeholder */}
        <div className="flex gap-2 mb-4">
          <div className="w-16 h-6 bg-slate-200 rounded"></div>
          <div className="w-20 h-6 bg-slate-200 rounded"></div>
          <div className="w-14 h-6 bg-slate-200 rounded"></div>
        </div>

        {/* Footer placeholder */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-200 rounded"></div>
            <div className="w-16 h-4 bg-slate-200 rounded"></div>
          </div>
          <div className="w-24 h-8 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const NewsHeaderSkeleton: React.FC = () => {
  return (
    <div className="mb-6 animate-pulse">
      <div className="w-48 h-6 mb-2 bg-slate-200 rounded"></div>
      <div className="w-32 h-4 bg-slate-200 rounded"></div>
    </div>
  );
};

export const NewsLoadingState: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <NewsHeaderSkeleton />

      {/* Grid of article skeletons */}
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <NewsCardSkeleton key={index} />
        ))}
      </div>

      {/* Loading message */}
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-3 text-slate-600">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Loading geography news...</span>
        </div>
      </div>
    </div>
  );
};

export default NewsLoadingState;
