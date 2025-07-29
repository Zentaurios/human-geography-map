'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { Continent } from '@/types/country.types';

interface CountrySearchProps {
  onCountrySelect: (countryCode: string, countryName: string) => void;
  onContinentSelect: (continent: Continent | 'all') => void;
  className?: string;
}

interface SimpleCountry {
  name: string;
  code: string;
  region: string;
  flag: string;
}

export function CountrySearch({ 
  onCountrySelect, 
  onContinentSelect,
  className = '' 
}: CountrySearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState<SimpleCountry[]>([]);
  const [filteredResults, setFilteredResults] = useState<SimpleCountry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [lastSelectedCountry, setLastSelectedCountry] = useState<string>('');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load countries on component mount
  useEffect(() => {
    loadCountries();
  }, []);

  async function loadCountries() {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,region,flags');
      
      if (!response.ok) {
        throw new Error(`Failed to load countries: ${response.status}`);
      }
      
      const data = await response.json();
      
      const transformedCountries = data.map((country: any) => ({
        name: country.name?.common || 'Unknown',
        code: country.cca2 || 'XX',
        region: country.region || 'Unknown',
        flag: country.flags?.png || country.flags?.svg || '',
      }));
      
      setCountries(transformedCountries);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load countries';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  // Filter countries based on query
  useEffect(() => {
    if (!query || query.length < 2) {
      setFilteredResults([]);
      setIsOpen(false);
      return;
    }

    const filtered = countries.filter(country => 
      country.name.toLowerCase().includes(query.toLowerCase()) ||
      country.region.toLowerCase().includes(query.toLowerCase()) ||
      country.code.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);
    
    setFilteredResults(filtered);
    setIsOpen(filtered.length > 0);
  }, [query, countries]);

  const handleCountrySelect = (country: SimpleCountry) => {
    onCountrySelect(country.code, country.name);
    setLastSelectedCountry(country.name);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    setLastSelectedCountry('');
    inputRef.current?.focus();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (filteredResults.length > 0) {
              setIsOpen(true);
            }
          }}
          placeholder={
            isLoading ? "Loading countries..." : 
            error ? "Error loading data" :
            lastSelectedCountry ? `${lastSelectedCountry} selected` :
            "Search countries..."
          }
          className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm ${
            lastSelectedCountry 
              ? 'border-blue-300 bg-blue-50 placeholder-blue-600' 
              : 'border-slate-300 placeholder-slate-400'
          }`}
          disabled={isLoading || error !== ''}
        />
        {(query || lastSelectedCountry) && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 hover:text-slate-600 transition-colors"
            title="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        
        {/* Selected country indicator */}
        {lastSelectedCountry && !query && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
            <MapPin className="h-4 w-4 text-blue-500" />
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && filteredResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-[9999] max-h-64 overflow-y-auto">
          {filteredResults.map((country, index) => (
            <button
              key={country.code}
              onClick={() => handleCountrySelect(country)}
              className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center gap-3 border-b border-slate-100 last:border-b-0"
            >
              {country.flag && (
                <img 
                  src={country.flag} 
                  alt={`Flag of ${country.name}`}
                  className="w-6 h-4 object-cover rounded border border-slate-200"
                />
              )}
              <div className="flex-1">
                <div className="font-medium text-slate-900 text-sm">{country.name}</div>
                <div className="text-xs text-slate-500">
                  {country.region} • {country.code}
                </div>
              </div>
              <MapPin className="h-3 w-3 text-slate-400" />
            </button>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {isOpen && query.length >= 2 && filteredResults.length === 0 && !isLoading && !error && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-[9999] p-4 text-center text-slate-500 text-sm">
          No countries found for "{query}"
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-[9999] p-4 text-center text-slate-500">
          <div className="flex items-center justify-center gap-2 text-sm">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            Loading countries...
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-red-50 border border-red-200 rounded-lg shadow-lg z-[9999] p-4 text-center text-red-600 text-sm">
          <div className="font-medium">Failed to load countries</div>
          <div className="text-xs mt-1">{error}</div>
          <button 
            onClick={loadCountries}
            className="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 rounded text-xs"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
