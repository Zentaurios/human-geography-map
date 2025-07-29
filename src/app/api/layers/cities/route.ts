// API route for cities layer data
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const bbox = searchParams.get('bbox');
    const zoom = parseInt(searchParams.get('zoom') || '1');
    const limit = parseInt(searchParams.get('limit') || '1000');
    const minPopulation = parseInt(searchParams.get('minPop') || '0');

    // Fetch data from Natural Earth
    const dataUrl = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_populated_places.geojson';
    
    const response = await fetch(dataUrl, {
      headers: {
        'User-Agent': 'Human Geography Map App'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch cities data: ${response.status}`);
    }

    const data = await response.json();
    
    // Filter and enhance city features
    const cityFeatures = data.features
      .filter((feature: any) => {
        const population = feature.properties?.pop_max || 0;
        const scalerank = feature.properties?.scalerank || 10;
        
        // Filter by population and importance
        return population >= minPopulation && 
               (scalerank <= 8 || feature.properties?.featurecla?.includes('capital'));
      })
      .slice(0, limit)
      .map((feature: any) => ({
        ...feature,
        properties: {
          ...feature.properties,
          layerType: 'city',
          population: feature.properties?.pop_max || 0,
          isCapital: feature.properties?.featurecla?.includes('capital') || false,
          country: feature.properties?.adm0name || 'Unknown',
          adminLevel: feature.properties?.featurecla?.includes('Admin-0') ? 'national' : 
                      feature.properties?.featurecla?.includes('Admin-1') ? 'state' : 'regional'
        }
      }));

    // Apply bounding box filter if provided
    let filteredFeatures = cityFeatures;
    if (bbox) {
      const [west, south, east, north] = bbox.split(',').map(Number);
      filteredFeatures = cityFeatures.filter((feature: any) => {
        const [lng, lat] = feature.geometry.coordinates;
        return lng >= west && lng <= east && lat >= south && lat <= north;
      });
    }

    // Sort by population (largest first)
    filteredFeatures.sort((a: any, b: any) => {
      const popA = a.properties?.population || 0;
      const popB = b.properties?.population || 0;
      return popB - popA;
    });

    const result = {
      type: 'FeatureCollection',
      features: filteredFeatures,
      metadata: {
        count: filteredFeatures.length,
        zoom: zoom,
        simplified: zoom < 6,
        source: 'Natural Earth',
        bbox: bbox ? bbox.split(',').map(Number) : null,
        minPopulation: minPopulation
      }
    };

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, max-age=43200', // Cache for 12 hours
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error fetching cities data:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch cities data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
