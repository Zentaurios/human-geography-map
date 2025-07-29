// Application state and UI types

import { Country, Continent } from './country.types';
import { GeographicFeature, GeographicFeatureType, MapViewport } from './geographic.types';

// Application state
export interface AppState {
  map: MapState;
  ui: UIState;
  data: DataState;
}

export interface MapState {
  viewport: MapViewport;
  selectedCountry: Country | null;
  hoveredCountry: string | null;
  activeContinent: Continent | 'all';
  visibleFeatures: GeographicFeatureType[];
  isInteractionEnabled: boolean;
}

export interface UIState {
  sidebarOpen: boolean;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  activePanel: PanelType;
  deviceType: 'desktop' | 'tablet' | 'mobile';
}

export interface DataState {
  countries: Record<string, Country>;
  features: GeographicFeature[];
  lastUpdated: string;
  cacheExpiry: string;
}

// Panel types
export type PanelType = 
  | 'country-details'
  | 'search'
  | 'features'
  | 'settings'
  | null;

// Component props interfaces
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface InteractiveComponentProps extends BaseComponentProps {
  onClick?: () => void;
  onHover?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

// Navigation interfaces
export interface NavigationItem {
  id: string;
  label: string;
  continent: Continent;
  icon?: string;
  shortcut?: string;
}

// Search interfaces
export interface SearchResult {
  type: 'country' | 'city' | 'feature';
  id: string;
  name: string;
  country?: string;
  coordinates: [number, number];
  relevanceScore: number;
}

export interface SearchFilters {
  type: SearchResult['type'][];
  continent: Continent | 'all';
  minPopulation?: number;
  maxPopulation?: number;
}

// Event interfaces
export interface MapEvent {
  type: 'click' | 'hover' | 'zoom' | 'pan';
  target: 'country' | 'feature' | 'background';
  data?: any;
  coordinates: [number, number];
  timestamp: number;
}

export interface CountryClickEvent extends MapEvent {
  type: 'click';
  target: 'country';
  data: {
    countryCode: string;
    countryName: string;
  };
}

// API and loading states
export interface LoadingState {
  isLoading: boolean;
  progress?: number;
  stage?: string;
  error?: string;
}

export interface APIError {
  code: string;
  message: string;
  statusCode?: number;
  retryable: boolean;
}

// Responsive design breakpoints
export interface Breakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
  largeDesktop: number;
}

// Theme and styling
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  border: string;
  hover: string;
  active: string;
}

// Configuration interfaces
export interface MapConfig {
  defaultCenter: [number, number];
  defaultZoom: number;
  minZoom: number;
  maxZoom: number;
  bounds: [[number, number], [number, number]];
  tileLayer: {
    url: string;
    attribution: string;
    maxZoom: number;
  };
}

export interface APIConfig {
  restCountriesUrl: string;
  worldBankUrl: string;
  timeout: number;
  retries: number;
  cacheTimeout: number;
}
