import { Metadata } from 'next';
import { Suspense } from 'react';
import ResearchPageContent from './ResearchPageContent';

export const metadata: Metadata = {
  title: 'Geography Research - Human Geography Learning Platform',
  description: 'Discover academic research in human geography with student-friendly summaries and research literacy guides. Learn to read, evaluate, and understand scholarly literature.',
  keywords: [
    'geography research', 'academic papers', 'human geography studies', 
    'research literacy', 'scholarly articles', 'geography education',
    'research methods', 'academic writing', 'peer review', 'scientific literature'
  ],
  openGraph: {
    title: 'Academic Geography Research for Students',
    description: 'Making university-level geography research accessible to high school students with interactive guides and plain-language summaries.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Geography Research - Human Geography Learning Platform',
    description: 'Discover cutting-edge geography research with student-friendly tools and academic literacy support.',
  },
};

// Loading component for suspense fallback
function ResearchPageLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-slate-200 rounded mb-4 w-1/3"></div>
        <div className="h-4 bg-slate-200 rounded mb-8 w-2/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-slate-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ResearchPage() {
  return (
    <Suspense fallback={<ResearchPageLoading />}>
      <ResearchPageContent />
    </Suspense>
  );
}
