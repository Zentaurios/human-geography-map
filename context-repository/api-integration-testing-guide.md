# API Integration Testing Guide

## 🎯 Overview
This guide provides comprehensive tools and strategies for testing and verifying API integration in the Human Geography Research page. Use this to ensure your page is displaying real research papers from Semantic Scholar and OpenAlex APIs instead of mock data.

## 🧪 Testing Tools Provided

### 1. **Interactive HTML Testing Tool**
- Standalone browser tool for immediate testing
- Run directly in browser console or save as HTML file
- Tests API endpoints, page data, network requests
- Provides detailed logging and status monitoring

### 2. **React Component Tester**
- Next.js compatible testing component
- Integrates with your existing UI components
- Real-time status monitoring during development
- Production-ready with dev-mode restrictions

### 3. **Enhancement Components**
- `ApiStatusIndicator` - Real-time API health monitoring
- `PaperSourceBadge` - Shows data source for each paper
- `DevApiTester` - Development mode API testing interface
- `useApiHealth` hook - Continuous API monitoring

## 🚀 Quick Start Instructions

### **Immediate Testing (Use Right Now)**

1. **Open your Human Geography Research page**
2. **Open browser developer tools** (F12)
3. **Copy and paste this code into console:**

```javascript
// Quick API test - paste this in your browser console
async function quickApiTest() {
  console.log('🧪 Testing APIs...');
  
  // Test Semantic Scholar
  try {
    const response = await fetch('https://api.semanticscholar.org/graph/v1/paper/search?query=urban geography&limit=1');
    console.log('✅ Semantic Scholar:', response.ok ? 'Working' : 'Failed');
  } catch (e) {
    console.log('❌ Semantic Scholar:', e.message);
  }
  
  // Test OpenAlex
  try {
    const response = await fetch('https://api.openalex.org/works?search=urban geography&per_page=1');
    console.log('✅ OpenAlex:', response.ok ? 'Working' : 'Failed');
  } catch (e) {
    console.log('❌ OpenAlex:', e.message);
  }
  
  // Check page for real vs mock data
  const titles = Array.from(document.querySelectorAll('h3, h4')).map(el => el.textContent?.trim()).filter(t => t && t.length > 20);
  console.log('📄 Paper titles found:', titles.length);
  console.log('📋 Sample titles:', titles.slice(0, 3));
  
  const mockIndicators = document.body.textContent?.toLowerCase().includes('sample') || 
                        document.body.textContent?.toLowerCase().includes('demo');
  console.log('🎯 Using real data:', !mockIndicators ? '✅ YES' : '❌ NO (mock data detected)');
}

quickApiTest();
```

4. **Check the results** in console output

### **Integration Into Your Project**

1. **Add the testing component to a dev route:**
```typescript
// app/dev/api-testing/page.tsx
import ApiIntegrationTester from '@/components/dev/ApiIntegrationTester';

export default function ApiTestingPage() {
  return (
    <div className="container mx-auto py-8">
      <ApiIntegrationTester />
    </div>
  );
}
```

2. **Add status monitoring to your research page:**
```typescript
// In your research page component
import { ApiStatusIndicator } from '@/components/ApiStatusIndicator';

// Add to your header:
<div className="flex justify-between items-center mb-6">
  <h1>Human Geography Research</h1>
  <ApiStatusIndicator />
</div>
```

3. **Add source badges to paper cards:**
```typescript
import { PaperSourceBadge } from '@/components/PaperSourceBadge';

// In your paper card component:
<PaperSourceBadge 
  source={paper.id.startsWith('semantic-') ? 'semantic-scholar' : 
         paper.id.startsWith('openalex-') ? 'openalex' : 'curated'} 
/>
```

## 🔍 What Each Test Checks

### **Direct API Testing**
- ✅ Semantic Scholar API availability and response time
- ✅ OpenAlex API availability and response time  
- ✅ Sample data structure and content quality
- ✅ API rate limits and error responses

### **Page Data Inspection**
- ✅ Number of paper cards displayed
- ✅ Quality of paper titles (not placeholder text)
- ✅ Detection of mock/sample data indicators
- ✅ Presence of real research paper content

### **Hook Integration Testing**
- ✅ Search input functionality
- ✅ Form submission handling
- ✅ State updates after search
- ✅ Re-rendering with new results

### **Network Monitoring**
- ✅ Actual HTTP requests being made
- ✅ API endpoints being called
- ✅ Request/response timing
- ✅ Error handling in network layer

## 🎯 Success Criteria

Your integration is working correctly when:

### **✅ APIs Are Functional**
- Both Semantic Scholar and OpenAlex return 200 status codes
- Response times are under 5 seconds
- Data structures match expected schemas
- No CORS or network errors

### **✅ Real Data Is Displayed**
- Paper titles are real research paper titles (not "Sample Paper #1")
- Authors, abstracts, and metadata are populated
- No "demo", "sample", or "placeholder" text visible
- Paper IDs have proper prefixes (semantic-, openalex-, curated-)

### **✅ User Interactions Work**
- Search triggers actual API calls
- Different queries return different results
- Loading states display during requests
- Error states handle API failures gracefully

### **✅ Performance Is Acceptable**
- Initial page load under 3 seconds
- Search results appear within 2 seconds
- No excessive API calls (proper debouncing)
- Smooth transitions and interactions

## 🚨 Common Issues & Solutions

### **APIs Work But Page Shows Mock Data**
```typescript
// Check your data transformation pipeline
// Ensure API results are properly formatted
// Verify React state updates are working
// Look for caching issues preventing updates
```

### **CORS Errors**
```typescript
// For development: Add API domains to Next.js config
// For production: Implement server-side API proxy
// Check API headers and request format
```

### **Rate Limiting Issues**
```typescript
// Implement request debouncing (300ms delay)
// Add request caching for repeated searches
// Respect API rate limits (100/min for Semantic Scholar)
// Use fallback data when limits exceeded
```

### **Slow Performance**
```typescript
// Add loading states and skeletons
// Implement request cancellation
// Cache frequent searches
// Use React.memo for paper cards
```

## 📊 Monitoring & Maintenance

### **Development Monitoring**
- Use the dev API tester during development
- Check browser Network tab for API calls
- Monitor console for errors and warnings
- Test different search queries regularly

### **Production Monitoring**
- Implement the `useApiHealth` hook
- Add error tracking (Sentry, LogRocket, etc.)
- Monitor API response times
- Track user error reports

### **Health Checks**
```typescript
// Add to your health check endpoint
export async function GET() {
  const health = await testApis();
  return NextResponse.json({
    status: health.allHealthy ? 'healthy' : 'degraded',
    apis: health.results,
    timestamp: new Date().toISOString()
  });
}
```

## 🛠️ Development Workflow

### **Before Each Release**
1. Run full API integration test suite
2. Verify real data is being displayed
3. Test search functionality thoroughly
4. Check error handling with invalid queries
5. Confirm performance benchmarks

### **Regular Maintenance**
1. Monitor API health weekly
2. Update curated fallback data monthly
3. Review and update API rate limits
4. Test with new geographical queries

### **Debugging Checklist**
- [ ] Are APIs returning 200 status codes?
- [ ] Is data being transformed correctly?
- [ ] Are React components updating with new data?
- [ ] Is the search hook triggering API calls?
- [ ] Are network requests visible in browser tools?
- [ ] Is error handling working for API failures?

## 📚 Related Documentation
- [API Documentation](./api-documentation/) - Detailed API integration guides
- [Progress Tracker](./progress-tracker.md) - Current implementation status
- [Project Context](./project-context.md) - Full requirements and architecture

## 🔗 External Resources
- [Semantic Scholar API Docs](https://api.semanticscholar.org/)
- [OpenAlex API Docs](https://docs.openalex.org/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [React Query Error Handling](https://tanstack.com/query/latest/docs/react/guides/query-retries)
