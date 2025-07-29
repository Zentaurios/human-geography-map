'use client';

import { useState } from 'react';
import { Play, Zap, User, GraduationCap, Clock, Database, ChevronRight, X } from 'lucide-react';
import { INTERACTIVE_TOOLS, COMPLEXITY_LEVELS } from '@/data/interactiveTools';
import { InteractiveTool } from '@/types/resource.types';
import { PopulationCalculator } from '../interactive-tools/PopulationCalculator';
import { ClimateDataExplorer } from '../interactive-tools/ClimateDataExplorer';

export function InteractiveTools() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTool, setSelectedTool] = useState<InteractiveTool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    'all',
    'Population & Demographics',
    'Climate & Environment', 
    'Urban & Development',
    'Culture & Society',
    'Economic & Trade'
  ];

  const filteredTools = selectedCategory === 'all' 
    ? INTERACTIVE_TOOLS 
    : INTERACTIVE_TOOLS.filter(tool => 
        tool.topics.some(topic => 
          topic.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          selectedCategory.toLowerCase().includes(topic.toLowerCase())
        )
      );

  const getComplexityIcon = (complexity: string) => {
    switch (complexity) {
      case 'simple': return <User className="w-4 h-4" />;
      case 'moderate': return <Zap className="w-4 h-4" />;
      case 'complex': return <GraduationCap className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getComplexityColor = (complexity: string) => {
    const colors = {
      simple: 'bg-green-100 text-green-800 border-green-200',
      moderate: 'bg-blue-100 text-blue-800 border-blue-200', 
      complex: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[complexity as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleToolLaunch = (tool: InteractiveTool) => {
    setSelectedTool(tool);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTool(null);
  };

  const renderInteractiveTool = (tool: InteractiveTool) => {
    switch (tool.component) {
      case 'PopulationCalculator':
        return <PopulationCalculator />;
      case 'ClimateDataExplorer':
        return <ClimateDataExplorer />;
      default:
        return (
          <div className="py-12 text-center text-slate-600">
            <Play className="w-16 h-16 mx-auto mb-4 text-slate-400" />
            <p className="mb-2 text-lg">Interactive Tool: {tool.component}</p>
            <p className="mb-4 text-sm">
              This tool would be integrated with the actual component implementation.
            </p>
            <p className="text-xs text-slate-500">
              Features: {tool.features.join(', ')}
            </p>
          </div>
        );
    }
  };

  return (
    <>
      <section className="p-6 bg-white border rounded-lg shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Play className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-semibold text-slate-900">Interactive Learning Tools</h2>
        </div>

        <p className="mb-6 text-slate-600">
          Hands-on educational widgets that let you explore geographic concepts through interactive visualization and modeling. 
          These tools help you understand complex relationships by experimenting with real data and scenarios.
        </p>

        <p className="mb-6 italic text-slate-600">
          Most of these tools are yet to be implemented. They will be built out over time and currently serve to demonstrate the potential power of technology in education.
        </p>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium text-slate-700">Filter by Topic:</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm border rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-100 text-green-800 border-green-300'
                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {category === 'all' ? 'All Tools' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredTools.map(tool => (
            <div key={tool.id} className="p-6 transition-shadow border rounded-lg border-slate-200 hover:shadow-md">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium border rounded ${getComplexityColor(tool.complexity)}`}>
                    {getComplexityIcon(tool.complexity)}
                    {COMPLEXITY_LEVELS[tool.complexity as keyof typeof COMPLEXITY_LEVELS]?.label}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 border border-blue-200 rounded">
                    {tool.level}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  {tool.estimatedTime}
                </div>
              </div>

              {/* Content */}
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                {tool.title}
              </h3>

              <p className="mb-4 text-sm text-slate-600">
                {tool.description}
              </p>

              {/* Features */}
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-medium text-slate-700">Key Features:</h4>
                <ul className="space-y-1 text-xs text-slate-600">
                  {tool.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning Objectives */}
              <div className="mb-6">
                <h4 className="mb-2 text-sm font-medium text-slate-700">Learning Objectives:</h4>
                <ul className="space-y-1 text-xs text-slate-600">
                  {tool.learningObjectives.slice(0, 2).map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-1 h-1 mt-2 bg-blue-500 rounded-full" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Data Source */}
              {tool.dataSource && (
                <div className="p-3 mb-4 border rounded-lg bg-slate-50 border-slate-200">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Database className="w-3 h-3" />
                    <span className="font-medium">Data Source:</span>
                    {tool.dataSource}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={() => handleToolLaunch(tool)}
                className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
              >
                <Play className="w-4 h-4" />
                Launch Interactive Tool
              </button>
            </div>
          ))}
        </div>

        {/* Educational Context */}
        <div className="p-6 mt-8 border border-green-200 rounded-lg bg-green-50">
          <h3 className="mb-3 text-lg font-semibold text-green-900">Why Interactive Learning?</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="mb-2 font-medium text-green-800">Active Engagement</h4>
              <p className="text-sm text-green-700">
                Interactive tools require active participation, leading to deeper understanding than passive reading.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-green-800">Immediate Feedback</h4>
              <p className="text-sm text-green-700">
                See results instantly as you adjust parameters, helping you understand cause-and-effect relationships.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-green-800">Real-World Application</h4>
              <p className="text-sm text-green-700">
                Use actual data and scenarios to connect abstract concepts to real geographic phenomena.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tool Modal */}
      {isModalOpen && selectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{selectedTool.title}</h3>
                <p className="text-sm text-slate-600">{selectedTool.description}</p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 transition-colors rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {renderInteractiveTool(selectedTool)}
            </div>

            <div className="sticky bottom-0 flex items-center justify-between px-6 py-4 border-t bg-slate-50 border-slate-200">
              <div className="text-sm text-slate-600">
                Complexity: {COMPLEXITY_LEVELS[selectedTool.complexity]?.label} • 
                Estimated Time: {selectedTool.estimatedTime}
              </div>
              <button
                onClick={closeModal}
                className="px-4 py-2 transition-colors border rounded-lg text-slate-600 border-slate-300 hover:bg-slate-100"
              >
                Close Tool
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
