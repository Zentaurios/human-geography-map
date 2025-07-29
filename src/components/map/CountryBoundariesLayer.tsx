'use client';

import { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import { useQuery } from '@tanstack/react-query';
import { Continent } from '@/types/country.types';
import { LeafletMouseEvent } from 'leaflet';
import L from 'leaflet';

interface CountryBoundariesLayerProps {
  selectedContinent: Continent | 'all';
  onCountryClick?: (countryCode: string, countryName: string, event: LeafletMouseEvent) => void;
  onCountryHover?: (countryCode: string | null, countryName?: string) => void;
  selectedCountry?: string | null;
}

interface SimpleCountry {
  name: string;
  code: string;
  region: string;
  latlng: [number, number];
  capital?: string;
  population?: number;
}

// Fetch simplified country data with coordinates
async function fetchSimpleCountries(): Promise<SimpleCountry[]> {
  try {
    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,cca2,region,latlng,capital,population'
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    
    const countries = await response.json();
    
    return countries
      .filter((country: any) => country.latlng && country.latlng.length === 2)
      .map((country: any) => ({
        name: country.name.common,
        code: country.cca2,
        region: country.region,
        latlng: [country.latlng[0], country.latlng[1]] as [number, number],
        capital: country.capital?.[0],
        population: country.population,
      }));
  } catch (error) {
    console.error('Failed to fetch countries:', error);
    return [];
  }
}

// Simple continent mapping
const continentRegionMap: Record<Continent, string[]> = {
  'Europe': ['Europe'],
  'Asia': ['Asia'],
  'Africa': ['Africa'],
  'North America': ['Americas'],
  'South America': ['Americas'],
  'Oceania': ['Oceania'],
  'Antarctica': ['Antarctic'],
};

export function CountryBoundariesLayer({
  selectedContinent,
  onCountryClick,
  onCountryHover,
  selectedCountry,
}: CountryBoundariesLayerProps) {
  const map = useMap();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // Fetch country data
  const { data: countries = [], isLoading } = useQuery({
    queryKey: ['simple-countries'],
    queryFn: fetchSimpleCountries,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  // **NEW: Center map on selected country**
  useEffect(() => {
    if (selectedCountry && countries.length > 0) {
      const country = countries.find(c => c.code === selectedCountry);
      if (country) {
        // Center the map on the selected country with a nice zoom level
        map.flyTo(country.latlng, 6, {
          animate: true,
          duration: 1.5,
        });
        
        console.log(`🗺️ Map centered on ${country.name} (${country.code})`);
      }
    }
  }, [selectedCountry, countries, map]);

  // Filter countries based on selected continent
  const filteredCountries = selectedContinent === 'all' 
    ? countries
    : countries.filter(country => {
        const regionMappings = continentRegionMap[selectedContinent] || [];
        return regionMappings.some(region => 
          country.region.toLowerCase().includes(region.toLowerCase()) ||
          region.toLowerCase().includes(country.region.toLowerCase())
        );
      });

  // Create custom icons for different states
  const createCountryIcon = (isSelected: boolean, isHovered: boolean) => {
    const color = isSelected ? '#3b82f6' : isHovered ? '#60a5fa' : '#8b5cf6';
    const size = isSelected ? 14 : isHovered ? 10 : 8;
    
    return L.divIcon({
      html: `<div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        ${isSelected ? 'box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);' : ''}
      "></div>`,
      className: 'custom-country-marker',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      {filteredCountries.map((country) => {
        const isSelected = country.code === selectedCountry;
        const isHovered = country.code === hoveredCountry;
        
        return (
          <Marker
            key={country.code}
            position={country.latlng}
            icon={createCountryIcon(isSelected, isHovered)}
            eventHandlers={{
              click: (event) => {
                if (onCountryClick) {
                  onCountryClick(country.code, country.name, event as LeafletMouseEvent);
                }
              },
              mouseover: () => {
                setHoveredCountry(country.code);
                if (onCountryHover) {
                  onCountryHover(country.code, country.name);
                }
              },
              mouseout: () => {
                setHoveredCountry(null);
                if (onCountryHover) {
                  onCountryHover(null);
                }
              },
            }}
          >
            <Popup>
              <div className="text-sm">
                <div className="font-semibold text-slate-900">{country.name}</div>
                {country.capital && (
                  <div className="text-slate-600">Capital: {country.capital}</div>
                )}
                {country.population && (
                  <div className="text-slate-600">
                    Population: {country.population.toLocaleString()}
                  </div>
                )}
                <div className="text-slate-500 text-xs mt-1">{country.region}</div>
                {isSelected && (
                  <div className="text-blue-600 text-xs mt-1 font-medium">
                    ✓ Selected
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
