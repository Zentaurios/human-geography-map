# API Documentation and Integration Guide

## REST Countries API

### Overview
- **URL**: https://restcountries.com/v3.1/
- **Cost**: Free
- **Rate Limits**: None specified
- **Best for**: Basic country information, flags, languages, currencies

### Key Endpoints
```
GET /all                          # All countries
GET /name/{name}                  # Search by name
GET /alpha/{code}                 # Get by country code
GET /region/{region}              # Get by region/continent
```

### TypeScript Interface
```typescript
interface RestCountry {
  name: {
    common: string;
    official: string;
    nativeName: Record<string, {
      official: string;
      common: string;
    }>;
  };
  cca2: string;        // 2-letter country code
  cca3: string;        // 3-letter country code
  ccn3: string;        // Numeric country code
  region: string;      // Continent
  subregion: string;   // Sub-continent
  population: number;
  area: number;
  capital: string[];
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
  borders?: string[];  // Bordering country codes
}
```

### Sample Server Action
```typescript
'use server';

export async function getCountriesByRegion(region: string) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${region}`,
      { next: { revalidate: 86400 } } // Cache for 24 hours
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch countries: ${response.status}`);
    }
    
    const countries: RestCountry[] = await response.json();
    return { success: true, data: countries };
  } catch (error) {
    console.error('Error fetching countries:', error);
    return { success: false, error: 'Failed to fetch countries' };
  }
}
```

## World Bank API

### Overview
- **URL**: https://api.worldbank.org/v2/
- **Cost**: Free
- **Rate Limits**: None specified
- **Best for**: Economic indicators, population data, development metrics

### Key Endpoints
```
GET /country              # All countries
GET /country/{code}       # Specific country
GET /country/{code}/indicator/{indicator}  # Country indicators
```

### Important Indicators
- `SP.POP.TOTL` - Total population
- `NY.GDP.MKTP.CD` - GDP (current US$)
- `NY.GDP.PCAP.CD` - GDP per capita (current US$)
- `AG.LND.TOTL.K2` - Land area (sq. km)
- `EN.POP.DNST` - Population density

### TypeScript Interface
```typescript
interface WorldBankIndicator {
  indicator: {
    id: string;
    value: string;
  };
  country: {
    id: string;
    value: string;
  };
  countryiso3code: string;
  date: string;
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
}

interface WorldBankResponse {
  page: number;
  pages: number;
  per_page: number;
  total: number;
}
```

### Sample Usage
```typescript
'use server';

export async function getCountryIndicators(countryCode: string) {
  const indicators = [
    'SP.POP.TOTL',      // Population
    'NY.GDP.MKTP.CD',   // GDP
    'NY.GDP.PCAP.CD',   // GDP per capita
  ];
  
  try {
    const promises = indicators.map(indicator =>
      fetch(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json&date=2022&per_page=1`,
        { next: { revalidate: 86400 } }
      )
    );
    
    const responses = await Promise.all(promises);
    const data = await Promise.all(responses.map(r => r.json()));
    
    return {
      success: true,
      data: data.map(([meta, values]) => values[0]).filter(Boolean)
    };
  } catch (error) {
    console.error('Error fetching World Bank data:', error);
    return { success: false, error: 'Failed to fetch economic data' };
  }
}
```

## Natural Earth Data

### Overview
- **URL**: https://www.naturalearthdata.com/
- **Format**: GeoJSON, Shapefile
- **Cost**: Free
- **Best for**: Country boundaries, physical features, geographic data

### Key Datasets
- `ne_50m_admin_0_countries.geojson` - Country boundaries (medium resolution)
- `ne_10m_admin_1_states_provinces.geojson` - Administrative divisions
- `ne_50m_rivers_lake_centerlines.geojson` - Rivers
- `ne_50m_lakes.geojson` - Lakes
- `ne_50m_ocean.geojson` - Ocean boundaries

### Sample Integration
```typescript
interface GeoFeature {
  type: 'Feature';
  properties: Record<string, any>;
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][];
  };
}

export async function loadCountryBoundaries() {
  try {
    const response = await fetch('/data/countries.geojson');
    const geoData: { features: GeoFeature[] } = await response.json();
    return { success: true, data: geoData.features };
  } catch (error) {
    return { success: false, error: 'Failed to load country boundaries' };
  }
}
```

## OpenStreetMap Nominatim

### Overview
- **URL**: https://nominatim.openstreetmap.org/
- **Cost**: Free
- **Rate Limits**: 1 request per second
- **Best for**: City data, landmark search, geocoding

### Key Endpoints
```
GET /search               # Search for places
GET /reverse             # Reverse geocoding
GET /lookup              # Lookup by OSM ID
```

### TypeScript Interface
```typescript
interface NominatimResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon?: string;
}
```

### Sample Usage
```typescript
'use server';

export async function searchCities(query: string, countryCode?: string) {
  try {
    const url = new URL('https://nominatim.openstreetmap.org/search');
    url.searchParams.set('q', query);
    url.searchParams.set('format', 'json');
    url.searchParams.set('limit', '10');
    url.searchParams.set('featureType', 'city');
    
    if (countryCode) {
      url.searchParams.set('countrycodes', countryCode);
    }
    
    const response = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'HumanGeographyMap/1.0'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    const cities: NominatimResult[] = await response.json();
    return { success: true, data: cities };
  } catch (error) {
    return { success: false, error: 'Failed to search cities' };
  }
}
```

## Data Integration Strategy

### Caching Approach
```typescript
// utils/cache.ts
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function getCachedData<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

export function setCachedData<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}
```

### Combined Data Fetching
```typescript
'use server';

export async function getCountryData(countryCode: string) {
  const cacheKey = `country-${countryCode}`;
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  try {
    const [countryInfo, economicData] = await Promise.all([
      getCountriesByCode(countryCode),
      getCountryIndicators(countryCode)
    ]);
    
    const combinedData = {
      ...countryInfo.data,
      economic: economicData.data
    };
    
    setCachedData(cacheKey, combinedData);
    return { success: true, data: combinedData };
  } catch (error) {
    return { success: false, error: 'Failed to fetch country data' };
  }
}
```

### Error Handling Strategy
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  fallback?: T;
}

export function handleApiError<T>(
  error: unknown,
  fallbackData?: T
): ApiResponse<T> {
  console.error('API Error:', error);
  
  return {
    success: false,
    error: error instanceof Error ? error.message : 'Unknown error',
    fallback: fallbackData
  };
}
```

## Implementation Checklist

### Phase 1: Basic Integration
- [ ] Set up REST Countries API server action
- [ ] Create TypeScript interfaces for country data
- [ ] Implement basic error handling
- [ ] Add simple caching mechanism

### Phase 2: Enhanced Data
- [ ] Integrate World Bank API for economic data
- [ ] Combine data sources in unified interface
- [ ] Add data validation and transformation
- [ ] Implement retry logic for failed requests

### Phase 3: Geographic Features
- [ ] Download and serve Natural Earth data
- [ ] Integrate OpenStreetMap for city search
- [ ] Add geographic feature overlays
- [ ] Optimize data loading and parsing

### Phase 4: Performance
- [ ] Implement advanced caching strategies
- [ ] Add request batching and optimization
- [ ] Monitor API usage and performance
- [ ] Add offline data fallbacks
