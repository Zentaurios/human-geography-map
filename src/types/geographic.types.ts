// Geographic feature types for map overlays

export interface GeographicFeature {
  id: string;
  name: string;
  type: GeographicFeatureType;
  coordinates: [number, number][];  // Array of coordinate pairs
  countries: string[];              // Country codes where feature is located
  elevation?: number;               // For mountains (meters above sea level)
  length?: number;                  // For rivers (kilometers)
  area?: number;                    // For lakes/seas (square kilometers)
  depth?: number;                   // For lakes/seas (maximum depth in meters)
  description?: string;             // Optional description
}

export type GeographicFeatureType = 
  | 'mountain'
  | 'mountain_range'
  | 'river'
  | 'lake'
  | 'sea'
  | 'ocean'
  | 'desert'
  | 'forest'
  | 'island'
  | 'peninsula'
  | 'gulf'
  | 'strait';

export interface FeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

export interface GeoJSONFeature {
  type: 'Feature';
  properties: {
    id: string;
    name: string;
    featureType: GeographicFeatureType;
    countries: string[];
    [key: string]: any;
  };
  geometry: {
    type: 'Point' | 'LineString' | 'Polygon' | 'MultiPolygon';
    coordinates: number[] | number[][] | number[][][];
  };
}

// Feature layer configuration
export interface FeatureLayerConfig {
  type: GeographicFeatureType;
  visible: boolean;
  color: string;
  strokeWidth: number;
  opacity: number;
  zIndex: number;
}

// Map bounds and viewport
export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MapViewport {
  center: [number, number];
  zoom: number;
  bounds?: MapBounds;
}

// Feature filter options
export interface FeatureFilters {
  types: GeographicFeatureType[];
  countries: string[];
  minElevation?: number;
  maxElevation?: number;
  minArea?: number;
  maxArea?: number;
}
