'use client';

import React, { useState, useEffect } from 'react';
import { 
  Loader2, 
  BookOpen, 
  Search, 
  Database,
  CheckCircle,
  Clock,
  Wifi,
  TrendingUp
} from 'lucide-react';

interface ApiStatusLoadingProps {
  apiStatus?: {
    lastSuccessfulApi: 'semantic-scholar' | 'openalex' | 'fallback' | null;
    semanticScholarStatus: 'working' | 'rate-limited' | 'error' | 'untested';
    openAlexStatus: 'working' | 'rate-limited' | 'error' | 'untested';
    lastApiCall: Date | null;
  };
  searchQuery?: string;
}

const LOADING_STEPS = [
  {
    step: 'Optimizing search query...',
    icon: Search,
    duration: 500,
  },
  {
    step: 'Searching Semantic Scholar...',
    icon: Database,
    duration: 1500,
  },
  {
    step: 'Checking OpenAlex database...',
    icon: Database,
    duration: 1200,
  },
  {
    step: 'Processing results...',
    icon: TrendingUp,
    duration: 800,
  },
  {
    step: 'Enhancing papers for students...',
    icon: BookOpen,
    duration: 600,
  },
];

const EnhancedResearchLoadingState: React.FC<ApiStatusLoadingProps> = ({
  apiStatus,
  searchQuery,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let stepTimer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    const startStep = () => {
      if (currentStep < LOADING_STEPS.length - 1) {
        stepTimer = setTimeout(() => {
          setCurrentStep(prev => prev + 1);
          setProgress(0);
        }, LOADING_STEPS[currentStep].duration);
      }
    };

    const updateProgress = () => {
      progressTimer = setInterval(() => {
        setProgress(prev => {
          const increment = 100 / (LOADING_STEPS[currentStep].duration / 50);
          return Math.min(prev + increment, 100);
        });
      }, 50);
    };

    startStep();
    updateProgress();

    return () => {
      clearTimeout(stepTimer);
      clearInterval(progressTimer);
    };
  }, [currentStep]);

  const getApiStatusIcon = (status: string) => {
    switch (status) {
      case 'working':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rate-limited':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'error':
        return <Wifi className="w-4 h-4 text-red-600" />;
      default:
        return <Database className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Loading Animation */}
      <div className="text-center py-12">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          {React.createElement(LOADING_STEPS[currentStep].icon, {
            className: "w-8 h-8 text-slate-400 animate-pulse"
          })}
        </div>
        
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Searching Academic Databases
        </h3>
        
        {searchQuery && (
          <p className="text-slate-600 mb-4">
            Finding research papers about "{searchQuery}"
          </p>
        )}

        {/* Current Step */}
        <div className="max-w-md mx-auto">
          <div className="text-sm text-blue-600 font-medium mb-2">
            {LOADING_STEPS[currentStep].step}
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="text-xs text-gray-500 mt-1">
            Step {currentStep + 1} of {LOADING_STEPS.length}
          </div>
        </div>
      </div>

      {/* API Status Indicators */}
      {apiStatus && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="text-sm font-medium text-blue-900 mb-3 flex items-center gap-2">
              <Database className="w-4 h-4" />
              Data Source Status
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-3 bg-white rounded border">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Semantic Scholar</span>
                  {apiStatus.semanticScholarStatus === 'working' && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Primary
                    </span>
                  )}
                </div>
                {getApiStatusIcon(apiStatus.semanticScholarStatus)}
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white rounded border">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">OpenAlex</span>
                  {apiStatus.openAlexStatus === 'working' && 
                   apiStatus.semanticScholarStatus !== 'working' && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      Primary
                    </span>
                  )}
                </div>
                {getApiStatusIcon(apiStatus.openAlexStatus)}
              </div>
            </div>
            
            {apiStatus.lastApiCall && (
              <div className="text-xs text-blue-700 mt-2 text-center">
                Last API call: {apiStatus.lastApiCall.toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Skeleton Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg border border-slate-200 p-6 animate-pulse"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animationDuration: '1.5s'
            }}
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 bg-slate-200 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-slate-200 rounded mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-2/3"></div>
              </div>
            </div>
            
            {/* Title */}
            <div className="space-y-2 mb-4">
              <div className="h-5 bg-slate-200 rounded"></div>
              <div className="h-5 bg-slate-200 rounded w-4/5"></div>
            </div>
            
            {/* Abstract */}
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-slate-200 rounded"></div>
              <div className="h-3 bg-slate-200 rounded"></div>
              <div className="h-3 bg-slate-200 rounded w-3/4"></div>
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex gap-2">
                <div className="h-6 bg-slate-200 rounded w-16"></div>
                <div className="h-6 bg-slate-200 rounded w-20"></div>
              </div>
              <div className="h-4 bg-slate-200 rounded w-12"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Tips */}
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Did you know?
          </h4>
          <p className="text-gray-600">
            We search multiple academic databases simultaneously to bring you the most 
            comprehensive and up-to-date research in human geography. Each paper is 
            enhanced with student-friendly summaries and educational context.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedResearchLoadingState;