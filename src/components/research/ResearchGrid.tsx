import React, { useState } from 'react';
import { ResearchPaper } from '@/types/research.types';
import PaperCard from './PaperCard';
import PaperModal from './PaperModal';
import { Button } from '@/components/ui';
import { Grid, List, SortAsc, SortDesc } from 'lucide-react';

interface ResearchGridProps {
  papers: ResearchPaper[];
}

type ViewMode = 'grid' | 'list';
type SortMode = 'relevance' | 'citations' | 'date' | 'title';
type SortDirection = 'asc' | 'desc';

const ResearchGrid: React.FC<ResearchGridProps> = ({ papers }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortMode, setSortMode] = useState<SortMode>('relevance');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  const [displayCount, setDisplayCount] = useState(12);
  const PAPERS_PER_PAGE = 12;

  // Sort papers based on current sort mode and direction
  const sortedPapers = React.useMemo(() => {
    const sorted = [...papers].sort((a, b) => {
      let comparison = 0;
      
      switch (sortMode) {
        case 'relevance':
          comparison = b.relevanceScore - a.relevanceScore;
          break;
        case 'citations':
          comparison = b.citationCount - a.citationCount;
          break;
        case 'date':
          comparison = new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
      }
      
      return sortDirection === 'asc' ? -comparison : comparison;
    });
    
    return sorted;
  }, [papers, sortMode, sortDirection]);

  const handleSortChange = (newSortMode: SortMode) => {
    if (newSortMode === sortMode) {
      // Toggle direction if clicking the same sort mode
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortMode(newSortMode);
      setSortDirection('desc'); // Default to descending for new sort modes
    }
  };

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + PAPERS_PER_PAGE, papers.length));
  };

  const displayedPapers = sortedPapers.slice(0, displayCount);

  if (papers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No Research Papers Found
          </h3>
          <p className="text-slate-600 mb-4">
            Try adjusting your search terms or filters to find relevant research papers.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reset Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">
            {papers.length} papers found
          </span>
          
          {/* View Mode Toggle */}
          <div className="flex border border-slate-300 rounded-md">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
              aria-label="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 border-l border-slate-300 ${viewMode === 'list' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Sort by:</span>
          <div className="flex gap-1">
            {[
              { key: 'relevance', label: 'Relevance' },
              { key: 'citations', label: 'Citations' },
              { key: 'date', label: 'Date' },
              { key: 'title', label: 'Title' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleSortChange(key as SortMode)}
                className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1 transition-colors ${
                  sortMode === key
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {label}
                {sortMode === key && (
                  sortDirection === 'desc' ? 
                    <SortDesc className="w-3 h-3" /> : 
                    <SortAsc className="w-3 h-3" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Papers Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      }>
        {displayedPapers.map((paper) => (
          <PaperCard
            key={paper.id}
            paper={paper}
            viewMode={viewMode}
            onSelect={() => setSelectedPaper(paper)}
          />
        ))}
      </div>

      {/* Load More Button and Pagination Info */}
      {displayCount < papers.length && (
        <div className="text-center mt-8 space-y-4">
          <div className="text-sm text-slate-600">
            Showing {displayCount} of {papers.length} papers
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2 max-w-xs mx-auto">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(displayCount / papers.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <Button 
            onClick={loadMore}
            variant="outline"
            size="lg"
            className="min-w-[200px]"
          >
            Load Next {Math.min(PAPERS_PER_PAGE, papers.length - displayCount)} Papers
          </Button>
        </div>
      )}
      
      {/* Show completion message when all papers are loaded */}
      {displayCount >= papers.length && papers.length > PAPERS_PER_PAGE && (
        <div className="text-center mt-8 py-4">
          <div className="text-sm text-slate-600">
            🎉 All {papers.length} papers are now displayed
          </div>
        </div>
      )}

      {/* Paper Detail Modal */}
      {selectedPaper && (
        <PaperModal
          paper={selectedPaper}
          onClose={() => setSelectedPaper(null)}
        />
      )}
    </div>
  );
};

export default ResearchGrid;
