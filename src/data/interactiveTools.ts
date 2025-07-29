// Interactive learning tools and educational widgets

import { InteractiveTool } from '@/types/resource.types';

export const INTERACTIVE_TOOLS: InteractiveTool[] = [
  {
    id: 'population-calculator',
    title: 'Population Growth Calculator',
    description: 'Calculate population growth rates and projections with real-time visualization of exponential vs. linear growth patterns.',
    category: 'Interactive Learning Tools',
    type: 'interactive',
    level: 'beginner',
    topics: ['population growth', 'demographics', 'exponential growth', 'projections'],
    component: 'PopulationCalculator',
    lastUpdated: '2025-02-01',
    features: [
      'Real-time growth calculations',
      'Interactive charts and graphs',
      'Multiple country comparisons',
      'Export data functionality',
      'Educational context boxes'
    ],
    learningObjectives: [
      'Understand exponential vs. linear population growth',
      'Explore impacts of different growth rates over time',
      'Connect to real-world population challenges',
      'Practice mathematical modeling skills'
    ],
    complexity: 'simple',
    estimatedTime: '15-30 minutes',
    dataSource: 'World Bank Population Data'
  },
  {
    id: 'climate-data-explorer',
    title: 'Climate Data Explorer', 
    description: 'Visualize climate patterns and change over time with interactive maps, charts, and comparative analysis tools.',
    category: 'Interactive Learning Tools',
    type: 'interactive',
    level: 'intermediate',
    topics: ['climate change', 'weather patterns', 'data visualization', 'environmental geography'],
    component: 'ClimateDataExplorer',
    lastUpdated: '2025-01-28',
    features: [
      'Global temperature maps',
      'Historical climate data',
      'Regional comparisons',
      'Seasonal pattern analysis',
      'Climate change indicators'
    ],
    learningObjectives: [
      'Analyze global climate patterns',
      'Understand climate vs. weather differences',
      'Explore climate change evidence',
      'Develop data interpretation skills'
    ],
    complexity: 'moderate',
    estimatedTime: '30-45 minutes',
    dataSource: 'NOAA Climate Data'
  },
  {
    id: 'urbanization-simulator',
    title: 'Urban Growth Simulator',
    description: 'Model city growth patterns and planning decisions with interactive scenarios and policy impacts.',
    category: 'Interactive Learning Tools',
    type: 'interactive',
    level: 'advanced',
    topics: ['urbanization', 'city planning', 'urban geography', 'sustainable development'],
    component: 'UrbanizationSimulator',
    lastUpdated: '2025-02-05',
    features: [
      'City growth modeling',
      'Policy impact simulation',
      'Infrastructure planning',
      'Population density analysis',
      'Sustainability metrics'
    ],
    learningObjectives: [
      'Model city growth patterns and planning decisions',
      'Understand urban planning challenges',
      'Explore sustainable development concepts',
      'Practice systems thinking'
    ],
    complexity: 'complex',
    estimatedTime: '45-60 minutes',
    dataSource: 'UN Urban Data'
  },
  {
    id: 'migration-flow-visualizer',
    title: 'Migration Flow Visualizer',
    description: 'Explore global migration patterns and causes with interactive flow maps and demographic analysis.',
    category: 'Interactive Learning Tools',
    type: 'interactive',
    level: 'intermediate',
    topics: ['migration', 'push-pull factors', 'demographics', 'globalization'],
    component: 'MigrationFlowViz',
    lastUpdated: '2025-01-22',
    features: [
      'Interactive migration flow maps',
      'Push-pull factor analysis',
      'Historical migration trends',
      'Refugee vs. economic migration',
      'Country-specific data'
    ],
    learningObjectives: [
      'Explore global migration patterns and causes',
      'Understand push-pull migration factors',
      'Analyze demographic impacts of migration',
      'Connect migration to global events'
    ],
    complexity: 'moderate',
    estimatedTime: '30-40 minutes',
    dataSource: 'UN Migration Database'
  },
  {
    id: 'economic-development-tracker',
    title: 'Economic Development Tracker',
    description: 'Compare development indicators across countries with interactive charts and correlation analysis.',
    category: 'Interactive Learning Tools',
    type: 'interactive',
    level: 'intermediate',
    topics: ['economic development', 'HDI', 'GDP', 'inequality', 'globalization'],
    component: 'DevelopmentTracker',
    lastUpdated: '2025-02-03',
    features: [
      'HDI vs. GDP comparisons',
      'Development indicator tracking',
      'Country ranking systems',
      'Correlation analysis tools',
      'Time series visualization'
    ],
    learningObjectives: [
      'Compare development indicators across countries',
      'Understand relationship between different measures',
      'Analyze development trends over time',
      'Evaluate development models'
    ],
    complexity: 'moderate',
    estimatedTime: '25-35 minutes',
    dataSource: 'World Bank Development Indicators'
  },
  {
    id: 'cultural-diffusion-mapper',
    title: 'Cultural Diffusion Mapper',
    description: 'Track the spread of cultural elements like language, religion, and technology across space and time.',
    category: 'Interactive Learning Tools',
    type: 'interactive',
    level: 'beginner',
    topics: ['cultural diffusion', 'cultural geography', 'language', 'religion', 'technology'],
    component: 'CulturalDiffusionMapper',
    lastUpdated: '2025-01-15',
    features: [
      'Interactive diffusion animations',
      'Multiple diffusion types',
      'Historical timeline controls',
      'Regional case studies',
      'Cultural barrier analysis'
    ],
    learningObjectives: [
      'Understand different types of cultural diffusion',
      'Explore how culture spreads geographically',
      'Analyze barriers to cultural spread',
      'Connect diffusion to modern globalization'
    ],
    complexity: 'simple',
    estimatedTime: '20-30 minutes'
  },
  {
    id: 'trade-network-analyzer',
    title: 'Global Trade Network Analyzer',
    description: 'Visualize international trade relationships and analyze the geography of global commerce.',
    category: 'Interactive Learning Tools',
    type: 'interactive',
    level: 'advanced',
    topics: ['international trade', 'economic geography', 'globalization', 'supply chains'],
    component: 'TradeNetworkAnalyzer',
    lastUpdated: '2025-01-30',
    features: [
      'Trade flow visualization',
      'Commodity-specific analysis',
      'Trade bloc mapping',
      'Economic dependency metrics',
      'Supply chain tracking'
    ],
    learningObjectives: [
      'Analyze global trade patterns',
      'Understand economic interdependence',
      'Explore trade bloc relationships',
      'Evaluate supply chain geography'
    ],
    complexity: 'complex',
    estimatedTime: '40-50 minutes',
    dataSource: 'WTO Trade Statistics'
  },
  {
    id: 'demographic-transition-model',
    title: 'Demographic Transition Model Interactive',
    description: 'Explore the demographic transition model with real country examples and interactive stage analysis.',
    category: 'Interactive Learning Tools',
    type: 'interactive',
    level: 'intermediate',
    topics: ['demographic transition', 'population geography', 'birth rates', 'death rates'],
    component: 'DemographicTransitionModel',
    lastUpdated: '2025-01-25',
    features: [
      'Interactive DTM stages',
      'Country classification',
      'Rate change animations',
      'Population pyramid integration',
      'Future projections'
    ],
    learningObjectives: [
      'Understand demographic transition stages',
      'Classify countries by demographic characteristics',
      'Predict demographic futures',
      'Connect demographic change to development'
    ],
    complexity: 'moderate',
    estimatedTime: '25-35 minutes',
    dataSource: 'UN Population Division'
  },
  {
    id: 'gravity-model-simulator',
    title: 'Gravity Model Simulator',
    description: 'Explore spatial interaction using gravity models with distance decay and population effects.',
    category: 'Interactive Learning Tools',
    type: 'interactive',
    level: 'advanced',
    topics: ['spatial interaction', 'gravity model', 'distance decay', 'urban geography'],
    component: 'GravityModelSimulator',
    lastUpdated: '2025-02-08',
    features: [
      'Interactive gravity calculations',
      'Distance decay visualization',
      'Multiple interaction types',
      'Parameter adjustment controls',
      'Real-world applications'
    ],
    learningObjectives: [
      'Understand spatial interaction principles',
      'Apply gravity model concepts',
      'Analyze distance decay effects',
      'Predict interaction patterns'
    ],
    complexity: 'complex',
    estimatedTime: '35-45 minutes'
  },
  {
    id: 'land-use-planner',
    title: 'Urban Land Use Planner',
    description: 'Design optimal urban land use patterns considering economic, social, and environmental factors.',
    category: 'Interactive Learning Tools',
    type: 'interactive',
    level: 'advanced',
    topics: ['urban planning', 'land use', 'zoning', 'sustainable development'],
    component: 'LandUsePlanner',
    lastUpdated: '2025-02-10',
    features: [
      'Interactive land use design',
      'Zoning regulation simulation',
      'Impact assessment tools',
      'Sustainability scoring',
      'Community feedback integration'
    ],
    learningObjectives: [
      'Design optimal urban land use patterns',
      'Balance competing land use demands',
      'Consider sustainability in planning',
      'Understand planning trade-offs'
    ],
    complexity: 'complex',
    estimatedTime: '45-60 minutes'
  }
];

// Tool categories for organization
export const TOOL_CATEGORIES = [
  'Population & Demographics',
  'Climate & Environment',
  'Urban & Development',
  'Culture & Society',
  'Economic & Trade'
] as const;

// Complexity levels with descriptions
export const COMPLEXITY_LEVELS = {
  simple: {
    label: 'Beginner Friendly',
    description: 'Easy to use with guided instructions',
    color: 'green',
    icon: 'Smile'
  },
  moderate: {
    label: 'Intermediate',
    description: 'Some geographic knowledge helpful',
    color: 'blue',
    icon: 'User'
  },
  complex: {
    label: 'Advanced',
    description: 'Requires strong analytical skills',
    color: 'purple',
    icon: 'GraduationCap'
  }
} as const;

// Learning objective categories
export const LEARNING_OBJECTIVE_CATEGORIES = {
  analysis: 'Data Analysis & Interpretation',
  modeling: 'Geographic Modeling',
  patterns: 'Pattern Recognition',
  systems: 'Systems Thinking',
  application: 'Real-World Application'
} as const;

// Helper functions
export function getToolsByCategory(category: string): InteractiveTool[] {
  return INTERACTIVE_TOOLS.filter(tool => 
    tool.topics.some(topic => topic.toLowerCase().includes(category.toLowerCase()))
  );
}

export function getToolsByComplexity(complexity: 'simple' | 'moderate' | 'complex'): InteractiveTool[] {
  return INTERACTIVE_TOOLS.filter(tool => tool.complexity === complexity);
}

export function getToolsByLevel(level: string): InteractiveTool[] {
  return INTERACTIVE_TOOLS.filter(tool => tool.level === level);
}

export function searchTools(query: string): InteractiveTool[] {
  const lowercaseQuery = query.toLowerCase();
  return INTERACTIVE_TOOLS.filter(tool => 
    tool.title.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.topics.some(topic => topic.toLowerCase().includes(lowercaseQuery)) ||
    tool.learningObjectives.some(obj => obj.toLowerCase().includes(lowercaseQuery))
  );
}

export function getFeaturedTools(): InteractiveTool[] {
  return INTERACTIVE_TOOLS.filter(tool => 
    ['population-calculator', 'climate-data-explorer', 'migration-flow-visualizer'].includes(tool.id)
  );
}

// Tool usage tracking (for future analytics)
export interface ToolUsageData {
  toolId: string;
  timeSpent: number;
  completedObjectives: string[];
  userLevel: string;
  feedback?: number; // 1-5 rating
  timestamp: string;
}
