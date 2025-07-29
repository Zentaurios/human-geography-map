// Layer system types for Phase 3 - Hybrid Geographic Layer System

export type BaseLayerType = 'political' | 'terrain' | 'economic';
export type FeatureLayerType = 'mountains' | 'rivers' | 'cities' | 'admin-divisions' | 'water-bodies';

// Base layer configuration (exclusive - only one active)
export interface BaseLayer {
  id: BaseLayerType;
  name: string;
  description: string;
  tileUrl: string;
  attribution: string;
  maxZoom: number;
  active: boolean;
  icon: string;
}

// Feature layer configuration (combinable - multiple can be active)
export interface FeatureLayer {
  id: FeatureLayerType;
  name: string;
  description: string;
  visible: boolean;
  opacity: number;
  zIndex: number;
  minZoom: number;
  maxZoom: number;
  icon: string;
  color: string;
  style: LayerStyle;
}

// Layer styling configuration
export interface LayerStyle {
  stroke: boolean;
  color: string;
  weight: number;
  opacity: number;
  fill: boolean;
  fillColor: string;
  fillOpacity: number;
  radius?: number; // For point features
  dashArray?: string;
}

// Layer control state
export interface LayerControlState {
  baseLayer: BaseLayerType;
  featureLayers: Record<FeatureLayerType, boolean>;
  layerOpacity: Record<string, number>;
}

// Geographic feature data for layers
export interface MountainFeature {
  id: string;
  name: string;
  elevation: number;
  coordinates: [number, number];
  range?: string;
  country: string;
  prominence?: number;
}

export interface RiverFeature {
  id: string;
  name: string;
  length: number;
  coordinates: [number, number][];
  countries: string[];
  mouth?: string;
  source?: string;
}

export interface CityFeature {
  id: string;
  name: string;
  population: number;
  coordinates: [number, number];
  country: string;
  isCapital: boolean;
  adminLevel: 'national' | 'state' | 'regional';
  urbanArea?: number;
}

export interface WaterBodyFeature {
  id: string;
  name: string;
  type: 'lake' | 'sea' | 'ocean' | 'gulf' | 'strait';
  area?: number;
  depth?: number;
  coordinates: [number, number][] | [number, number][][][]; // Polygon or MultiPolygon
  countries: string[];
}

export interface AdminDivisionFeature {
  id: string;
  name: string;
  type: 'state' | 'province' | 'region' | 'territory';
  country: string;
  capital?: string;
  population?: number;
  area?: number;
  coordinates: [number, number][][][]; // MultiPolygon
  level: number; // Administrative level (1 = state/province, 2 = county, etc.)
}

// Layer data collections
export interface LayerDataCollections {
  mountains: MountainFeature[];
  rivers: RiverFeature[];
  cities: CityFeature[];
  waterBodies: WaterBodyFeature[];
  adminDivisions: AdminDivisionFeature[];
}

// Layer loading state
export interface LayerLoadingState {
  isLoading: boolean;
  error: string | null;
  progress?: number;
  loadedLayers: Set<string>;
}

// Layer performance optimization
export interface LayerPerformanceSettings {
  enableClustering: boolean;
  clusterRadius: number;
  maxClusterRadius: number;
  clusterThreshold: number;
  simplifyTolerance: number;
  decimateOnZoom: boolean;
}

// Layer events
export interface LayerEvent {
  type: 'layer-toggle' | 'layer-opacity-change' | 'base-layer-change';
  layerId: string;
  value?: any;
  timestamp: number;
}

// Default layer configurations
export interface DefaultLayerConfigs {
  baseLayers: BaseLayer[];
  featureLayers: FeatureLayer[];
  performance: LayerPerformanceSettings;
}

// Layer API response types
export interface LayerAPIResponse<T> {
  data: T[];
  metadata: {
    count: number;
    bbox?: [number, number, number, number]; // [west, south, east, north]
    zoom: number;
    simplified: boolean;
  };
  error?: string;
}

// Layer data source configuration
export interface LayerDataSource {
  id: string;
  name: string;
  url: string;
  format: 'geojson' | 'topojson' | 'kml' | 'gpx';
  cacheDuration: number; // in milliseconds
  requiresApiKey: boolean;
  rateLimit?: {
    requests: number;
    period: number; // in milliseconds
  };
}
