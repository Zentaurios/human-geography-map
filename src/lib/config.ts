// Application configuration constants

import { MapConfig, APIConfig, Breakpoints, ThemeColors } from '@/types/app.types';
import { Continent, ContinentInfo } from '@/types/country.types';

// Map configuration
export const MAP_CONFIG: MapConfig = {
  defaultCenter: [20, 0], // Centered on Africa/Europe
  defaultZoom: 3,
  minZoom: 2,
  maxZoom: 10,
  bounds: [[-85, -180], [85, 180]], // World bounds
  tileLayer: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  },
};

// API configuration
export const API_CONFIG: APIConfig = {
  restCountriesUrl: 'https://restcountries.com/v2',
  worldBankUrl: 'https://api.worldbank.org/v2',
  timeout: 10000, // 10 seconds
  retries: 3,
  cacheTimeout: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
};

// Responsive breakpoints (in pixels)
export const BREAKPOINTS: Breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
  largeDesktop: 1920,
};

// Theme colors
export const THEME_COLORS: ThemeColors = {
  primary: '#2563eb', // Blue
  secondary: '#64748b', // Slate
  accent: '#10b981', // Emerald
  background: '#ffffff',
  surface: '#f8fafc',
  text: '#1e293b',
  border: '#e2e8f0',
  hover: '#f1f5f9',
  active: '#e2e8f0',
};

// Continent information with map centers and zoom levels
export const CONTINENT_INFO: Record<Continent, ContinentInfo> = {
  'Africa': {
    name: 'Africa',
    countries: [], // Will be populated from API data
    center: [0, 20],
    zoom: 4,
  },
  'Antarctica': {
    name: 'Antarctica',
    countries: [], // Will be populated from API data
    center: [-80, 0],
    zoom: 3,
  },
  'Asia': {
    name: 'Asia',
    countries: [], // Will be populated from API data
    center: [35, 100],
    zoom: 3,
  },
  'Europe': {
    name: 'Europe',
    countries: [], // Will be populated from API data
    center: [55, 25],
    zoom: 4,
  },
  'North America': {
    name: 'North America',
    countries: [], // Will be populated from API data
    center: [45, -100],
    zoom: 3,
  },
  'Oceania': {
    name: 'Oceania',
    countries: [], // Will be populated from API data
    center: [-25, 140],
    zoom: 4,
  },
  'South America': {
    name: 'South America',
    countries: [], // Will be populated from API data
    center: [-15, -60],
    zoom: 4,
  },
};

// Feature layer styling
export const FEATURE_STYLES = {
  mountain: {
    color: '#8b5cf6',
    strokeWidth: 2,
    opacity: 0.8,
    zIndex: 3,
  },
  mountain_range: {
    color: '#7c3aed',
    strokeWidth: 3,
    opacity: 0.7,
    zIndex: 3,
  },
  river: {
    color: '#06b6d4',
    strokeWidth: 2,
    opacity: 0.8,
    zIndex: 2,
  },
  lake: {
    color: '#0ea5e9',
    strokeWidth: 1,
    opacity: 0.6,
    zIndex: 1,
  },
  sea: {
    color: '#0284c7',
    strokeWidth: 1,
    opacity: 0.5,
    zIndex: 1,
  },
  ocean: {
    color: '#0369a1',
    strokeWidth: 1,
    opacity: 0.4,
    zIndex: 1,
  },
  desert: {
    color: '#f59e0b',
    strokeWidth: 1,
    opacity: 0.6,
    zIndex: 2,
  },
  forest: {
    color: '#10b981',
    strokeWidth: 1,
    opacity: 0.6,
    zIndex: 2,
  },
  island: {
    color: '#84cc16',
    strokeWidth: 2,
    opacity: 0.7,
    zIndex: 2,
  },
  peninsula: {
    color: '#eab308',
    strokeWidth: 2,
    opacity: 0.7,
    zIndex: 2,
  },
  gulf: {
    color: '#0891b2',
    strokeWidth: 2,
    opacity: 0.6,
    zIndex: 1,
  },
  strait: {
    color: '#0e7490',
    strokeWidth: 2,
    opacity: 0.8,
    zIndex: 2,
  },
} as const;

// Animation durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  panel: 400,
  map: 600,
} as const;

// Z-index layers
export const Z_INDEX = {
  background: 0,
  map: 1,
  features: 10,
  countries: 20,
  selectedCountry: 30,
  ui: 100,
  modal: 1000,
  tooltip: 2000,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  selectedContinent: 'hgm_selected_continent',
  mapViewport: 'hgm_map_viewport',
  featureVisibility: 'hgm_feature_visibility',
  userPreferences: 'hgm_user_preferences',
  apiCache: 'hgm_api_cache',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  countries: {
    all: '/all',
    byCode: (code: string) => `/alpha/${code}`,
    byName: (name: string) => `/name/${name}`,
    byRegion: (region: string) => `/region/${region}`,
  },
  worldBank: {
    countries: '/country',
    indicators: '/indicator',
    gdp: (countryCode: string) => `/country/${countryCode}/indicator/NY.GDP.MKTP.CD`,
    population: (countryCode: string) => `/country/${countryCode}/indicator/SP.POP.TOTL`,
  },
} as const;

// Default query options for React Query
export const QUERY_CONFIG = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 30 * 60 * 1000, // 30 minutes
  retry: 3,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
} as const;

// Feature categories for filtering
export const FEATURE_CATEGORIES = {
  'Water Bodies': ['river', 'lake', 'sea', 'ocean', 'gulf', 'strait'],
  'Land Forms': ['mountain', 'mountain_range', 'desert', 'forest', 'island', 'peninsula'],
} as const;

// Search configuration
export const SEARCH_CONFIG = {
  debounceMs: 300,
  minQueryLength: 2,
  maxResults: 10,
  highlightClass: 'bg-yellow-200',
} as const;
