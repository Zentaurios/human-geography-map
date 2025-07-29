'use client';

import { useState } from 'react';
import { Grid, List, ArrowUpDown } from 'lucide-react';
import { ResourceCard } from './ResourceCard';
import { Resource } from '@/types/resource.types';

interface ResourceGridProps {
  resources: Resource[];
  loading?: boolean;
  onResourceAction?: (resource: Resource, action: 'view' | 'download' | 'launch') => void;
}

type SortOption = 'name' | 'updated' | 'level' | 'type';
type ViewMode = 'grid' | 'list';

export function ResourceGrid({ resources, loading = false, onResourceAction }: ResourceGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const sortedResources = [...resources].sort((a, b) => {
    let aValue: string | Date | number;
    let bValue: string | Date | number;

    switch (sortBy) {
      case 'name':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'updated':
        aValue = new Date(a.lastUpdated);
        bValue = new Date(b.lastUpdated);
        break;
      case 'level':
        const levelOrder = { beginner: 1, intermediate: 2, advanced: 3, ap: 4 };
        aValue = levelOrder[a.level as keyof typeof levelOrder] || 0;
        bValue = levelOrder[b.level as keyof typeof levelOrder] || 0;
        break;
      case 'type':
        aValue = a.type.toLowerCase();
        bValue = b.type.toLowerCase();
        break;
      default:
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortOrder('asc');
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-slate-200 rounded w-32 animate-pulse" />
          <div className="flex gap-2">
            <div className="h-10 bg-slate-200 rounded w-24 animate-pulse" />
            <div className="h-10 bg-slate-200 rounded w-20 animate-pulse" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-slate-200 rounded w-1/2 mb-4" />
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-slate-200 rounded" />
                <div className="h-3 bg-slate-200 rounded w-5/6" />
              </div>
              <div className="h-10 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {resources.length} Resource{resources.length !== 1 ? 's' : ''} Found
          </h3>
          <p className="text-sm text-slate-600">
            Choose from study materials, interactive tools, and external resources
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [option, order] = e.target.value.split('-') as [SortOption, 'asc' | 'desc'];
                setSortBy(option);
                setSortOrder(order);
              }}
              className="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="updated-desc">Recently Updated</option>
              <option value="updated-asc">Oldest First</option>
              <option value="level-asc">Beginner First</option>
              <option value="level-desc">Advanced First</option>
              <option value="type-asc">Type A-Z</option>
              <option value="type-desc">Type Z-A</option>
            </select>
            <ArrowUpDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* View Mode Toggle */}
          <div className="flex border border-slate-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
              title="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 border-l border-slate-300 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Resources Display */}
      {sortedResources.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">
            <Grid className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No resources found</h3>
          <p className="text-slate-600 mb-4">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
              : 'space-y-4'
          }
        >
          {sortedResources.map((resource) => (
            <div
              key={resource.id}
              className={viewMode === 'list' ? 'border border-slate-200 rounded-lg' : ''}
            >
              <ResourceCard
                resource={resource}
                onAction={onResourceAction}
              />
            </div>
          ))}
        </div>
      )}

      {/* Load More / Pagination placeholder */}
      {sortedResources.length > 12 && (
        <div className="flex justify-center pt-8">
          <button className="px-6 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Load More Resources
          </button>
        </div>
      )}
    </div>
  );
}
