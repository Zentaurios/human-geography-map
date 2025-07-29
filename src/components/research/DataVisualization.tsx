import React, { useState, useEffect } from 'react';
import { ResearchPaper } from '@/types/research.types';
import { getResearchStatistics } from '@/app/research/actions';
import { FALLBACK_RESEARCH_STATS } from '@/lib/apis/fallbackResearch';
import { BarChart, Bar, LineChart, Line, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3, BookOpen, Users, ChevronDown, ChevronUp } from 'lucide-react';

interface DataVisualizationProps {
  papers: ResearchPaper[];
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ papers }) => {
  const [researchStats, setResearchStats] = useState(FALLBACK_RESEARCH_STATS);
  const [selectedChart, setSelectedChart] = useState<'trends' | 'topics' | 'methodology' | 'access'>('trends');
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Load research statistics
  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const stats = await getResearchStatistics();
        setResearchStats(stats);
      } catch (error) {
        console.error('Failed to load research statistics:', error);
        // Keep fallback stats
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  // Process current papers for visualization
  const processCurrentPapers = () => {
    if (papers.length === 0) return null;

    // Topic distribution from current papers
    const topicCounts = papers.reduce((acc, paper) => {
      paper.geographySubfields.forEach(topic => {
        acc[topic] = (acc[topic] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const topicData = Object.entries(topicCounts)
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    // Academic level distribution
    const levelCounts = papers.reduce((acc, paper) => {
      acc[paper.academicLevel] = (acc[paper.academicLevel] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const levelData = Object.entries(levelCounts).map(([level, count]) => ({ level, count }));

    // Open access distribution
    const accessCounts = papers.reduce((acc, paper) => {
      const status = paper.openAccessStatus === 'gold' || paper.openAccessStatus === 'green' ? 'Open Access' : 'Limited Access';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const accessData = Object.entries(accessCounts).map(([status, count]) => ({ status, count }));

    return { topicData, levelData, accessData };
  };

  const currentPaperData = processCurrentPapers();

  // Chart color schemes
  const colors = {
    primary: ['#3B82F6', '#1D4ED8', '#1E40AF', '#1E3A8A'],
    secondary: ['#10B981', '#059669', '#047857', '#065F46'],
    accent: ['#F59E0B', '#D97706', '#B45309', '#92400E'],
    neutral: ['#6B7280', '#4B5563', '#374151', '#1F2937'],
  };

  const chartTabs = [
    { key: 'trends', label: 'Publication Trends', icon: TrendingUp },
    { key: 'topics', label: 'Research Topics', icon: BarChart3 },
    { key: 'methodology', label: 'Methods Used', icon: BookOpen },
    { key: 'access', label: 'Open Access', icon: Users },
  ];

  // Helper function to render the selected chart
  const renderChart = () => {
    switch (selectedChart) {
      case 'trends':
        return (
          <LineChart data={researchStats.publicationTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="year" 
              stroke="#64748B"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#64748B"
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
              name="Published Papers"
            />
          </LineChart>
        );
      
      case 'topics':
        return (
          <BarChart data={currentPaperData?.topicData || researchStats.topicDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="topic" 
              stroke="#64748B"
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="#64748B"
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <Bar dataKey="count" name="Number of Papers">
              {(currentPaperData?.topicData || researchStats.topicDistribution).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors.primary[index % colors.primary.length]} />
              ))}
            </Bar>
          </BarChart>
        );
      
      case 'methodology':
        return (
          <BarChart data={researchStats.methodologyBreakdown} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              type="number" 
              stroke="#64748B"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              dataKey="methodology" 
              type="category" 
              stroke="#64748B"
              tick={{ fontSize: 10 }}
              width={120}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <Bar dataKey="count" name="Number of Papers">
              {researchStats.methodologyBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors.secondary[index % colors.secondary.length]} />
              ))}
            </Bar>
          </BarChart>
        );
      
      case 'access':
        return (
          <LineChart data={researchStats.openAccessProgress}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="year" 
              stroke="#64748B"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              domain={[0, 100]}
              stroke="#64748B"
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '14px'
              }}
              formatter={(value) => [`${value}%`, 'Open Access']}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="percentage" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
              name="Open Access Percentage"
            />
          </LineChart>
        );
      
      default:
        return (
          <LineChart data={researchStats.publicationTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="year" 
              stroke="#64748B"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#64748B"
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
              name="Published Papers"
            />
          </LineChart>
        );
    }
  };

  return (
    <div className="p-6 bg-white border rounded-lg border-slate-200">
      {/* Collapsible Header */}
      <div className="mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full p-3 text-left transition-colors rounded-md hover:bg-slate-50"
        >
          <div>
            <h2 className="flex items-center gap-2 mb-1 text-xl font-bold text-slate-900">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Global Research Trends
            </h2>
            <p className="text-sm text-slate-600">
              Interactive data about geography research worldwide (optional)
            </p>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-600" />
          )}
        </button>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="pt-6 space-y-6 border-t border-slate-200">
          {/* Chart Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200">
            {chartTabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelectedChart(key as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-t-md transition-colors ${
                  selectedChart === key
                    ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Chart Container */}
          <div className="mb-6 h-80">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-2 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                  <p className="text-slate-600">Loading research data...</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            )}
          </div>

          {/* Current Search Results Stats */}
          {papers.length > 0 && currentPaperData && (
            <div className="pt-6 border-t border-slate-200">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Current Search Results ({papers.length} papers)
              </h3>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Academic Level Distribution */}
                <div className="p-4 rounded-lg bg-slate-50">
                  <h4 className="flex items-center gap-2 mb-2 font-medium text-slate-900">
                    <Users className="w-4 h-4" />
                    Academic Levels
                  </h4>
                  <div className="space-y-2">
                    {currentPaperData.levelData.map(({ level, count }) => (
                      <div key={level} className="flex items-center justify-between">
                        <span className="text-sm capitalize text-slate-600">{level}</span>
                        <span className="text-sm font-medium text-slate-900">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Access Status */}
                <div className="p-4 rounded-lg bg-green-50">
                  <h4 className="flex items-center gap-2 mb-2 font-medium text-slate-900">
                    <BookOpen className="w-4 h-4" />
                    Accessibility
                  </h4>
                  <div className="space-y-2">
                    {currentPaperData.accessData.map(({ status, count }) => (
                      <div key={status} className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">{status}</span>
                        <span className="text-sm font-medium text-slate-900">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Citation Statistics */}
                <div className="p-4 rounded-lg bg-blue-50">
                  <h4 className="flex items-center gap-2 mb-2 font-medium text-slate-900">
                    <TrendingUp className="w-4 h-4" />
                    Citation Stats
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Average Citations</span>
                      <span className="text-sm font-medium text-slate-900">
                        {Math.round(papers.reduce((sum, p) => sum + p.citationCount, 0) / papers.length)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Highest Citations</span>
                      <span className="text-sm font-medium text-slate-900">
                        {Math.max(...papers.map(p => p.citationCount))}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Avg. Relevance</span>
                      <span className="text-sm font-medium text-slate-900">
                        {(papers.reduce((sum, p) => sum + p.relevanceScore, 0) / papers.length).toFixed(1)}/10
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Educational Note */}
          <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Educational Tip:</strong> These visualizations help you understand patterns in 
              academic research. Notice how publication trends, popular topics, and research methods 
              change over time. This data literacy skill is valuable for any field of study!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataVisualization;
