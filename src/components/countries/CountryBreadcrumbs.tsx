'use client';

import { useRouter } from 'next/navigation';
import { Country } from '@/types/country.types';
import { ChevronRight, Home } from 'lucide-react';

interface CountryBreadcrumbsProps {
  country: Country;
}

export function CountryBreadcrumbs({ country }: CountryBreadcrumbsProps) {
  const router = useRouter();
  
  return (
    <nav className="flex items-center space-x-1 text-sm text-slate-600 mb-6">
      <button
        onClick={() => {
          router.push('/');
        }}
        className="flex items-center gap-1 hover:text-slate-900 transition-colors"
      >
        <Home className="w-4 h-4" />
        Home
      </button>
      
      <ChevronRight className="w-4 h-4 text-slate-400" />
      
      <button
        onClick={() => {
          router.push('/country');
        }}
        className="hover:text-slate-900 transition-colors"
      >
        Countries
      </button>
      
      <ChevronRight className="w-4 h-4 text-slate-400" />
      
      <span className="text-slate-900 font-medium">
        {country.name}
      </span>
    </nav>
  );
}
