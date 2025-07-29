'use client';

import { Country, Continent } from '@/types/country.types';
import { CountryListFilters } from './CountryListView';
import { Filter, X } from 'lucide-react';
import { useState } from 'react';

interface CountryFiltersProps {
  filters: CountryListFilters;
  onFiltersChange: (filters: CountryListFilters) => void;
  countries: Country[];
}

const CONTINENTS: (Continent | 'All')[] = [
  'All',
  'Africa',
  'Antarctica',
  'Asia',
  'Europe',
  'North America',
  'Oceania',
  'South America'
];

export function CountryFilters({ 
  filters, 
  onFiltersChange, 
  countries 
}: CountryFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Calculate country counts per continent
  const continentCounts = CONTINENTS.reduce((acc, continent) => {
    if (continent === 'All') {
      acc[continent] = countries.length;
    } else {
      acc[continent] = countries.filter(country => country.continent === continent).length;
    }
    return acc;
  }, {} as Record<string, number>);

  const handleContinentChange = (continent: Continent | 'All') => {
    onFiltersChange({
      ...filters,
      continent
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      continent: 'All',
      searchQuery: ''
    });
  };

  const hasActiveFilters = filters.continent !== 'All' || filters.searchQuery !== '';

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Filter className="w-4 h-4" />
          Filter by:
        </div>
        
        {/* Continent Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600">Continent:</label>
          <select
            value={filters.continent}
            onChange={(e) => handleContinentChange(e.target.value as Continent | 'All')}
            className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {CONTINENTS.map((continent) => (
              <option key={continent} value={continent}>
                {continent} ({continentCounts[continent] || 0})
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 px-3 py-2 text-sm text-slate-600 hover:text-slate-800 transition-colors"
          >
            <X className="w-3 h-3" />
            Clear filters
          </button>
        )}
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden relative">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
              {filters.continent !== 'All' ? '1' : '0'}
            </span>
          )}
        </button>

        {/* Mobile Filters Dropdown */}
        {showMobileFilters && (
          <div className="absolute z-10 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-slate-900">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Continent Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Continent
                </label>
                <select
                  value={filters.continent}
                  onChange={(e) => {
                    handleContinentChange(e.target.value as Continent | 'All');
                    setShowMobileFilters(false);
                  }}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {CONTINENTS.map((continent) => (
                    <option key={continent} value={continent}>
                      {continent} ({continentCounts[continent] || 0})
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    clearAllFilters();
                    setShowMobileFilters(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
