// API route for mountain layer data
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const bbox = searchParams.get('bbox'); // Bounding box [west, south, east, north]
    const zoom = parseInt(searchParams.get('zoom') || '1');
    const limit = parseInt(searchParams.get('limit') || '500');

    // Fetch data from Natural Earth (fallback source)
    const dataUrl = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_geography_regions_points.geojson';
    
    const response = await fetch(dataUrl, {
      headers: {
        'User-Agent': 'Human Geography Map App'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch mountain data: ${response.status}`);
    }

    const data = await response.json();
    
    // Filter for mountain features
    const mountainFeatures = data.features
      .filter((feature: any) => {
        const featureClass = feature.properties?.featurecla;
        return featureClass === 'Peak' || 
               featureClass === 'Range/mtn' ||
               (feature.properties?.name && 
                (feature.properties.name.toLowerCase().includes('mount') ||
                 feature.properties.name.toLowerCase().includes('peak') ||
                 feature.properties.name.toLowerCase().includes('mountain')));
      })
      .slice(0, limit)
      .map((feature: any) => ({
        ...feature,
        properties: {
          ...feature.properties,
          layerType: 'mountain',
          elevation: feature.properties?.elevation || 0,
          country: feature.properties?.adm0name || 'Unknown',
          range: feature.properties?.name_long || feature.properties?.name
        }
      }));

    // Apply bounding box filter if provided
    let filteredFeatures = mountainFeatures;
    if (bbox) {
      const [west, south, east, north] = bbox.split(',').map(Number);
      filteredFeatures = mountainFeatures.filter((feature: any) => {
        const [lng, lat] = feature.geometry.coordinates;
        return lng >= west && lng <= east && lat >= south && lat <= north;
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
    console.error('Error fetching mountain data:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch mountain data',
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
