/**
 * Test script to verify real API integration is working
 * Run this in the browser console on the research page to test APIs
 */

// Test Semantic Scholar API
async function testSemanticScholar() {
  console.log('🧪 Testing Semantic Scholar API...');
  
  try {
    const response = await fetch(
      'https://api.semanticscholar.org/graph/v1/paper/search?query=human geography&limit=5&fields=paperId,title,abstract,authors,year,venue,citationCount,isOpenAccess,openAccessPdf,fieldsOfStudy',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Semantic Scholar working! Found', data.data?.length || 0, 'papers');
    console.log('Sample paper:', data.data?.[0]?.title);
    return true;
  } catch (error) {
    console.error('❌ Semantic Scholar failed:', error);
    return false;
  }
}

// Test OpenAlex API  
async function testOpenAlex() {
  console.log('🧪 Testing OpenAlex API...');
  
  try {
    const response = await fetch(
      'https://api.openalex.org/works?search=human geography&per_page=5&mailto=geography-learning@example.com',
      {
        headers: {
          'User-Agent': 'HumanGeographyLearning/1.0 (geography-learning@example.com)',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ OpenAlex working! Found', data.results?.length || 0, 'papers');
    console.log('Sample paper:', data.results?.[0]?.title);
    return true;
  } catch (error) {
    console.error('❌ OpenAlex failed:', error);
    return false;
  }
}

// Test the research hook functionality
async function testResearchHook() {
  console.log('🧪 Testing research hook functionality...');
  
  // This would be called from the actual component
  // Just testing the imports and structure here
  
  try {
    // Test search query optimization
    const { optimizeSearchQuery } = await import('/src/lib/utils/researchHelpers.ts');
    
    const testQueries = [
      'urban planning',
      'climate change and migration', 
      'economic development in rural areas'
    ];
    
    testQueries.forEach(query => {
      const optimized = optimizeSearchQuery(query);
      console.log(`"${query}" → "${optimized}"`);
    });
    
    console.log('✅ Research helpers working!');
    return true;
  } catch (error) {
    console.error('❌ Research helpers failed:', error);
    return false;
  }
}

// Run all tests
async function runApiTests() {
  console.log('🚀 Starting API Integration Tests...\n');
  
  const results = {
    semanticScholar: await testSemanticScholar(),
    openAlex: await testOpenAlex(),
    researchHook: await testResearchHook(),
  };
  
  console.log('\n📊 Test Results:');
  console.log('- Semantic Scholar API:', results.semanticScholar ? '✅ Working' : '❌ Failed');
  console.log('- OpenAlex API:', results.openAlex ? '✅ Working' : '❌ Failed');
  console.log('- Research Hook:', results.researchHook ? '✅ Working' : '❌ Failed');
  
  const workingApis = Object.values(results).filter(Boolean).length;
  console.log(`\n🎯 Summary: ${workingApis}/3 systems working`);
  
  if (workingApis >= 1) {
    console.log('✅ Real API integration is functional!');
  } else {
    console.log('⚠️ All APIs failed - will fall back to curated content');
  }
  
  return results;
}

// Export for use in browser console
window.runApiTests = runApiTests;
window.testSemanticScholar = testSemanticScholar;
window.testOpenAlex = testOpenAlex;

console.log('🔧 API test functions loaded. Run runApiTests() to test all APIs.');

// Auto-run if not in module context
if (typeof module === 'undefined') {
  runApiTests();
}