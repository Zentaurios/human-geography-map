import { Metadata } from 'next';
import NewsPageContent from './NewsPageContent';

export const metadata: Metadata = {
  title: 'Geography News - Human Geography Learning Platform',
  description: 'Current events and news stories that teach geography concepts and research methodology. Learn source evaluation and critical analysis skills.',
  keywords: [
    'geography news',
    'current events',
    'educational news',
    'human geography',
    'news literacy',
    'source evaluation',
    'research methods',
    'geography education'
  ],
  openGraph: {
    title: 'Geography News - Human Geography Learning Platform',
    description: 'Current events and educational resources that teach geography concepts and research methodology.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Geography News - Human Geography Learning Platform',
    description: 'Current events and educational resources that teach geography concepts and research methodology.',
  },
};

export default function NewsPage() {
  return <NewsPageContent />;
}
