'use server';

/**
 * Wikipedia API integration for fetching country descriptions
 */

interface WikipediaExtract {
  extract?: string;
  title?: string;
}

interface WikipediaResponse {
  query?: {
    pages?: Record<string, WikipediaExtract>;
  };
}

/**
 * Fetch Wikipedia extract/summary for a country
 */
export async function fetchWikipediaDescription(countryName: string): Promise<string | null> {
  if (!countryName) {
    if (process.env.NODE_ENV === 'development') {
      console.log('❌ No country name provided for Wikipedia fetch');
    }
    return null;
  }

  // Clean country name for Wikipedia search
  const cleanCountryName = countryName
    .replace(/\s+/g, '_')
    .replace(/[()]/g, ''); // Remove parentheses which can cause issues

  if (process.env.NODE_ENV === 'development') {
    console.log(`🔍 Fetching Wikipedia description for: ${countryName} -> ${cleanCountryName}`);
  }

  try {
    // Use Wikipedia API to get page extract
    const url = `https://en.wikipedia.org/w/api.php?` + new URLSearchParams({
      action: 'query',
      format: 'json',
      titles: cleanCountryName,
      prop: 'extracts',
      exintro: 'true',       // Only intro section
      explaintext: 'true',   // Plain text, no HTML
      exsectionformat: 'plain',
      origin: '*',           // Enable CORS
    });

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'HumanGeographyMap/1.0 (https://example.com/contact)'
      },
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`❌ Wikipedia API error: ${response.status} ${response.statusText}`);
      }
      return null;
    }

    const data: WikipediaResponse = await response.json();
    
    if (!data.query?.pages) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`❌ No Wikipedia pages found for: ${countryName}`);
      }
      return null;
    }

    // Get the first (and usually only) page
    const pages = Object.values(data.query.pages);
    const page = pages[0];

    if (!page?.extract) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`❌ No Wikipedia extract found for: ${countryName}`);
      }
      return null;
    }

    // Clean up the extract
    let extract = page.extract.trim();
    
    // Remove common Wikipedia disambiguation text
    extract = extract.replace(/\s*\(disambiguation\).*$/i, '');
    
    // Limit length to reasonable summary (around 400-500 characters)
    if (extract.length > 500) {
      // Find the last complete sentence within 500 characters
      const truncated = extract.substring(0, 500);
      const lastPeriodIndex = truncated.lastIndexOf('.');
      if (lastPeriodIndex > 200) { // Ensure we have a reasonable amount of text
        extract = truncated.substring(0, lastPeriodIndex + 1);
      } else {
        extract = truncated + '...';
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Successfully fetched Wikipedia description for: ${countryName}`);
    }
    return extract;

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      if (error instanceof Error) {
        if (error.name === 'TimeoutError') {
          console.error(`⏰ Timeout fetching Wikipedia description for: ${countryName}`);
        } else if (error.name === 'AbortError') {
          console.error(`🚫 Request aborted for Wikipedia description: ${countryName}`);
        } else {
          console.error(`❌ Error fetching Wikipedia description for ${countryName}:`, error.message);
        }
      } else {
        console.error(`❌ Unknown error fetching Wikipedia description for ${countryName}:`, error);
      }
    }
    return null;
  }
}

/**
 * Fetch Wikipedia description with alternative country name patterns
 */
export async function fetchWikipediaDescriptionWithFallbacks(countryName: string, officialName?: string): Promise<string | null> {
  // Try main country name first
  let description = await fetchWikipediaDescription(countryName);
  if (description) return description;

  // Try official name if different
  if (officialName && officialName !== countryName) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 Trying official name: ${officialName}`);
    }
    description = await fetchWikipediaDescription(officialName);
    if (description) return description;
  }

  // Try common alternative patterns
  const alternatives = [
    // Remove "Republic of", "Kingdom of", etc.
    countryName.replace(/^(Republic of|Kingdom of|People's Republic of|United States of|United Kingdom of)\s+/i, ''),
    // Add "Republic of" if it's missing
    countryName.includes('Republic') ? countryName : `Republic of ${countryName}`,
    // Try with common country endings
    countryName.endsWith('s') ? countryName : `${countryName}`,
  ];

  for (const altName of alternatives) {
    if (altName !== countryName && altName.length > 2) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`🔄 Trying alternative name: ${altName}`);
      }
      description = await fetchWikipediaDescription(altName);
      if (description) return description;
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`❌ Could not find Wikipedia description for: ${countryName}`);
  }
  return null;
}

/**
 * Cache for Wikipedia descriptions to avoid repeated API calls
 */
const wikipediaCache = new Map<string, string | null>();

/**
 * Get Wikipedia description with caching
 */
export async function getCachedWikipediaDescription(countryName: string, officialName?: string): Promise<string | null> {
  const cacheKey = `${countryName}|${officialName || ''}`;
  
  // Check cache first
  if (wikipediaCache.has(cacheKey)) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`📋 Using cached Wikipedia description for: ${countryName}`);
    }
    return wikipediaCache.get(cacheKey) || null;
  }

  // Fetch and cache
  const description = await fetchWikipediaDescriptionWithFallbacks(countryName, officialName);
  wikipediaCache.set(cacheKey, description);
  
  return description;
}
