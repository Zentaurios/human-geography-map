// Country data types based on REST Countries API and World Bank API

// External links interfaces for country resources
export interface OfficialLinks {
  government: string;
  tourism: string;
  wikipedia: string;
}

export interface EducationLinks {
  universities: string[];
  unesco: string[];
  museums: string[];
}

export interface EconomyLinks {
  chamberOfCommerce: string;
  worldBank: string;
  tradingEconomics: string;
}

export interface InternationalLinks {
  embassy: string;
  unProfile: string;
}

export interface ExternalResources {
  official: OfficialLinks;
  education: EducationLinks;
  economy: EconomyLinks;
  international: InternationalLinks;
}

export interface Country {
  code: string;          // ISO country code (e.g., "US", "FR")
  name: string;          // Common name (e.g., "United States")
  officialName: string;  // Official name
  continent: string;     // Continent
  population: number;    // Current population
  gdp?: number;          // GDP in USD (optional, from World Bank)
  gdpPerCapita?: number; // GDP per capita (optional, from World Bank)
  area: number;          // Area in km²
  capital: string;       // Capital city
  languages: string[];   // Official languages
  currencies: string[];  // Currencies
  flag: {
    svg: string;         // SVG flag URL
    png: string;         // PNG flag URL
    alt: string;         // Alt text for flag
  };
  geography: CountryGeography;
  subdivisions?: AdminDivision[]; // States/provinces (optional)
  
  // Enhanced REST Countries data
  timezones: string[];   // Time zones (e.g., ["UTC-5", "UTC-4"])
  callingCodes: string[]; // Calling codes (e.g., ["+1", "+44"])
  domains: string[];     // Internet domains (e.g., [".us", ".gov"])
  governmentType?: string; // Government type/system
  independenceDate?: string; // Independence date (ISO format)
  unMember: boolean;     // UN membership status
  
  // Enhanced World Bank data
  lifeExpectancy?: number;   // Life expectancy at birth
  literacyRate?: number;     // Adult literacy rate (%)
  internetUsers?: number;    // Internet users (% of population)
  urbanPopulation?: number;  // Urban population (% of total)
  co2Emissions?: number;     // CO2 emissions (metric tons per capita)
  
  // Wikipedia integration
  wikipediaSummary?: string; // Wikipedia summary/extract
}

export interface CountryGeography {
  coordinates: [number, number]; // [lat, lng] - country center
  borders: string[];            // Bordering countries (country codes)
  coastline?: number;           // Coastline length in km
  elevation?: {
    highest: number;            // Highest point in meters
    lowest: number;             // Lowest point in meters
  };
  landlocked: boolean;          // Whether country is landlocked
  region: string;               // Geographic region
  subregion: string;            // Geographic subregion
}

export interface AdminDivision {
  id: string;
  name: string;
  type: 'state' | 'province' | 'region' | 'territory' | 'department';
  capital?: string;
  population?: number;
  area?: number;
  coordinates: [number, number];
}

// API response types
export interface RestCountriesResponse {
  name: {
    common: string;
    official: string;
  };
  cca2: string;                 // 2-letter country code
  cca3: string;                 // 3-letter country code
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  area: number;
  languages: Record<string, string>;
  currencies: Record<string, {
    name: string;
    symbol: string;
  }>;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  latlng: [number, number];
  borders?: string[];
  landlocked: boolean;
  
  // Enhanced fields from REST Countries API
  timezones: string[];          // Time zones
  idd: {                        // International dialing info
    root?: string;
    suffixes?: string[];
  };
  tld: string[];                // Top level domains
  status: string;               // Country status
  unMember: boolean;            // UN membership
  independent?: boolean;        // Independence status
  startOfWeek: string;          // Start of week
}

export interface WorldBankResponse {
  country: {
    id: string;
    value: string;
  };
  indicator: {
    id: string;
    value: string;
  };
  date: string;
  value: number | null;
}

// UI state types
export interface CountrySelectionState {
  selectedCountry: Country | null;
  hoveredCountry: string | null;
  isLoading: boolean;
  error: string | null;
}

// Continent types
export type Continent = 
  | 'Africa'
  | 'Antarctica' 
  | 'Asia'
  | 'Europe'
  | 'North America'
  | 'Oceania'
  | 'South America';

export interface ContinentInfo {
  name: Continent;
  countries: string[];       // Country codes
  center: [number, number];  // Map center coordinates
  zoom: number;              // Default zoom level
}
