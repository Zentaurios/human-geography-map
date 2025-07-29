import { Metadata } from 'next';
import { ResourcesPageClient } from './ResourcesPageClient';

export const metadata: Metadata = {
  title: 'Educational Resources - Human Geography Learning Platform',
  description: 'Access comprehensive study materials, interactive learning tools, and trusted educational resources for human geography. Includes downloadable guides, external links, and research tools.',
  keywords: [
    'geography resources',
    'educational materials',
    'study guides',
    'interactive tools',
    'human geography',
    'learning resources',
    'educational links',
    'geography worksheets',
    'study materials'
  ],
  openGraph: {
    title: 'Educational Resources - Human Geography Learning Platform',
    description: 'Comprehensive study materials and interactive tools for mastering human geography concepts.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Educational Resources - Human Geography Learning Platform',
    description: 'Access study guides, interactive tools, and trusted educational resources for geography learning.',
  },
};

export default function ResourcesPage() {
  return <ResourcesPageClient />;
}
