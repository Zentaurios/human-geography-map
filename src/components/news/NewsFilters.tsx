import React from 'react';
import { Filter, Globe, Leaf, Building, Users, TrendingUp, Heart, BookOpen } from 'lucide-react';
import { NewsCategory, TimeRange, SourceType, ReadingLevel, NewsFilters as NewsFiltersType } from '@/types/news.types';

interface NewsFiltersProps {
  filters: NewsFiltersType;
  onFiltersChange: (filters: NewsFiltersType) => void;
  className?: string;
}

const categoryConfig: Record<NewsCategory, { label: string; icon: React.ReactNode; description: string }> = {
  'all': {
    label: 'All News',
    icon: <Globe className="w-4 h-4" />,
    description: 'All geography-related news and updates'
  },
  'climate-environment': {
    label: 'Climate & Environment',
    icon: <Leaf className="w-4 h-4" />,
    description: 'Climate change, environmental issues, and sustainability'
  },
  'urban-development': {
    label: 'Urban Development',
    icon: <Building className="w-4 h-4" />,
    description: 'City planning, urbanization, and smart cities'
  },
  'population-migration': {
    label: 'Population & Migration',
    icon: <Users className="w-4 h-4" />,
    description: 'Demographics, migration patterns, and population trends'
  },
  'economic-geography': {
    label: 'Economic Geography',
    icon: <TrendingUp className="w-4 h-4" />,
    description: 'Trade, development, and economic patterns'
  },
  'cultural-geography': {
    label: 'Cultural Geography',
    icon: <Heart className="w-4 h-4" />,
    description: 'Cultural diversity and social geography'
  },
  'educational-resources': {
    label: 'Educational Resources',
    icon: <BookOpen className="w-4 h-4" />,
    description: 'Teaching materials and research methodology'
  }
};

const timeRangeLabels: Record<TimeRange, string> = {
  '24h': 'Last 24 Hours',
  'week': 'Past Week',
  'month': 'Past Month'
};

const sourceTypeLabels: Record<SourceType, string> = {
  'all': 'All Sources',
  'educational': 'Educational',
  'research': 'Research',
  'news': 'News'
};

const readingLevelLabels: Record<ReadingLevel, string> = {
  'general': 'General',
  'academic': 'Academic',
  'student-friendly': 'Student-Friendly'
};

export const NewsFilters: React.FC<NewsFiltersProps> = ({ 
  filters, 
  onFiltersChange, 
  className = '' 
}) => {
  const updateFilter = <K extends keyof NewsFiltersType>(
    key: K, 
    value: NewsFiltersType[K]
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className={`bg-white border border-slate-200 rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-900">Filter News</h3>
      </div>

      {/* Category Filters */}
      <div className="mb-6">
        <h4 className="mb-3 text-sm font-medium text-slate-700">Geography Topics</h4>
        <div className="grid gap-2">
          {Object.entries(categoryConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => updateFilter('category', key as NewsCategory)}
              className={`flex items-start gap-3 p-3 text-left border rounded-lg transition-colors ${
                filters.category === key
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className={`mt-0.5 ${filters.category === key ? 'text-blue-600' : 'text-slate-500'}`}>
                {config.icon}
              </div>
              <div>
                <div className="font-medium">{config.label}</div>
                <div className={`text-xs mt-1 ${
                  filters.category === key ? 'text-blue-700' : 'text-slate-500'
                }`}>
                  {config.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Time Range Filter */}
      <div className="mb-6">
        <h4 className="mb-3 text-sm font-medium text-slate-700">Time Range</h4>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(timeRangeLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => updateFilter('timeRange', key as TimeRange)}
              className={`px-3 py-2 text-sm font-medium border rounded transition-colors ${
                filters.timeRange === key
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Source Type Filter */}
      <div className="mb-6">
        <h4 className="mb-3 text-sm font-medium text-slate-700">Source Type</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(sourceTypeLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => updateFilter('sourceType', key as SourceType)}
              className={`px-3 py-2 text-sm font-medium border rounded transition-colors ${
                filters.sourceType === key
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Reading Level Filter */}
      <div>
        <h4 className="mb-3 text-sm font-medium text-slate-700">Reading Level</h4>
        <div className="grid gap-2">
          {Object.entries(readingLevelLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => updateFilter('readingLevel', key as ReadingLevel)}
              className={`px-3 py-2 text-sm font-medium border rounded transition-colors ${
                filters.readingLevel === key
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Source Evaluation Info */}
      <div className="p-4 mt-6 border rounded-lg bg-amber-50 border-amber-200">
        <h5 className="mb-2 text-sm font-semibold text-amber-900">Source Evaluation</h5>
        <p className="text-xs text-amber-800">
          Articles are color-coded by educational value. High-value sources include educational institutions, 
          research organizations, and established science publications.
        </p>
      </div>
    </div>
  );
};

export default NewsFilters;
