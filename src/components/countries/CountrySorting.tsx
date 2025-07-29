'use client';

import { SortOption } from './CountryListView';
import { ArrowUpDown } from 'lucide-react';

interface CountrySortingProps {
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
}

const SORT_OPTIONS = [
  { value: 'name-asc' as SortOption, label: 'Name (A-Z)' },
  { value: 'name-desc' as SortOption, label: 'Name (Z-A)' },
  { value: 'population-desc' as SortOption, label: 'Population (Highest)' },
  { value: 'population-asc' as SortOption, label: 'Population (Lowest)' },
  { value: 'gdp-desc' as SortOption, label: 'GDP (Highest)' },
  { value: 'gdp-asc' as SortOption, label: 'GDP (Lowest)' },
  { value: 'area-desc' as SortOption, label: 'Area (Largest)' },
  { value: 'area-asc' as SortOption, label: 'Area (Smallest)' }
];

export function CountrySorting({ sortBy, onSortChange }: CountrySortingProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <ArrowUpDown className="w-4 h-4" />
        Sort by:
      </div>
      
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
