import React from 'react';
import { ResearchPaper, ACADEMIC_LEVELS, OPEN_ACCESS_STATUS } from '@/types/research.types';
import { ExternalLink, Users, Calendar, Quote, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui';

interface PaperCardProps {
  paper: ResearchPaper;
  viewMode: 'grid' | 'list';
  onSelect: () => void;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper, viewMode, onSelect }) => {
  // Calculate reading time estimate (rough calculation based on abstract length)
  const estimateReadingTime = (text: string): number => {
    const wordsPerMinute = 200;
    const wordCount = text.split(' ').length;
    return Math.max(1, Math.round(wordCount / wordsPerMinute));
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const getAcademicLevelColor = (level: string) => {
    const colors = {
      undergraduate: 'bg-green-100 text-green-700 border-green-200',
      graduate: 'bg-blue-100 text-blue-700 border-blue-200',
      advanced: 'bg-purple-100 text-purple-700 border-purple-200',
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getAccessStatusColor = (status: string) => {
    const colors = {
      gold: 'bg-green-100 text-green-700 border-green-200',
      green: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      bronze: 'bg-amber-100 text-amber-700 border-amber-200',
      closed: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getUrlButtonTitle = (url: string): string => {
    if (url.includes('doi.org')) {
      return 'View paper via DOI';
    }
    if (url.includes('openalex.org')) {
      return 'View on OpenAlex';
    }
    if (url.includes('semanticscholar.org')) {
      return 'View on Semantic Scholar';
    }
    if (url.includes('scholar.google.com')) {
      return 'Search on Google Scholar';
    }
    if (url.includes('.pdf')) {
      return 'Download PDF';
    }
    return 'View full paper';
  };

  const getButtonText = (url: string): string => {
    if (url.includes('doi.org')) {
      return 'View via DOI';
    }
    if (url.includes('openalex.org')) {
      return 'View on OpenAlex';
    }
    if (url.includes('semanticscholar.org')) {
      return 'View on Semantic Scholar';
    }
    if (url.includes('scholar.google.com')) {
      return 'Search Scholar';
    }
    if (url.includes('.pdf')) {
      return 'Download PDF';
    }
    return 'Full Paper';
  };

  if (viewMode === 'list') {
    return (
      <article className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Title and Basic Info */}
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer"
                  onClick={onSelect}>
                {paper.title}
              </h3>
              
              <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {paper.authors.slice(0, 3).map(a => a.name).join(', ')}
                  {paper.authors.length > 3 && ` +${paper.authors.length - 3} more`}
                </span>
                
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(paper.publicationDate)}
                </span>
                
                {paper.journal && (
                  <span className="text-slate-500">
                    {paper.journal}
                  </span>
                )}
              </div>
            </div>

            {/* Summary */}
            <p className="text-slate-700 mb-3 line-clamp-3">
              {paper.summary || paper.abstract}
            </p>

            {/* Geography Topics */}
            <div className="flex flex-wrap gap-1 mb-3">
              {paper.geographySubfields.slice(0, 4).map(topic => (
                <span
                  key={topic}
                  className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-md"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar with Metadata */}
          <div className="w-48 space-y-3">
            {/* Access and Level Badges */}
            <div className="space-y-2">
              <div className={`px-2 py-1 text-xs rounded border ${getAcademicLevelColor(paper.academicLevel)}`}>
                {ACADEMIC_LEVELS[paper.academicLevel].label}
              </div>
              <div className={`px-2 py-1 text-xs rounded border ${getAccessStatusColor(paper.openAccessStatus)}`}>
                {OPEN_ACCESS_STATUS[paper.openAccessStatus].label}
              </div>
            </div>

            {/* Statistics */}
            <div className="space-y-1 text-xs text-slate-600">
              <div>{paper.citationCount} citations</div>
              <div>Relevance: {paper.relevanceScore}/10</div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {estimateReadingTime(paper.abstract)} min read
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button 
                size="sm" 
                className="w-full"
                onClick={onSelect}
              >
                <BookOpen className="w-4 h-4 mr-1" />
                Read Summary
              </Button>
              
              {paper.url && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open(paper.url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  {getButtonText(paper.url)}
                </Button>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Grid view
  return (
    <article className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
      {/* Accessibility Indicators */}
      <div className="flex gap-2 p-3 border-b bg-slate-50">
        <div className={`px-2 py-1 text-xs rounded border ${getAcademicLevelColor(paper.academicLevel)}`}>
          {ACADEMIC_LEVELS[paper.academicLevel].label}
        </div>
        <div className={`px-2 py-1 text-xs rounded border ${getAccessStatusColor(paper.openAccessStatus)}`}>
          {OPEN_ACCESS_STATUS[paper.openAccessStatus].label}
        </div>
        <div className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded border border-slate-200">
          {paper.citationCount} citations
        </div>
      </div>
      
      {/* Paper Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 cursor-pointer transition-colors"
            onClick={onSelect}>
          {paper.title}
        </h3>
        
        <div className="text-sm text-slate-600 mb-3">
          {paper.authors.slice(0, 2).map(a => a.name).join(', ')}
          {paper.authors.length > 2 && ` +${paper.authors.length - 2} more`}
        </div>
        
        {/* Student-Friendly Summary */}
        <p className="text-slate-700 mb-3 line-clamp-3">
          {paper.summary || paper.abstract}
        </p>
        
        {/* Geography Topics */}
        <div className="flex flex-wrap gap-1 mb-3">
          {paper.geographySubfields.slice(0, 3).map(topic => (
            <span
              key={topic}
              className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-md"
            >
              {topic}
            </span>
          ))}
        </div>
        
        {/* Methodology Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md">
            <Quote className="w-3 h-3" />
            {paper.methodology}
          </span>
        </div>
        
        {/* Footer Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(paper.publicationDate)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {estimateReadingTime(paper.abstract)} min
            </span>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onSelect}
            >
              Read Summary
            </Button>
            
            {paper.url && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(paper.url, '_blank')}
                className="text-slate-600 hover:text-slate-900"
                title={getUrlButtonTitle(paper.url)}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PaperCard;
