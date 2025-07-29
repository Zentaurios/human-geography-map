'use client';

import { useState } from 'react';
import { Filter, X, Search } from 'lucide-react';
import { ResourceFilters as IResourceFilters } from '@/types/resource.types';

interface ResourceFiltersProps {
  filters: IResourceFilters;
  onFiltersChange: (filters: IResourceFilters) => void;
  availableCategories: string[];
  availableTypes: string[];
  availableLevels: string[];
  availableTopics: string[];
}

export function ResourceFilters({
  filters,
  onFiltersChange,
  availableCategories,
  availableTypes,
  availableLevels,
  availableTopics
}: ResourceFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilters = (updates: Partial<IResourceFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: '',
      type: [],
      level: [],
      topics: [],
      searchQuery: ''
    });
  };

  const toggleArrayFilter = (array: string[], value: string) => {
    if (array.includes(value)) {
      return array.filter(item => item !== value);
    } else {
      return [...array, value];
    }
  };

  const hasActiveFilters = filters.category || filters.type.length > 0 || 
    filters.level.length > 0 || filters.topics.length > 0 || filters.searchQuery;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-600" />
          <h3 className="font-semibold text-slate-900">Filters</h3>
          {hasActiveFilters && (
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
              Active
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
            >
              Clear all
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
          >
            {isExpanded ? 'Less' : 'More'} filters
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search resources..."
          value={filters.searchQuery}
          onChange={(e) => updateFilters({ searchQuery: e.target.value })}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {filters.searchQuery && (
          <button
            onClick={() => updateFilters({ searchQuery: '' })}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-100 rounded"
          >
            <X className="w-3 h-3 text-slate-400" />
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
        <select
          value={filters.category}
          onChange={(e) => updateFilters({ category: e.target.value })}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          {availableCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-4">
          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Resource Type</label>
            <div className="space-y-2">
              {availableTypes.map(type => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.type.includes(type)}
                    onChange={() => updateFilters({ 
                      type: toggleArrayFilter(filters.type, type) 
                    })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-slate-700 capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty Level</label>
            <div className="space-y-2">
              {availableLevels.map(level => (
                <label key={level} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.level.includes(level)}
                    onChange={() => updateFilters({ 
                      level: toggleArrayFilter(filters.level, level) 
                    })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-slate-700 capitalize">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Topics Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Topics</label>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {availableTopics.slice(0, 15).map(topic => (
                <label key={topic} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.topics.includes(topic)}
                    onChange={() => updateFilters({ 
                      topics: toggleArrayFilter(filters.topics, topic) 
                    })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-slate-700">{topic}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <h4 className="text-sm font-medium text-slate-700 mb-2">Active filters:</h4>
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                {filters.category}
                <button
                  onClick={() => updateFilters({ category: '' })}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {filters.type.map(type => (
              <span key={type} className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                {type}
                <button
                  onClick={() => updateFilters({ 
                    type: filters.type.filter(t => t !== type) 
                  })}
                  className="hover:bg-green-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            
            {filters.level.map(level => (
              <span key={level} className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                {level}
                <button
                  onClick={() => updateFilters({ 
                    level: filters.level.filter(l => l !== level) 
                  })}
                  className="hover:bg-purple-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            
            {filters.topics.map(topic => (
              <span key={topic} className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                {topic}
                <button
                  onClick={() => updateFilters({ 
                    topics: filters.topics.filter(t => t !== topic) 
                  })}
                  className="hover:bg-orange-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
