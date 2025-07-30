'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Zap, BarChart3, RefreshCw } from 'lucide-react';
import { useResearchPapers } from '@/hooks/useResearchPapers';

export default function QuickApiStatus() {
  const { papers, loading, apiStatus } = useResearchPapers();
  const [showDetails, setShowDetails] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const runQuickTest = async () => {
    try {
      const [semantic, openAlex] = await Promise.all([
        fetch('https://api.semanticscholar.org/graph/v1/paper/search?query=test&limit=1'),
        fetch('https://api.openalex.org/works?search=test&per_page=1')
      ]);
      
      console.log('🧪 Quick API Test Results:');
      console.log('  Semantic Scholar:', semantic.ok ? '✅ Working' : '❌ Failed');
      console.log('  OpenAlex:', openAlex.ok ? '✅ Working' : '❌ Failed');
      console.log('  Papers on page:', papers.length);
      console.log('  Status:', papers.length > 10 ? '🎉 EXCELLENT' : papers.length > 5 ? '✅ Good' : '⚠️ Needs improvement');
    } catch (error) {
      console.error('❌ Quick test failed:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': case 'working': return 'text-green-600';
      case 'rate-limited': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getOverallStatus = () => {
    const workingApis = [apiStatus.semanticScholarStatus, apiStatus.openAlexStatus].filter(s => s === 'working').length;
    if (workingApis === 2 && papers.length > 10) return { status: 'excellent', color: 'bg-green-500', label: '🎉 EXCELLENT' };
    if (workingApis >= 1 && papers.length > 5) return { status: 'good', color: 'bg-blue-500', label: '✅ Good' };
    if (papers.length > 0) return { status: 'ok', color: 'bg-yellow-500', label: '⚠️ Needs Work' };
    return { status: 'poor', color: 'bg-red-500', label: '❌ Issues' };
  };

  const overall = getOverallStatus();

  return (
    <Card className="border-2 border-orange-200 bg-orange-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            API Status Monitor
            <Badge className={`${overall.color} text-white text-xs`}>
              {overall.label}
            </Badge>
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={runQuickTest}
              className="text-xs"
            >
              <Zap className="w-3 h-3 mr-1" />
              Quick Test
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs"
            >
              {showDetails ? 'Hide' : 'Details'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="text-center">
            <div className="font-medium">Papers Found</div>
            <div className={`text-lg font-bold ${papers.length > 10 ? 'text-green-600' : papers.length > 5 ? 'text-blue-600' : 'text-red-600'}`}>
              {papers.length}
            </div>
          </div>
          
          <div className="text-center">
            <div className="font-medium">Semantic Scholar</div>
            <div className={`flex items-center justify-center gap-1 ${getStatusColor(apiStatus.semanticScholarStatus)}`}>
              {apiStatus.semanticScholarStatus === 'working' ? 
                <CheckCircle className="w-3 h-3" /> : 
                <AlertTriangle className="w-3 h-3" />}
              <span className="capitalize">{apiStatus.semanticScholarStatus}</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="font-medium">OpenAlex</div>
            <div className={`flex items-center justify-center gap-1 ${getStatusColor(apiStatus.openAlexStatus)}`}>
              {apiStatus.openAlexStatus === 'working' ? 
                <CheckCircle className="w-3 h-3" /> : 
                <AlertTriangle className="w-3 h-3" />}
              <span className="capitalize">{apiStatus.openAlexStatus}</span>
            </div>
          </div>
        </div>

        {showDetails && (
          <div className="mt-3 pt-3 border-t border-orange-200">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Loading:</span>
                <span className={loading ? 'text-orange-600' : 'text-green-600'}>
                  {loading ? '🔄 Yes' : '✅ No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Last API Call:</span>
                <span className="text-gray-600">
                  {apiStatus.lastApiCall ? apiStatus.lastApiCall.toLocaleTimeString() : 'None'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Data Source:</span>
                <span className="text-blue-600">
                  {apiStatus.lastSuccessfulApi || 'Unknown'}
                </span>
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-600">
              <strong>Expected:</strong> 12+ papers initially, 40+ total available
            </div>
          </div>
        )}

        {papers.length < 10 && (
          <div className="mt-3 pt-3 border-t border-orange-200">
            <div className="text-xs text-orange-700">
              💡 <strong>Tip:</strong> Expected 12+ papers. Run Quick Test or check console for debugging info.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}