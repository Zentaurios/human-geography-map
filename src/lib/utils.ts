// Common utility functions

import { clsx, type ClassValue } from 'clsx';

// Utility for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format numbers with appropriate units
export function formatNumber(value: number, unit?: 'population' | 'area' | 'gdp' | 'distance'): string {
  if (isNaN(value) || value === null || value === undefined) {
    return 'N/A';
  }

  switch (unit) {
    case 'population':
      if (value >= 1_000_000_000) {
        return `${(value / 1_000_000_000).toFixed(1)}B`;
      }
      if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(1)}M`;
      }
      if (value >= 1_000) {
        return `${(value / 1_000).toFixed(1)}K`;
      }
      return value.toLocaleString();

    case 'area':
      return `${value.toLocaleString()} km²`;

    case 'gdp':
      if (value >= 1_000_000_000_000) {
        return `${(value / 1_000_000_000_000).toFixed(2)}T`;
      }
      if (value >= 1_000_000_000) {
        return `${(value / 1_000_000_000).toFixed(2)}B`;
      }
      if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(2)}M`;
      }
      return `${value.toLocaleString()}`;

    case 'distance':
      if (value >= 1000) {
        return `${(value / 1000).toFixed(1)} km`;
      }
      return `${value.toFixed(0)} m`;

    default:
      return value.toLocaleString();
  }
}

// Specific number formatting functions for the detail panel
export function formatCurrency(value: number): string {
  if (isNaN(value) || value === null || value === undefined) {
    return 'N/A';
  }
  
  if (value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(2)}T`;
  }
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`;
  }
  return `${value.toLocaleString()}`;
}

export function formatArea(value: number): string {
  if (isNaN(value) || value === null || value === undefined) {
    return 'N/A';
  }
  return `${value.toLocaleString()} km²`;
}

export { formatNumber as formatPopulation };

// Debounce function for search and API calls
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(
  coord1: [number, number],
  coord2: [number, number]
): number {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;
  
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Validate coordinates
export function isValidCoordinates(coords: [number, number]): boolean {
  const [lat, lng] = coords;
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

// Generate unique ID
export function generateId(prefix = ''): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return prefix ? `${prefix}_${timestamp}_${randomStr}` : `${timestamp}_${randomStr}`;
}

// Capitalize first letter of each word
export function capitalize(str: string): string {
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
}

// Convert country code to flag emoji
export function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) {
    return '';
  }
  
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
    
  return String.fromCodePoint(...codePoints);
}

// Helper function to validate country code format
export function isValidCountryCode(code: string): boolean {
  return /^[A-Z]{2}$/.test(code.toUpperCase());
}

// Helper function to normalize country code
export function normalizeCountryCode(code: string): string {
  return code.toUpperCase().trim();
}

// Check if device is mobile
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

// Check if device is tablet
export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}

// Local storage helpers with error handling
export function getLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function setLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error setting localStorage key "${key}":`, error);
  }
}

// Array utility functions
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const value = String(item[key]);
    groups[value] = groups[value] || [];
    groups[value].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

// Error handling helper
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unknown error occurred';
}

// Type guard functions
export function isNotNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
