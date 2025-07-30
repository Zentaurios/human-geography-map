'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ResearchFilters } from '@/types/research.types';
import { useResearchPapers } from '@/hooks/useResearchPapers';
import ResearchHeader from '@/components/research/ResearchHeader';
import ResearchFiltersComponent from '@/components/research/ResearchFilters';
import ResearchGrid from '@/components/research/ResearchGrid';
import ResearchLoadingState from '@/components/research/ResearchLoadingState';
import { ArrowLeft, Share2, Wifi, WifiOff, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui';

const ResearchPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const {
    papers,
    loading,
    error,
    searchHistory,
    apiStatus,
    searchPapers,
    clearResults,
    retrySearch,
  } = useResearchPapers();

  const [searchQuery, setSearchQuery] = useState('human geography');
  const [initialized, setInitialized] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [showApiStatus, setShowApiStatus] = useState(false);
  const [filters, setFilters] = useState<ResearchFilters>({
    topics: [],
    publicationDateRange: {
      start: 2000, // More inclusive: 25 years instead of 5
      end: new Date().getFullYear(),
    },
    academicLevel: ['undergraduate', 'graduate', 'advanced'], // Include all levels
    openAccess: false,
    citationRange: {
      min: 0,
      max: 10000, // Allow highly cited papers
    },
    methodology: [],
    geographySubfield: [],
    enhanceWithGeography: true, // Default to true with geography enhancement enabled
  });

  // Initialize state from URL parameters
  useEffect(() => {
    const query = searchParams.get('q') || 'human geography';
    const openAccess = searchParams.get('open') === 'true';
    const yearFrom = parseInt(searchParams.get('year_from') || '2000'); // More inclusive default
    const yearTo = parseInt(searchParams.get('year_to') || new Date().getFullYear().toString());
    const levels = searchParams.get('levels')?.split(',') || ['undergraduate', 'graduate', 'advanced']; // Include all levels
    const methods = searchParams.get('methods')?.split(',').filter(Boolean) || [];
    const subfields = searchParams.get('subfields')?.split(',').filter(Boolean) || [];
    const citationMin = parseInt(searchParams.get('citation_min') || '0');
    const citationMax = parseInt(searchParams.get('citation_max') || '10000'); // More inclusive default
    const enhanceWithGeography = searchParams.get('enhance_geography') !== 'false'; // Default to true unless explicitly false

    setSearchQuery(query);
    setFilters({
      topics: [],
      publicationDateRange: {
        start: yearFrom,
        end: yearTo,
      },
      academicLevel: levels as ('undergraduate' | 'graduate' | 'advanced')[],
      openAccess,
      citationRange: {
        min: citationMin,
        max: citationMax,
      },
      methodology: methods as ('quantitative' | 'qualitative' | 'mixed' | 'theoretical')[],
      geographySubfield: subfields,
      enhanceWithGeography,
    });
    setInitialized(true);
  }, [searchParams]);

  // Update URL with current search parameters
  // URL structure: /research?q=query&levels=undergraduate,graduate,advanced&open=true&year_from=2000&year_to=2025&methods=quantitative&subfields=urban+geography&citation_min=0&citation_max=10000&enhance_geography=false
  const updateURL = useCallback((query: string, currentFilters: ResearchFilters) => {
    const params = new URLSearchParams();
    
    // Add search query
    if (query && query !== 'human geography') {
      params.set('q', query);
    }
    
    // Add filters only if they differ from defaults
    if (currentFilters.openAccess) {
      params.set('open', 'true');
    }
    
    // Only add enhance_geography param if it's false (since true is default)
    if (!currentFilters.enhanceWithGeography) {
      params.set('enhance_geography', 'false');
    }
    
    if (currentFilters.publicationDateRange.start !== 2000) { // Updated default
      params.set('year_from', currentFilters.publicationDateRange.start.toString());
    }
    
    if (currentFilters.publicationDateRange.end !== new Date().getFullYear()) {
      params.set('year_to', currentFilters.publicationDateRange.end.toString());
    }
    
    const defaultLevels = ['undergraduate', 'graduate', 'advanced']; // Updated default
    if (currentFilters.academicLevel.length !== defaultLevels.length || 
        !defaultLevels.every(level => currentFilters.academicLevel.includes(level as any))) {
      params.set('levels', currentFilters.academicLevel.join(','));
    }
    
    if (currentFilters.methodology.length > 0) {
      params.set('methods', currentFilters.methodology.join(','));
    }
    
    if (currentFilters.geographySubfield.length > 0) {
      params.set('subfields', currentFilters.geographySubfield.join(','));
    }
    
    if (currentFilters.citationRange.min !== 0) {
      params.set('citation_min', currentFilters.citationRange.min.toString());
    }
    
    if (currentFilters.citationRange.max !== 10000) { // Updated default
      params.set('citation_max', currentFilters.citationRange.max.toString());
    }
    
    // Update URL without triggering a page reload
    const newURL = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newURL, { scroll: false });
  }, [router, pathname]);

  // Search when query or filters change
  useEffect(() => {
    if (!initialized) return;
    
    const performSearch = async () => {
      await searchPapers(searchQuery, filters);
    };

    performSearch();
  }, [searchQuery, filters, initialized, searchPapers]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    updateURL(query, filters);
  };

  const handleFilterChange = (newFilters: ResearchFilters) => {
    setFilters(newFilters);
    updateURL(searchQuery, newFilters);
  };

  const handleShareResults = async () => {
    try {
      if (navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        await navigator.share({
          title: `Geography Research Results - ${searchQuery}`,
          text: `Check out these ${papers.length} research papers about ${searchQuery}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowCopyNotification(true);
        setTimeout(() => setShowCopyNotification(false), 3000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShowCopyNotification(true);
        setTimeout(() => setShowCopyNotification(false), 3000);
      } catch (clipboardError) {
        console.error('Clipboard access failed:', clipboardError);
      }
    }
  };

  const getApiStatusIcon = () => {
    if (apiStatus.lastSuccessfulApi === 'openalex') {
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
    return <WifiOff className="w-4 h-4 text-gray-600" />;
  };

  const getApiStatusText = () => {
    if (apiStatus.lastSuccessfulApi === 'openalex') {
      return 'Live from OpenAlex';
    }
    return 'No API connection';
  };

  const getApiStatusColor = () => {
    if (apiStatus.lastSuccessfulApi === 'openalex') {
      return 'text-green-600';
    }
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur-sm border-slate-200">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
                <ArrowLeft className="w-4 h-4" />
                Back to Map
              </Button>
            </Link>
            
            <div className="flex items-center gap-4">
              {/* API Status Indicator */}
              <div 
                className="flex items-center gap-2 text-sm cursor-pointer"
                onClick={() => setShowApiStatus(!showApiStatus)}
                title="Click for API details"
              >
                {getApiStatusIcon()}
                <span className={getApiStatusColor()}>
                  {getApiStatusText()}
                </span>
              </div>

              <div className="text-sm text-slate-500">
                {papers.length} papers found
                {searchQuery !== 'human geography' && (
                  <span className="ml-2 text-blue-600">for "{searchQuery}"</span>
                )}
              </div>
              
              {error && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={retrySearch}
                  className="text-amber-600 hover:text-amber-700"
                  title="Retry search"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              )}

              {(searchQuery !== 'human geography' || papers.length > 0) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShareResults}
                  className="text-slate-600 hover:text-slate-900"
                  title="Share these results"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* API Status Detail Panel */}
      {showApiStatus && (
        <div className="px-4 py-3 border-b border-blue-200 bg-blue-50">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">OpenAlex:</span>
                  <span className={`flex items-center gap-1 ${
                    apiStatus.openAlexStatus === 'working' ? 'text-green-600' :
                    apiStatus.openAlexStatus === 'rate-limited' ? 'text-yellow-600' :
                    apiStatus.openAlexStatus === 'error' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {apiStatus.openAlexStatus === 'working' ? <CheckCircle className="w-3 h-3" /> :
                     apiStatus.openAlexStatus === 'rate-limited' ? <AlertCircle className="w-3 h-3" /> :
                     apiStatus.openAlexStatus === 'error' ? <WifiOff className="w-3 h-3" /> :
                     <Wifi className="w-3 h-3" />}
                    {apiStatus.openAlexStatus}
                  </span>
                </div>

                {apiStatus.lastApiCall && (
                  <div className="text-gray-600">
                    Last call: {apiStatus.lastApiCall.toLocaleTimeString()}
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowApiStatus(false)}
                className="text-blue-600"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="p-4 border-l-4 border-yellow-400 bg-yellow-50">
          <div className="flex items-center justify-between mx-auto max-w-7xl">
            <div className="flex">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <div className="ml-3">
                <p className="text-sm text-yellow-700">{error}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={retrySearch}
              className="text-yellow-700 hover:text-yellow-800"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header Section */}
        <ResearchHeader />

        {/* Search and Filters */}
        <ResearchFiltersComponent
          searchQuery={searchQuery}
          filters={filters}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          loading={loading}
        />

        {/* Research Papers Grid */}
        <div className="space-y-8">
          {loading ? (
            <ResearchLoadingState />
          ) : (
            <ResearchGrid papers={papers} />
          )}
        </div>

        {/* Footer with Academic Attribution */}
        <footer className="pt-8 mt-16 border-t border-slate-200">
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold text-slate-900">Academic Sources</h3>
            <p className="max-w-2xl mx-auto text-sm text-slate-600">
              Research papers are sourced from OpenAlex, a comprehensive database of scholarly literature. 
              Real-time data ensures access to the latest published research in human geography.
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                {apiStatus.openAlexStatus === 'working' ? 
                  <CheckCircle className="w-3 h-3 text-green-600" /> : 
                  <div className="w-3 h-3 bg-gray-400 rounded-full" />}
                OpenAlex API
              </span>
              <span>•</span>
              <span>Real-time Research Data</span>
              <span>•</span>
              <span>Educational Curation</span>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Copy Notification */}
      {showCopyNotification && (
        <div className="fixed z-50 px-4 py-2 text-white transition-opacity duration-300 bg-green-600 rounded-md shadow-lg bottom-4 right-4">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Link copied to clipboard!
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchPageContent;
