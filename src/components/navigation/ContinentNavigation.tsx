'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@radix-ui/react-dropdown-menu';
import { ChevronDown, Globe } from 'lucide-react';
import { Continent } from '@/types/country.types';
import { cn } from '@/lib/utils';

interface ContinentNavigationProps {
  selectedContinent: Continent | 'all';
  onContinentChange: (continent: Continent | 'all') => void;
  className?: string;
}

const CONTINENTS: Array<{ value: Continent | 'all'; label: string; shortLabel?: string }> = [
  { value: 'all', label: 'World View', shortLabel: 'World' },
  { value: 'Africa', label: 'Africa' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'North America', label: 'North America', shortLabel: 'N. America' },
  { value: 'South America', label: 'South America', shortLabel: 'S. America' },
  { value: 'Oceania', label: 'Oceania' },
  { value: 'Antarctica', label: 'Antarctica' },
];

export function ContinentNavigation({ 
  selectedContinent, 
  onContinentChange, 
  className = '' 
}: ContinentNavigationProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const selectedLabel = CONTINENTS.find(c => c.value === selectedContinent)?.label || 'World View';

  // Mobile dropdown view
  if (isMobile) {
    return (
      <div className={cn('w-full', className)}>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-between w-full px-4 py-3 text-left transition-colors bg-white border rounded-lg shadow-sm border-slate-200 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-500" />
                <span className="font-medium text-slate-900">{selectedLabel}</span>
              </div>
              <ChevronDown 
                className={cn(
                  'h-4 w-4 text-slate-500 transition-transform duration-200',
                  dropdownOpen && 'rotate-180'
                )}
              />
            </button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent 
            className="w-full min-w-[250px] bg-white border border-slate-200 rounded-lg shadow-lg p-1 z-[1001]"
            align="start"
            sideOffset={4}
          >
            {CONTINENTS.map((continent) => (
              <DropdownMenuItem
                key={continent.value}
                onClick={() => {
                  onContinentChange(continent.value);
                  setDropdownOpen(false);
                }}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer transition-colors',
                  'hover:bg-slate-100 focus:bg-slate-100 focus:outline-none',
                  selectedContinent === continent.value && 'bg-blue-50 text-blue-700 font-medium'
                )}
              >
                <Globe className="w-4 h-4" />
                {continent.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // Desktop tabs view
  return (
    <div className={cn('w-full', className)}>
      <Tabs value={selectedContinent} onValueChange={(value) => onContinentChange(value as Continent | 'all')}>
        <TabsList className="grid w-full grid-cols-8 p-1 rounded-lg bg-slate-100">
          {CONTINENTS.map((continent) => (
            <TabsTrigger
              key={continent.value}
              value={continent.value}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-md transition-all duration-200',
                'data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:text-slate-900',
                'data-[state=inactive]:hover:bg-white/50',
                'data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              )}
            >
              <span className="hidden sm:inline">
                {continent.shortLabel || continent.label}
              </span>
              <span className="sm:hidden">
                {continent.label.charAt(0)}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}

// Additional export for convenience
export default ContinentNavigation;
