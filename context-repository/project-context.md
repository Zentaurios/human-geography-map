# Human Geography Map - Project Context

## Project Overview
An interactive world geography reference application that provides comprehensive country information, geographic features, and educational content through an intuitive map interface.

## Core Objectives
- **Interactive Learning**: Enable users to explore world geography through an engaging map interface
- **Comprehensive Data**: Provide detailed country statistics, geographic features, and cultural information
- **Responsive Design**: Seamless experience across desktop and mobile devices
- **Real-time Data**: Integration with multiple APIs for current and accurate information

## Technical Architecture

### Frontend Stack
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Authentication**: Server Actions
- **Mapping**: React-Leaflet with OpenStreetMap

### Data Sources
- **REST Countries API**: Country basic data and flags
- **World Bank API**: Economic indicators (GDP, population, etc.)
- **Natural Earth Data**: Geographic boundaries and physical features
- **OpenStreetMap Nominatim**: Cities and landmarks

## Feature Requirements

### Core Features
1. **Interactive World Map**
   - Continent-based navigation (tabs on desktop, dropdown on mobile)
   - Clickable countries and cities
   - Hybrid geographic layer system (Phase 3)

2. **Hybrid Layer System Design** (Phase 3)
   - **Base Layers** (Exclusive selection):
     - Political Boundaries: Country borders and territories
     - Terrain View: Elevation shading and topographic features
     - Economic Overlay: Countries colored by economic indicators
   - **Feature Layers** (Combinable overlays):
     - Mountain Ranges & Peaks with elevation data
     - Water Bodies (rivers, lakes, seas)
     - Cities & Capitals with population-based sizing
     - Administrative Divisions (states/provinces)
     - Points of Interest (landmarks, natural features)
   - **Smart Performance**: Progressive loading based on zoom level and active layers

3. **Country Detail View**
   - Population statistics
   - Economic indicators (GDP, GDP per capita)
   - Cultural importance metrics
   - Geographic information
   - Administrative divisions (states/provinces)

4. **Responsive Layout**
   - Desktop: Map with right sidebar for details
   - Mobile: Map above, information panel below
   - Smooth transitions between views

### User Interactions
- **Click/Tap Country**: Isolate country on map, show detailed information
- **Continent Navigation**: Filter map view by continent
- **Search Functionality**: Find specific countries or cities
- **Zoom Controls**: Navigate map at different scales

## Data Models

### Country Data Structure
```typescript
interface Country {
  code: string;          // ISO country code
  name: string;          // Common name
  officialName: string;  // Official name
  continent: string;     // Continent
  population: number;    // Current population
  gdp: number;          // GDP in USD
  gdpPerCapita: number; // GDP per capita
  area: number;         // Area in km²
  capital: string;      // Capital city
  languages: string[];  // Official languages
  currencies: string[]; // Currencies
  geography: {
    coordinates: [number, number]; // [lat, lng]
    borders: string[];            // Bordering countries
    coastline: number;            // Coastline length
    elevation: {
      highest: number;
      lowest: number;
    };
  };
  subdivisions?: AdminDivision[]; // States/provinces
}
```

### Geographic Feature Structure
```typescript
interface GeographicFeature {
  id: string;
  name: string;
  type: 'mountain' | 'river' | 'lake' | 'sea' | 'ocean';
  coordinates: [number, number][];
  countries: string[]; // Country codes
  elevation?: number;  // For mountains
  length?: number;     // For rivers
  area?: number;       // For lakes/seas
}
```

## Development Phases

### Phase 1: Foundation (Week 1)
- Set up Next.js 15 project structure
- Implement basic map with React-Leaflet
- Create continent navigation system
- Integrate REST Countries API

### Phase 2: Core Features (Week 2)
- Add country selection and isolation
- Implement responsive detail panels
- Integrate World Bank API for economic data
- Add geographic features overlay

### Phase 3: Enhancement (Week 3)
- Add administrative divisions
- Implement search functionality
- Optimize performance and caching
- Add loading states and error handling

### Phase 4: Polish (Week 4)
- Refine UI/UX
- Add animations and transitions
- Implement data caching strategies
- Testing and bug fixes

## API Integration Strategy

### Data Fetching Approach
- **Server-Side**: Use Next.js Server Actions for initial data loading
- **Client-Side**: React Query for interactive data fetching
- **Caching**: Implement Redis or in-memory caching for API responses
- **Error Handling**: Graceful degradation when APIs are unavailable

### Rate Limiting Considerations
- Implement request batching for multiple country queries
- Cache static data (country boundaries, geographic features)
- Use API keys where required (World Bank, Mapbox if chosen)

## Performance Considerations
- **Lazy Loading**: Load country details on demand
- **Image Optimization**: Next.js Image component for flags and photos
- **Bundle Splitting**: Separate map components for code splitting
- **Data Compression**: Use gzip for API responses

## Accessibility Requirements
- **Keyboard Navigation**: Full keyboard support for map interaction
- **Screen Readers**: Proper ARIA labels and descriptions
- **Color Contrast**: WCAG compliant color schemes
- **Focus Management**: Clear focus indicators and logical tab order

## Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Graceful Degradation**: Basic functionality for older browsers
