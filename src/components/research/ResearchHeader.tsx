import React from 'react';
import { Book, Users, Lightbulb, Target } from 'lucide-react';

/**
 * Research page header with educational introduction and methodology guide
 */
const ResearchHeader: React.FC = () => {
  return (
    <div className="mb-12">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-slate-900">
          Geography Research Hub
        </h1>
        <p className="max-w-3xl mx-auto mb-6 text-xl text-slate-600">
          Discover cutting-edge research in human geography while building essential 
          academic literacy skills for college and beyond.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 text-sm text-blue-700 rounded-full bg-blue-50">
          <Book className="w-4 h-4" />
          Academic research made accessible for students
        </div>
      </div>

      {/* Research Literacy Guide */}
      <div className="p-6 mb-8 bg-white border rounded-lg border-slate-200">
        <h2 className="flex items-center gap-2 mb-4 text-2xl font-semibold text-slate-900">
          <Target className="w-6 h-6 text-blue-600" />
          Understanding Academic Research
        </h2>
        
        <p className="mb-6 text-slate-700">
          Academic research is how we expand human understanding of our world. This section helps you 
          discover current geography research while learning how to read, evaluate, and understand 
          scholarly literature – essential skills for any field of study.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Reading Academic Papers */}
          <div className="pl-4 border-l-4 border-l-green-500">
            <h3 className="flex items-center gap-2 mb-2 font-semibold text-slate-900">
              <Book className="w-4 h-4 text-green-600" />
              How to Read Research
            </h3>
            <ul className="space-y-1 text-sm text-slate-600">
              <li>• Start with the abstract and conclusion</li>
              <li>• Look for key findings and methodology</li>
              <li>• Don't worry about understanding everything</li>
              <li>• Focus on the main ideas and evidence</li>
            </ul>
          </div>

          {/* Evaluating Sources */}
          <div className="pl-4 border-l-4 border-l-blue-500">
            <h3 className="flex items-center gap-2 mb-2 font-semibold text-slate-900">
              <Users className="w-4 h-4 text-blue-600" />
              Evaluating Quality
            </h3>
            <ul className="space-y-1 text-sm text-slate-600">
              <li>• Check author credentials and affiliations</li>
              <li>• Look for peer-reviewed journals</li>
              <li>• Consider publication date and citations</li>
              <li>• Assess methodology and evidence quality</li>
            </ul>
          </div>

          {/* Using Research */}
          <div className="pl-4 border-l-4 border-l-purple-500">
            <h3 className="flex items-center gap-2 mb-2 font-semibold text-slate-900">
              <Lightbulb className="w-4 h-4 text-purple-600" />
              Learning from Research
            </h3>
            <ul className="space-y-1 text-sm text-slate-600">
              <li>• Connect findings to real-world examples</li>
              <li>• Compare different research perspectives</li>
              <li>• Think critically about limitations</li>
              <li>• Apply insights to your own projects</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ResearchHeader;
