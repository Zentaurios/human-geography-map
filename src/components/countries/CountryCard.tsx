'use client';

import { Country } from '@/types/country.types';
import { generateCountrySlug } from '@/lib/utils/country-links';
import { formatNumber, formatCurrency, formatArea } from '@/lib/utils';
import { Users, DollarSign, MapPin, Building2, ExternalLink } from 'lucide-react';

interface CountryCardProps {
  country: Country;
  onClick: (countrySlug: string) => void;
  className?: string;
}

export function CountryCard({ country, onClick, className = '' }: CountryCardProps) {
  const countrySlug = generateCountrySlug(country.name);

  const handleClick = () => {
    onClick(countrySlug);
  };

  return (
    <div 
      className={`
        relative bg-white rounded-lg border border-slate-200 hover:border-slate-300 
        transition-all duration-200 hover:shadow-lg cursor-pointer group
        ${className}
      `}
      onClick={handleClick}
    >
      {/* Country Header with Flag */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-2">
          <img 
            src={country.flag.svg} 
            alt={country.flag.alt}
            className="object-cover w-8 h-6 border rounded border-slate-200"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
              {country.name}
            </h3>
            <p className="text-sm text-slate-500 truncate">
              {country.geography.region}
            </p>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
        </div>
        
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Building2 className="w-4 h-4" />
          <span>{country.capital}</span>
        </div>
      </div>

      {/* Country Statistics */}
      <div className="p-4 space-y-3">
        {/* Population */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600">
            <Users className="w-4 h-4" />
            <span className="text-sm">Population</span>
          </div>
          <span className="font-medium text-slate-900">
            {formatNumber(country.population)}
          </span>
        </div>

        {/* Area */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Area</span>
          </div>
          <span className="font-medium text-slate-900">
            {formatArea(country.area)}
          </span>
        </div>

        {/* GDP (if available) */}
        {country.gdp && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-600">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">GDP</span>
            </div>
            <span className="font-medium text-slate-900">
              ${formatCurrency(country.gdp)}
            </span>
          </div>
        )}

        {/* Population Density */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Density</span>
          <span className="font-medium text-slate-900">
            {formatNumber(Math.round(country.population / country.area))} /km²
          </span>
        </div>
      </div>

      {/* Continent Badge */}
      <div className="px-4 pb-4">
        <span className={`
          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${getContinentBadgeColor(country.continent)}
        `}>
          {country.continent}
        </span>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-200 rounded-lg pointer-events-none" />
    </div>
  );
}

// Helper function to get continent-specific badge colors
function getContinentBadgeColor(continent: string): string {
  const colorMap: Record<string, string> = {
    'Africa': 'bg-orange-100 text-orange-800',
    'Antarctica': 'bg-slate-100 text-slate-800',
    'Asia': 'bg-red-100 text-red-800',
    'Europe': 'bg-blue-100 text-blue-800',
    'North America': 'bg-green-100 text-green-800',
    'Oceania': 'bg-purple-100 text-purple-800',
    'South America': 'bg-yellow-100 text-yellow-800',
  };
  
  return colorMap[continent] || 'bg-slate-100 text-slate-800';
}
