'use client';

import { Play, Download, Eye, BookOpen, FileText, CheckCircle, ExternalLink } from 'lucide-react';
import { Resource } from '@/types/resource.types';

interface ResourceCardProps {
  resource: Resource;
  onAction?: (resource: Resource, action: 'view' | 'download' | 'launch') => void;
}

export function ResourceCard({ resource, onAction }: ResourceCardProps) {
  const getIcon = () => {
    switch (resource.type) {
      case 'interactive':
        return <Play className="w-5 h-5" />;
      case 'guide':
        return <BookOpen className="w-5 h-5" />;
      case 'worksheet':
        return <FileText className="w-5 h-5" />;
      case 'assessment':
        return <CheckCircle className="w-5 h-5" />;
      case 'link':
        return <ExternalLink className="w-5 h-5" />;
      default:
        return <Download className="w-5 h-5" />;
    }
  };

  const getBadgeColor = (level: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800 border-green-200',
      intermediate: 'bg-blue-100 text-blue-800 border-blue-200',
      advanced: 'bg-purple-100 text-purple-800 border-purple-200',
      ap: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getTypeBadgeColor = (type: string) => {
    const colors = {
      interactive: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      guide: 'bg-blue-100 text-blue-800 border-blue-200',
      worksheet: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      assessment: 'bg-purple-100 text-purple-800 border-purple-200',
      pdf: 'bg-orange-100 text-orange-800 border-orange-200',
      link: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleAction = (action: 'view' | 'download' | 'launch') => {
    onAction?.(resource, action);
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow p-6">
      {/* Header with badges */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2">
          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium border rounded ${getTypeBadgeColor(resource.type)}`}>
            {getIcon()}
            {resource.type}
          </span>
          <span className={`px-2 py-1 text-xs font-medium border rounded ${getBadgeColor(resource.level)}`}>
            {resource.level}
          </span>
        </div>
        
        {resource.estimatedTime && (
          <span className="text-xs text-slate-500">
            {resource.estimatedTime}
          </span>
        )}
      </div>

      {/* Content */}
      <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-slate-900">
        {resource.title}
      </h3>

      <p className="text-slate-600 text-sm mb-4 line-clamp-3">
        {resource.description}
      </p>

      {/* Topics */}
      {resource.topics && resource.topics.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {resource.topics.slice(0, 3).map(topic => (
            <span
              key={topic}
              className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded border border-slate-200"
            >
              {topic}
            </span>
          ))}
          {resource.topics.length > 3 && (
            <span className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded border border-slate-200">
              +{resource.topics.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Metadata */}
      <div className="text-xs text-slate-500 mb-4 space-y-1">
        {resource.pageCount && (
          <div>{resource.pageCount} pages</div>
        )}
        {resource.lastUpdated && (
          <div>Updated: {new Date(resource.lastUpdated).toLocaleDateString()}</div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {resource.type === 'interactive' ? (
          <button
            onClick={() => handleAction('launch')}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Play className="w-4 h-4" />
            Launch Tool
          </button>
        ) : resource.type === 'link' ? (
          <button
            onClick={() => handleAction('view')}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Visit Resource
          </button>
        ) : (
          <button
            onClick={() => handleAction('download')}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        )}
        
        {resource.previewAvailable && (
          <button
            onClick={() => handleAction('view')}
            className="px-3 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            title="Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
