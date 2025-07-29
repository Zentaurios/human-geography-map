'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, TrendingUp, Globe, AlertCircle } from 'lucide-react';

interface MigrationFlow {
  from: string;
  to: string;
  count: number;
  type: 'economic' | 'refugee' | 'family' | 'education' | 'other';
  year: number;
}

interface PushPullFactor {
  factor: string;
  type: 'push' | 'pull';
  strength: number;
  category: 'economic' | 'political' | 'social' | 'environmental';
}

const sampleMigrationData: MigrationFlow[] = [
  { from: 'Mexico', to: 'United States', count: 157000, type: 'economic', year: 2023 },
  { from: 'India', to: 'United States', count: 125000, type: 'education', year: 2023 },
  { from: 'Syria', to: 'Germany', count: 89000, type: 'refugee', year: 2023 },
  { from: 'Philippines', to: 'United States', count: 67000, type: 'family', year: 2023 },
  { from: 'Venezuela', to: 'Colombia', count: 156000, type: 'refugee', year: 2023 },
  { from: 'China', to: 'United States', count: 89000, type: 'education', year: 2023 },
  { from: 'Ukraine', to: 'Poland', count: 234000, type: 'refugee', year: 2023 },
  { from: 'Bangladesh', to: 'India', count: 45000, type: 'economic', year: 2023 }
];

const pushPullFactors: PushPullFactor[] = [
  { factor: 'Job opportunities', type: 'pull', strength: 9, category: 'economic' },
  { factor: 'Higher wages', type: 'pull', strength: 8, category: 'economic' },
  { factor: 'Political freedom', type: 'pull', strength: 7, category: 'political' },
  { factor: 'Educational opportunities', type: 'pull', strength: 8, category: 'social' },
  { factor: 'War/conflict', type: 'push', strength: 10, category: 'political' },
  { factor: 'Economic hardship', type: 'push', strength: 8, category: 'economic' },
  { factor: 'Natural disasters', type: 'push', strength: 7, category: 'environmental' },
  { factor: 'Persecution', type: 'push', strength: 9, category: 'political' }
];

const migrationTypeColors = {
  economic: '#059669',
  refugee: '#dc2626', 
  family: '#7c3aed',
  education: '#2563eb',
  other: '#6b7280'
};

export function MigrationFlowVisualizer() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'flows' | 'factors' | 'trends'>('flows');

  const filteredData = sampleMigrationData.filter(flow => {
    const regionMatch = selectedRegion === 'all' || 
      flow.from.includes(selectedRegion) || 
      flow.to.includes(selectedRegion);
    const typeMatch = selectedType === 'all' || flow.type === selectedType;
    return regionMatch && typeMatch;
  });

  const migrationByType = Object.entries(
    filteredData.reduce((acc, flow) => {
      acc[flow.type] = (acc[flow.type] || 0) + flow.count;
      return acc;
    }, {} as Record<string, number>)
  ).map(([type, count]) => ({ type, count }));

  const topDestinations = Object.entries(
    filteredData.reduce((acc, flow) => {
      acc[flow.to] = (acc[flow.to] || 0) + flow.count;
      return acc;
    }, {} as Record<string, number>)
  )
    .sort(([,a], [,b]) => b - a)
    .slice(0, 6)
    .map(([country, count]) => ({ country, count }));

  const topOrigins = Object.entries(
    filteredData.reduce((acc, flow) => {
      acc[flow.from] = (acc[flow.from] || 0) + flow.count;
      return acc;
    }, {} as Record<string, number>)
  )
    .sort(([,a], [,b]) => b - a)
    .slice(0, 6)
    .map(([country, count]) => ({ country, count }));

  return (
    <div className="bg-white rounded-lg border p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold text-slate-900">Migration Flow Visualizer</h2>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            View Mode
          </label>
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as 'flows' | 'factors' | 'trends')}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="flows">Migration Flows</option>
            <option value="factors">Push-Pull Factors</option>
            <option value="trends">Historical Trends</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Region Focus
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Regions</option>
            <option value="United States">United States</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Americas">Americas</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Migration Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="economic">Economic</option>
            <option value="refugee">Refugee</option>
            <option value="family">Family Reunification</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Migration Flows View */}
      {viewMode === 'flows' && (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {filteredData.reduce((sum, flow) => sum + flow.count, 0).toLocaleString()}
              </div>
              <div className="text-sm text-blue-700">Total Migrants</div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {new Set(filteredData.map(f => f.to)).size}
              </div>
              <div className="text-sm text-green-700">Destination Countries</div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(filteredData.map(f => f.from)).size}
              </div>
              <div className="text-sm text-purple-700">Origin Countries</div>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(filteredData.reduce((sum, flow) => sum + flow.count, 0) / filteredData.length).toLocaleString()}
              </div>
              <div className="text-sm text-orange-700">Average Flow Size</div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Top Destinations */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Destination Countries</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topDestinations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="country" 
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => (value / 1000).toFixed(0) + 'K'}
                    />
                    <Tooltip 
                      formatter={(value: number) => [value.toLocaleString(), 'Migrants']}
                    />
                    <Bar dataKey="count" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Migration by Type */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Migration by Type</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={migrationByType}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="count"
                      label={({ type, percent }) => `${type} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {migrationByType.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={migrationTypeColors[entry.type as keyof typeof migrationTypeColors]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [value.toLocaleString(), 'Migrants']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Push-Pull Factors View */}
      {viewMode === 'factors' && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Push Factors */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-4">Push Factors (Forces Migration Away)</h3>
              <div className="space-y-3">
                {pushPullFactors
                  .filter(f => f.type === 'push')
                  .sort((a, b) => b.strength - a.strength)
                  .map((factor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-red-900">{factor.factor}</div>
                        <div className="text-sm text-red-700 capitalize">{factor.category}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-red-200 rounded-full h-2">
                          <div 
                            className="bg-red-600 h-2 rounded-full"
                            style={{ width: `${factor.strength * 10}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-red-700">{factor.strength}/10</span>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Pull Factors */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Pull Factors (Attract Migration)</h3>
              <div className="space-y-3">
                {pushPullFactors
                  .filter(f => f.type === 'pull')
                  .sort((a, b) => b.strength - a.strength)
                  .map((factor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-green-900">{factor.factor}</div>
                        <div className="text-sm text-green-700 capitalize">{factor.category}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-green-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${factor.strength * 10}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-green-700">{factor.strength}/10</span>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          {/* Factor Categories */}
          <div className="grid md:grid-cols-4 gap-4">
            {['economic', 'political', 'social', 'environmental'].map(category => {
              const categoryFactors = pushPullFactors.filter(f => f.category === category);
              const avgStrength = categoryFactors.reduce((sum, f) => sum + f.strength, 0) / categoryFactors.length;
              
              return (
                <div key={category} className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-slate-900 capitalize">{category}</div>
                  <div className="text-2xl font-bold text-blue-600">{avgStrength.toFixed(1)}/10</div>
                  <div className="text-sm text-slate-600">Average Impact</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Educational Context */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Globe className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-2">Learning Objectives:</h4>
            <ul className="text-sm text-blue-800 space-y-1 mb-4">
              <li>• Understand the difference between voluntary and forced migration</li>
              <li>• Analyze push and pull factors that drive migration decisions</li>
              <li>• Explore global migration patterns and their causes</li>
              <li>• Connect migration to economic, political, and social geography</li>
            </ul>
            
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
              <div className="text-sm text-amber-800">
                <strong>Note:</strong> Data shown is simplified for educational purposes. 
                Real migration patterns are influenced by complex combinations of factors 
                and can change rapidly due to global events.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
