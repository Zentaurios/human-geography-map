'use client';

import { ContinentNavigation } from '@/components/navigation/ContinentNavigation';
import { CountrySearch } from '@/components/search/CountrySearch';
import { Continent } from '@/types/country.types';

interface AppNavigationProps {
  selectedContinent: Continent | 'all';
  onContinentChange: (continent: Continent | 'all') => void;
  onCountrySelect: (countryCode: string, countryName: string) => void;
  onContinentSelect: (continent: Continent | 'all') => void;
}

export function AppNavigation({
  selectedContinent,
  onContinentChange,
  onCountrySelect,
  onContinentSelect,
}: AppNavigationProps) {
  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Desktop navigation */}
        <div className="items-center hidden gap-6 py-4 md:flex">
          <div className="flex-1 max-w-md">
            <CountrySearch
              onCountrySelect={onCountrySelect}
              onContinentSelect={onContinentSelect}
            />
          </div>
          <div className="flex-2 max-w-2xl">
            <ContinentNavigation
              selectedContinent={selectedContinent}
              onContinentChange={onContinentChange}
            />
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="py-4 space-y-3 md:hidden">
          <CountrySearch
            onCountrySelect={onCountrySelect}
            onContinentSelect={onContinentSelect}
          />
          <ContinentNavigation
            selectedContinent={selectedContinent}
            onContinentChange={onContinentChange}
          />
        </div>
      </div>
    </div>
  );
}
