// Educational institution links and external resources

import { EducationalInstitution } from '@/types/resource.types';

export const EDUCATIONAL_INSTITUTIONS: EducationalInstitution[] = [
  {
    name: 'UNESCO Institute for Statistics',
    url: 'https://uis.unesco.org/',
    category: 'Global Education Data',
    description: 'Official source for international education statistics and indicators, providing comprehensive data on global education systems.',
    trustLevel: 'highest',
    resourceTypes: ['statistics', 'reports', 'indicators', 'databases'],
    subjects: ['education policy', 'literacy', 'learning outcomes', 'education finance'],
    region: 'Global',
    language: 'English',
    accessLevel: 'free'
  },
  {
    name: 'World Bank Education Data',
    url: 'https://data.worldbank.org/topic/4',
    category: 'Development & Education',
    description: 'Global development data including education indicators, financing, and outcomes across countries and regions.',
    trustLevel: 'highest',
    resourceTypes: ['data', 'analysis', 'country reports', 'development indicators'],
    subjects: ['education finance', 'access', 'quality', 'development outcomes'],
    region: 'Global',
    language: 'English',
    accessLevel: 'free'
  },
  {
    name: 'National Geographic Education',
    url: 'https://education.nationalgeographic.org/',
    category: 'Geography Learning',
    description: 'Educational resources for geography and exploration including lesson plans, media, and explorer stories.',
    trustLevel: 'high',
    resourceTypes: ['lessons', 'media', 'explorer stories', 'maps'],
    subjects: ['geography', 'exploration', 'conservation', 'cultures'],
    region: 'Global',
    language: 'English',
    accessLevel: 'free'
  },
  {
    name: 'Smithsonian Institution',
    url: 'https://www.si.edu/educators',
    category: 'Museums & Cultural Education',
    description: 'World-class educational resources from America\'s premier museum and research institution.',
    trustLevel: 'highest',
    resourceTypes: ['exhibits', 'educational materials', 'research', 'collections'],
    subjects: ['history', 'culture', 'science', 'arts'],
    region: 'United States',
    language: 'English',
    accessLevel: 'free'
  },
  {
    name: 'BBC Educational Resources',
    url: 'https://www.bbc.co.uk/education',
    category: 'Media & Learning',
    description: 'High-quality educational content including documentaries, interactive features, and learning materials.',
    trustLevel: 'high',
    resourceTypes: ['videos', 'interactive content', 'articles', 'lesson plans'],
    subjects: ['geography', 'history', 'science', 'current events'],
    region: 'United Kingdom',
    language: 'English',
    accessLevel: 'free'
  },
  {
    name: 'MIT OpenCourseWare',
    url: 'https://ocw.mit.edu/',
    category: 'University Resources',
    description: 'Free and open course materials from the Massachusetts Institute of Technology.',
    trustLevel: 'highest',
    resourceTypes: ['course materials', 'lectures', 'assignments', 'readings'],
    subjects: ['all academic disciplines', 'engineering', 'science', 'economics'],
    region: 'United States',
    language: 'English',
    accessLevel: 'free'
  },
  {
    name: 'Stanford Encyclopedia of Philosophy',
    url: 'https://plato.stanford.edu/',
    category: 'Academic References',
    description: 'Scholarly encyclopedia with peer-reviewed articles on philosophical topics.',
    trustLevel: 'highest',
    resourceTypes: ['encyclopedia articles', 'bibliographies', 'scholarly content'],
    subjects: ['philosophy', 'ethics', 'logic', 'history of ideas'],
    region: 'United States',
    language: 'English',
    accessLevel: 'free'
  },
  {
    name: 'OECD Education Statistics',
    url: 'https://www.oecd.org/education/database.htm',
    category: 'Global Education Data',
    description: 'Comprehensive international education statistics and policy analysis from OECD countries.',
    trustLevel: 'highest',
    resourceTypes: ['statistics', 'policy reports', 'analysis', 'country profiles'],
    subjects: ['education policy', 'international comparisons', 'education outcomes'],
    region: 'OECD Countries',
    language: 'English',
    accessLevel: 'free'
  },
  {
    name: 'Khan Academy',
    url: 'https://www.khanacademy.org/',
    category: 'Online Learning Platforms',
    description: 'Free online courses and educational videos covering a wide range of subjects.',
    trustLevel: 'high',
    resourceTypes: ['videos', 'practice exercises', 'courses', 'progress tracking'],
    subjects: ['mathematics', 'science', 'economics', 'humanities'],
    region: 'Global',
    language: 'Multiple',
    accessLevel: 'free'
  },
  {
    name: 'Coursera Public Courses',
    url: 'https://www.coursera.org/browse',
    category: 'Online Learning Platforms',
    description: 'University-level courses from top institutions, many available for free auditing.',
    trustLevel: 'high',
    resourceTypes: ['courses', 'specializations', 'certificates', 'lectures'],
    subjects: ['all academic disciplines', 'professional development', 'technology'],
    region: 'Global',
    language: 'Multiple',
    accessLevel: 'limited'
  },
  {
    name: 'Library of Congress Educational Resources',
    url: 'https://www.loc.gov/education/',
    category: 'Government & Archives',
    description: 'Educational materials and primary sources from the world\'s largest library.',
    trustLevel: 'highest',
    resourceTypes: ['primary sources', 'lesson plans', 'digital collections', 'research guides'],
    subjects: ['history', 'literature', 'government', 'culture'],
    region: 'United States',
    language: 'English',
    accessLevel: 'free'
  },
  {
    name: 'European Centre for Disease Prevention and Control',
    url: 'https://www.ecdc.europa.eu/en/educational-resources',
    category: 'Health & Science Education',
    description: 'Educational resources on public health, epidemiology, and disease prevention.',
    trustLevel: 'highest',
    resourceTypes: ['educational materials', 'training courses', 'guidelines', 'data'],
    subjects: ['public health', 'epidemiology', 'disease prevention'],
    region: 'Europe',
    language: 'English',
    accessLevel: 'free'
  },
  {
    name: 'NASA Educational Resources',
    url: 'https://www.nasa.gov/audience/foreducators/',
    category: 'Science & Technology',
    description: 'Space science and technology educational materials from NASA.',
    trustLevel: 'highest',
    resourceTypes: ['educational activities', 'lesson plans', 'media', 'data'],
    subjects: ['space science', 'earth science', 'technology', 'mathematics'],
    region: 'United States',
    language: 'English',
    accessLevel: 'free'
  },
  {
    name: 'United Nations Educational Resources',
    url: 'https://www.un.org/en/academic-impact/educational-resources',
    category: 'International Organizations',
    description: 'Educational materials on global issues, sustainable development, and international cooperation.',
    trustLevel: 'highest',
    resourceTypes: ['reports', 'educational materials', 'data', 'policy documents'],
    subjects: ['sustainable development', 'international relations', 'human rights'],
    region: 'Global',
    language: 'Multiple',
    accessLevel: 'free'
  },
  {
    name: 'TED-Ed',
    url: 'https://ed.ted.com/',
    category: 'Media & Learning',
    description: 'Educational videos and lesson plans from TED\'s education initiative.',
    trustLevel: 'high',
    resourceTypes: ['videos', 'lesson plans', 'interactive content', 'discussions'],
    subjects: ['science', 'technology', 'humanities', 'arts'],
    region: 'Global',
    language: 'Multiple',
    accessLevel: 'free'
  },
  {
    name: 'Crash Course Educational Videos',
    url: 'https://thecrashcourse.com/',
    category: 'Media & Learning',
    description: 'Fast-paced educational videos covering a wide range of academic subjects.',
    trustLevel: 'high',
    resourceTypes: ['videos', 'educational series', 'study guides'],
    subjects: ['history', 'science', 'literature', 'economics'],
    region: 'Global',
    language: 'English',
    accessLevel: 'free'
  },
  {
    name: 'Open Yale Courses',
    url: 'https://oyc.yale.edu/',
    category: 'University Resources',
    description: 'Free and open access to introductory courses taught by Yale University faculty.',
    trustLevel: 'highest',
    resourceTypes: ['course videos', 'transcripts', 'syllabi', 'readings'],
    subjects: ['humanities', 'social sciences', 'physical sciences'],
    region: 'United States',
    language: 'English',
    accessLevel: 'free'
  },
  {
    name: 'Harvard Extension School Open Learning',
    url: 'https://www.extension.harvard.edu/open-learning-initiative/',
    category: 'University Resources',
    description: 'Free online courses and educational content from Harvard University.',
    trustLevel: 'highest',
    resourceTypes: ['courses', 'lectures', 'educational content', 'research'],
    subjects: ['liberal arts', 'sciences', 'professional development'],
    region: 'United States',
    language: 'English',
    accessLevel: 'free'
  },
  {
    name: 'Internet Archive Educational Resources',
    url: 'https://archive.org/details/education',
    category: 'Digital Archives',
    description: 'Vast collection of educational materials, books, videos, and historical documents.',
    trustLevel: 'high',
    resourceTypes: ['books', 'videos', 'documents', 'software'],
    subjects: ['all subjects', 'historical materials', 'rare books'],
    region: 'Global',
    language: 'Multiple',
    accessLevel: 'free'
  },
  {
    name: 'Project Gutenberg',
    url: 'https://www.gutenberg.org/',
    category: 'Digital Libraries',
    description: 'Free access to over 60,000 eBooks, primarily classic literature and reference works.',
    trustLevel: 'high',
    resourceTypes: ['ebooks', 'literature', 'reference works', 'historical texts'],
    subjects: ['literature', 'history', 'philosophy', 'reference'],
    region: 'Global',
    language: 'Multiple',
    accessLevel: 'free'
  }
];

// Institution categories for filtering
export const INSTITUTION_CATEGORIES = [
  'Global Education Data',
  'Development & Education',
  'Geography Learning',
  'Museums & Cultural Education',
  'Media & Learning',
  'University Resources',
  'Academic References',
  'Online Learning Platforms',
  'Government & Archives',
  'Health & Science Education',
  'Science & Technology',
  'International Organizations',
  'Digital Archives',
  'Digital Libraries'
] as const;

// Trust level definitions
export const TRUST_LEVELS = {
  highest: {
    label: 'Highest',
    description: 'Government agencies, major universities, international organizations',
    color: 'green',
    icon: 'Shield'
  },
  high: {
    label: 'High',
    description: 'Reputable educational institutions and established organizations',
    color: 'blue',
    icon: 'CheckCircle'
  },
  medium: {
    label: 'Medium',
    description: 'Commercial educational platforms with good reputation',
    color: 'yellow',
    icon: 'AlertCircle'
  }
} as const;

// Access level definitions
export const ACCESS_LEVELS = {
  free: {
    label: 'Free Access',
    description: 'Completely free access to all resources',
    color: 'green',
    icon: 'Unlock'
  },
  limited: {
    label: 'Limited Free',
    description: 'Some free content, premium features require payment',
    color: 'yellow',
    icon: 'Key'
  },
  premium: {
    label: 'Premium',
    description: 'Requires subscription or payment for access',
    color: 'red',
    icon: 'Lock'
  }
} as const;

// Helper functions
export function getInstitutionsByCategory(category: string): EducationalInstitution[] {
  return EDUCATIONAL_INSTITUTIONS.filter(institution => institution.category === category);
}

export function getInstitutionsByTrustLevel(trustLevel: 'highest' | 'high' | 'medium'): EducationalInstitution[] {
  return EDUCATIONAL_INSTITUTIONS.filter(institution => institution.trustLevel === trustLevel);
}

export function getInstitutionsByAccessLevel(accessLevel: 'free' | 'limited' | 'premium'): EducationalInstitution[] {
  return EDUCATIONAL_INSTITUTIONS.filter(institution => institution.accessLevel === accessLevel);
}

export function searchInstitutions(query: string): EducationalInstitution[] {
  const lowercaseQuery = query.toLowerCase();
  return EDUCATIONAL_INSTITUTIONS.filter(institution => 
    institution.name.toLowerCase().includes(lowercaseQuery) ||
    institution.description.toLowerCase().includes(lowercaseQuery) ||
    institution.subjects.some(subject => subject.toLowerCase().includes(lowercaseQuery)) ||
    institution.resourceTypes.some(type => type.toLowerCase().includes(lowercaseQuery))
  );
}

export function getFeaturedInstitutions(): EducationalInstitution[] {
  return EDUCATIONAL_INSTITUTIONS.filter(institution => 
    ['UNESCO Institute for Statistics', 'World Bank Education Data', 'National Geographic Education', 'MIT OpenCourseWare'].includes(institution.name)
  );
}

export function getInstitutionsByRegion(region: string): EducationalInstitution[] {
  return EDUCATIONAL_INSTITUTIONS.filter(institution => 
    institution.region === region || institution.region === 'Global'
  );
}

export function getInstitutionsBySubject(subject: string): EducationalInstitution[] {
  return EDUCATIONAL_INSTITUTIONS.filter(institution => 
    institution.subjects.some(sub => sub.toLowerCase().includes(subject.toLowerCase()))
  );
}

// Quality score calculation based on trust level and access
export function calculateQualityScore(institution: EducationalInstitution): number {
  let score = 0;
  
  // Trust level scoring
  switch (institution.trustLevel) {
    case 'highest': score += 40; break;
    case 'high': score += 30; break;
    case 'medium': score += 20; break;
  }
  
  // Access level scoring
  switch (institution.accessLevel) {
    case 'free': score += 30; break;
    case 'limited': score += 20; break;
    case 'premium': score += 10; break;
  }
  
  // Resource variety bonus
  score += Math.min(institution.resourceTypes.length * 5, 20);
  
  // Subject coverage bonus
  score += Math.min(institution.subjects.length * 2, 10);
  
  return score;
}
