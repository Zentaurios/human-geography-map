'use client';

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
import { Thermometer, CloudRain, Wind, Globe, MapPin, Calendar, TrendingUp, Info } from 'lucide-react';

interface ClimateData {
  year: number;
  temperature: number;
  precipitation: number;
  co2: number;
}

interface CityClimateData {
  name: string;
  country: string;
  lat: number;
  lng: number;
  avgTemp: number;
  avgPrecip: number;
  climateZone: string;
}

const CLIMATE_DATA: ClimateData[] = [
  { year: 1990, temperature: 14.2, precipitation: 1000, co2: 354 },
  { year: 1995, temperature: 14.4, precipitation: 980, co2: 360 },
  { year: 2000, temperature: 14.6, precipitation: 1020, co2: 369 },
  { year: 2005, temperature: 14.9, precipitation: 995, co2: 379 },
  { year: 2010, temperature: 15.1, precipitation: 1040, co2: 389 },
  { year: 2015, temperature: 15.4, precipitation: 985, co2: 401 },
  { year: 2020, temperature: 15.7, precipitation: 1015, co2: 414 },
  { year: 2023, temperature: 15.9, precipitation: 990, co2: 421 },
];

const MAJOR_CITIES: CityClimateData[] = [
  { name: 'New York', country: 'USA', lat: 40.7, lng: -74.0, avgTemp: 12.9, avgPrecip: 1268, climateZone: 'Humid subtropical' },
  { name: 'London', country: 'UK', lat: 51.5, lng: -0.1, avgTemp: 11.0, avgPrecip: 601, climateZone: 'Oceanic' },
  { name: 'Tokyo', country: 'Japan', lat: 35.7, lng: 139.7, avgTemp: 15.4, avgPrecip: 1528, climateZone: 'Humid subtropical' },
  { name: 'Sydney', country: 'Australia', lat: -33.9, lng: 151.2, avgTemp: 18.0, avgPrecip: 1215, climateZone: 'Oceanic' },
  { name: 'Cairo', country: 'Egypt', lat: 30.0, lng: 31.2, avgTemp: 21.8, avgPrecip: 18, climateZone: 'Desert' },
  { name: 'Mumbai', country: 'India', lat: 19.1, lng: 72.9, avgTemp: 27.2, avgPrecip: 2167, climateZone: 'Tropical wet and dry' },
  { name: 'Moscow', country: 'Russia', lat: 55.8, lng: 37.6, avgTemp: 5.8, avgPrecip: 707, climateZone: 'Humid continental' },
  { name: 'São Paulo', country: 'Brazil', lat: -23.6, lng: -46.6, avgTemp: 19.8, avgPrecip: 1441, climateZone: 'Subtropical highland' },
];

const CLIMATE_ZONES = [
  'Tropical wet',
  'Tropical wet and dry',
  'Desert',
  'Mediterranean',
  'Humid subtropical',
  'Oceanic',
  'Humid continental',
  'Subarctic',
  'Tundra'
];

export function ClimateDataExplorer() {
  const [selectedMetric, setSelectedMetric] = useState<'temperature' | 'precipitation' | 'co2'>('temperature');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedZone, setSelectedZone] = useState<string>('');
  const [viewMode, setViewMode] = useState<'trends' | 'cities' | 'zones'>('trends');
  const [temperatureUnit, setTemperatureUnit] = useState<'celsius' | 'fahrenheit'>('celsius');

  // Filter cities data
  const filteredCities = useMemo(() => {
    let cities = MAJOR_CITIES;
    
    if (selectedZone) {
      cities = cities.filter(city => city.climateZone === selectedZone);
    }
    
    return cities;
  }, [selectedZone]);

  const convertTemp = (temp: number) => {
    return temperatureUnit === 'fahrenheit' ? (temp * 9/5) + 32 : temp;
  };

  const formatTemp = (temp: number) => {
    const converted = convertTemp(temp);
    const unit = temperatureUnit === 'fahrenheit' ? '°F' : '°C';
    return `${converted.toFixed(1)}${unit}`;
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'temperature': return '#dc2626';
      case 'precipitation': return '#2563eb';
      case 'co2': return '#059669';
      default: return '#6b7280';
    }
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'temperature': return <Thermometer className="w-5 h-5" />;
      case 'precipitation': return <CloudRain className="w-5 h-5" />;
      case 'co2': return <Wind className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const getMetricUnit = (metric: string) => {
    switch (metric) {
      case 'temperature': return temperatureUnit === 'fahrenheit' ? '°F' : '°C';
      case 'precipitation': return 'mm';
      case 'co2': return 'ppm';
      default: return '';
    }
  };

  const selectedCityData = selectedCity ? MAJOR_CITIES.find(city => city.name === selectedCity) : null;

  return (
    <div className="bg-white rounded-lg border p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Globe className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-semibold text-slate-900">Climate Data Explorer</h2>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {/* View Mode */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            View Mode
          </label>
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as any)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="trends">Global Trends</option>
            <option value="cities">City Comparison</option>
            <option value="zones">Climate Zones</option>
          </select>
        </div>

        {/* Metric Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Climate Metric
          </label>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as any)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="temperature">Temperature</option>
            <option value="precipitation">Precipitation</option>
            <option value="co2">CO₂ Levels</option>
          </select>
        </div>

        {/* Temperature Unit */}
        {selectedMetric === 'temperature' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Temperature Unit
            </label>
            <select
              value={temperatureUnit}
              onChange={(e) => setTemperatureUnit(e.target.value as any)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="celsius">Celsius (°C)</option>
              <option value="fahrenheit">Fahrenheit (°F)</option>
            </select>
          </div>
        )}

        {/* City Selection */}
        {viewMode === 'cities' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Compare Cities
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Cities</option>
              {MAJOR_CITIES.map(city => (
                <option key={city.name} value={city.name}>
                  {city.name}, {city.country}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Climate Zone Filter */}
        {viewMode === 'zones' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Climate Zone
            </label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Zones</option>
              {CLIMATE_ZONES.map(zone => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Key Statistics */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <Thermometer className="w-8 h-8 mx-auto mb-2 text-red-600" />
          <div className="text-2xl font-bold text-red-900">
            {formatTemp(CLIMATE_DATA[CLIMATE_DATA.length - 1].temperature)}
          </div>
          <div className="text-sm text-red-700">Global Average Temperature (2023)</div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <CloudRain className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <div className="text-2xl font-bold text-blue-900">
            {CLIMATE_DATA[CLIMATE_DATA.length - 1].precipitation}mm
          </div>
          <div className="text-sm text-blue-700">Global Average Precipitation (2023)</div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <Wind className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <div className="text-2xl font-bold text-green-900">
            {CLIMATE_DATA[CLIMATE_DATA.length - 1].co2}ppm
          </div>
          <div className="text-sm text-green-700">Atmospheric CO₂ (2023)</div>
        </div>
      </div>

      {/* Main Visualization */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          {getMetricIcon(selectedMetric)}
          <h3 className="text-lg font-semibold text-slate-900">
            {viewMode === 'trends' && `Global ${selectedMetric} Trends (1990-2023)`}
            {viewMode === 'cities' && `City Climate Comparison`}
            {viewMode === 'zones' && `Climate Zones Analysis`}
          </h3>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {viewMode === 'trends' ? (
              <LineChart data={CLIMATE_DATA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis 
                  tickFormatter={(value) => 
                    selectedMetric === 'temperature' 
                      ? `${convertTemp(value).toFixed(1)}${getMetricUnit(selectedMetric)}`
                      : `${value}${getMetricUnit(selectedMetric)}`
                  }
                />
                <Tooltip 
                  formatter={(value, name) => [
                    selectedMetric === 'temperature' 
                      ? formatTemp(value as number)
                      : `${value}${getMetricUnit(selectedMetric)}`,
                    name
                  ]}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey={selectedMetric}
                  stroke={getMetricColor(selectedMetric)}
                  strokeWidth={3}
                  name={selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}
                  dot={{ fill: getMetricColor(selectedMetric), strokeWidth: 2, r: 5 }}
                />
              </LineChart>
            ) : (
              <BarChart data={filteredCities}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis 
                  tickFormatter={(value) => 
                    selectedMetric === 'temperature' 
                      ? `${convertTemp(value).toFixed(1)}${getMetricUnit(selectedMetric)}`
                      : `${value}${getMetricUnit(selectedMetric)}`
                  }
                />
                <Tooltip 
                  formatter={(value, name) => [
                    selectedMetric === 'temperature' 
                      ? formatTemp(value as number)
                      : `${value}${getMetricUnit(selectedMetric)}`,
                    name
                  ]}
                />
                <Bar 
                  dataKey={selectedMetric === 'temperature' ? 'avgTemp' : 'avgPrecip'}
                  fill={getMetricColor(selectedMetric)}
                  name={selectedMetric === 'temperature' ? 'Average Temperature' : 'Average Precipitation'}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Selected City Details */}
      {selectedCityData && (
        <div className="mb-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-slate-600" />
            <h4 className="text-lg font-semibold text-slate-900">
              {selectedCityData.name}, {selectedCityData.country}
            </h4>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-slate-600">Climate Zone</div>
              <div className="font-semibold text-slate-900">{selectedCityData.climateZone}</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Average Temperature</div>
              <div className="font-semibold text-slate-900">{formatTemp(selectedCityData.avgTemp)}</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Average Precipitation</div>
              <div className="font-semibold text-slate-900">{selectedCityData.avgPrecip}mm</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Coordinates</div>
              <div className="font-semibold text-slate-900">
                {selectedCityData.lat.toFixed(1)}°, {selectedCityData.lng.toFixed(1)}°
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Educational Context */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-lg font-semibold text-green-900 mb-3">Climate Analysis & Learning Objectives</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-green-800 mb-2">Key Climate Concepts:</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• <strong>Global Warming:</strong> Rising average temperatures worldwide</li>
                  <li>• <strong>Climate vs. Weather:</strong> Long-term patterns vs. daily conditions</li>
                  <li>• <strong>Regional Variation:</strong> How geography affects local climate</li>
                  <li>• <strong>Human Impact:</strong> CO₂ emissions and climate change correlation</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-green-800 mb-2">Geographic Applications:</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Agricultural planning and crop selection</li>
                  <li>• Urban heat island effects in cities</li>
                  <li>• Migration patterns due to climate change</li>
                  <li>• Economic impacts of extreme weather</li>
                </ul>
              </div>
            </div>

            {viewMode === 'trends' && (
              <div className="mt-4 p-3 bg-green-100 rounded">
                <p className="text-sm text-green-800">
                  <strong>Observation:</strong> Notice the steady increase in global temperature since 1990, 
                  correlating with rising CO₂ levels. This demonstrates the greenhouse effect and human impact on climate.
                </p>
              </div>
            )}

            {viewMode === 'cities' && (
              <div className="mt-4 p-3 bg-green-100 rounded">
                <p className="text-sm text-green-800">
                  <strong>Compare:</strong> Notice how cities at similar latitudes can have very different climates 
                  due to ocean currents, elevation, and continental vs. maritime influences.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
