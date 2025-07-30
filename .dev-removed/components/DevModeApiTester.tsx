'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, Code, FlaskConical, Zap } from 'lucide-react';
import { useResearchPapers } from '@/hooks/useResearchPapers';

export default function DevModeApiTester() {
  const [testQuery, setTestQuery] = useState('urban heat islands');
  const [testResults, setTestResults] = useState<any>(null);
  const [testLoading, setTestLoading] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

  // Integrate with existing hook
  const { papers, loading, error, searchPapers, apiStatus } = useResearchPapers();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const addToConsole = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setConsoleOutput(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const testApiIntegration = async () => {
    setTestLoading(true);
    setConsoleOutput([]);
    addToConsole('🧪 Starting API integration test...');
    
    try {
      addToConsole(`📝 Testing query: "${testQuery}"`);
      addToConsole('🔍 Current hook state:');
      addToConsole(`  - Papers loaded: ${papers.length}`);
      addToConsole(`  - Loading: ${loading}`);
      addToConsole(`  - Error: ${error || 'none'}`);
      addToConsole(`  - API Status: ${JSON.stringify(apiStatus)}`);
      
      // Test the hook directly
      addToConsole('🎯 Triggering search through hook...');
      const startTime = Date.now();
      
      await searchPapers(testQuery, {});
      
      const endTime = Date.now();
      addToConsole(`✅ Search completed in ${endTime - startTime}ms`);
      addToConsole(`📊 Results: ${papers.length} papers found`);
      
      // Test direct API calls
      addToConsole('🔬 Testing direct API calls...');
      
      // Test Semantic Scholar
      try {
        const semanticResponse = await fetch(
          `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(testQuery)}&limit=3`
        );
        if (semanticResponse.ok) {
          const semanticData = await semanticResponse.json();
          addToConsole(`✅ Semantic Scholar: ${semanticData.total} total papers, ${semanticData.data?.length} returned`);
        } else {
          addToConsole(`❌ Semantic Scholar failed: ${semanticResponse.status}`);
        }
      } catch (e: any) {
        addToConsole(`❌ Semantic Scholar error: ${e.message}`);
      }
      
      // Test OpenAlex
      try {
        const openAlexResponse = await fetch(
          `https://api.openalex.org/works?search=${encodeURIComponent(testQuery)}&per_page=3`
        );
        if (openAlexResponse.ok) {
          const openAlexData = await openAlexResponse.json();
          addToConsole(`✅ OpenAlex: ${openAlexData.meta?.count} total papers, ${openAlexData.results?.length} returned`);
        } else {
          addToConsole(`❌ OpenAlex failed: ${openAlexResponse.status}`);
        }
      } catch (e: any) {
        addToConsole(`❌ OpenAlex error: ${e.message}`);
      }
      
      setTestResults({
        query: testQuery,
        hookPapers: papers.length,
        apiStatus,
        timestamp: new Date().toISOString()
      });
      
      addToConsole('🎉 API integration test completed!');
      
    } catch (error: any) {
      addToConsole(`💥 Test failed: ${error.message}`);
    } finally {
      setTestLoading(false);
    }
  };

  const runQuickConsoleTest = () => {
    const testScript = `
// Quick API Integration Test
async function quickApiTest() {
  console.log('🧪 Running quick API test...');
  
  // Test APIs
  try {
    const [semantic, openAlex] = await Promise.all([
      fetch('https://api.semanticscholar.org/graph/v1/paper/search?query=test&limit=1'),
      fetch('https://api.openalex.org/works?search=test&per_page=1')
    ]);
    
    console.log('📊 API Results:');
    console.log('  Semantic Scholar:', semantic.ok ? '✅ Working' : '❌ Failed');
    console.log('  OpenAlex:', openAlex.ok ? '✅ Working' : '❌ Failed');
    
    // Check page data
    const papers = document.querySelectorAll('[data-testid="paper-card"], .paper-card');
    console.log('📄 Papers on page:', papers.length);
    
    const titles = Array.from(document.querySelectorAll('h3, h4'))
      .map(el => el.textContent?.trim())
      .filter(t => t && t.length > 20)
      .slice(0, 3);
    console.log('📋 Sample titles:', titles);
    
    console.log('🎯 Integration status:', papers.length > 0 && titles.length > 0 ? '✅ Working' : '⚠️ Check implementation');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

quickApiTest();`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(testScript).then(() => {
      addToConsole('📋 Console test script copied to clipboard!');
      addToConsole('👉 Paste in browser console (F12) and press Enter');
    });
  };

  return (
    <Card className="mt-8 border-orange-300 border-2 bg-orange-50/50 dark:bg-orange-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-600">
          <FlaskConical className="w-5 h-5" />
          🛠️ Development Mode: API Testing Suite
          <Badge variant="outline" className="bg-orange-100 text-orange-700">
            DEV ONLY
          </Badge>
        </CardTitle>
        <p className="text-sm text-orange-600/80">
          Test and verify your API integration. This panel only appears in development mode.
        </p>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="interactive" className="w-full">
          <TabsList>
            <TabsTrigger value="interactive">🧪 Interactive Testing</TabsTrigger>
            <TabsTrigger value="console">💻 Console Testing</TabsTrigger>
            <TabsTrigger value="status">📊 Live Status</TabsTrigger>
          </TabsList>

          <TabsContent value="interactive" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="test-query">Test Search Query</Label>
                  <Input
                    id="test-query"
                    value={testQuery}
                    onChange={(e) => setTestQuery(e.target.value)}
                    placeholder="Enter test search term..."
                    className="mt-1"
                  />
                </div>
                
                <Button 
                  onClick={testApiIntegration} 
                  disabled={testLoading}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  {testLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Testing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Run Integration Test
                    </>
                  )}
                </Button>

                {testResults && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">✅ Test Results</h4>
                    <div className="text-sm space-y-1">
                      <div>Query: <code className="bg-white px-1 rounded">{testResults.query}</code></div>
                      <div>Papers Found: <strong>{testResults.hookPapers}</strong></div>
                      <div>Semantic Scholar: <span className={apiStatus.semanticScholar === 'healthy' ? 'text-green-600' : 'text-orange-600'}>{apiStatus.semanticScholar}</span></div>
                      <div>OpenAlex: <span className={apiStatus.openAlex === 'healthy' ? 'text-green-600' : 'text-orange-600'}>{apiStatus.openAlex}</span></div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label>Console Output</Label>
                <Textarea
                  className="mt-1 h-48 font-mono text-xs bg-gray-900 text-green-400 border-gray-700"
                  value={consoleOutput.join('\n')}
                  readOnly
                  placeholder="Test output will appear here..."
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="console" className="space-y-4">
            <div className="p-4 bg-gray-900 rounded-lg text-green-400 font-mono text-sm">
              <div className="mb-3 text-white">💻 Browser Console Test Script</div>
              <div className="text-gray-300 text-xs mb-3">
                This script tests your APIs directly in the browser console:
              </div>
              <pre className="whitespace-pre-wrap text-xs overflow-auto max-h-48">
{`// Quick API Integration Test
async function quickApiTest() {
  console.log('🧪 Running quick API test...');
  
  try {
    const [semantic, openAlex] = await Promise.all([
      fetch('https://api.semanticscholar.org/graph/v1/paper/search?query=test&limit=1'),
      fetch('https://api.openalex.org/works?search=test&per_page=1')
    ]);
    
    console.log('📊 API Results:');
    console.log('  Semantic Scholar:', semantic.ok ? '✅ Working' : '❌ Failed');
    console.log('  OpenAlex:', openAlex.ok ? '✅ Working' : '❌ Failed');
    
    const papers = document.querySelectorAll('[data-testid="paper-card"], .paper-card');
    console.log('📄 Papers on page:', papers.length);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

quickApiTest();`}
              </pre>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={runQuickConsoleTest} variant="outline">
                <Code className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('data:text/plain;charset=utf-8,console.log("Open browser console (F12) and paste the test script");', '_blank')}
              >
                📋 Instructions
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="status" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🔄 Live Hook Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Papers Loaded:</span>
                    <Badge variant="outline">{papers.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Loading State:</span>
                    {loading ? (
                      <Badge variant="secondary">🔄 Loading</Badge>
                    ) : (
                      <Badge variant="default">✅ Ready</Badge>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Error State:</span>
                    {error ? (
                      <Badge variant="destructive">❌ Error</Badge>
                    ) : (
                      <Badge variant="default">✅ No Errors</Badge>
                    )}
                  </div>
                  {error && (
                    <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                      {error}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🌐 API Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Semantic Scholar:</span>
                    <Badge variant={apiStatus.semanticScholar === 'healthy' ? 'default' : 'secondary'}>
                      {apiStatus.semanticScholar === 'healthy' ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Healthy
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {apiStatus.semanticScholar || 'Unknown'}
                        </>
                      )}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>OpenAlex:</span>
                    <Badge variant={apiStatus.openAlex === 'healthy' ? 'default' : 'secondary'}>
                      {apiStatus.openAlex === 'healthy' ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Healthy
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {apiStatus.openAlex || 'Unknown'}
                        </>
                      )}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Fallback Mode:</span>
                    <Badge variant={apiStatus.fallback ? 'secondary' : 'default'}>
                      {apiStatus.fallback ? '📋 Using Fallback' : '🔴 Live APIs'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">💡 Development Tips</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Check browser Network tab to see actual API calls</li>
                <li>• Use browser console for real-time debugging</li>
                <li>• Test different search terms to verify API integration</li>
                <li>• Monitor API status for rate limiting or failures</li>
                <li>• Verify fallback content loads when APIs are down</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}