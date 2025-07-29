'use client';

import { WorldMap } from '@/components/map/WorldMap';
import { CountryDetailPanel } from '@/components/panels/CountryDetailPanel';
import { AppNavigation } from '@/components/navigation/AppNavigation';
import { useAppState } from '@/components/layout/AppLayoutWrapper';

export default function HomePage() {
  const { 
    selectedContinent, 
    selectedCountry, 
    setSelectedCountry,
    handleCountryClick,
    handleContinentChange,
    handleSearchCountrySelect,
    handleSearchContinentSelect
  } = useAppState();
  
  const handleCountryHover = (countryCode: string | null, countryName?: string) => {
    // Handle country hover if needed
    console.log('Country hovered:', countryCode, countryName);
  };
  
  // Enhanced country click handler with mobile debugging
  const handleCountryClickWithDebug = (countryCode: string, countryName: string, event?: any) => {
    console.log('🔍 MOBILE DEBUG - Country clicked:', countryCode, countryName);
    console.log('🔍 Touch/Mouse event:', event);
    console.log('🔍 Window width:', window.innerWidth);
    
    // Call the original handler
    handleCountryClick(countryCode, countryName, event);
    
    // Force show mobile panel for testing
    if (window.innerWidth < 1024) {
      console.log('🔍 Mobile detected, should show bottom panel');
      console.log('🔍 Selected country after click:', countryCode);
    }
  };
  
  return (
    <>
      {/* Navigation for search and continent selection */}
      <AppNavigation
        selectedContinent={selectedContinent}
        onContinentChange={handleContinentChange}
        onCountrySelect={handleSearchCountrySelect}
        onContinentSelect={handleSearchContinentSelect}
      />

      {/* Main content */}
      <main className="h-[calc(100vh-144px)] md:h-[calc(100vh-128px)] flex">
        {/* Map container */}
        <div className="flex-1 relative">
          <WorldMap
            selectedContinent={selectedContinent}
            selectedCountry={selectedCountry}
            onCountryClick={handleCountryClickWithDebug}
            onCountryHover={handleCountryHover}
            className="h-full"
            showLayerControls={true}
            isMobile={false}
          />
          
          {/* Map overlay info */}
          <div className="absolute top-4 left-4 z-[800] md:top-4 md:left-4">
            <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-slate-600">
                  Viewing: {selectedContinent === 'all' ? 'World' : selectedContinent}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar for desktop - shows country details */}
        <div className="hidden lg:block w-80 bg-white border-l border-slate-200 overflow-y-auto">
          <div className="p-6">
            <CountryDetailPanel 
              countryCode={selectedCountry}
              onClose={() => setSelectedCountry(null)}
            />
          </div>
        </div>
      </main>
      
      {/* Mobile bottom panel - only show when country is selected */}
      {selectedCountry && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-[999] min-h-[200px] max-h-[60vh] overflow-y-auto shadow-2xl">
          <div className="p-4">
            <CountryDetailPanel 
              countryCode={selectedCountry}
              onClose={() => setSelectedCountry(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}
