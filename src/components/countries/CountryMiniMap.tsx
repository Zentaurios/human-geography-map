'use client';

import { useRouter } from 'next/navigation';
import { Country } from '@/types/country.types';
import { MapPin, Globe } from 'lucide-react';

interface CountryMiniMapProps {
  country: Country;
}

export function CountryMiniMap({ country }: CountryMiniMapProps) {
  const router = useRouter();
  const [lat, lng] = country.geography.coordinates;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-slate-900">Location</h3>
      </div>
      
      {/* Static Map Placeholder */}
      <div className="relative bg-slate-100 rounded-lg overflow-hidden mb-4" style={{ aspectRatio: '16/9' }}>
        {/* Placeholder for static map image */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-slate-700">
              {country.name}
            </div>
            <div className="text-xs text-slate-500">
              {lat.toFixed(2)}°, {lng.toFixed(2)}°
            </div>
          </div>
        </div>
        
        {/* Optional: Add actual static map using a service like Mapbox Static API */}
        {/* 
        <img 
          src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-l+000(${lng},${lat})/${lng},${lat},4/300x200?access_token=YOUR_MAPBOX_TOKEN`}
          alt={`Map showing location of ${country.name}`}
          className="w-full h-full object-cover"
        />
        */}
      </div>

      {/* Geographic Information */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Coordinates</span>
          <span className="font-mono text-slate-900">
            {lat.toFixed(2)}°, {lng.toFixed(2)}°
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Continent</span>
          <span className="font-medium text-slate-900">
            {country.continent}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Region</span>
          <span className="font-medium text-slate-900">
            {country.geography.region}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Subregion</span>
          <span className="font-medium text-slate-900">
            {country.geography.subregion}
          </span>
        </div>

        {country.geography.borders.length > 0 && (
          <>
            <div className="pt-3 border-t">
              <span className="block text-slate-600 mb-2">Neighboring Countries</span>
              <div className="flex flex-wrap gap-1">
                {country.geography.borders.slice(0, 6).map((border) => (
                  <span 
                    key={border}
                    className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded"
                  >
                    {border}
                  </span>
                ))}
                {country.geography.borders.length > 6 && (
                  <span className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded">
                    +{country.geography.borders.length - 6} more
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* View on Interactive Map Button */}
      <button
        onClick={() => {
          router.push(`/?country=${country.code}`);
        }}
        className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Globe className="w-4 h-4" />
        View on Interactive Map
      </button>
    </div>
  );
}
