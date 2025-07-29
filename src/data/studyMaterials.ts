// Curated study materials and downloadable resources

import { StudyMaterial } from '@/types/resource.types';

export const STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'ap-human-geo-unit1',
    title: 'AP Human Geography Unit 1: Thinking Geographically Study Guide',
    description: 'Comprehensive guide covering spatial concepts, maps, and geographic data analysis. Includes practice questions and key terminology.',
    category: 'Study Guides & Materials',
    type: 'guide',
    level: 'ap',
    topics: ['spatial concepts', 'maps', 'geographic data', 'scale', 'spatial analysis'],
    downloadUrl: '/downloads/ap-unit1-study-guide.pdf',
    previewAvailable: true,
    pageCount: 24,
    lastUpdated: '2025-01-15',
    fileSize: '2.1 MB',
    educationalStandards: ['AP Human Geography Course Framework'],
    language: 'English',
    estimatedTime: '2-3 hours',
    prerequisites: ['Basic geography knowledge', 'Map reading skills']
  },
  {
    id: 'population-pyramid-worksheet',
    title: 'Population Pyramid Analysis Worksheet',
    description: 'Practice analyzing population structures and demographic transitions with real-world examples from different countries.',
    category: 'Study Guides & Materials',
    type: 'worksheet',
    level: 'intermediate',
    topics: ['population structure', 'demographic transition', 'age cohorts', 'population growth'],
    downloadUrl: '/downloads/population-pyramid-worksheet.pdf',
    previewAvailable: true,
    pageCount: 8,
    lastUpdated: '2025-02-01',
    fileSize: '1.5 MB',
    language: 'English',
    estimatedTime: '45 minutes',
    prerequisites: ['Basic understanding of demographics']
  },
  {
    id: 'urbanization-case-studies',
    title: 'Global Urbanization Case Studies Collection',
    description: 'In-depth case studies of urbanization in major world cities including challenges, opportunities, and planning solutions.',
    category: 'Study Guides & Materials',
    type: 'guide',
    level: 'advanced',
    topics: ['urbanization', 'city planning', 'megacities', 'urban challenges', 'sustainable development'],
    downloadUrl: '/downloads/urbanization-case-studies.pdf',
    previewAvailable: true,
    pageCount: 32,
    lastUpdated: '2025-01-20',
    fileSize: '4.2 MB',
    educationalStandards: ['AP Human Geography Unit 6'],
    language: 'English',
    estimatedTime: '3-4 hours',
    prerequisites: ['Urban geography basics', 'Case study analysis skills']
  },
  {
    id: 'migration-patterns-workbook',
    title: 'Global Migration Patterns Workbook',
    description: 'Interactive workbook exploring push-pull factors, migration theories, and contemporary migration challenges.',
    category: 'Study Guides & Materials',
    type: 'worksheet',
    level: 'intermediate',
    topics: ['migration', 'push-pull factors', 'refugee patterns', 'economic migration', 'cultural diffusion'],
    downloadUrl: '/downloads/migration-patterns-workbook.pdf',
    previewAvailable: true,
    pageCount: 16,
    lastUpdated: '2025-01-10',
    fileSize: '2.8 MB',
    educationalStandards: ['AP Human Geography Unit 2'],
    language: 'English',
    estimatedTime: '2 hours',
    prerequisites: ['Basic geography knowledge']
  },
  {
    id: 'economic-development-indicators',
    title: 'Understanding Economic Development Indicators',
    description: 'Guide to interpreting HDI, GDP, Gini coefficient, and other development measures with real-world applications.',
    category: 'Study Guides & Materials',
    type: 'guide',
    level: 'advanced',
    topics: ['economic development', 'HDI', 'GDP', 'inequality', 'development indicators'],
    downloadUrl: '/downloads/economic-development-indicators.pdf',
    previewAvailable: true,
    pageCount: 20,
    lastUpdated: '2025-01-25',
    fileSize: '3.1 MB',
    educationalStandards: ['AP Human Geography Unit 7'],
    language: 'English',
    estimatedTime: '2.5 hours',
    prerequisites: ['Basic economics knowledge', 'Data interpretation skills']
  },
  {
    id: 'cultural-geography-vocab',
    title: 'Cultural Geography Vocabulary Builder',
    description: 'Comprehensive vocabulary guide with definitions, examples, and visual aids for key cultural geography terms.',
    category: 'Study Guides & Materials',
    type: 'guide',
    level: 'beginner',
    topics: ['cultural geography', 'vocabulary', 'cultural diffusion', 'language', 'religion'],
    downloadUrl: '/downloads/cultural-geography-vocab.pdf',
    previewAvailable: true,
    pageCount: 12,
    lastUpdated: '2025-02-05',
    fileSize: '1.8 MB',
    educationalStandards: ['AP Human Geography Unit 3'],
    language: 'English',
    estimatedTime: '1.5 hours',
    prerequisites: ['None']
  },
  {
    id: 'ap-frq-practice-set1',
    title: 'AP Human Geography FRQ Practice Set 1',
    description: 'Practice free-response questions with sample answers and scoring guidelines for effective exam preparation.',
    category: 'Assessment & Practice Tests',
    type: 'assessment',
    level: 'ap',
    topics: ['AP exam prep', 'FRQ practice', 'essay writing', 'geographic analysis'],
    downloadUrl: '/downloads/ap-frq-practice-set1.pdf',
    previewAvailable: true,
    pageCount: 18,
    lastUpdated: '2025-01-30',
    fileSize: '2.5 MB',
    educationalStandards: ['AP Human Geography Exam Format'],
    language: 'English',
    estimatedTime: '1.5 hours',
    prerequisites: ['AP Human Geography course content', 'Essay writing skills']
  },
  {
    id: 'gis-basics-tutorial',
    title: 'Introduction to GIS and Spatial Analysis',
    description: 'Beginner-friendly guide to Geographic Information Systems with hands-on exercises and free software recommendations.',
    category: 'Technology Tools',
    type: 'guide',
    level: 'intermediate',
    topics: ['GIS', 'spatial analysis', 'mapping software', 'data visualization', 'remote sensing'],
    downloadUrl: '/downloads/gis-basics-tutorial.pdf',
    previewAvailable: true,
    pageCount: 28,
    lastUpdated: '2025-02-10',
    fileSize: '5.2 MB',
    language: 'English',
    estimatedTime: '4 hours',
    prerequisites: ['Computer literacy', 'Basic geography knowledge']
  },
  {
    id: 'climate-change-geography',
    title: 'Climate Change and Geographic Impacts',
    description: 'Comprehensive study of climate change effects on human and physical geography with current research and data.',
    category: 'Study Guides & Materials',
    type: 'guide',
    level: 'advanced',
    topics: ['climate change', 'environmental geography', 'adaptation', 'mitigation', 'sustainable development'],
    downloadUrl: '/downloads/climate-change-geography.pdf',
    previewAvailable: true,
    pageCount: 26,
    lastUpdated: '2025-01-05',
    fileSize: '3.8 MB',
    language: 'English',
    estimatedTime: '3 hours',
    prerequisites: ['Environmental science basics', 'Physical geography knowledge']
  },
  {
    id: 'political-geography-concepts',
    title: 'Political Geography: Borders, States, and Nations',
    description: 'Exploration of political geographic concepts including sovereignty, territoriality, and geopolitics.',
    category: 'Study Guides & Materials',
    type: 'guide',
    level: 'intermediate',
    topics: ['political geography', 'sovereignty', 'borders', 'nations', 'geopolitics'],
    downloadUrl: '/downloads/political-geography-concepts.pdf',
    previewAvailable: true,
    pageCount: 22,
    lastUpdated: '2025-01-18',
    fileSize: '2.9 MB',
    educationalStandards: ['AP Human Geography Unit 4'],
    language: 'English',
    estimatedTime: '2.5 hours',
    prerequisites: ['Basic government/civics knowledge']
  },
  {
    id: 'agriculture-land-use-guide',
    title: 'Agricultural Geography and Land Use Patterns',
    description: 'Study guide covering agricultural systems, land use models, and rural geography concepts.',
    category: 'Study Guides & Materials',
    type: 'guide',
    level: 'intermediate',
    topics: ['agriculture', 'land use', 'rural geography', 'farming systems', 'food security'],
    downloadUrl: '/downloads/agriculture-land-use-guide.pdf',
    previewAvailable: true,
    pageCount: 24,
    lastUpdated: '2025-01-12',
    fileSize: '3.4 MB',
    educationalStandards: ['AP Human Geography Unit 5'],
    language: 'English',
    estimatedTime: '3 hours',
    prerequisites: ['Basic geography knowledge']
  },
  {
    id: 'geography-careers-handbook',
    title: 'Geography Careers and Professional Pathways',
    description: 'Comprehensive guide to career opportunities in geography, required skills, and educational pathways.',
    category: 'Career Guidance',
    type: 'guide',
    level: 'advanced',
    topics: ['geography careers', 'professional development', 'college planning', 'job market', 'skills'],
    downloadUrl: '/downloads/geography-careers-handbook.pdf',
    previewAvailable: true,
    pageCount: 16,
    lastUpdated: '2025-02-08',
    fileSize: '2.2 MB',
    language: 'English',
    estimatedTime: '2 hours',
    prerequisites: ['Interest in geography careers']
  }
];

// Categories for organizing materials
export const STUDY_MATERIAL_CATEGORIES = [
  'Study Guides & Materials',
  'Assessment & Practice Tests', 
  'Technology Tools',
  'Career Guidance'
] as const;

// Academic levels for filtering
export const ACADEMIC_LEVELS = [
  'beginner',
  'intermediate', 
  'advanced',
  'ap'
] as const;

// File type icons mapping
export const FILE_TYPE_ICONS = {
  guide: 'BookOpen',
  worksheet: 'FileText',
  assessment: 'CheckCircle',
  pdf: 'File'
} as const;

// Level color mapping for badges
export const LEVEL_COLORS = {
  beginner: 'green',
  intermediate: 'blue', 
  advanced: 'purple',
  ap: 'red'
} as const;

// Helper function to get materials by category
export function getMaterialsByCategory(category: string): StudyMaterial[] {
  return STUDY_MATERIALS.filter(material => material.category === category);
}

// Helper function to get materials by level
export function getMaterialsByLevel(level: string): StudyMaterial[] {
  return STUDY_MATERIALS.filter(material => material.level === level);
}

// Helper function to search materials
export function searchMaterials(query: string): StudyMaterial[] {
  const lowercaseQuery = query.toLowerCase();
  return STUDY_MATERIALS.filter(material => 
    material.title.toLowerCase().includes(lowercaseQuery) ||
    material.description.toLowerCase().includes(lowercaseQuery) ||
    material.topics.some(topic => topic.toLowerCase().includes(lowercaseQuery))
  );
}

// Get featured/recommended materials
export function getFeaturedMaterials(): StudyMaterial[] {
  return STUDY_MATERIALS.filter(material => 
    ['ap-human-geo-unit1', 'population-pyramid-worksheet', 'gis-basics-tutorial', 'geography-careers-handbook'].includes(material.id)
  );
}
