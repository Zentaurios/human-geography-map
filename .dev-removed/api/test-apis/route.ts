import { NextResponse } from 'next/server';

export async function GET() {
  const results = {
    timestamp: new Date().toISOString(),
    tests: {} as any
  };

  // Test Semantic Scholar API
  try {
    const semanticStart = Date.now();
    const semanticResponse = await fetch(
      'https://api.semanticscholar.org/graph/v1/paper/search?query=test&limit=1',
      { 
        headers: { 'Content-Type': 'application/json' },
        // Add timeout
        signal: AbortSignal.timeout(10000)
      }
    );
    
    const semanticData = semanticResponse.ok ? await semanticResponse.json() : null;
    
    results.tests.semanticScholar = {
      status: semanticResponse.status,
      ok: semanticResponse.ok,
      responseTime: Date.now() - semanticStart,
      totalPapers: semanticData?.total || 0,
      returnedPapers: semanticData?.data?.length || 0,
      error: semanticResponse.ok ? null : `HTTP ${semanticResponse.status}`,
      sampleTitle: semanticData?.data?.[0]?.title || null
    };
  } catch (error) {
    results.tests.semanticScholar = {
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 0,
      ok: false,
      responseTime: 10000
    };
  }

  // Test OpenAlex API
  try {
    const openAlexStart = Date.now();
    const openAlexResponse = await fetch(
      'https://api.openalex.org/works?search=test&per_page=1&mailto=reisscoding@gmail.com',
      {
        headers: {
          'User-Agent': 'HumanGeographyLearning/1.0 (reisscoding@gmail.com)',
        },
        // Add timeout
        signal: AbortSignal.timeout(10000)
      }
    );
    
    const openAlexData = openAlexResponse.ok ? await openAlexResponse.json() : null;
    
    results.tests.openAlex = {
      status: openAlexResponse.status,
      ok: openAlexResponse.ok,
      responseTime: Date.now() - openAlexStart,
      totalPapers: openAlexData?.meta?.count || 0,
      returnedPapers: openAlexData?.results?.length || 0,
      error: openAlexResponse.ok ? null : `HTTP ${openAlexResponse.status}`,
      sampleTitle: openAlexData?.results?.[0]?.title || null
    };
  } catch (error) {
    results.tests.openAlex = {
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 0,
      ok: false,
      responseTime: 10000
    };
  }

  // Overall health assessment
  const semanticHealthy = results.tests.semanticScholar.ok && results.tests.semanticScholar.responseTime < 5000;
  const openAlexHealthy = results.tests.openAlex.ok && results.tests.openAlex.responseTime < 5000;
  
  results.summary = {
    overallHealth: semanticHealthy || openAlexHealthy ? 'healthy' : 'degraded',
    workingApis: [
      ...(semanticHealthy ? ['semanticScholar'] : []),
      ...(openAlexHealthy ? ['openAlex'] : [])
    ],
    avgResponseTime: Math.round((
      results.tests.semanticScholar.responseTime + 
      results.tests.openAlex.responseTime
    ) / 2),
    recommendation: semanticHealthy && openAlexHealthy ? 
      'All APIs operational' : 
      semanticHealthy || openAlexHealthy ? 
        'Partial API availability - fallback recommended' : 
        'No APIs available - use curated content only'
  };

  return NextResponse.json(results);
}