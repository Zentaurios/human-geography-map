'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Country } from '@/types/country.types';
import { fetchCountryByCode } from '@/lib/api/countries';
import { formatNumber, formatCurrency, formatArea } from '@/lib/utils';
import { 
  Globe, 
  Users, 
  DollarSign, 
  MapPin, 
  Flag, 
  Building2,
  TrendingUp,
  Loader2,
  AlertCircle,
  Wifi,
  Clock,
  TreePine,
  BookOpen,
  Smartphone,
  Globe2
} from 'lucide-react';
import { ExternalResourcesSection } from './ExternalResourcesSection';
import { generateCountrySlug } from '@/lib/utils/country-links';

interface CountryDetailPanelProps {
  countryCode: string | null;
  className?: string;
  onClose?: () => void;
}

export function CountryDetailPanel({ 
  countryCode, 
  className = '',
  onClose 
}: CountryDetailPanelProps) {
  // Fetch country data from our curated dataset
  const { 
    data: country, 
    isLoading: isLoadingCountry, 
    error: countryError,
    isError: hasCountryError
  } = useQuery({
    queryKey: ['country', countryCode],
    queryFn: () => countryCode ? fetchCountryByCode(countryCode) : null,
    enabled: !!countryCode,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 3, // Retry failed requests 3 times (increased from 2)
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  // Our curated dataset already includes all necessary data
  const economicData: any = null;
  const isLoadingEconomic = false;

  const isLoading = isLoadingCountry || isLoadingEconomic;

  if (!countryCode) {
    return (
      <div className={`flex flex-col h-full ${className}`}>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Welcome
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-slate-600">
              Explore world geography through our interactive map.
            </p>
            <div className="space-y-2 text-sm text-slate-500">
              <p>• Click countries for detailed information</p>
              <p>• Use continent tabs to focus on regions</p>
              <p>• Zoom and pan to explore</p>
            </div>

          </CardContent>
        </Card>
      </div>
    );
  }

  if (countryError || hasCountryError) {
    return (
      <div className={`flex flex-col h-full ${className}`}>
        <Card className="flex-1">
          <CardContent className="flex flex-col items-center justify-center h-full text-center">
            <AlertCircle className="w-12 h-12 mb-4 text-red-500" />
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              Error Loading Country
            </h3>
            <p className="mb-4 text-slate-600">
              We couldn't load information for this country. Please try again.
            </p>
            {onClose && (
              <button 
                onClick={onClose}
                className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`flex flex-col h-full ${className}`}>
        <Card className="flex-1">
          <CardContent className="flex flex-col items-center justify-center h-full">
            <Loader2 className="w-8 h-8 mb-4 text-blue-600 animate-spin" />
            <p className="text-slate-600">Loading country information...</p>
            <p className="mt-2 text-xs text-slate-500">
              {countryCode && ['US', 'CA', 'FR', 'DE', 'GB', 'CN', 'JP', 'BR', 'AU', 'IN'].includes(countryCode.toUpperCase()) 
                ? 'Using curated data' 
                : 'Fetching from external API'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!country) {
    return (
      <div className={`flex flex-col h-full ${className}`}>
        <Card className="flex-1">
          <CardContent className="flex flex-col items-center justify-center h-full text-center">
            <AlertCircle className="w-12 h-12 mb-4 text-yellow-500" />
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              Country Not Found
            </h3>
            <p className="mb-4 text-slate-600">
              We couldn't find information for country code: {countryCode}
            </p>
            {onClose && (
              <button 
                onClick={onClose}
                className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full space-y-4 ${className}`}>
      {/* Country Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={country.flag.svg} 
                alt={country.flag.alt}
                className="object-cover w-8 h-6 border rounded border-slate-200"
              />
              <div>
                <CardTitle className="text-xl">{country.name}</CardTitle>
                <p className="text-sm text-slate-600">{country.geography.region}</p>
              </div>
            </div>
            {onClose && (
              <button 
                onClick={onClose}
                className="p-1 transition-colors text-slate-400 hover:text-slate-600 lg:hidden"
              >
                ×
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-500" />
              <span className="text-slate-600">Capital:</span>
              <span className="font-medium">{country.capital}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span className="text-slate-600">Region:</span>
              <span className="font-medium">{country.geography.subregion}</span>
            </div>
          </div>
          
          {/* View Full Country Profile Button */}
          <button
            onClick={() => {
              const countrySlug = generateCountrySlug(country.name);
              // Note: This will be handled by the parent component's router
              window.location.href = `/country/${countrySlug}`;
            }}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Globe className="w-4 h-4" />
            View Full Country Profile
            <span className="ml-1">→</span>
          </button>
        </CardContent>
      </Card>

      {/* Demographics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="w-5 h-5" />
            Demographics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Population</span>
            <span className="font-semibold">{formatNumber(country.population)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Area</span>
            <span className="font-semibold">{formatArea(country.area)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Density</span>
            <span className="font-semibold">
              {formatNumber(Math.round(country.population / country.area))} /km²
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Infrastructure */}
      {(country.internetUsers || country.urbanPopulation || country.callingCodes.length > 0 || country.domains.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wifi className="w-5 h-5" />
              Infrastructure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {country.internetUsers !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Internet users</span>
                <span className="font-semibold">{country.internetUsers.toFixed(1)}%</span>
              </div>
            )}
            {country.urbanPopulation !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Urban population</span>
                <span className="font-semibold">{country.urbanPopulation.toFixed(1)}%</span>
              </div>
            )}
            {country.callingCodes.length > 0 && (
              <div>
                <span className="block mb-1 text-slate-600">Calling codes</span>
                <div className="flex flex-wrap gap-1">
                  {country.callingCodes.slice(0, 3).map((code, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 font-mono text-xs text-blue-800 bg-blue-100 rounded"
                    >
                      {code}
                    </span>
                  ))}
                  {country.callingCodes.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded bg-slate-100">
                      +{country.callingCodes.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
            {country.domains.length > 0 && (
              <div>
                <span className="block mb-1 text-slate-600">Internet domains</span>
                <div className="flex flex-wrap gap-1">
                  {country.domains.slice(0, 3).map((domain, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 font-mono text-xs text-green-800 bg-green-100 rounded"
                    >
                      {domain}
                    </span>
                  ))}
                  {country.domains.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded bg-slate-100">
                      +{country.domains.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Development */}
      {(country.lifeExpectancy || country.literacyRate || country.unMember) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="w-5 h-5" />
              Development
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {country.lifeExpectancy !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Life expectancy</span>
                <span className="font-semibold">{country.lifeExpectancy.toFixed(1)} years</span>
              </div>
            )}
            {country.literacyRate !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Literacy rate</span>
                <span className="font-semibold">{country.literacyRate.toFixed(1)}%</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-slate-600">UN member</span>
              <span className={`font-semibold ${
                country.unMember ? 'text-green-600' : 'text-slate-600'
              }`}>
                {country.unMember ? 'Yes' : 'No'}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Environment */}
      {(country.timezones.length > 0 || country.co2Emissions !== undefined) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TreePine className="w-5 h-5" />
              Environment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {country.timezones.length > 0 && (
              <div>
                <span className="block mb-1 text-slate-600">Time zones</span>
                <div className="flex flex-wrap gap-1">
                  {country.timezones.slice(0, 4).map((timezone, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 font-mono text-xs text-purple-800 bg-purple-100 rounded"
                    >
                      {timezone}
                    </span>
                  ))}
                  {country.timezones.length > 4 && (
                    <span className="px-2 py-1 text-xs rounded bg-slate-100">
                      +{country.timezones.length - 4}
                    </span>
                  )}
                </div>
              </div>
            )}
            {country.co2Emissions !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-slate-600">CO₂ emissions</span>
                <span className="font-semibold">
                  {country.co2Emissions.toFixed(2)} t/capita
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Wikipedia Summary */}
      {country.wikipediaSummary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe2 className="w-5 h-5" />
              About {country.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-slate-700">
              {country.wikipediaSummary}
            </p>
            <div className="pt-2 mt-3 text-xs border-t text-slate-500">
              Source: Wikipedia
            </div>
          </CardContent>
        </Card>
      )}

      {/* Economic Data */}
      {economicData && Object.keys(economicData).length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5" />
              Economy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {economicData.gdp && (
              <div className="flex items-center justify-between">
                <span className="text-slate-600">GDP</span>
                <span className="font-semibold">{formatCurrency(economicData.gdp)}</span>
              </div>
            )}
            {economicData.gdpPerCapita && (
              <div className="flex items-center justify-between">
                <span className="text-slate-600">GDP per capita</span>
                <span className="font-semibold">{formatCurrency(economicData.gdpPerCapita)}</span>
              </div>
            )}
            {economicData.gdpGrowth !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-slate-600">GDP Growth</span>
                <span className={`font-semibold ${
                  economicData.gdpGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {economicData.gdpGrowth >= 0 ? '+' : ''}{economicData.gdpGrowth.toFixed(1)}%
                </span>
              </div>
            )}
            {economicData.unemployment !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Unemployment</span>
                <span className="font-semibold">{economicData.unemployment.toFixed(1)}%</span>
              </div>
            )}
            <div className="pt-2 text-xs border-t text-slate-500">
              Economic data from World Bank ({economicData.year || 'Latest available'})
            </div>
          </CardContent>
        </Card>
      )}

      {/* Geography & Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Globe className="w-5 h-5" />
            Geography
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Coordinates</span>
            <span className="font-mono text-sm">
              {country.geography.coordinates[0].toFixed(2)}°, {country.geography.coordinates[1].toFixed(2)}°
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Landlocked</span>
            <span className="font-semibold">
              {country.geography.landlocked ? 'Yes' : 'No'}
            </span>
          </div>
          {country.geography.borders.length > 0 && (
            <div>
              <span className="block mb-1 text-slate-600">Borders</span>
              <div className="flex flex-wrap gap-1">
                {country.geography.borders.slice(0, 6).map((border) => (
                  <span 
                    key={border}
                    className="px-2 py-1 text-xs rounded bg-slate-100"
                  >
                    {border}
                  </span>
                ))}
                {country.geography.borders.length > 6 && (
                  <span className="px-2 py-1 text-xs rounded bg-slate-100">
                    +{country.geography.borders.length - 6}
                  </span>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Languages & Culture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Flag className="w-5 h-5" />
            Culture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <span className="block mb-1 text-slate-600">Languages</span>
            <div className="flex flex-wrap gap-1">
              {country.languages.map((language) => (
                <span 
                  key={language}
                  className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="block mb-1 text-slate-600">Currencies</span>
            <div className="flex flex-wrap gap-1">
              {country.currencies.map((currency) => (
                <span 
                  key={currency}
                  className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded"
                >
                  {currency}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* External Resources */}
      <ExternalResourcesSection country={country} />
    </div>
  );
}
