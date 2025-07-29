'use client';

import dynamic from 'next/dynamic';
import { LoadingState } from '@/components/loading/skeleton-components';
import { Continent } from '@/types/country.types';

// Dynamic import of WorldMap to avoid SSR issues
const PerformantMapComponent = dynamic(
  () => import('../WorldMap').then(mod => ({ default: mod.WorldMap })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-lg">
        <LoadingState 
          type="map" 
          message="Loading enhanced map..." 
          size="lg" 
        />
      </div>
    )
  }
);

interface DynamicPerformantMapProps {
  selectedContinent: Continent | 'all';
  selectedCountry?: string | null;
  onCountryClick?: (countryCode: string, countryName: string, event: any) => void;
  onCountryHover?: (countryCode: string | null, countryName?: string) => void;
  showLayerControls?: boolean;
  isMobile?: boolean;
  className?: string;
  enableVirtualization?: boolean;
  enableSmartPreloading?: boolean;
  enableOfflineSupport?: boolean;
  performanceMode?: 'high' | 'balanced' | 'battery';
}

/**
 * Client-side wrapper for the WorldMap component.
 * 
 * This component uses dynamic imports to ensure the WorldMap
 * (which depends on browser APIs like Leaflet) is only loaded
 * on the client side, avoiding SSR issues.
 * 
 * Note: Performance-related props (enableVirtualization, enableSmartPreloading, 
 * enableOfflineSupport, performanceMode) are accepted but not yet implemented.
 * They are reserved for future enhancements.
 * 
 * Usage:
 * ```tsx
 * import { DynamicPerformantMap } from '@/components/map/client/DynamicPerformantMap';
 * 
 * <DynamicPerformantMap
 *   selectedContinent="europe"
 *   showLayerControls={true}
 *   onCountryClick={(code, name) => console.log(code, name)}
 * />
 * ```
 */
export function DynamicPerformantMap(props: DynamicPerformantMapProps) {
  // Extract only the props that WorldMap supports
  const {
    selectedContinent,
    selectedCountry,
    onCountryClick,
    onCountryHover,
    showLayerControls,
    isMobile,
    className,
    // These performance props are ignored for now since WorldMap doesn't support them
    // enableVirtualization,
    // enableSmartPreloading, 
    // enableOfflineSupport,
    // performanceMode,
    ...otherProps
  } = props;

  const worldMapProps = {
    selectedContinent,
    selectedCountry,
    onCountryClick,
    onCountryHover,
    showLayerControls,
    isMobile,
    className,
  };

  return <PerformantMapComponent {...worldMapProps} />;
}

export default DynamicPerformantMap;
