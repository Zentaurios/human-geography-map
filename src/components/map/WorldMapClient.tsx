'use client';

import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { MAP_CONFIG, CONTINENT_INFO } from '@/lib/config';
import { Continent } from '@/types/country.types';
import { CountryBoundariesLayer } from './CountryBoundariesLayer';
import { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue in Next.js
import L from 'leaflet';

let DefaultIcon = L.divIcon({
  html: `<svg width="25" height="41" viewBox="0 0 25 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 0C5.597 0 0 5.597 0 12.5C0 19.403 12.5 41 12.5 41S25 19.403 25 12.5C25 5.597 19.403 0 12.5 0ZM12.5 17C10.019 17 8 14.981 8 12.5C8 10.019 10.019 8 12.5 8C14.981 8 17 10.019 17 12.5C17 14.981 14.981 17 12.5 17Z" fill="#3B82F6"/>
  </svg>`,
  className: '',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface WorldMapClientProps {
  selectedContinent: Continent | 'all';
  selectedCountry?: string | null;
  onCountryClick?: (countryCode: string, countryName: string, event: LeafletMouseEvent) => void;
  onCountryHover?: (countryCode: string | null, countryName?: string) => void;
  className?: string;
  showLayerControls?: boolean;
  isMobile?: boolean;
}

// Component to handle map viewport changes
function MapController({ 
  selectedContinent 
}: { 
  selectedContinent: Continent | 'all' 
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (selectedContinent === 'all') {
      // Reset to world view
      map.setView(MAP_CONFIG.defaultCenter, MAP_CONFIG.defaultZoom, {
        animate: true,
        duration: 1.5
      });
    } else {
      // Focus on specific continent
      const continentInfo = CONTINENT_INFO[selectedContinent];
      if (continentInfo) {
        map.setView(continentInfo.center, continentInfo.zoom, {
          animate: true,
          duration: 1.5
        });
      }
    }
  }, [selectedContinent, map]);

  return null;
}

function WorldMapClient({ 
  selectedContinent = 'all',
  selectedCountry = null,
  onCountryClick,
  onCountryHover,
  className = '',
  showLayerControls = true,
  isMobile = false
}: WorldMapClientProps) {

  return (
    <div className={`relative w-full h-full ${className}`}>
      <MapContainer
        center={MAP_CONFIG.defaultCenter}
        zoom={MAP_CONFIG.defaultZoom}
        minZoom={MAP_CONFIG.minZoom}
        maxZoom={MAP_CONFIG.maxZoom}
        maxBounds={MAP_CONFIG.bounds as [[number, number], [number, number]]}
        className="w-full h-full rounded-lg"
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        keyboard={true}
        touchZoom={true}
        zoomControl={true}
      >
        {/* Simple base map layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={18}
        />
        
        {/* Map controller for viewport management */}
        <MapController selectedContinent={selectedContinent} />
        
        {/* Country boundaries layer */}
        <CountryBoundariesLayer
          selectedContinent={selectedContinent}
          selectedCountry={selectedCountry}
          onCountryClick={onCountryClick}
          onCountryHover={onCountryHover}
        />
      </MapContainer>
      
      {/* Simple map info overlay - replaces complex layer controls */}
      {showLayerControls && (
        <div className="absolute top-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 max-w-xs">
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>OpenStreetMap</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Interactive world map
          </div>
        </div>
      )}
    </div>
  );
}

export default WorldMapClient;
