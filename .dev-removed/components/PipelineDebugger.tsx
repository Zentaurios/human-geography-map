'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useResearchPapers } from '@/hooks/useResearchPapers';

export default function PipelineDebugger() {
  const { papers, loading, apiStatus } = useResearchPapers();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Card className="border-2 border-red-200 bg-red-50/50 mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          🔍 Pipeline Debugger 
          <Badge variant="outline" className="text-xs">DEV ONLY</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-medium">📊 Current State</div>
            <div>Papers displayed: <span className="font-bold">{papers.length}</span></div>
            <div>Loading: <span className={loading ? 'text-orange-600' : 'text-green-600'}>{loading ? 'Yes' : 'No'}</span></div>
            <div>Last API: <span className="text-blue-600">{apiStatus.lastSuccessfulApi || 'None'}</span></div>
          </div>
          
          <div>
            <div className="font-medium">🌐 API Status</div>
            <div>Semantic Scholar: <span className={apiStatus.semanticScholarStatus === 'working' ? 'text-green-600' : 'text-red-600'}>{apiStatus.semanticScholarStatus}</span></div>
            <div>OpenAlex: <span className={apiStatus.openAlexStatus === 'working' ? 'text-green-600' : 'text-red-600'}>{apiStatus.openAlexStatus}</span></div>
          </div>
        </div>
        
        <div className="border-t pt-2 text-orange-700">
          <div className="font-medium">🎯 Expected vs Actual</div>
          <div>Expected: 30+ papers from APIs, 12+ displayed initially</div>
          <div>Actual: {papers.length} papers displayed</div>
          <div className="mt-1">
            {papers.length >= 12 ? (
              <span className="text-green-600">✅ Pipeline working correctly!</span>
            ) : papers.length >= 5 ? (
              <span className="text-yellow-600">⚠️ Some papers lost in pipeline - check console</span>
            ) : (
              <span className="text-red-600">❌ Major pipeline issue - check console for details</span>
            )}
          </div>
        </div>
        
        <div className="text-gray-600 text-xs">
          💡 Check browser console for detailed pipeline logs
        </div>
      </CardContent>
    </Card>
  );
}