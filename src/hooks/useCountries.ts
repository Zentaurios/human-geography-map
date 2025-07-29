'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { fetchAllCountries, fetchCountryByCode } from '@/lib/api/countries';
import { Country, Continent } from '@/types/country.types';
import { QUERY_CONFIG } from '@/lib/config';

// Hook for fetching all countries
export function useCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchAllCountries,
    staleTime: QUERY_CONFIG.staleTime,
    gcTime: QUERY_CONFIG.cacheTime,
    retry: QUERY_CONFIG.retry,
    retryDelay: QUERY_CONFIG.retryDelay,
  });
}

// Hook for fetching a specific country
export function useCountry(countryCode: string | null) {
  return useQuery({
    queryKey: ['country', countryCode],
    queryFn: () => countryCode ? fetchCountryByCode(countryCode) : null,
    enabled: !!countryCode,
    staleTime: QUERY_CONFIG.staleTime,
    gcTime: QUERY_CONFIG.cacheTime,
    retry: QUERY_CONFIG.retry,
    retryDelay: QUERY_CONFIG.retryDelay,
  });
}

// Hook for continent-specific functionality
export function useContinent(selectedContinent: Continent | 'all') {
  const { data: countries, isLoading, error } = useCountries();
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  useEffect(() => {
    if (!countries) {
      setFilteredCountries([]);
      return;
    }

    if (selectedContinent === 'all') {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(
        country => country.continent === selectedContinent
      );
      setFilteredCountries(filtered);
    }
  }, [countries, selectedContinent]);

  return {
    countries: filteredCountries,
    allCountries: countries || [],
    isLoading,
    error,
    totalCountries: filteredCountries.length,
  };
}

// Hook for search functionality (placeholder for Phase 2)
export function useCountrySearch(query: string) {
  const { data: countries } = useCountries();
  const [searchResults, setSearchResults] = useState<Country[]>([]);

  useEffect(() => {
    if (!countries || !query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(query.toLowerCase()) ||
      country.officialName.toLowerCase().includes(query.toLowerCase()) ||
      country.code.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filtered.slice(0, 10)); // Limit to 10 results
  }, [countries, query]);

  return {
    results: searchResults,
    isSearching: query.length >= 2,
    hasResults: searchResults.length > 0,
  };
}

// Hook for managing map state
export function useMapState() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedContinent, setSelectedContinent] = useState<Continent | 'all'>('all');

  const handleCountryClick = (countryCode: string) => {
    setSelectedCountry(prevSelected => 
      prevSelected === countryCode ? null : countryCode
    );
  };

  const handleCountryHover = (countryCode: string | null) => {
    setHoveredCountry(countryCode);
  };

  const handleContinentChange = (continent: Continent | 'all') => {
    setSelectedContinent(continent);
    setSelectedCountry(null); // Clear country selection when changing continent
  };

  const clearSelection = () => {
    setSelectedCountry(null);
    setHoveredCountry(null);
  };

  return {
    selectedCountry,
    hoveredCountry,
    selectedContinent,
    handleCountryClick,
    handleCountryHover,
    handleContinentChange,
    clearSelection,
  };
}

// Hook for device detection
export function useDevice() {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  return {
    deviceType,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
  };
}
