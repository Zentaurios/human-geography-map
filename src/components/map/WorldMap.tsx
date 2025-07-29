'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Continent } from '@/types/country.types';
import { LeafletMouseEvent } from 'leaflet';

interface WorldMapProps {
  selectedContinent: Continent | 'all';
  selectedCountry?: string | null;
  onCountryClick?: (countryCode: string, countryName: string, event: LeafletMouseEvent) => void;
  onCountryHover?: (countryCode: string | null, countryName?: string) => void;
  className?: string;
  showLayerControls?: boolean;
  isMobile?: boolean;
}

// Loading component
const MapLoadingComponent = ({ className = '' }: { className?: string }) => (
  <div className={`w-full h-full bg-slate-100 animate-pulse flex items-center justify-center ${className}`}>
    <div className="text-slate-500 flex items-center gap-2">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      Loading map...
    </div>
  </div>
);

// Dynamically import the actual map component with no SSR
const DynamicMapComponent = dynamic(
  () => import('./WorldMapClient'),
  {
    ssr: false,
    loading: () => <MapLoadingComponent />,
  }
);

export function WorldMap(props: WorldMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <MapLoadingComponent className={props.className} />;
  }

  return <DynamicMapComponent {...props} />;
}

export default WorldMap;