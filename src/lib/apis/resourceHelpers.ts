// Resource processing utilities and helper functions

import { Resource, StudyMaterial, InteractiveTool, ResourceFilters } from '@/types/resource.types';
import { STUDY_MATERIALS } from '@/data/studyMaterials';
import { INTERACTIVE_TOOLS } from '@/data/interactiveTools';
import { EDUCATIONAL_INSTITUTIONS } from '@/data/educationalLinks';

/**
 * Filter resources based on criteria
 */
export function filterResources(
  resources: Resource[],
  filters: ResourceFilters
): Resource[] {
  return resources.filter(resource => {
    // Category filter
    if (filters.category && resource.category !== filters.category) {
      return false;
    }

    // Type filter
    if (filters.type.length > 0 && !filters.type.includes(resource.type)) {
      return false;
    }

    // Level filter
    if (filters.level.length > 0 && !filters.level.includes(resource.level)) {
      return false;
    }

    // Topics filter
    if (filters.topics.length > 0) {
      const hasMatchingTopic = filters.topics.some(filterTopic =>
        resource.topics.some(resourceTopic =>
          resourceTopic.toLowerCase().includes(filterTopic.toLowerCase())
        )
      );
      if (!hasMatchingTopic) {
        return false;
      }
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchableText = [
        resource.title,
        resource.description,
        ...resource.topics
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(query)) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Get all unique values for filter options
 */
export function getFilterOptions(resources: Resource[]) {
  const categories = new Set<string>();
  const types = new Set<string>();
  const levels = new Set<string>();
  const topics = new Set<string>();

  resources.forEach(resource => {
    categories.add(resource.category);
    types.add(resource.type);
    levels.add(resource.level);
    resource.topics.forEach(topic => topics.add(topic));
  });

  return {
    categories: Array.from(categories).sort(),
    types: Array.from(types).sort(),
    levels: Array.from(levels),
    topics: Array.from(topics).sort()
  };
}

/**
 * Combine all resources from different sources
 */
export function getAllResources(): Resource[] {
  const studyMaterials: Resource[] = STUDY_MATERIALS.map(material => ({
    ...material,
    type: material.type as Resource['type']
  }));

  const interactiveTools: Resource[] = INTERACTIVE_TOOLS.map(tool => ({
    ...tool,
    type: 'interactive' as Resource['type'],
    downloadUrl: undefined,
    interactiveUrl: `/tools/${tool.id}`
  }));

  const institutionLinks: Resource[] = EDUCATIONAL_INSTITUTIONS.map(institution => ({
    id: `institution-${institution.name.toLowerCase().replace(/\s+/g, '-')}`,
    title: institution.name,
    description: institution.description,
    category: institution.category,
    type: 'link' as Resource['type'],
    level: 'intermediate' as Resource['level'],
    topics: institution.subjects,
    lastUpdated: new Date().toISOString().split('T')[0],
    downloadUrl: institution.url,
    interactiveUrl: institution.url
  }));

  return [...studyMaterials, ...interactiveTools, ...institutionLinks];
}

/**
 * Get recommended resources based on user preferences
 */
export function getRecommendedResources(
  userLevel: 'beginner' | 'intermediate' | 'advanced' | 'ap',
  interests: string[] = [],
  limit: number = 6
): Resource[] {
  const allResources = getAllResources();
  
  // Score resources based on user preferences
  const scoredResources = allResources.map(resource => {
    let score = 0;
    
    // Level matching (exact match gets higher score)
    if (resource.level === userLevel) {
      score += 10;
    } else if (
      (userLevel === 'intermediate' && (resource.level === 'beginner' || resource.level === 'advanced')) ||
      (userLevel === 'advanced' && resource.level === 'intermediate')
    ) {
      score += 5;
    }
    
    // Interest matching
    const topicMatches = resource.topics.filter(topic =>
      interests.some(interest => 
        topic.toLowerCase().includes(interest.toLowerCase()) ||
        interest.toLowerCase().includes(topic.toLowerCase())
      )
    );
    score += topicMatches.length * 3;
    
    // Boost interactive tools for engagement
    if (resource.type === 'interactive') {
      score += 2;
    }
    
    // Recent materials get slight boost
    const daysSinceUpdate = Math.floor(
      (Date.now() - new Date(resource.lastUpdated).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceUpdate < 30) {
      score += 1;
    }
    
    return { resource, score };
  });
  
  return scoredResources
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.resource);
}

/**
 * Create a learning path based on prerequisites and difficulty
 */
export function createLearningPath(
  resources: Resource[],
  targetLevel: 'beginner' | 'intermediate' | 'advanced' | 'ap'
): Resource[] {
  const levelOrder: Record<string, number> = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
    ap: 4
  };
  
  const targetOrderValue = levelOrder[targetLevel];
  
  // Filter and sort resources by difficulty progression
  return resources
    .filter(resource => levelOrder[resource.level] <= targetOrderValue)
    .sort((a, b) => {
      const aOrder = levelOrder[a.level];
      const bOrder = levelOrder[b.level];
      
      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }
      
      // Secondary sort by type (theory before practice)
      const typeOrder = { guide: 1, worksheet: 2, interactive: 3, assessment: 4, link: 5 };
      const aTypeOrder = typeOrder[a.type as keyof typeof typeOrder] || 6;
      const bTypeOrder = typeOrder[b.type as keyof typeof typeOrder] || 6;
      
      return aTypeOrder - bTypeOrder;
    });
}

/**
 * Analyze resource usage patterns
 */
export function analyzeResourceUsage(completedResources: string[]): {
  completionRate: number;
  skillCoverage: Record<string, number>;
  recommendedNext: Resource[];
  gaps: string[];
} {
  const allResources = getAllResources();
  const completedSet = new Set(completedResources);
  
  const completionRate = (completedResources.length / allResources.length) * 100;
  
  // Analyze skill coverage
  const skillCoverage: Record<string, number> = {};
  const allTopics = new Set<string>();
  const coveredTopics = new Set<string>();
  
  allResources.forEach(resource => {
    resource.topics.forEach(topic => {
      allTopics.add(topic);
      if (completedSet.has(resource.id)) {
        coveredTopics.add(topic);
      }
    });
  });
  
  allTopics.forEach(topic => {
    const topicResources = allResources.filter(r => r.topics.includes(topic));
    const completedTopicResources = topicResources.filter(r => completedSet.has(r.id));
    skillCoverage[topic] = (completedTopicResources.length / topicResources.length) * 100;
  });
  
  // Find gaps (topics with low coverage)
  const gaps = Object.entries(skillCoverage)
    .filter(([_, coverage]) => coverage < 50)
    .map(([topic, _]) => topic)
    .slice(0, 5);
  
  // Recommend next resources based on gaps and progression
  const recommendedNext = allResources
    .filter(resource => !completedSet.has(resource.id))
    .filter(resource => resource.topics.some(topic => gaps.includes(topic)))
    .slice(0, 3);
  
  return {
    completionRate,
    skillCoverage,
    recommendedNext,
    gaps
  };
}

/**
 * Generate study schedule
 */
export function generateStudySchedule(
  resources: Resource[],
  hoursPerWeek: number,
  weeks: number
): Array<{
  week: number;
  resources: Resource[];
  estimatedHours: number;
  focus: string;
}> {
  const totalHours = hoursPerWeek * weeks;
  const schedule: Array<{
    week: number;
    resources: Resource[];
    estimatedHours: number;
    focus: string;
  }> = [];
  
  // Distribute resources across weeks
  const resourcesPerWeek = Math.ceil(resources.length / weeks);
  
  for (let week = 1; week <= weeks; week++) {
    const startIndex = (week - 1) * resourcesPerWeek;
    const endIndex = Math.min(startIndex + resourcesPerWeek, resources.length);
    const weekResources = resources.slice(startIndex, endIndex);
    
    // Determine focus based on resource types
    const resourceTypes = weekResources.map(r => r.type);
    let focus = 'General Study';
    
    if (resourceTypes.includes('interactive')) {
      focus = 'Interactive Learning';
    } else if (resourceTypes.includes('assessment')) {
      focus = 'Assessment & Practice';
    } else if (resourceTypes.includes('guide')) {
      focus = 'Theory & Concepts';
    }
    
    schedule.push({
      week,
      resources: weekResources,
      estimatedHours: Math.min(hoursPerWeek, totalHours - (week - 1) * hoursPerWeek),
      focus
    });
  }
  
  return schedule;
}

/**
 * Search resources with advanced options
 */
export function searchResources(
  query: string,
  options: {
    includeDescription?: boolean;
    includeTopics?: boolean;
    fuzzyMatch?: boolean;
    boost?: Record<string, number>; // Boost certain types/categories
  } = {}
): Resource[] {
  const {
    includeDescription = true,
    includeTopics = true,
    fuzzyMatch = false,
    boost = {}
  } = options;
  
  const allResources = getAllResources();
  const searchTerms = query.toLowerCase().split(' ');
  
  const results = allResources.map(resource => {
    let score = 0;
    
    // Search in title (highest weight)
    searchTerms.forEach(term => {
      if (resource.title.toLowerCase().includes(term)) {
        score += 10;
      }
    });
    
    // Search in description
    if (includeDescription) {
      searchTerms.forEach(term => {
        if (resource.description.toLowerCase().includes(term)) {
          score += 5;
        }
      });
    }
    
    // Search in topics
    if (includeTopics) {
      resource.topics.forEach(topic => {
        searchTerms.forEach(term => {
          if (topic.toLowerCase().includes(term)) {
            score += 3;
          }
        });
      });
    }
    
    // Apply boosts
    if (boost[resource.type]) {
      score *= boost[resource.type];
    }
    if (boost[resource.category]) {
      score *= boost[resource.category];
    }
    
    return { resource, score };
  });
  
  return results
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.resource);
}

/**
 * Export resource data for offline use
 */
export function exportResourceData(resources: Resource[]): string {
  const exportData = {
    exportDate: new Date().toISOString(),
    totalResources: resources.length,
    resources: resources.map(resource => ({
      id: resource.id,
      title: resource.title,
      description: resource.description,
      category: resource.category,
      type: resource.type,
      level: resource.level,
      topics: resource.topics,
      lastUpdated: resource.lastUpdated
    }))
  };
  
  return JSON.stringify(exportData, null, 2);
}

/**
 * Validate resource data structure
 */
export function validateResource(resource: any): resource is Resource {
  const requiredFields = ['id', 'title', 'description', 'category', 'type', 'level', 'topics', 'lastUpdated'];
  
  return requiredFields.every(field => 
    field in resource && 
    resource[field] !== undefined && 
    resource[field] !== null
  ) && Array.isArray(resource.topics);
}

/**
 * Performance metrics for resource loading
 */
export function measureResourceLoadTime(): {
  start: () => void;
  end: () => number;
} {
  let startTime = 0;
  
  return {
    start: () => {
      startTime = performance.now();
    },
    end: () => {
      return performance.now() - startTime;
    }
  };
}
