'use client';

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calculator, TrendingUp, Users, Calendar, Info } from 'lucide-react';

interface PopulationData {
  year: number;
  population: number;
  growthRate: number;
}

interface CountryPreset {
  name: string;
  code: string;
  population: number;
  growthRate: number;
}

const COUNTRY_PRESETS: CountryPreset[] = [
  { name: 'World', code: 'WORLD', population: 8000000000, growthRate: 0.87 },
  { name: 'China', code: 'CN', population: 1412000000, growthRate: 0.39 },
  { name: 'India', code: 'IN', population: 1380000000, growthRate: 1.05 },
  { name: 'United States', code: 'US', population: 331000000, growthRate: 0.59 },
  { name: 'Nigeria', code: 'NG', population: 218000000, growthRate: 2.58 },
  { name: 'Brazil', code: 'BR', population: 215000000, growthRate: 0.72 },
  { name: 'Japan', code: 'JP', population: 125000000, growthRate: -0.27 },
  { name: 'Germany', code: 'DE', population: 83000000, growthRate: -0.14 },
];

export function PopulationCalculator() {
  const [currentPop, setCurrentPop] = useState(1000000);
  const [growthRate, setGrowthRate] = useState(2.1);
  const [years, setYears] = useState(20);
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [secondaryData, setSecondaryData] = useState({ population: 500000, growthRate: 1.5 });

  // Calculate population projections
  const projectionData = useMemo(() => {
    const data: PopulationData[] = [];
    const currentYear = new Date().getFullYear();
    
    for (let i = 0; i <= years; i++) {
      const year = currentYear + i;
      
      // Compound growth formula: P(t) = P0 * (1 + r)^t
      const primaryPop = Math.round(currentPop * Math.pow(1 + growthRate / 100, i));
      
      let secondaryPop = 0;
      if (comparisonMode) {
        secondaryPop = Math.round(secondaryData.population * Math.pow(1 + secondaryData.growthRate / 100, i));
      }
      
      data.push({
        year,
        population: primaryPop,
        secondaryPopulation: secondaryPop,
        growthRate: growthRate
      } as any);
    }
    
    return data;
  }, [currentPop, growthRate, years, comparisonMode, secondaryData]);

  // Calculate key statistics
  const finalPopulation = projectionData[projectionData.length - 1]?.population || 0;
  const totalGrowth = finalPopulation - currentPop;
  const growthPercentage = ((totalGrowth / currentPop) * 100);
  const doublingTime = growthRate > 0 ? Math.log(2) / Math.log(1 + growthRate / 100) : Infinity;

  const handlePresetChange = (presetCode: string) => {
    const preset = COUNTRY_PRESETS.find(p => p.code === presetCode);
    if (preset) {
      setCurrentPop(preset.population);
      setGrowthRate(preset.growthRate);
      setSelectedPreset(presetCode);
    }
  };

  const formatPopulation = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(2)}B`;
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg border p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold text-slate-900">Population Growth Calculator</h2>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Preset Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Country/Region Presets
          </label>
          <select
            value={selectedPreset}
            onChange={(e) => handlePresetChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Custom Values</option>
            {COUNTRY_PRESETS.map(preset => (
              <option key={preset.code} value={preset.code}>
                {preset.name}
              </option>
            ))}
          </select>
        </div>

        {/* Current Population */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Current Population
          </label>
          <input
            type="number"
            value={currentPop}
            onChange={(e) => setCurrentPop(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1000"
            step="1000"
          />
          <div className="text-xs text-slate-500 mt-1">
            {formatPopulation(currentPop)}
          </div>
        </div>

        {/* Growth Rate */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Annual Growth Rate (%)
          </label>
          <input
            type="number"
            value={growthRate}
            onChange={(e) => setGrowthRate(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            step="0.1"
            min="-5"
            max="10"
          />
          <div className="text-xs text-slate-500 mt-1">
            {growthRate > 0 ? 'Growing' : growthRate < 0 ? 'Declining' : 'Stable'}
          </div>
        </div>

        {/* Years to Project */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Years to Project
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            max="100"
          />
          <div className="text-xs text-slate-500 mt-1">
            Project to {new Date().getFullYear() + years}
          </div>
        </div>
      </div>

      {/* Comparison Mode Toggle */}
      <div className="mb-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={comparisonMode}
            onChange={(e) => setComparisonMode(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-slate-700">
            Compare with second population
          </span>
        </label>
      </div>

      {/* Secondary Controls (if comparison mode) */}
      {comparisonMode && (
        <div className="grid md:grid-cols-2 gap-6 mb-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Second Population
            </label>
            <input
              type="number"
              value={secondaryData.population}
              onChange={(e) => setSecondaryData(prev => ({ ...prev, population: Number(e.target.value) }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1000"
              step="1000"
            />
            <div className="text-xs text-slate-500 mt-1">
              {formatPopulation(secondaryData.population)}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Second Growth Rate (%)
            </label>
            <input
              type="number"
              value={secondaryData.growthRate}
              onChange={(e) => setSecondaryData(prev => ({ ...prev, growthRate: Number(e.target.value) }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              step="0.1"
              min="-5"
              max="10"
            />
          </div>
        </div>
      )}

      {/* Key Statistics */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <div className="text-2xl font-bold text-blue-900">
            {formatPopulation(finalPopulation)}
          </div>
          <div className="text-sm text-blue-700">Final Population</div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <div className="text-2xl font-bold text-green-900">
            {totalGrowth >= 0 ? '+' : ''}{formatPopulation(totalGrowth)}
          </div>
          <div className="text-sm text-green-700">Total Change</div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">📈</div>
          <div className="text-2xl font-bold text-purple-900">
            {growthPercentage >= 0 ? '+' : ''}{growthPercentage.toFixed(1)}%
          </div>
          <div className="text-sm text-purple-700">Growth Percentage</div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
          <Calendar className="w-8 h-8 mx-auto mb-2 text-orange-600" />
          <div className="text-2xl font-bold text-orange-900">
            {doublingTime === Infinity ? '∞' : doublingTime.toFixed(1)}
          </div>
          <div className="text-sm text-orange-700">Years to Double</div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Population Projection</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatPopulation} />
              <Tooltip 
                formatter={(value, name) => [formatPopulation(value as number), name]}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="population" 
                stroke="#2563eb" 
                strokeWidth={2}
                name="Primary Population"
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
              />
              {comparisonMode && (
                <Line 
                  type="monotone" 
                  dataKey="secondaryPopulation" 
                  stroke="#dc2626" 
                  strokeWidth={2}
                  name="Secondary Population"
                  dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Educational Context */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-lg font-semibold text-blue-900 mb-3">Learning Objectives & Insights</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Key Concepts:</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>Exponential Growth:</strong> Small percentage changes compound over time</li>
                  <li>• <strong>Doubling Time:</strong> Rule of 70 approximation (70 ÷ growth rate)</li>
                  <li>• <strong>Negative Growth:</strong> Population decline in developed countries</li>
                  <li>• <strong>Demographic Momentum:</strong> Population continues growing even as rates decline</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Real-World Applications:</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Urban planning and infrastructure needs</li>
                  <li>• Resource allocation and sustainability</li>
                  <li>• Economic development planning</li>
                  <li>• Environmental impact assessment</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-100 rounded">
              <p className="text-sm text-blue-800">
                <strong>Try this:</strong> Compare Nigeria (2.58% growth) with Japan (-0.27% growth) over 50 years. 
                Notice how different growth rates create dramatically different futures for resource planning and economic development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
