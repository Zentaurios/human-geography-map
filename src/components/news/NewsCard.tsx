import React from 'react';
import Link from 'next/link';
import { ExternalLink, Clock, BookOpen, Award } from 'lucide-react';
import { NewsArticle } from '@/types/news.types';

interface NewsCardProps {
  article: NewsArticle;
  className?: string;
}

const EducationalBadge = ({ value }: { value: 'high' | 'medium' | 'low' }) => {
  const badgeStyles = {
    high: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-gray-100 text-gray-600 border-gray-200'
  };

  const icons = {
    high: <Award className="w-3 h-3" />,
    medium: <BookOpen className="w-3 h-3" />,
    low: <Clock className="w-3 h-3" />
  };

  const labels = {
    high: 'High Educational Value',
    medium: 'Moderate Educational Value',
    low: 'General Interest'
  };

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium border rounded ${badgeStyles[value]}`}>
      {icons[value]}
      {labels[value]}
    </div>
  );
};

const TopicTags = ({ topics }: { topics: string[] }) => {
  if (!topics || topics.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {topics.slice(0, 3).map((topic) => (
        <span
          key={topic}
          className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded"
        >
          {topic}
        </span>
      ))}
      {topics.length > 3 && (
        <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 border border-gray-200 rounded">
          +{topics.length - 3} more
        </span>
      )}
    </div>
  );
};

export const NewsCard: React.FC<NewsCardProps> = ({ article, className = '' }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const estimateReadingTime = (description: string) => {
    const words = description.split(' ').length;
    const wordsPerMinute = 200;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes === 1 ? '1 min read' : `${minutes} min read`;
  };

  const hasImage = article.urlToImage && !article.urlToImage.includes('placeholder');

  return (
    <article className={`bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
      {/* Image Section */}
      {hasImage && (
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="object-cover w-full h-full"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Content Section */}
      <div className="p-6">
        {/* Header with Source and Educational Value */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="font-medium">{article.source.name}</span>
            <span>•</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          {article.educationalValue && (
            <EducationalBadge value={article.educationalValue} />
          )}
        </div>

        {/* Title */}
        <h3 className="mb-3 text-lg font-semibold leading-tight text-slate-900 line-clamp-2">
          {article.title}
        </h3>

        {/* Description */}
        <p className="mb-4 text-slate-600 line-clamp-3">
          {article.description}
        </p>

        {/* Geography Topics */}
        {article.geographyTopics && article.geographyTopics.length > 0 && (
          <div className="mb-4">
            <TopicTags topics={article.geographyTopics} />
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="w-4 h-4" />
            <span>{estimateReadingTime(article.description)}</span>
          </div>

          <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 transition-colors border border-blue-200 rounded hover:bg-blue-50 hover:text-blue-800"
          >
            Read Article
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
