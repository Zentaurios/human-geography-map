import React, { useState } from 'react';
import { ResearchPaper, ACADEMIC_LEVELS, OPEN_ACCESS_STATUS } from '@/types/research.types';
import { X, ExternalLink, Users, Calendar, Quote, BookOpen, Lightbulb, Target, Share } from 'lucide-react';
import { Button } from '@/components/ui';

interface PaperModalProps {
  paper: ResearchPaper;
  onClose: () => void;
}

type SummaryLevel = 'beginner' | 'student' | 'expert';

const PaperModal: React.FC<PaperModalProps> = ({ paper, onClose }) => {
  const [summaryLevel, setSummaryLevel] = useState<SummaryLevel>('student');
  const [showKeyFindings, setShowKeyFindings] = useState(true);

  // Handle escape key to close modal
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  const generateBeginnerSummary = (abstract: string): string => {
    // Very simplified version for absolute beginners
    const sentences = abstract.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const firstSentence = sentences[0] || '';
    
    return `This research is about ${firstSentence.toLowerCase().replace(/^this research|this study|this paper/i, '').trim()}. The researchers wanted to understand this topic better and collected information to answer their questions. This type of research helps us learn more about how people and places are connected.`;
  };

  const getSummaryContent = (): string => {
    switch (summaryLevel) {
      case 'beginner':
        return generateBeginnerSummary(paper.abstract);
      case 'student':
        return paper.summary || paper.abstract;
      case 'expert':
        return paper.abstract;
      default:
        return paper.summary || paper.abstract;
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: paper.title,
          text: `Check out this research paper: ${paper.title}`,
          url: paper.url || window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    const text = `${paper.title}\n\nBy: ${paper.authors.map(a => a.name).join(', ')}\n\n${paper.summary || paper.abstract}\n\n${paper.url || ''}`;
    navigator.clipboard.writeText(text).then(() => {
      // Could show a toast notification here
      console.log('Copied to clipboard');
    });
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
      return 'Search Google Scholar';
    }
    if (url.includes('.pdf')) {
      return 'Download PDF';
    }
    return 'Read Full Paper';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-slate-200 p-6 z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {paper.title}
                </h2>
                
                <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
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

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <div className={`px-2 py-1 text-xs rounded border ${
                    paper.academicLevel === 'undergraduate' ? 'bg-green-100 text-green-700 border-green-200' :
                    paper.academicLevel === 'graduate' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                    'bg-purple-100 text-purple-700 border-purple-200'
                  }`}>
                    {ACADEMIC_LEVELS[paper.academicLevel].label}
                  </div>
                  
                  <div className={`px-2 py-1 text-xs rounded border ${
                    paper.openAccessStatus === 'gold' ? 'bg-green-100 text-green-700 border-green-200' :
                    paper.openAccessStatus === 'green' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                    paper.openAccessStatus === 'bronze' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                    'bg-gray-100 text-gray-700 border-gray-200'
                  }`}>
                    {OPEN_ACCESS_STATUS[paper.openAccessStatus].label}
                  </div>
                  
                  <div className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded border border-slate-200">
                    {paper.citationCount} citations
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="text-slate-600 hover:text-slate-900"
                >
                  <Share className="w-4 h-4" />
                </Button>
                
                <button
                  onClick={onClose}
                  className="text-slate-600 hover:text-slate-900 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="p-6 space-y-6">
              {/* Reading Level Toggle */}
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Choose Your Reading Level
                </h3>
                <div className="flex gap-2">
                  {[
                    { key: 'beginner', label: 'Plain Language', desc: 'Easy to understand' },
                    { key: 'student', label: 'Student Summary', desc: 'Simplified but detailed' },
                    { key: 'expert', label: 'Original Abstract', desc: 'Full academic text' },
                  ].map(({ key, label, desc }) => (
                    <button
                      key={key}
                      onClick={() => setSummaryLevel(key as SummaryLevel)}
                      className={`flex-1 p-3 text-left rounded-md border transition-colors ${
                        summaryLevel === key
                          ? 'bg-blue-100 border-blue-300 text-blue-700'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-medium text-sm">{label}</div>
                      <div className="text-xs opacity-75">{desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary Content */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Quote className="w-5 h-5 text-blue-600" />
                  Research Summary
                </h3>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 leading-relaxed">
                    {getSummaryContent()}
                  </p>
                </div>
              </div>

              {/* Key Findings */}
              {paper.keyFindings.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    Key Findings
                  </h3>
                  <ul className="space-y-2">
                    {paper.keyFindings.map((finding, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-slate-700">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Research Details */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Methodology */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                    Research Method
                  </h3>
                  <p className="text-slate-700">{paper.methodology}</p>
                  
                  {summaryLevel === 'beginner' && (
                    <div className="mt-3 p-3 bg-blue-100 rounded-md">
                      <p className="text-sm text-blue-800">
                        <strong>What this means:</strong> This is how the researchers collected and 
                        analyzed their information to answer their questions.
                      </p>
                    </div>
                  )}
                </div>

                {/* Geography Topics */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Geography Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {paper.geographySubfields.map(topic => (
                      <span
                        key={topic}
                        className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-md"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-slate-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Paper Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">Publication Date:</span>
                    <span className="ml-2 text-slate-600">{formatDate(paper.publicationDate)}</span>
                  </div>
                  {paper.journal && (
                    <div>
                      <span className="font-medium text-slate-700">Journal:</span>
                      <span className="ml-2 text-slate-600">{paper.journal}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-slate-700">Citations:</span>
                    <span className="ml-2 text-slate-600">{paper.citationCount}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Relevance Score:</span>
                    <span className="ml-2 text-slate-600">{paper.relevanceScore}/10</span>
                  </div>
                  {paper.doi && (
                    <div className="md:col-span-2">
                      <span className="font-medium text-slate-700">DOI:</span>
                      <span className="ml-2 text-slate-600 break-all">{paper.doi}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Extra padding to ensure content clears the sticky footer */}
              <div className="h-24"></div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Educational content enhanced for student learning
              </div>
              
              <div className="flex items-center gap-3">
                {paper.url && (
                  <Button
                    onClick={() => window.open(paper.url, '_blank')}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {getButtonText(paper.url)}
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperModal;
