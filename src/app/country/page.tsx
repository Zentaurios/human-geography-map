import { Metadata, Viewport } from 'next';
import { CountryListView } from '@/components/countries/CountryListView';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'World Countries - Browse Global Geography | Human Geography Map',
  description: 'Explore comprehensive data for countries from all continents. Compare population, GDP, area, and geographic statistics. Filter by continent, search by name, and discover detailed country profiles.',
  openGraph: {
    title: 'World Countries - Human Geography Map',
    description: 'Browse and compare data for countries worldwide. Interactive filtering, detailed statistics, and comprehensive geographic information.',
    type: 'website',
  },
  keywords: [
    'countries of the world',
    'country statistics',
    'world geography',
    'population data',
    'GDP by country',
    'country profiles',
    'world facts',
    'geography education'
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
};

export default function CountryListPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 mb-6 transition-colors text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Interactive Map
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Countries of the World
            </h1>
            <p className="max-w-3xl mx-auto mt-4 text-lg text-slate-600">
              Explore comprehensive data for countries from all continents. Compare population, GDP, area, and geographic statistics. 
              Filter by continent, search by name, and discover detailed country profiles with verified data.
            </p>
          </div>
        </div>
      </div>

      {/* Country List Content */}
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <CountryListView />
      </div>
    </div>
  );
}
