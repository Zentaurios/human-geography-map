import React, { useState } from 'react';
import { Search, Filter, X, Calendar, BookOpen, Users, Settings } from 'lucide-react';
import { ResearchFilters as FilterType, GEOGRAPHY_RESEARCH_TOPICS, RESEARCH_CATEGORIES } from '@/types/research.types';
import { Button } from '@/components/ui';

interface ResearchFiltersProps {
  searchQuery: string;
  filters: FilterType;
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterType) => void;
  loading: boolean;
}

const ResearchFilters: React.FC<ResearchFiltersProps> = ({
  searchQuery,
  filters,
  onSearch,
  onFilterChange,
  loading,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  // Calculate active filter count
  React.useEffect(() => {
    let count = 0;
    if (filters.openAccess) count++;
    if (!filters.enhanceWithGeography) count++; // Count when geography enhancement is disabled
    if (filters.academicLevel.length < 3) count++; // Default is all 3, so less means filtering
    if (filters.methodology.length > 0) count++;
    if (filters.geographySubfield.length > 0) count++;
    if (filters.citationRange.min > 0 || filters.citationRange.max < 1000) count++;
    if (filters.publicationDateRange.start > 2020 || filters.publicationDateRange.end < new Date().getFullYear()) count++;
    setActiveFilterCount(count);
  }, [filters]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get('search') as string;
    onSearch(query);
  };

  const toggleAcademicLevel = (level: 'undergraduate' | 'graduate' | 'advanced') => {
    const newLevels = filters.academicLevel.includes(level)
      ? filters.academicLevel.filter(l => l !== level)
      : [...filters.academicLevel, level];
    
    onFilterChange({
      ...filters,
      academicLevel: newLevels,
    });
  };

  const toggleMethodology = (method: 'quantitative' | 'qualitative' | 'mixed' | 'theoretical') => {
    const newMethods = filters.methodology.includes(method)
      ? filters.methodology.filter(m => m !== method)
      : [...filters.methodology, method];
    
    onFilterChange({
      ...filters,
      methodology: newMethods,
    });
  };

  const toggleGeographySubfield = (subfield: string) => {
    const newSubfields = filters.geographySubfield.includes(subfield)
      ? filters.geographySubfield.filter(s => s !== subfield)
      : [...filters.geographySubfield, subfield];
    
    onFilterChange({
      ...filters,
      geographySubfield: newSubfields,
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      topics: [],
      publicationDateRange: {
        start: 2020,
        end: new Date().getFullYear(),
      },
      academicLevel: ['undergraduate', 'graduate', 'advanced'],
      openAccess: false,
      citationRange: {
        min: 0,
        max: 1000,
      },
      methodology: [],
      geographySubfield: [],
      enhanceWithGeography: true, // Keep geography enhancement enabled when clearing
    });
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="Search geography research topics (e.g., urban planning, climate migration, GIS analysis)"
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder-slate-500"
            disabled={loading}
          />
          <Button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            size="sm"
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </form>

      {/* Quick Topic Buttons */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          Popular Research Areas
        </h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(RESEARCH_CATEGORIES).slice(0, 6).map(([category, info]) => (
            <button
              key={category}
              onClick={() => onSearch(category.toLowerCase())}
              className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
              disabled={loading}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Advanced Filters
            {activeFilterCount > 0 && (
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                {activeFilterCount}
              </span>
            )}
          </Button>

          {/* Quick Filters */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.openAccess}
              onChange={(e) => onFilterChange({
                ...filters,
                openAccess: e.target.checked,
              })}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            Open Access Only
          </label>
          
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.enhanceWithGeography}
              onChange={(e) => onFilterChange({
                ...filters,
                enhanceWithGeography: e.target.checked,
              })}
              className="rounded border-slate-300 text-green-600 focus:ring-green-500"
            />
            <span className="flex items-center gap-1">
              🌍 Focus on Geography
              <span className="text-xs text-slate-500">(recommended)</span>
            </span>
          </label>
        </div>

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-slate-500 hover:text-slate-700"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="mt-6 pt-6 border-t border-slate-200 space-y-6">
          {/* Academic Level */}
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Academic Level
            </h4>
            <div className="flex flex-wrap gap-2">
              {(['undergraduate', 'graduate', 'advanced'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => toggleAcademicLevel(level)}
                  className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                    filters.academicLevel.includes(level)
                      ? 'bg-blue-100 border-blue-300 text-blue-700'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Research Methodology */}
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Research Methodology
            </h4>
            <div className="flex flex-wrap gap-2">
              {(['quantitative', 'qualitative', 'mixed', 'theoretical'] as const).map((method) => (
                <button
                  key={method}
                  onClick={() => toggleMethodology(method)}
                  className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                    filters.methodology.includes(method)
                      ? 'bg-green-100 border-green-300 text-green-700'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {method.charAt(0).toUpperCase() + method.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Geography Subfields */}
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-3">
              Geography Subfields
            </h4>
            <div className="flex flex-wrap gap-2">
              {GEOGRAPHY_RESEARCH_TOPICS.slice(0, 8).map((topic) => (
                <button
                  key={topic}
                  onClick={() => toggleGeographySubfield(topic)}
                  className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                    filters.geographySubfield.includes(topic)
                      ? 'bg-purple-100 border-purple-300 text-purple-700'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Publication Year From
              </label>
              <input
                type="number"
                min="2000"
                max={new Date().getFullYear()}
                value={filters.publicationDateRange.start}
                onChange={(e) => onFilterChange({
                  ...filters,
                  publicationDateRange: {
                    ...filters.publicationDateRange,
                    start: parseInt(e.target.value) || 2020,
                  },
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Publication Year To
              </label>
              <input
                type="number"
                min="2000"
                max={new Date().getFullYear()}
                value={filters.publicationDateRange.end}
                onChange={(e) => onFilterChange({
                  ...filters,
                  publicationDateRange: {
                    ...filters.publicationDateRange,
                    end: parseInt(e.target.value) || new Date().getFullYear(),
                  },
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Citation Range */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Minimum Citations
              </label>
              <input
                type="number"
                min="0"
                value={filters.citationRange.min}
                onChange={(e) => onFilterChange({
                  ...filters,
                  citationRange: {
                    ...filters.citationRange,
                    min: parseInt(e.target.value) || 0,
                  },
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Maximum Citations
              </label>
              <input
                type="number"
                min="0"
                value={filters.citationRange.max}
                onChange={(e) => onFilterChange({
                  ...filters,
                  citationRange: {
                    ...filters.citationRange,
                    max: parseInt(e.target.value) || 1000,
                  },
                })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchFilters;
