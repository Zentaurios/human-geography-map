'use client';

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Calculator, TrendingUp, Users, AlertCircle, RotateCcw, Download } from 'lucide-react';

interface PopulationData {
  year: number;
  population: number;
  formattedPopulation: string;
}

export function PopulationCalculator() {
  const [currentPop, setCurrentPop] = useState(1000000);
  const [growthRate, setGrowthRate] = useState(2.1);
  const [years, setYears] = useState(10);
  const [showLinearComparison, setShowLinearComparison] = useState(false);

  const projectionData = useMemo(() => {
    const data: PopulationData[] = [];
    const linearData: PopulationData[] = [];
    
    for (let i = 0; i <= years; i++) {
      // Exponential growth: P(t) = P₀ * (1 + r)^t
      const exponentialPop = currentPop * Math.pow(1 + growthRate / 100, i);
      
      // Linear growth for comparison: P(t) = P₀ + (P₀ * r * t)
      const linearPop = currentPop + (currentPop * (growthRate / 100) * i);
      
      data.push({
        year: new Date().getFullYear() + i,
        population: Math.round(exponentialPop),
        formattedPopulation: formatPopulation(exponentialPop)
      });
      
      if (showLinearComparison) {
        linearData.push({
          year: new Date().getFullYear() + i,
          population: Math.round(linearPop),
          formattedPopulation: formatPopulation(linearPop)
        });
      }
    }
    
    return { exponential: data, linear: linearData };
  }, [currentPop, growthRate, years, showLinearComparison]);

  const formatPopulation = (pop: number): string => {
    if (pop >= 1e9) return `${(pop / 1e9).toFixed(2)}B`;
    if (pop >= 1e6) return `${(pop / 1e6).toFixed(2)}M`;
    if (pop >= 1e3) return `${(pop / 1e3).toFixed(0)}K`;
    return pop.toFixed(0);
  };

  const totalGrowth = projectionData.exponential[projectionData.exponential.length - 1].population - currentPop;
  const growthPercent = ((totalGrowth / currentPop) * 100).toFixed(1);
  const doublingTime = Math.log(2) / Math.log(1 + growthRate / 100);

  const resetToDefaults = () => {
    setCurrentPop(1000000);
    setGrowthRate(2.1);
    setYears(10);
    setShowLinearComparison(false);
  };

  const exportData = () => {
    const csvContent = [
      'Year,Population,Growth Rate',
      ...projectionData.exponential.map(point => 
        `${point.year},${point.population},${growthRate}%`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `population-projection-${growthRate}%-${years}years.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Calculator className="w-6 h-6 text-blue-600" />
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Population Growth Calculator</h3>
          <p className="text-sm text-slate-600">
            Explore exponential population growth patterns and their real-world implications
          </p>
        </div>
      </div>

      {/* Input Controls */}
      <div className="grid md:grid-cols-3 gap-4">
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
            max="10000000000"
            step="10000"
          />
          <p className="text-xs text-slate-500 mt-1">{formatPopulation(currentPop)} people</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Annual Growth Rate (%)
          </label>
          <input
            type="number"
            value={growthRate}
            onChange={(e) => setGrowthRate(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="-5"
            max="10"
            step="0.1"
          />
          <p className="text-xs text-slate-500 mt-1">
            {growthRate > 0 ? 'Growing' : growthRate < 0 ? 'Declining' : 'Stable'}
          </p>
        </div>
        
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
            step="1"
          />
          <p className="text-xs text-slate-500 mt-1">Until {new Date().getFullYear() + years}</p>
        </div>
      </div>

      {/* Control Options */}
      <div className="flex flex-wrap gap-4 items-center">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showLinearComparison}
            onChange={(e) => setShowLinearComparison(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-700">Show linear growth comparison</span>
        </label>
        
        <button
          onClick={resetToDefaults}
          className="inline-flex items-center gap-2 px-3 py-1 text-sm text-slate-600 border border-slate-300 rounded hover:bg-slate-50 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
        
        <button
          onClick={exportData}
          className="inline-flex items-center gap-2 px-3 py-1 text-sm text-blue-600 border border-blue-300 rounded hover:bg-blue-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">
            {formatPopulation(projectionData.exponential[projectionData.exponential.length - 1].population)}
          </div>
          <div className="text-xs text-slate-600">Final Population</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">{formatPopulation(totalGrowth)}</div>
          <div className="text-xs text-slate-600">Total Growth</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-600">{growthPercent}%</div>
          <div className="text-xs text-slate-600">Percent Change</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-orange-600">
            {growthRate > 0 ? `${doublingTime.toFixed(1)}` : '∞'}
          </div>
          <div className="text-xs text-slate-600">Years to Double</div>
        </div>
      </div>

      {/* Visualization */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={projectionData.exponential}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="year" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={formatPopulation}
            />
            <Tooltip 
              formatter={(value: number) => [formatPopulation(value), 'Population']}
              labelFormatter={(year) => `Year ${year}`}
              contentStyle={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="population" 
              stroke="#2563eb" 
              strokeWidth={3}
              dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
              name="Exponential Growth"
            />
            {showLinearComparison && (
              <Line 
                data={projectionData.linear}
                type="monotone" 
                dataKey="population" 
                stroke="#dc2626" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#dc2626', strokeWidth: 2, r: 3 }}
                name="Linear Growth"
              />
            )}
            <ReferenceLine 
              y={currentPop} 
              stroke="#64748b" 
              strokeDasharray="2 2"
              label={{ value: "Starting Population", position: "left" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Educational Context */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Learning Objectives & Key Concepts
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-blue-800 mb-2">Understanding Exponential Growth:</h5>
            <ul className="text-blue-700 space-y-1">
              <li>• Population grows faster over time due to compounding</li>
              <li>• Small changes in growth rate have large long-term effects</li>
              <li>• Doubling time decreases as growth rate increases</li>
              <li>• Real-world factors can limit exponential growth</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-blue-800 mb-2">Real-World Applications:</h5>
            <ul className="text-blue-700 space-y-1">
              <li>• Resource planning and urban development</li>
              <li>• Environmental impact assessment</li>
              <li>• Economic policy and healthcare planning</li>
              <li>• Understanding demographic transitions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Practical Examples */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <h4 className="font-medium text-amber-900 mb-3 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Try These Real-World Scenarios
        </h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <button
            onClick={() => {
              setCurrentPop(1400000000);
              setGrowthRate(0.7);
              setYears(30);
            }}
            className="p-3 bg-white border border-amber-200 rounded hover:bg-amber-50 transition-colors text-left"
          >
            <div className="font-medium text-amber-800">China (2024)</div>
            <div className="text-amber-700">1.4B population, 0.7% growth</div>
          </button>
          
          <button
            onClick={() => {
              setCurrentPop(1425000000);
              setGrowthRate(1.0);
              setYears(30);
            }}
            className="p-3 bg-white border border-amber-200 rounded hover:bg-amber-50 transition-colors text-left"
          >
            <div className="font-medium text-amber-800">India (2024)</div>
            <div className="text-amber-700">1.42B population, 1.0% growth</div>
          </button>
          
          <button
            onClick={() => {
              setCurrentPop(47000000);
              setGrowthRate(2.6);
              setYears(25);
            }}
            className="p-3 bg-white border border-amber-200 rounded hover:bg-amber-50 transition-colors text-left"
          >
            <div className="font-medium text-amber-800">Uganda (2024)</div>
            <div className="text-amber-700">47M population, 2.6% growth</div>
          </button>
        </div>
      </div>

      {/* Warning for extreme values */}
      {(growthRate > 5 || years > 50) && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">
              Note: Very high growth rates or long projections may not reflect real-world constraints like resource limitations and demographic transitions.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}