// API route for water bodies layer data
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const bbox = searchParams.get('bbox');
    const zoom = parseInt(searchParams.get('zoom') || '1');
    const limit = parseInt(searchParams.get('limit') || '100');

    // Fetch data from Natural Earth
    const dataUrl = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_lakes.geojson';
    
    const response = await fetch(dataUrl, {
      headers: {
        'User-Agent': 'Human Geography Map App'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch water bodies data: ${response.status}`);
    }

    const data = await response.json();
    
    // Filter and enhance water body features
    const waterFeatures = data.features
      .filter((feature: any) => {
        const scalerank = feature.properties?.scalerank || 10;
        // Filter for significant water bodies
        return scalerank <= 6 && feature.properties?.name;
      })
      .slice(0, limit)
      .map((feature: any) => ({
        ...feature,
        properties: {
          ...feature.properties,
          layerType: 'water-body',
          type: feature.properties?.featurecla || 'lake',
          area: feature.properties?.area_sqkm || 0,
          countries: [feature.properties?.admin || 'Unknown']
        }
      }));

    // Apply bounding box filter if provided
    let filteredFeatures = waterFeatures;
    if (bbox) {
      const [west, south, east, north] = bbox.split(',').map(Number);
      filteredFeatures = waterFeatures.filter((feature: any) => {
        if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
          // Check if any coordinate is within bounds
          const coords = feature.geometry.type === 'Polygon' 
            ? feature.geometry.coordinates[0]
            : feature.geometry.coordinates[0][0];
          
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
    console.error('Error fetching water bodies data:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch water bodies data',
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
