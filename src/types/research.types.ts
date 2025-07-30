// Research paper types for academic content

export interface Author {
  name: string;
  affiliation?: string;
  orcidId?: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: Author[];
  abstract: string;
  publicationDate: string;
  journal?: string;
  doi?: string;
  url?: string;
  citationCount: number;
  openAccessStatus: 'gold' | 'green' | 'bronze' | 'closed';
  geographySubfields: string[];
  academicLevel: 'undergraduate' | 'graduate' | 'advanced';
  summary?: string; // AI-generated or manual for students
  keyFindings: string[];
  methodology: string;
  relevanceScore: number; // 1-10 for educational value
  // Enhanced fields added by processing
  estimatedReadingTime?: number;
  freshnessScore?: number;
}

export interface ResearchFilters {
  topics: string[];
  publicationDateRange: {
    start: number;
    end: number;
  };
  academicLevel: ('undergraduate' | 'graduate' | 'advanced')[];
  openAccess: boolean;
  citationRange: {
    min: number;
    max: number;
  };
  methodology: ('quantitative' | 'qualitative' | 'mixed' | 'theoretical')[];
  geographySubfield: string[];
  enhanceWithGeography: boolean; // Toggle to enhance searches with geography terms
}

export interface AcademicAPIs {
  // Removed semanticScholar - not suitable for multi-user applications
  openAlex: {
    baseUrl: string;
    rateLimit: string;
    politePool: boolean;
    contactEmail?: string;
  };
  crossRef: {
    baseUrl: string;
    rateLimit: string;
    politePool: boolean;
  };
}

// Academic level definitions
export const ACADEMIC_LEVELS = {
  undergraduate: {
    label: 'Undergraduate',
    description: 'Suitable for college students',
    color: 'green',
  },
  graduate: {
    label: 'Graduate',
    description: 'Master\'s level content',
    color: 'blue',
  },
  advanced: {
    label: 'Advanced',
    description: 'PhD level research',
    color: 'purple',
  },
} as const;

// Open access status definitions
export const OPEN_ACCESS_STATUS = {
  gold: {
    label: 'Free Access',
    description: 'Fully open access',
    color: 'green',
  },
  green: {
    label: 'Author Version',
    description: 'Free pre-print available',
    color: 'emerald',
  },
  bronze: {
    label: 'Free to Read',
    description: 'Currently free but may change',
    color: 'amber',
  },
  closed: {
    label: 'Limited Access',
    description: 'Subscription required',
    color: 'gray',
  },
} as const;

// Geography research topics
export const GEOGRAPHY_RESEARCH_TOPICS = [
  'human geography',
  'urban planning',
  'climate change geography', 
  'population geography',
  'economic geography',
  'cultural geography',
  'political geography',
  'environmental geography',
  'GIS and spatial analysis',
  'migration studies',
  'sustainable development',
  'urbanization patterns',
] as const;

// Research categories with metadata
export const RESEARCH_CATEGORIES = {
  'Urban Geography': {
    icon: 'Building',
    description: 'Cities, urbanization, and metropolitan development',
    beginner_papers: ['intro_to_urban_planning', 'city_growth_patterns'],
    trending_topics: ['smart cities', 'urban heat islands', 'gentrification'],
  },
  'Climate Geography': {
    icon: 'Thermometer', 
    description: 'Climate patterns, change, and human adaptation',
    beginner_papers: ['climate_basics', 'adaptation_strategies'],
    trending_topics: ['climate migration', 'extreme weather', 'carbon mapping'],
  },
  'Population Studies': {
    icon: 'Users',
    description: 'Demographics, migration, and population dynamics', 
    beginner_papers: ['population_growth', 'migration_patterns'],
    trending_topics: ['aging populations', 'urban migration', 'refugee studies'],
  },
  'Economic Geography': {
    icon: 'TrendingUp',
    description: 'Trade, development, and economic spatial patterns',
    beginner_papers: ['global_trade_basics', 'economic_development'],
    trending_topics: ['globalization', 'supply chains', 'economic inequality'],
  },
  'Cultural Geography': {
    icon: 'Globe',
    description: 'Cultural landscapes, identity, and place',
    beginner_papers: ['cultural_landscapes', 'place_and_identity'],
    trending_topics: ['digital cultures', 'heritage sites', 'cultural diffusion'],
  },
  'Political Geography': {
    icon: 'Flag',
    description: 'Borders, territories, and geopolitics',
    beginner_papers: ['borders_and_nations', 'geopolitics_intro'],
    trending_topics: ['border conflicts', 'territorial disputes', 'electoral geography'],
  },
} as const;
