'use client';

import { useState, createContext, useContext, useEffect } from 'react';
import { AppHeader } from './AppHeader';
import { Continent } from '@/types/country.types';
import { LeafletMouseEvent } from 'leaflet';

interface AppStateContextType {
  selectedContinent: Continent | 'all';
  selectedCountry: string | null;
  setSelectedContinent: (continent: Continent | 'all') => void;
  setSelectedCountry: (countryCode: string | null) => void;
  handleContinentChange: (continent: Continent | 'all') => void;
  handleCountryClick: (countryCode: string, countryName: string, event?: LeafletMouseEvent) => void;
  handleSearchCountrySelect: (countryCode: string, countryName: string) => void;
  handleSearchContinentSelect: (continent: Continent | 'all') => void;
}

const AppStateContext = createContext<AppStateContextType | null>(null);

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
}

interface AppLayoutWrapperProps {
  children: React.ReactNode;
}

// Map country codes to continents for auto-switching
const countryToContinentMap: Record<string, Continent> = {
  // Europe
  'GB': 'Europe', 'FR': 'Europe', 'DE': 'Europe', 'IT': 'Europe', 'ES': 'Europe',
  'RU': 'Europe', 'PL': 'Europe', 'NL': 'Europe', 'BE': 'Europe', 'CH': 'Europe',
  'AT': 'Europe', 'SE': 'Europe', 'NO': 'Europe', 'DK': 'Europe', 'FI': 'Europe',
  'IE': 'Europe', 'PT': 'Europe', 'GR': 'Europe', 'CZ': 'Europe', 'HU': 'Europe',
  
  // Asia
  'CN': 'Asia', 'IN': 'Asia', 'JP': 'Asia', 'KR': 'Asia', 'ID': 'Asia',
  'TH': 'Asia', 'VN': 'Asia', 'PH': 'Asia', 'MY': 'Asia', 'SG': 'Asia',
  'TW': 'Asia', 'HK': 'Asia', 'MO': 'Asia', 'MN': 'Asia', 'KZ': 'Asia',
  'UZ': 'Asia', 'AF': 'Asia', 'PK': 'Asia', 'BD': 'Asia', 'LK': 'Asia',
  'MM': 'Asia', 'LA': 'Asia', 'KH': 'Asia', 'BN': 'Asia', 'TL': 'Asia',
  
  // North America
  'US': 'North America', 'CA': 'North America', 'MX': 'North America',
  'GT': 'North America', 'BZ': 'North America', 'SV': 'North America',
  'HN': 'North America', 'NI': 'North America', 'CR': 'North America',
  'PA': 'North America', 'CU': 'North America', 'JM': 'North America',
  'HT': 'North America', 'DO': 'North America',
  
  // South America
  'BR': 'South America', 'AR': 'South America', 'CL': 'South America',
  'PE': 'South America', 'CO': 'South America', 'VE': 'South America',
  'EC': 'South America', 'BO': 'South America', 'PY': 'South America',
  'UY': 'South America', 'GY': 'South America', 'SR': 'South America',
  'GF': 'South America',
  
  // Africa
  'NG': 'Africa', 'ET': 'Africa', 'EG': 'Africa', 'ZA': 'Africa', 'KE': 'Africa',
  'UG': 'Africa', 'DZ': 'Africa', 'SD': 'Africa', 'MA': 'Africa', 'AO': 'Africa',
  'GH': 'Africa', 'MZ': 'Africa', 'MG': 'Africa', 'CM': 'Africa', 'CI': 'Africa',
  'NE': 'Africa', 'BF': 'Africa', 'ML': 'Africa', 'MW': 'Africa', 'ZM': 'Africa',
  'SN': 'Africa', 'SO': 'Africa', 'TD': 'Africa', 'ZW': 'Africa', 'BJ': 'Africa',
  'RW': 'Africa', 'TN': 'Africa', 'BI': 'Africa', 'GN': 'Africa', 'SS': 'Africa',
  'LY': 'Africa', 'LR': 'Africa', 'CF': 'Africa', 'MR': 'Africa', 'ER': 'Africa',
  'GM': 'Africa', 'BW': 'Africa', 'GA': 'Africa', 'LS': 'Africa', 'GW': 'Africa',
  'GQ': 'Africa', 'MU': 'Africa', 'SZ': 'Africa', 'DJ': 'Africa', 'KM': 'Africa',
  'CV': 'Africa', 'ST': 'Africa', 'SC': 'Africa',
  
  // Oceania
  'AU': 'Oceania', 'NZ': 'Oceania', 'PG': 'Oceania', 'FJ': 'Oceania',
  'SB': 'Oceania', 'NC': 'Oceania', 'PF': 'Oceania', 'VU': 'Oceania',
  'WS': 'Oceania', 'KI': 'Oceania', 'FM': 'Oceania', 'TO': 'Oceania',
  'MH': 'Oceania', 'PW': 'Oceania', 'CK': 'Oceania', 'NU': 'Oceania',
  'TK': 'Oceania', 'TV': 'Oceania', 'NR': 'Oceania',
};

export function AppLayoutWrapper({ children }: AppLayoutWrapperProps) {
  const [selectedContinent, setSelectedContinent] = useState<Continent | 'all'>('all');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  
  const handleContinentChange = (continent: Continent | 'all') => {
    setSelectedContinent(continent);
    setSelectedCountry(null);
  };
  
  const handleCountryClick = (countryCode: string, countryName: string, event?: LeafletMouseEvent) => {
    setSelectedCountry(countryCode);
    console.log('Country clicked:', countryCode, countryName);
  };
  
  const handleSearchCountrySelect = (countryCode: string, countryName: string) => {
    setSelectedCountry(countryCode);
    
    // **NEW: Auto-switch to the appropriate continent**
    const continent = countryToContinentMap[countryCode.toUpperCase()];
    if (continent && continent !== selectedContinent) {
      setSelectedContinent(continent);
      console.log(`🌍 Auto-switched to ${continent} continent for ${countryName}`);
    }
    
    console.log(`🔍 Country selected from search: ${countryName} (${countryCode})`);
  };
  
  const handleSearchContinentSelect = (continent: Continent | 'all') => {
    setSelectedContinent(continent);
    setSelectedCountry(null);
  };

  const contextValue: AppStateContextType = {
    selectedContinent,
    selectedCountry,
    setSelectedContinent,
    setSelectedCountry,
    handleContinentChange,
    handleCountryClick,
    handleSearchCountrySelect,
    handleSearchContinentSelect,
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      <div className="min-h-screen bg-slate-50">
        <AppHeader />
        {children}
      </div>
    </AppStateContext.Provider>
  );
}
