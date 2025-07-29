// API route for rivers layer data
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const bbox = searchParams.get('bbox');
    const zoom = parseInt(searchParams.get('zoom') || '1');
    const limit = parseInt(searchParams.get('limit') || '200');

    // Fetch data from Natural Earth
    const dataUrl = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_rivers_lake_centerlines.geojson';
    
    const response = await fetch(dataUrl, {
      headers: {
        'User-Agent': 'Human Geography Map App'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch rivers data: ${response.status}`);
    }

    const data = await response.json();
    
    // Filter and enhance river features
    const riverFeatures = data.features
      .filter((feature: any) => {
        const scalerank = feature.properties?.scalerank || 10;
        // Filter for major rivers only
        return scalerank <= 6 && feature.properties?.name;
      })
      .slice(0, limit)
      .map((feature: any) => ({
        ...feature,
        properties: {
          ...feature.properties,
          layerType: 'river',
          length: feature.properties?.length_km || 0,
          countries: [feature.properties?.name_en || 'Unknown']
        }
      }));

    // Apply bounding box filter if provided
    let filteredFeatures = riverFeatures;
    if (bbox) {
      const [west, south, east, north] = bbox.split(',').map(Number);
      filteredFeatures = riverFeatures.filter((feature: any) => {
        if (feature.geometry.type === 'LineString') {
          const coords = feature.geometry.coordinates;
          return coords.some(([lng, lat]: [number, number]) => 
            lng >= west && lng <= east && lat >= south && lat <= north
          );
        }
        return false;
      });
    }

    const result = {
      type: 'FeatureCollection',
      features: filteredFeatures,
      metadata: {
        count: filteredFeatures.length,
        zoom: zoom,
        simplified: zoom < 6,
        source: 'Natural Earth',
        bbox: bbox ? bbox.split(',').map(Number) : null
      }
    };

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error fetching rivers data:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch rivers data',
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
