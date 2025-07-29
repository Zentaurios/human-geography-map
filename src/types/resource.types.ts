// Educational resource types for the resources page

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'interactive' | 'pdf' | 'worksheet' | 'guide' | 'assessment' | 'link';
  level: 'beginner' | 'intermediate' | 'advanced' | 'ap';
  topics: string[];
  previewAvailable?: boolean;
  downloadUrl?: string;
  interactiveUrl?: string;
  pageCount?: number;
  lastUpdated: string;
  educationalStandards?: string[];
  skillLevel?: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime?: string;
}

export interface StudyMaterial extends Resource {
  type: 'pdf' | 'worksheet' | 'guide' | 'assessment';
  downloadUrl: string;
  fileSize?: string;
  language?: string;
  prerequisites?: string[];
}

export interface InteractiveTool extends Resource {
  type: 'interactive';
  component: string;
  features: string[];
  learningObjectives: string[];
  dataSource?: string;
  complexity: 'simple' | 'moderate' | 'complex';
}

export interface ExternalLink extends Resource {
  type: 'link';
  url: string;
  institution: string;
  trustLevel: 'highest' | 'high' | 'medium';
  resourceTypes: string[];
  subjects: string[];
  description: string;
}

export interface ResourceFilters {
  category: string;
  type: string[];
  level: string[];
  topics: string[];
  searchQuery: string;
}

export interface StudyPlan {
  id: string;
  userId?: string;
  userLevel: 'beginner' | 'intermediate' | 'advanced';
  studyGoals: string[];
  timeframe: '1-month' | '3-months' | '6-months';
  recommendedResources: string[];
  weeklySchedule: WeeklySchedule[];
  progress: StudyProgress;
  createdAt: string;
  updatedAt: string;
}

export interface WeeklySchedule {
  week: number;
  topics: string[];
  resources: string[];
  activities: string[];
  estimatedHours: number;
}

export interface StudyProgress {
  completedResources: string[];
  skillLevels: Record<string, number>;
  studyStreak: number;
  totalStudyTime: number;
  lastActivity: string;
  milestones: ProgressMilestone[];
}

export interface ProgressMilestone {
  id: string;
  title: string;
  description: string;
  achievedAt: string;
  badgeIcon: string;
}

export interface EducationalInstitution {
  name: string;
  url: string;
  category: string;
  description: string;
  trustLevel: 'highest' | 'high' | 'medium';
  resourceTypes: string[];
  subjects: string[];
  region?: string;
  language?: string;
  accessLevel: 'free' | 'limited' | 'premium';
}

export interface UserPreferences {
  preferredLevel: 'beginner' | 'intermediate' | 'advanced';
  interests: string[];
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  studyTimeAvailable: number; // hours per week
  notifications: {
    studyReminders: boolean;
    newResources: boolean;
    progressUpdates: boolean;
  };
}

// Resource category definitions
export const RESOURCE_CATEGORIES = {
  'Study Guides & Materials': {
    icon: 'BookOpen',
    description: 'Comprehensive guides, worksheets, and study aids',
    color: 'blue',
  },
  'Interactive Learning Tools': {
    icon: 'Play',
    description: 'Hands-on tools for exploring geographic concepts',
    color: 'green',
  },
  'Data Visualization Resources': {
    icon: 'BarChart3',
    description: 'Charts, graphs, and data exploration tools',
    color: 'purple',
  },
  'Educational Institution Links': {
    icon: 'ExternalLink',
    description: 'Trusted academic and research institutions',
    color: 'orange',
  },
  'Assessment & Practice Tests': {
    icon: 'CheckCircle',
    description: 'Quizzes, tests, and self-assessment tools',
    color: 'red',
  },
  'Career Guidance': {
    icon: 'Users',
    description: 'Geography career paths and professional development',
    color: 'indigo',
  },
  'Technology Tools': {
    icon: 'Laptop',
    description: 'GIS software, mapping tools, and digital resources',
    color: 'teal',
  },
  'Global Education Statistics': {
    icon: 'Globe',
    description: 'UNESCO and World Bank educational data',
    color: 'emerald',
  },
} as const;

// Learning objectives for different levels
export const LEARNING_OBJECTIVES = {
  beginner: [
    'Understand basic geographic concepts',
    'Learn to read maps and interpret data',
    'Develop research and study skills',
    'Build geographic vocabulary',
  ],
  intermediate: [
    'Analyze geographic patterns and relationships',
    'Apply geographic concepts to real-world scenarios',
    'Develop critical thinking about spatial issues',
    'Practice academic writing and research',
  ],
  advanced: [
    'Conduct independent geographic research',
    'Synthesize complex geographic information',
    'Evaluate geographic theories and models',
    'Prepare for college-level coursework',
  ],
  ap: [
    'Master AP Human Geography curriculum',
    'Practice AP exam strategies and techniques',
    'Analyze geographic data and scenarios',
    'Develop college-level academic skills',
  ],
} as const;

// Study goal options for the study plan generator
export const STUDY_GOALS = [
  'Pass AP Human Geography exam',
  'Improve college preparation',
  'Understand global issues better',
  'Develop research skills',
  'Learn about career opportunities',
  'Improve map reading abilities',
  'Understand demographic trends',
  'Learn about urban planning',
  'Study migration patterns',
  'Explore climate geography',
  'Understand economic geography',
  'Learn about cultural geography',
  'Study political geography',
  'Develop GIS skills',
  'Improve data analysis abilities',
  'Build academic writing skills',
] as const;

// Resource tier system
export interface ResourceTier {
  tier: 1 | 2 | 3;
  name: string;
  description: string;
  accessLevel: 'free' | 'limited' | 'premium';
}

export const RESOURCE_TIERS: ResourceTier[] = [
  {
    tier: 1,
    name: 'Interactive Learning Tools',
    description: 'Built-in educational widgets and visualizations',
    accessLevel: 'free'
  },
  {
    tier: 2, 
    name: 'Educational Institution Resources',
    description: 'Links to UNESCO, World Bank, universities',
    accessLevel: 'free'
  },
  {
    tier: 3,
    name: 'Downloadable Study Materials',
    description: 'PDFs, guides, worksheets, and assessments',
    accessLevel: 'free'
  }
];

// Educational standards mapping
export const EDUCATIONAL_STANDARDS = {
  'AP Human Geography': {
    units: [
      'Thinking Geographically',
      'Population and Migration Patterns',
      'Cultural Patterns and Processes',
      'Political Patterns and Processes',
      'Agriculture and Rural Land-Use',
      'Cities and Urban Land-Use',
      'Industrial and Economic Development',
    ],
    skills: [
      'Spatial Analysis',
      'Data Analysis',
      'Source Analysis',
      'Scale Analysis',
      'Governance',
    ],
  },
  'Common Core Geography': {
    standards: [
      'Geographic reasoning',
      'Spatial thinking',
      'Map skills',
      'Data interpretation',
    ],
  },
  'National Geography Standards': {
    elements: [
      'The World in Spatial Terms',
      'Places and Regions', 
      'Physical Systems',
      'Human Systems',
      'Environment and Society',
      'The Uses of Geography',
    ],
  },
} as const;
