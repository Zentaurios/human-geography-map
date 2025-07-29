'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Play, Download } from 'lucide-react';
import Link from 'next/link';
import { ResourceHeader } from '@/components/resources/ResourceHeader';
import { InteractiveTools } from '@/components/resources/InteractiveTools';
import { DownloadCenter } from '@/components/resources/DownloadCenter';
import { ExternalLinks } from '@/components/resources/ExternalLinks';

type TabType = 'trusted-sources' | 'interactive-tools' | 'study-materials';

export function ResourcesPageClient() {
  const [activeTab, setActiveTab] = useState<TabType>('trusted-sources');

  // URL synchronization for deep linking
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tab = urlParams.get('tab');
      if (tab && ['trusted-sources', 'interactive-tools', 'study-materials'].includes(tab)) {
        setActiveTab(tab as TabType);
      }
    }
  }, []);

  // Update URL when tab changes
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      window.history.replaceState({}, '', url.toString());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header with Back to Map */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl px-4 py-6 mx-auto">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 mb-4 transition-colors text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Interactive Map
          </Link>
          <ResourceHeader />
        </div>
      </header>

      <main className="max-w-6xl px-4 py-8 mx-auto">
        
        {/* Hero Section with Integrated Navigation */}
        <section className="p-8 text-center text-white rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
          <h2 className="mb-4 text-3xl font-bold">Empowering Geographic Learning</h2>
          <p className="max-w-3xl mx-auto text-lg text-blue-100 mb-8">
            Access comprehensive study materials, interactive learning tools, and trusted educational resources 
            to master human geography concepts and develop self-directed learning skills.
          </p>
          
          {/* Navigation Tabs */}
          <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3">
            <button 
              onClick={() => handleTabChange('trusted-sources')}
              className={`p-6 rounded-lg backdrop-blur-sm transition-all ${
                activeTab === 'trusted-sources' 
                  ? 'bg-white/20 border-2 border-white/50 transform scale-105' 
                  : 'bg-white/10 hover:bg-white/15 hover:scale-102'
              }`}
              aria-label="View trusted educational sources"
              aria-pressed={activeTab === 'trusted-sources'}
            >
              <ExternalLink className="w-8 h-8 mx-auto mb-2 text-white" />
              <h3 className="font-semibold text-white">Trusted Sources</h3>
              <p className="text-sm text-blue-100">Educational institution links</p>
            </button>
            
            <button 
              onClick={() => handleTabChange('interactive-tools')}
              className={`p-6 rounded-lg backdrop-blur-sm transition-all ${
                activeTab === 'interactive-tools' 
                  ? 'bg-white/20 border-2 border-white/50 transform scale-105' 
                  : 'bg-white/10 hover:bg-white/15 hover:scale-102'
              }`}
              aria-label="Access interactive learning tools"
              aria-pressed={activeTab === 'interactive-tools'}
            >
              <Play className="w-8 h-8 mx-auto mb-2 text-white" />
              <h3 className="font-semibold text-white">Interactive Tools</h3>
              <p className="text-sm text-blue-100">Hands-on learning widgets</p>
            </button>
            
            <button 
              onClick={() => handleTabChange('study-materials')}
              className={`p-6 rounded-lg backdrop-blur-sm transition-all ${
                activeTab === 'study-materials' 
                  ? 'bg-white/20 border-2 border-white/50 transform scale-105' 
                  : 'bg-white/10 hover:bg-white/15 hover:scale-102'
              }`}
              aria-label="Download study materials"
              aria-pressed={activeTab === 'study-materials'}
            >
              <Download className="w-8 h-8 mx-auto mb-2 text-white" />
              <h3 className="font-semibold text-white">Study Materials</h3>
              <p className="text-sm text-blue-100">Downloadable guides & worksheets</p>
            </button>
          </div>
        </section>

        {/* Content Area - Conditional Rendering Based on Active Tab */}
        <div className="mt-12">
          {activeTab === 'trusted-sources' && (
            <div key="trusted-sources" className="animate-in fade-in-50 duration-300">
              <ExternalLinks />
            </div>
          )}
          
          {activeTab === 'interactive-tools' && (
            <div key="interactive-tools" className="animate-in fade-in-50 duration-300">
              <InteractiveTools />
            </div>
          )}
          
          {activeTab === 'study-materials' && (
            <div key="study-materials" className="animate-in fade-in-50 duration-300">
              <DownloadCenter />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
