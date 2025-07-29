// Client-side map component exports
// These components use dynamic imports to avoid SSR issues

export { DynamicPerformantMap } from './DynamicPerformantMap';

// Re-export the regular WorldMapClient which is already client-side only
export { default as WorldMapClient } from '../WorldMapClient';
