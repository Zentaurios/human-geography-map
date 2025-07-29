// API route for administrative divisions layer data
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const bbox = searchParams.get('bbox');
    const zoom = parseInt(searchParams.get('zoom') || '1');
    const limit = parseInt(searchParams.get('limit') || '300');
    const country = searchParams.get('country'); // Filter by specific country

    // Fetch data from Natural Earth
    const dataUrl = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson';
    
    const response = await fetch(dataUrl, {
      headers: {
        'User-Agent': 'Human Geography Map App'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch admin divisions data: ${response.status}`);
    }

    const data = await response.json();
    
    // Filter for major countries' administrative divisions
    const majorCountries = [
      'United States of America', 'Canada', 'Australia', 'Brazil', 
      'China', 'India', 'Russia', 'Germany', 'France', 'United Kingdom'
    ];
    
    // Filter and enhance admin division features
    const adminFeatures = data.features
      .filter((feature: any) => {
        const countryName = feature.properties?.admin;
        const hasName = feature.properties?.name;
        
        // Filter by country if specified, otherwise use major countries
        if (country) {
          return countryName?.toLowerCase().includes(country.toLowerCase()) && hasName;
        }
        
        return majorCountries.includes(countryName) && hasName;
      })
      .slice(0, limit)
      .map((feature: any) => ({
        ...feature,
        properties: {
          ...feature.properties,
          layerType: 'admin-division',
          type: feature.properties?.type_en || 'state',
          country: feature.properties?.admin || 'Unknown',
          level: 1, // First-level administrative division
          population: feature.properties?.pop_est || 0,
          area: feature.properties?.area_sqkm || 0
        }
      }));

    // Apply bounding box filter if provided
    let filteredFeatures = adminFeatures;
    if (bbox) {
      const [west, south, east, north] = bbox.split(',').map(Number);
      filteredFeatures = adminFeatures.filter((feature: any) => {
        if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
          // Check if any coordinate is within bounds (simplified check)
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
        bbox: bbox ? bbox.split(',').map(Number) : null,
        country: country || 'major countries'
      }
    };

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, max-age=604800', // Cache for 7 days (admin boundaries change rarely)
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error fetching admin divisions data:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch admin divisions data',
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
