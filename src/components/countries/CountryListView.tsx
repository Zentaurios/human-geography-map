'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchAllCountries } from '@/lib/api/countries';
import { Country, Continent } from '@/types/country.types';
import { CountryCard } from './CountryCard';
import { CountryFilters } from './CountryFilters';
import { CountrySorting } from './CountrySorting';
import { Loader2, Search, Plus, AlertCircle } from 'lucide-react';
import { debounce } from '@/lib/utils';

// Filter and sorting types
export interface CountryListFilters {
  continent: Continent | 'All';
  searchQuery: string;
}

export type SortOption = 
  | 'name-asc' 
  | 'name-desc'
  | 'population-desc'
  | 'population-asc'
  | 'gdp-desc'
  | 'gdp-asc'
  | 'area-desc'
  | 'area-asc';

// Pagination constants
const INITIAL_ITEMS_PER_PAGE = 20;
const LOAD_MORE_INCREMENT = 20;

export function CountryListView() {
  const router = useRouter();
  
  // State management
  const [filters, setFilters] = useState<CountryListFilters>({
    continent: 'All',
    searchQuery: ''
  });
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [searchInput, setSearchInput] = useState('');
  const [itemsToShow, setItemsToShow] = useState(INITIAL_ITEMS_PER_PAGE);

  // Fetch all countries
  const { 
    data: countries, 
    isLoading, 
    error,
    isError 
  } = useQuery({
    queryKey: ['all-countries'],
    queryFn: fetchAllCountries,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 2,
  });

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setFilters(prev => ({ ...prev, searchQuery: query }));
      // Reset pagination when searching
      setItemsToShow(INITIAL_ITEMS_PER_PAGE);
    }, 300),
    []
  );

  // Handle search input change
  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters: CountryListFilters) => {
    setFilters(newFilters);
    // Reset pagination when filters change
    setItemsToShow(INITIAL_ITEMS_PER_PAGE);
  }, []);

  // Handle sort changes
  const handleSortChange = useCallback((newSort: SortOption) => {
    setSortBy(newSort);
    // Reset pagination when sorting changes
    setItemsToShow(INITIAL_ITEMS_PER_PAGE);
  }, []);

  // Load more countries
  const handleLoadMore = useCallback(() => {
    setItemsToShow(prev => prev + LOAD_MORE_INCREMENT);
  }, []);

  // Filtered and sorted countries
  const { filteredCountries, displayedCountries, hasMore } = useMemo(() => {
    if (!countries) return { filteredCountries: [], displayedCountries: [], hasMore: false };

    // Debug: Log the first few countries to see their structure
    if (countries.length > 0) {
      console.log('🔍 Countries received for filtering:', countries.length);
      console.log('🔍 First transformed country:', {
        name: countries[0].name,
        code: countries[0].code,
        continent: countries[0].continent,
        population: countries[0].population,
        hasValidCode: !!(countries[0].code && countries[0].code.trim())
      });
      
      // Check for any countries that might have issues
      const problematicCountries = countries.filter(country => 
        !country.code || country.code === 'XX' || !country.name || country.name === 'Unknown Country'
      );
      
      if (problematicCountries.length > 0) {
        console.log('⚠️ Found', problematicCountries.length, 'countries with potential issues:');
        problematicCountries.slice(0, 3).forEach((country, i) => {
          console.log(`Issue ${i + 1}:`, {
            name: country.name,
            code: country.code,
            continent: country.continent
          });
        });
      } else {
        console.log('✅ All countries appear to have valid basic data');
      }
    }

    // Use all countries without any aggressive filtering
    const cleanedCountries = countries;
    
    console.log(`🧹 Using all ${countries.length} countries without filtering`);

    // Apply filters
    let filtered = cleanedCountries.filter(country => {
      // Continent filter
      if (filters.continent !== 'All' && country.continent !== filters.continent) {
        return false;
      }

      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          country.name.toLowerCase().includes(query) ||
          country.continent.toLowerCase().includes(query) ||
          country.geography?.region?.toLowerCase().includes(query) ||
          country.geography?.subregion?.toLowerCase().includes(query) ||
          (country.code && country.code !== 'XX' ? country.code.toLowerCase().includes(query) : false) ||
          (country.capital || '').toLowerCase().includes(query)
        );
      }

      return true;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'population-desc':
          return b.population - a.population;
        case 'population-asc':
          return a.population - b.population;
        case 'gdp-desc':
          return (b.gdp || 0) - (a.gdp || 0);
        case 'gdp-asc':
          return (a.gdp || 0) - (b.gdp || 0);
        case 'area-desc':
          return b.area - a.area;
        case 'area-asc':
          return a.area - b.area;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    // Apply pagination
    const displayed = filtered.slice(0, itemsToShow);
    const hasMoreItems = filtered.length > itemsToShow;

    return {
      filteredCountries: filtered,
      displayedCountries: displayed,
      hasMore: hasMoreItems
    };
  }, [countries, filters, sortBy, itemsToShow]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-8 h-8 mb-4 text-blue-600 animate-spin" />
        <p className="text-slate-600">Loading countries...</p>
      </div>
    );
  }

  // Error state
  if (isError || !countries) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="w-12 h-12 mb-4 text-red-500" />
        <h3 className="mb-2 text-lg font-semibold text-slate-900">
          Error Loading Countries
        </h3>
        <p className="mb-4 text-slate-600">
          We couldn't load the country data. Please try again later.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6"> 
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search countries, regions, or capitals..."
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full py-3 pl-10 pr-4 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <CountryFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          countries={countries}
        />
        <CountrySorting
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing {displayedCountries.length} of {filteredCountries.length} countries
          {filteredCountries.length !== countries.length && (
            <span className="text-slate-500"> (filtered from {countries.length} total)</span>
          )}
        </p>
        
        {filters.searchQuery && (
          <button
            onClick={() => {
              setSearchInput('');
              setFilters(prev => ({ ...prev, searchQuery: '' }));
            }}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Countries Grid */}
      {displayedCountries.length === 0 ? (
        <div className="py-12 text-center">
          <p className="mb-2 text-lg text-slate-600">No countries found</p>
          <p className="text-sm text-slate-500">
            Try adjusting your filters or search query.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedCountries.map((country, index) => {
              // Create a more unique key by combining multiple fields
              const uniqueKey = country.code && country.code !== 'XX' 
                ? `${country.code}-${country.name.replace(/\s+/g, '-').toLowerCase()}`
                : `${country.name.replace(/\s+/g, '-').toLowerCase()}-${index}`;
              
              return (
                <CountryCard
                  key={uniqueKey}
                  country={country}
                  onClick={(countrySlug) => {
                    router.push(`/country/${countrySlug}`);
                  }}
                />
              );
            })}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center pt-8">
              <button
                onClick={handleLoadMore}
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-blue-600 transition-colors border border-blue-200 rounded-lg bg-blue-50 hover:bg-blue-100 hover:border-blue-300"
              >
                <Plus className="w-4 h-4" />
                Load More Countries
                <span className="text-xs text-blue-500">
                  ({filteredCountries.length - displayedCountries.length} remaining)
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
