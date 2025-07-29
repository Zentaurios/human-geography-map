import React from 'react';
import { Newspaper, Search, Eye, BookOpen, Award, AlertTriangle } from 'lucide-react';

export const NewsHeader: React.FC = () => {
  return (
    <section className="mb-8">
      {/* Main Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Newspaper className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-slate-900">Geography News</h1>
        </div>
        <p className="max-w-3xl mx-auto text-xl text-slate-600">
          Understanding Current Events Through a Geographic Lens
        </p>
      </div>

      {/* Educational Context */}
      <div className="p-8 mb-8 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="flex items-center gap-3 mb-4 text-2xl font-semibold text-slate-900">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Developing News Literacy Skills
          </h2>
          
          <p className="mb-6 text-lg leading-relaxed text-slate-700">
            This news section helps you practice essential research skills while staying informed about 
            global geographic trends. Notice how we evaluate sources, identify potential bias, and connect 
            current events to broader geographic patterns.
          </p>

          {/* Research Skills Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-4 bg-white border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Source Evaluation</h3>
              </div>
              <p className="text-sm text-slate-600">
                Learn to identify credible sources, understand publication bias, and recognize 
                educational vs. entertainment content.
              </p>
            </div>

            <div className="p-4 bg-white border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Geographic Thinking</h3>
              </div>
              <p className="text-sm text-slate-600">
                Connect current events to spatial patterns, regional contexts, and 
                human-environment interactions.
              </p>
            </div>

            <div className="p-4 bg-white border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Critical Analysis</h3>
              </div>
              <p className="text-sm text-slate-600">
                Practice questioning assumptions, identifying multiple perspectives, and 
                synthesizing information from various sources.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Source Evaluation Guide */}
      <div className="p-6 mb-8 bg-white border rounded-lg shadow-sm border-slate-200">
        <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-slate-900">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          How We Evaluate News Sources
        </h3>
        
        <div className="grid gap-4 md:grid-cols-3">
          {/* High Educational Value */}
          <div className="p-4 border border-green-200 rounded-lg bg-green-50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-semibold text-green-900">High Educational Value</span>
            </div>
            <p className="mb-3 text-sm text-green-800">
              Educational institutions, research organizations, established science publications
            </p>
            <div className="text-xs text-green-700">
              <strong>Examples:</strong> National Geographic, World Bank, UNESCO, BBC Science
            </div>
          </div>

          {/* Medium Educational Value */}
          <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="font-semibold text-yellow-900">Moderate Educational Value</span>
            </div>
            <p className="mb-3 text-sm text-yellow-800">
              Reputable news organizations with strong science and education reporting
            </p>
            <div className="text-xs text-yellow-700">
              <strong>Examples:</strong> Reuters, Associated Press, NPR, Guardian
            </div>
          </div>

          {/* General Interest */}
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="font-semibold text-gray-900">General Interest</span>
            </div>
            <p className="mb-3 text-sm text-gray-800">
              General news sources that may include relevant geographic content
            </p>
            <div className="text-xs text-gray-700">
              <strong>Note:</strong> Evaluate these sources more critically for educational use
            </div>
          </div>
        </div>

        {/* Research Tips */}
        <div className="p-4 mt-6 border-t border-slate-200">
          <h4 className="mb-3 font-semibold text-slate-900">Research Tips</h4>
          <div className="grid gap-3 text-sm md:grid-cols-2 text-slate-600">
            <div>
              <strong>Ask Questions:</strong> Who funded this research? What geographic regions are included or excluded?
            </div>
            <div>
              <strong>Seek Multiple Sources:</strong> Compare reporting across different publications and perspectives.
            </div>
            <div>
              <strong>Check the Date:</strong> Geographic data and trends change over time - ensure information is current.
            </div>
            <div>
              <strong>Consider Scale:</strong> Local trends may not apply globally - understand geographic context.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsHeader;
