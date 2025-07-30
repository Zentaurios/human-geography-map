'use client';

import { useState, useCallback, useRef } from 'react';

type TestStatus = 'pending' | 'running' | 'success' | 'error';

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

export default function ApiIntegrationTester() {
  const [testStatuses, setTestStatuses] = useState<Record<string, TestStatus>>({
    test1: 'pending',
    test2: 'pending',
    test3: 'pending',
    test4: 'pending',
  });
  
  const [logs, setLogs] = useState<Record<string, LogEntry[]>>({
    test1: [],
    test2: [],
    test3: [],
    test4: [],
  });
  
  const [testResults, setTestResults] = useState<any>({});
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [testQuery, setTestQuery] = useState('urban geography');
  const networkRequests = useRef<any[]>([]);
  const originalFetch = useRef<typeof fetch>();

  const addLog = useCallback((testId: string, message: string, type: LogEntry['type'] = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => ({
      ...prev,
      [testId]: [...prev[testId], { timestamp, message, type }]
    }));
  }, []);

  const setStatus = useCallback((testId: string, status: TestStatus) => {
    setTestStatuses(prev => ({ ...prev, [testId]: status }));
  }, []);

  // Test Semantic Scholar API directly
  const testSemanticScholar = async () => {
    try {
      const params = new URLSearchParams({
        query: 'urban geography',
        limit: '5',
        fields: 'paperId,title,abstract,authors,year,venue,citationCount,isOpenAccess,openAccessPdf,fieldsOfStudy',
      });

      const response = await fetch(
        `https://api.semanticscholar.org/graph/v1/paper/search?${params}`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      
      addLog('test1', `Semantic Scholar Status: ${response.status}`, 'info');
      
      if (response.ok) {
        const data = await response.json();
        addLog('test1', `✅ Semantic Scholar Success! Total: ${data.total}, Returned: ${data.data?.length || 0}`, 'success');
        addLog('test1', `Sample paper: ${data.data?.[0]?.title || 'No title'}`, 'info');
        return data;
      } else {
        addLog('test1', `❌ Semantic Scholar Failed: ${response.statusText}`, 'error');
        return null;
      }
    } catch (error: any) {
      addLog('test1', `💥 Semantic Scholar Error: ${error.message}`, 'error');
      return null;
    }
  };

  // Test OpenAlex API directly
  const testOpenAlex = async () => {
    try {
      const params = new URLSearchParams({
        search: 'urban geography',
        per_page: '5',
        mailto: 'reisscoding@gmail.com',
      });

      const response = await fetch(
        `https://api.openalex.org/works?${params}`,
        {
          headers: {
            'User-Agent': 'HumanGeographyLearning/1.0 (reisscoding@gmail.com)',
          },
        }
      );
      
      addLog('test1', `OpenAlex Status: ${response.status}`, 'info');
      
      if (response.ok) {
        const data = await response.json();
        addLog('test1', `✅ OpenAlex Success! Total: ${data.meta?.count || 'unknown'}, Returned: ${data.results?.length || 0}`, 'success');
        addLog('test1', `Sample paper: ${data.results?.[0]?.title || 'No title'}`, 'info');
        return data;
      } else {
        addLog('test1', `❌ OpenAlex Failed: ${response.statusText}`, 'error');
        return null;
      }
    } catch (error: any) {
      addLog('test1', `💥 OpenAlex Error: ${error.message}`, 'error');
      return null;
    }
  };

  // Test 1: Direct API Testing
  const runDirectApiTests = async () => {
    setStatus('test1', 'running');
    addLog('test1', 'Starting Direct API Tests...', 'info');
    
    try {
      addLog('test1', 'Testing Semantic Scholar API...', 'info');
      const semanticData = await testSemanticScholar();
      
      addLog('test1', 'Testing OpenAlex API...', 'info');
      const openAlexData = await testOpenAlex();
      
      const result = {
        semanticScholar: !!semanticData,
        openAlex: !!openAlexData,
        semanticData,
        openAlexData
      };
      
      setTestResults(prev => ({ ...prev, directApi: result }));
      
      if (semanticData || openAlexData) {
        setStatus('test1', 'success');
        addLog('test1', 'Direct API tests completed successfully!', 'success');
      } else {
        setStatus('test1', 'error');
        addLog('test1', 'Both APIs failed to respond', 'error');
      }
      
    } catch (error: any) {
      setStatus('test1', 'error');
      addLog('test1', `Direct API test error: ${error.message}`, 'error');
      setTestResults(prev => ({ ...prev, directApi: { error: error.message, semanticScholar: false, openAlex: false } }));
    }
  };

  // Test 2: Page Data Inspection
  const inspectPageData = () => {
    setStatus('test2', 'running');
    addLog('test2', 'Inspecting current page data...', 'info');
    
    try {
      // Look for paper elements in the research page
      const paperCards = document.querySelectorAll('[data-testid="paper-card"], [class*="paper-card"], [class*="research-grid"] > div');
      addLog('test2', `Found ${paperCards.length} paper card elements`, 'info');
      
      // Extract paper titles from the page
      const paperTitles = Array.from(document.querySelectorAll('h3, h4, [class*="title"]'))
        .map(el => el.textContent?.trim())
        .filter(title => title && title.length > 20 && !title.includes('Loading') && !title.includes('Error'))
        .slice(0, 10);
      
      addLog('test2', `Found ${paperTitles.length} potential paper titles`, 'info');
      paperTitles.forEach((title, index) => {
        addLog('test2', `${index + 1}. ${title.substring(0, 80)}...`, 'info');
      });
      
      // Check for mock data indicators
      const bodyText = document.body.textContent?.toLowerCase() || '';
      const mockIndicators = [
        'sample papers',
        'demo content', 
        'example research',
        'placeholder',
        'mock data',
        'test paper'
      ];
      
      const foundMockIndicators = mockIndicators.filter(indicator => 
        bodyText.includes(indicator)
      );
      
      if (foundMockIndicators.length > 0) {
        addLog('test2', `⚠️ Mock data indicators found: ${foundMockIndicators.join(', ')}`, 'warning');
      } else {
        addLog('test2', '✅ No obvious mock data indicators found', 'success');
      }
      
      const result = {
        paperCards: paperCards.length,
        paperTitles: paperTitles.length,
        mockIndicators: foundMockIndicators,
        titles: paperTitles
      };
      
      setTestResults(prev => ({ ...prev, pageInspection: result }));
      setStatus('test2', 'success');
      addLog('test2', 'Page inspection completed', 'success');
      
    } catch (error: any) {
      setStatus('test2', 'error');
      addLog('test2', `Page inspection error: ${error.message}`, 'error');
      setTestResults(prev => ({ ...prev, pageInspection: { error: error.message, paperCards: 0, paperTitles: 0, mockIndicators: [], titles: [] } }));
    }
  };

  // Test 3: Research Hook Test
  const testResearchHook = () => {
    setStatus('test3', 'running');
    addLog('test3', 'Testing research hook integration...', 'info');
    
    try {
      const searchInput = document.querySelector('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"]') as HTMLInputElement;
      
      if (searchInput) {
        addLog('test3', '🔍 Found search input, triggering test search...', 'info');
        
        searchInput.value = testQuery;
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        searchInput.dispatchEvent(new Event('change', { bubbles: true }));
        
        const form = searchInput.closest('form');
        if (form) {
          form.dispatchEvent(new Event('submit', { bubbles: true }));
          addLog('test3', '📋 Triggered form submission', 'info');
        }
        
        addLog('test3', `🚀 Triggered search for "${testQuery}"`, 'success');
        addLog('test3', '👀 Monitor network tab for API calls...', 'info');
        
        setTestResults(prev => ({ ...prev, hookTest: { searchTriggered: true, query: testQuery } }));
        setStatus('test3', 'success');
        
      } else {
        addLog('test3', '⚠️ Could not find search input on page', 'warning');
        setStatus('test3', 'error');
        setTestResults(prev => ({ ...prev, hookTest: { searchTriggered: false, reason: 'No search input found' } }));
      }
      
    } catch (error: any) {
      setStatus('test3', 'error');
      addLog('test3', `Hook test error: ${error.message}`, 'error');
      setTestResults(prev => ({ ...prev, hookTest: { error: error.message, searchTriggered: false } }));
    }
  };

  // Test 4: Network Monitoring
  const startNetworkMonitoring = () => {
    setStatus('test4', 'running');
    addLog('test4', 'Starting network request monitoring...', 'info');
    
    networkRequests.current = [];
    setIsMonitoring(true);
    
    // Store original fetch
    originalFetch.current = window.fetch;
    
    // Override fetch
    window.fetch = async function(...args: Parameters<typeof fetch>) {
      const [url, options] = args;
      const startTime = Date.now();
      
      addLog('test4', `📡 FETCH: ${typeof url === 'string' ? url : url.url}`, 'info');
      
      try {
        const response = await originalFetch.current!.apply(this, args);
        const endTime = Date.now();
        
        networkRequests.current.push({
          url: typeof url === 'string' ? url : url.url,
          method: options?.method || 'GET',
          status: response.status,
          duration: endTime - startTime,
          timestamp: new Date().toISOString()
        });
        
        addLog('test4', `✅ ${response.status} ${typeof url === 'string' ? url : url.url} (${endTime - startTime}ms)`, 'success');
        return response;
      } catch (error: any) {
        const endTime = Date.now();
        
        networkRequests.current.push({
          url: typeof url === 'string' ? url : url.url,
          method: options?.method || 'GET',
          error: error.message,
          duration: endTime - startTime,
          timestamp: new Date().toISOString()
        });
        
        addLog('test4', `❌ ERROR ${typeof url === 'string' ? url : url.url}: ${error.message}`, 'error');
        throw error;
      }
    };
    
    addLog('test4', '🎯 Network monitoring active - trigger some API calls!', 'success');
  };

  const stopNetworkMonitoring = () => {
    if (isMonitoring && originalFetch.current) {
      window.fetch = originalFetch.current;
      setIsMonitoring(false);
      
      addLog('test4', `🛑 Network monitoring stopped. Captured ${networkRequests.current.length} requests`, 'info');
      
      const apiRequests = networkRequests.current.filter(req => 
        req.url.includes('semanticscholar.org') || 
        req.url.includes('openalex.org') ||
        req.url.includes('/api/')
      );
      
      if (apiRequests.length > 0) {
        addLog('test4', `✅ Found ${apiRequests.length} API requests:`, 'success');
        apiRequests.forEach(req => {
          addLog('test4', `  - ${req.method} ${req.url} (${req.status || 'ERROR'})`, 'info');
        });
      } else {
        addLog('test4', '⚠️ No API requests detected during monitoring', 'warning');
      }
      
      setTestResults(prev => ({ 
        ...prev, 
        networkMonitoring: {
          totalRequests: networkRequests.current.length,
          apiRequests: apiRequests.length,
          requests: apiRequests
        }
      }));
      
      setStatus('test4', 'success');
    }
  };

  // Run All Tests
  const runAllTests = async () => {
    // Clear previous results
    setLogs({ test1: [], test2: [], test3: [], test4: [] });
    setTestResults({});
    
    // Start monitoring
    startNetworkMonitoring();
    
    // Run tests in sequence
    await runDirectApiTests();
    
    setTimeout(() => {
      inspectPageData();
      
      setTimeout(() => {
        testResearchHook();
        
        setTimeout(() => {
          stopNetworkMonitoring();
        }, 2000);
      }, 1000);
    }, 500);
  };

  const clearLogs = () => {
    setLogs({ test1: [], test2: [], test3: [], test4: [] });
    setTestResults({});
    setTestStatuses({
      test1: 'pending',
      test2: 'pending',
      test3: 'pending',
      test4: 'pending',
    });
  };

  const getStatusColor = (status: TestStatus) => {
    switch (status) {
      case 'pending': return '#6b7280';
      case 'running': return '#3b82f6';
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  // Generate summary
  const generateSummary = () => {
    if (Object.keys(testResults).length === 0) {
      return <p style={{ color: '#6b7280' }}>Run tests to see results...</p>;
    }

    const apisWorking = testResults.directApi && (testResults.directApi.semanticScholar || testResults.directApi.openAlex);
    const realDataDisplayed = testResults.pageInspection && testResults.pageInspection.paperTitles > 0 && testResults.pageInspection.mockIndicators.length === 0;
    const hookWorking = testResults.hookTest && testResults.hookTest.searchTriggered;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {testResults.directApi && (
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>🔗 Direct API Status</h4>
            <div style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Semantic Scholar:</span>
                <span style={{ color: testResults.directApi.semanticScholar ? '#10b981' : '#ef4444' }}>
                  {testResults.directApi.semanticScholar ? '✅ Working' : '❌ Failed'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>OpenAlex:</span>
                <span style={{ color: testResults.directApi.openAlex ? '#10b981' : '#ef4444' }}>
                  {testResults.directApi.openAlex ? '✅ Working' : '❌ Failed'}
                </span>
              </div>
            </div>
          </div>
        )}
        
        {testResults.pageInspection && (
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>📄 Page Data Analysis</h4>
            <div style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Paper Cards:</span>
                <span>{testResults.pageInspection.paperCards}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Paper Titles:</span>
                <span>{testResults.pageInspection.paperTitles}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Mock Indicators:</span>
                <span style={{ color: testResults.pageInspection.mockIndicators.length === 0 ? '#10b981' : '#f59e0b' }}>
                  {testResults.pageInspection.mockIndicators.length === 0 ? '✅ None Found' : `⚠️ ${testResults.pageInspection.mockIndicators.length} Found`}
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
          <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>🎯 Overall Assessment</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span>Integration Status:</span>
            <span style={{ 
              color: apisWorking && realDataDisplayed && hookWorking ? '#10b981' : 
                     apisWorking ? '#f59e0b' : '#ef4444',
              fontWeight: 'bold'
            }}>
              {apisWorking && realDataDisplayed && hookWorking ? '🎉 EXCELLENT - Everything Working!' : 
               apisWorking ? '⚠️ APIs work, check page integration' : 
               '❌ NEEDS ATTENTION - API Issues'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          🔬 API Integration Testing Suite
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
          Comprehensive testing and verification tools for your Human Geography Research API integration
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button 
            onClick={runAllTests}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🚀 Run All Tests
          </button>
          <button 
            onClick={clearLogs}
            style={{
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🧹 Clear Results
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Test Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Test 1: Direct API Testing */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>1. Direct API Testing</h3>
              <span style={{ 
                backgroundColor: getStatusColor(testStatuses.test1),
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem'
              }}>
                {testStatuses.test1}
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              Test Semantic Scholar and OpenAlex APIs directly
            </p>
            <button 
              onClick={runDirectApiTests}
              disabled={testStatuses.test1 === 'running'}
              style={{
                backgroundColor: testStatuses.test1 === 'running' ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                cursor: testStatuses.test1 === 'running' ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Run Direct API Tests
            </button>
            {logs.test1.length > 0 && (
              <div style={{
                marginTop: '0.75rem',
                backgroundColor: '#1e293b',
                color: '#e2e8f0',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                maxHeight: '8rem',
                overflowY: 'auto'
              }}>
                {logs.test1.map((log, i) => (
                  <div key={i} style={{ color: getLogColor(log.type) }}>
                    [{log.timestamp}] {log.message}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Test 2: Page Data Inspection */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>2. Page Data Inspection</h3>
              <span style={{ 
                backgroundColor: getStatusColor(testStatuses.test2),
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem'
              }}>
                {testStatuses.test2}
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              Analyze what's currently displayed on the research page
            </p>
            <button 
              onClick={inspectPageData}
              disabled={testStatuses.test2 === 'running'}
              style={{
                backgroundColor: testStatuses.test2 === 'running' ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                cursor: testStatuses.test2 === 'running' ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Inspect Page Data
            </button>
            {logs.test2.length > 0 && (
              <div style={{
                marginTop: '0.75rem',
                backgroundColor: '#1e293b',
                color: '#e2e8f0',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                maxHeight: '8rem',
                overflowY: 'auto'
              }}>
                {logs.test2.map((log, i) => (
                  <div key={i} style={{ color: getLogColor(log.type) }}>
                    [{log.timestamp}] {log.message}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Test 3: Hook Integration Testing */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>3. Hook Integration Testing</h3>
              <span style={{ 
                backgroundColor: getStatusColor(testStatuses.test3),
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem'
              }}>
                {testStatuses.test3}
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              Test your existing useResearchPapers hook
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.75rem', color: '#374151' }}>Test Query</label>
                <input
                  value={testQuery}
                  onChange={(e) => setTestQuery(e.target.value)}
                  placeholder="Enter test search..."
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              <button 
                onClick={testResearchHook}
                disabled={testStatuses.test3 === 'running'}
                style={{
                  backgroundColor: testStatuses.test3 === 'running' ? '#9ca3af' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  cursor: testStatuses.test3 === 'running' ? 'not-allowed' : 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Test Hook
              </button>
            </div>
            {logs.test3.length > 0 && (
              <div style={{
                marginTop: '0.75rem',
                backgroundColor: '#1e293b',
                color: '#e2e8f0',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                maxHeight: '8rem',
                overflowY: 'auto'
              }}>
                {logs.test3.map((log, i) => (
                  <div key={i} style={{ color: getLogColor(log.type) }}>
                    [{log.timestamp}] {log.message}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Test 4: Network Monitoring */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>4. Network Monitoring</h3>
              <span style={{ 
                backgroundColor: getStatusColor(testStatuses.test4),
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem'
              }}>
                {testStatuses.test4}
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              Monitor actual network requests made by the page
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={startNetworkMonitoring}
                disabled={isMonitoring}
                style={{
                  backgroundColor: isMonitoring ? '#9ca3af' : '#10b981',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  cursor: isMonitoring ? 'not-allowed' : 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Start Monitoring
              </button>
              <button 
                onClick={stopNetworkMonitoring}
                disabled={!isMonitoring}
                style={{
                  backgroundColor: !isMonitoring ? '#9ca3af' : '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  cursor: !isMonitoring ? 'not-allowed' : 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Stop
              </button>
            </div>
            {logs.test4.length > 0 && (
              <div style={{
                marginTop: '0.75rem',
                backgroundColor: '#1e293b',
                color: '#e2e8f0',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                maxHeight: '8rem',
                overflowY: 'auto'
              }}>
                {logs.test4.map((log, i) => (
                  <div key={i} style={{ color: getLogColor(log.type) }}>
                    [{log.timestamp}] {log.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>📊 Test Results Summary</h3>
          {generateSummary()}
        </div>
      </div>

      {/* Quick Console Test */}
      <div style={{ marginTop: '2rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>💻 Quick Console Test</h3>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
          Copy this script and paste it in your browser console (F12) for immediate testing:
        </p>
        <textarea
          readOnly
          value={`// Quick API Integration Test
async function quickApiTest() {
  console.log('🧪 Running quick API test...');
  
  try {
    const [semantic, openAlex] = await Promise.all([
      fetch('https://api.semanticscholar.org/graph/v1/paper/search?query=urban geography&limit=1'),
      fetch('https://api.openalex.org/works?search=urban geography&per_page=1')
    ]);
    
    console.log('📊 API Results:');
    console.log('  Semantic Scholar:', semantic.ok ? '✅ Working' : '❌ Failed');
    console.log('  OpenAlex:', openAlex.ok ? '✅ Working' : '❌ Failed');
    
    const papers = document.querySelectorAll('[data-testid="paper-card"], .paper-card');
    console.log('📄 Papers on page:', papers.length);
    
    const titles = Array.from(document.querySelectorAll('h3, h4'))
      .map(el => el.textContent?.trim())
      .filter(t => t && t.length > 20)
      .slice(0, 3);
    console.log('📋 Sample titles:', titles);
    
    console.log('🎯 Status:', papers.length > 0 && titles.length > 0 ? '✅ Integration Working' : '⚠️ Check Implementation');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

quickApiTest();`}
          style={{
            width: '100%',
            height: '12rem',
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            backgroundColor: '#1f2937',
            color: '#10b981',
            border: '1px solid #374151',
            borderRadius: '0.375rem',
            padding: '0.75rem'
          }}
        />
        <button
          onClick={() => {
            const script = document.querySelector('textarea')?.value;
            if (script) {
              navigator.clipboard.writeText(script).then(() => {
                alert('Console test script copied to clipboard! Open browser console (F12) and paste it.');
              });
            }
          }}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            marginTop: '0.5rem'
          }}
        >
          📋 Copy to Clipboard
        </button>
      </div>
    </div>
  );
}