'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchCountryByCode } from '@/lib/api/countries';
import { formatNumber, formatArea } from '@/lib/utils';
import { 
  Globe, 
  Users, 
  MapPin, 
  Flag, 
  Building2,
  Loader2,
  AlertCircle,
  Wifi,
  Clock,
  TreePine,
  BookOpen,
  Smartphone,
  Globe2,
  ArrowLeft,
  Map,
  Home
} from 'lucide-react';
import { ExternalResourcesSection } from '@/components/panels/ExternalResourcesSection';
import { CountryBreadcrumbs } from './CountryBreadcrumbs';
import { CountryMiniMap } from './CountryMiniMap';

interface CountryProfileProps {
  countryCode: string;
}

export function CountryProfile({ countryCode }: CountryProfileProps) {
  const router = useRouter();
  
  // Fetch country data from our curated dataset
  const { 
    data: country, 
    isLoading: isLoadingCountry, 
    error: countryError,
    isError: hasCountryError
  } = useQuery({
    queryKey: ['country', countryCode],
    queryFn: () => fetchCountryByCode(countryCode),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 2,
  });

  const isLoading = isLoadingCountry;

  if (countryError || hasCountryError) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mb-6 text-red-500 mx-auto" />
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Error Loading Country
          </h1>
          <p className="text-slate-600 mb-8">
            We couldn't load information for this country. Please try again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={() => {
                router.push('/country');
              }}
              className="px-6 py-3 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Back to Countries
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mb-6 text-blue-600 animate-spin mx-auto" />
          <h1 className="text-xl font-semibold text-slate-900 mb-2">
            Loading Country Profile
          </h1>
          <p className="text-slate-600">
            Fetching comprehensive country data...
          </p>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mb-6 text-yellow-500 mx-auto" />
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Country Not Found
          </h1>
          <p className="text-slate-600 mb-8">
            We couldn't find information for country code: {countryCode}
          </p>
          <button 
            onClick={() => {
              router.push('/country');
            }}
            className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Countries
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <CountryBreadcrumbs country={country} />

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={() => {
            router.push('/country');
          }}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Countries List
        </button>
        <button
          onClick={() => {
            router.push(`/?country=${country.code}`);
          }}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Map className="w-4 h-4" />
          View on Interactive Map
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Country Hero Section */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start gap-4 mb-6">
              <img 
                src={country.flag.svg} 
                alt={country.flag.alt}
                className="object-cover w-16 h-12 border rounded border-slate-200"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  {country.name}
                </h1>
                <p className="text-lg text-slate-600 mb-1">
                  {country.officialName}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    Capital: {country.capital}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {country.geography.region}, {country.continent}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-slate-900">
                  {formatNumber(country.population)}
                </div>
                <div className="text-sm text-slate-600">Population</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <MapPin className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-slate-900">
                  {formatArea(country.area)}
                </div>
                <div className="text-sm text-slate-600">Area</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <Users className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <div className="font-semibold text-slate-900">
                  {formatNumber(Math.round(country.population / country.area))}
                </div>
                <div className="text-sm text-slate-600">Density /km²</div>
              </div>
            </div>
          </div>

          {/* Wikipedia Summary */}
          {country.wikipediaSummary && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe2 className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-900">
                  About {country.name}
                </h2>
              </div>
              <p className="text-slate-700 leading-relaxed mb-4">
                {country.wikipediaSummary}
              </p>
              <div className="text-xs text-slate-500 border-t pt-2">
                Source: Wikipedia
              </div>
            </div>
          )}

          {/* Detailed Statistics Grid */}
          <div className="grid grid-cols-1 gap-6">
            {/* Additional statistics could be added here in the future */}
          </div>
        </div>

        {/* Right Column - Sidebar (1/3 width) */}
        <div className="space-y-6">
          {/* Mini Map */}
          <CountryMiniMap country={country} />

          {/* Quick Facts */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Facts</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Country Code</span>
                <span className="font-semibold font-mono">{country.code}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Region</span>
                <span className="font-semibold">{country.geography.subregion}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Landlocked</span>
                <span className="font-semibold">
                  {country.geography.landlocked ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">UN Member</span>
                <span className={`font-semibold ${
                  country.unMember ? 'text-green-600' : 'text-slate-600'
                }`}>
                  {country.unMember ? 'Yes' : 'No'}
                </span>
              </div>
              {country.callingCodes.length > 0 && (
                <div>
                  <span className="block text-slate-600 mb-1">Calling codes</span>
                  <div className="flex flex-wrap gap-1">
                    {country.callingCodes.slice(0, 3).map((code, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs font-mono bg-blue-100 text-blue-800 rounded"
                      >
                        {code}
                      </span>
                    ))}
                    {country.callingCodes.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-slate-100 rounded">
                        +{country.callingCodes.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {country.domains.length > 0 && (
                <div>
                  <span className="block text-slate-600 mb-1">Internet domains</span>
                  <div className="flex flex-wrap gap-1">
                    {country.domains.slice(0, 3).map((domain, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs font-mono bg-green-100 text-green-800 rounded"
                      >
                        {domain}
                      </span>
                    ))}
                    {country.domains.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-slate-100 rounded">
                        +{country.domains.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {country.literacyRate !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Literacy Rate</span>
                  <span className="font-semibold">{country.literacyRate.toFixed(1)}%</span>
                </div>
              )}
              {country.internetUsers !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Internet Users</span>
                  <span className="font-semibold">{country.internetUsers.toFixed(1)}%</span>
                </div>
              )}
              {country.urbanPopulation !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Urban Population</span>
                  <span className="font-semibold">{country.urbanPopulation.toFixed(1)}%</span>
                </div>
              )}
              {country.lifeExpectancy !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Life Expectancy</span>
                  <span className="font-semibold">{country.lifeExpectancy.toFixed(1)} years</span>
                </div>
              )}
              {country.co2Emissions !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">CO₂ Emissions</span>
                  <span className="font-semibold">{country.co2Emissions.toFixed(2)} t/capita</span>
                </div>
              )}
            </div>
          </div>

          {/* Languages & Culture */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Flag className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-slate-900">Culture</h3>
            </div>
            <div className="space-y-4">
              <div>
                <span className="block text-sm font-medium text-slate-700 mb-2">Languages</span>
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
                <span className="block text-sm font-medium text-slate-700 mb-2">Currencies</span>
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
              {country.timezones.length > 0 && (
                <div>
                  <span className="block text-sm font-medium text-slate-700 mb-2">Time Zones</span>
                  <div className="flex flex-wrap gap-1">
                    {country.timezones.slice(0, 4).map((timezone, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs text-purple-800 bg-purple-100 rounded"
                      >
                        {timezone}
                      </span>
                    ))}
                    {country.timezones.length > 4 && (
                      <span className="px-2 py-1 text-xs bg-slate-100 rounded">
                        +{country.timezones.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* External Resources */}
          <ExternalResourcesSection country={country} />
        </div>
      </div>
    </div>
  );
}
