// Enhanced skeleton loading components - Phase 3 Priority 3B

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  animate?: boolean;
  variant?: 'default' | 'shimmer' | 'wave' | 'pulse';
}

// Base skeleton component with multiple animation variants
export function Skeleton({ className, animate = true, variant = 'shimmer' }: SkeletonProps) {
  const baseClasses = 'bg-slate-200 rounded';
  
  const variantClasses = {
    default: animate ? 'animate-pulse' : '',
    shimmer: animate ? 'animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]' : '',
    wave: animate ? 'animate-wave' : '',
    pulse: animate ? 'animate-pulse' : ''
  };
  
  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} />
  );
}

// Map skeleton for the main map area
export function MapSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('relative w-full h-full bg-slate-100 rounded-lg overflow-hidden', className)}>
      {/* Map tiles skeleton */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-1 p-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="shimmer"
            className="h-full w-full"
            animate={true}
          />
        ))}
      </div>
      
      {/* Loading overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80">
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="text-sm text-slate-600 font-medium">Loading world map...</p>
        </div>
      </div>
      
      {/* Map controls skeleton */}
      <div className="absolute top-4 right-4 space-y-2">
        <Skeleton className="w-10 h-10" variant="pulse" />
        <Skeleton className="w-10 h-10" variant="pulse" />
        <Skeleton className="w-10 h-10" variant="pulse" />
      </div>
      
      {/* Zoom controls skeleton */}
      <div className="absolute bottom-6 right-4 space-y-1">
        <Skeleton className="w-8 h-8" variant="pulse" />
        <Skeleton className="w-8 h-8" variant="pulse" />
      </div>
    </div>
  );
}

// Country detail panel skeleton
export function CountryDetailSkeleton({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <div className={cn('p-6 space-y-6', isMobile ? 'pb-8' : '')}>
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-8 rounded" variant="shimmer" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4" variant="shimmer" />
            <Skeleton className="h-4 w-1/2" variant="shimmer" />
          </div>
        </div>
      </div>
      
      {/* Statistics grid skeleton */}
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-full" variant="shimmer" />
            <Skeleton className="h-6 w-3/4" variant="shimmer" />
          </div>
        ))}
      </div>
      
      {/* Economic data skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-1/3" variant="shimmer" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <Skeleton className="h-4 w-1/2" variant="shimmer" />
              <Skeleton className="h-4 w-1/4" variant="shimmer" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Additional info skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/4" variant="shimmer" />
        <Skeleton className="h-16 w-full" variant="shimmer" />
      </div>
    </div>
  );
}

// Search component skeleton
export function SearchSkeleton() {
  return (
    <div className="relative">
      <Skeleton className="h-10 w-full rounded-lg" variant="shimmer" />
      
      {/* Search suggestions skeleton */}
      <div className="absolute top-12 left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg p-2 space-y-1 z-50">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-2">
            <Skeleton className="w-6 h-4 rounded" variant="shimmer" />
            <Skeleton className="h-4 flex-1" variant="shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Navigation skeleton
export function NavigationSkeleton({ isMobile = false }: { isMobile?: boolean }) {
  if (isMobile) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full rounded-lg" variant="shimmer" />
      </div>
    );
  }
  
  return (
    <div className="flex gap-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-20 rounded-lg" variant="shimmer" />
      ))}
    </div>
  );
}

// Layer control skeleton
export function LayerControlSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 space-y-4 w-64">
      {/* Base layers section */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-1/2" variant="shimmer" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-4 h-4 rounded-full" variant="pulse" />
              <Skeleton className="h-4 flex-1" variant="shimmer" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Feature layers section */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-1/2" variant="shimmer" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center gap-3">
                <Skeleton className="w-4 h-4 rounded" variant="pulse" />
                <Skeleton className="h-4 flex-1" variant="shimmer" />
              </div>
              <Skeleton className="h-2 w-full rounded-full ml-7" variant="shimmer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Data loading card skeleton
export function DataLoadingSkeleton({ title, items = 3 }: { title?: string; items?: number }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-4">
      {title && (
        <Skeleton className="h-5 w-1/3" variant="shimmer" />
      )}
      
      <div className="space-y-3">
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full" variant="pulse" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" variant="shimmer" />
              <Skeleton className="h-3 w-1/2" variant="shimmer" />
            </div>
            <Skeleton className="w-6 h-6" variant="pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Full page loading skeleton
export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header skeleton */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded" variant="pulse" />
              <div className="space-y-1">
                <Skeleton className="h-5 w-48" variant="shimmer" />
                <Skeleton className="h-3 w-32" variant="shimmer" />
              </div>
            </div>
            
            <div className="hidden md:flex flex-1 max-w-4xl mx-8 gap-4">
              <SearchSkeleton />
              <NavigationSkeleton />
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <Skeleton className="h-8 w-32" variant="shimmer" />
              <Skeleton className="h-8 w-48" variant="shimmer" />
            </div>
          </div>
          
          {/* Mobile navigation skeleton */}
          <div className="md:hidden pb-4 space-y-3">
            <SearchSkeleton />
            <NavigationSkeleton isMobile />
          </div>
        </div>
      </div>
      
      {/* Main content skeleton */}
      <div className="h-[calc(100vh-80px)] md:h-[calc(100vh-64px)] flex">
        <div className="flex-1 relative">
          <MapSkeleton className="h-full" />
        </div>
        
        {/* Desktop sidebar skeleton */}
        <div className="hidden lg:block w-80 bg-white border-l border-slate-200">
          <CountryDetailSkeleton />
        </div>
      </div>
      
      {/* Mobile bottom panel skeleton */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 max-h-[50vh]">
        <CountryDetailSkeleton isMobile />
      </div>
    </div>
  );
}

// Animated loading states for different scenarios
export function LoadingState({ 
  type = 'default',
  message,
  size = 'md'
}: { 
  type?: 'default' | 'map' | 'data' | 'search' | 'error';
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };
  
  const iconClasses = cn('animate-spin rounded-full border-2 border-gray-300 border-t-blue-600', sizeClasses[size]);
  
  const typeConfig = {
    default: { icon: '⟳', color: 'text-blue-600' },
    map: { icon: '🗺️', color: 'text-green-600' },
    data: { icon: '📊', color: 'text-purple-600' },
    search: { icon: '🔍', color: 'text-orange-600' },
    error: { icon: '⚠️', color: 'text-red-600' }
  };
  
  const config = typeConfig[type];
  
  return (
    <div className="flex items-center gap-3">
      <div className={iconClasses} />
      {message && (
        <span className={cn('text-sm font-medium', config.color)}>
          {message}
        </span>
      )}
    </div>
  );
}

// Progressive loading component with stages
export interface LoadingStage {
  id: string;
  label: string;
  status: 'pending' | 'loading' | 'complete' | 'error';
  progress?: number;
}

export function ProgressiveLoader({ 
  stages,
  currentStage,
  className 
}: { 
  stages: LoadingStage[];
  currentStage?: string;
  className?: string;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {stages.map((stage) => {
        const isActive = currentStage === stage.id;
        const isComplete = stage.status === 'complete';
        const isError = stage.status === 'error';
        
        return (
          <div key={stage.id} className="flex items-center gap-3">
            {/* Status indicator */}
            <div className={cn(
              'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
              isComplete && 'bg-green-500 text-white',
              isError && 'bg-red-500 text-white',
              isActive && 'bg-blue-500 text-white',
              !isActive && !isComplete && !isError && 'bg-gray-200 text-gray-500'
            )}>
              {isComplete ? '✓' : isError ? '✗' : stage.id.charAt(0).toUpperCase()}
            </div>
            
            {/* Stage info */}
            <div className="flex-1">
              <div className={cn(
                'text-sm font-medium',
                isComplete && 'text-green-700',
                isError && 'text-red-700',
                isActive && 'text-blue-700',
                !isActive && !isComplete && !isError && 'text-gray-500'
              )}>
                {stage.label}
              </div>
              
              {/* Progress bar */}
              {isActive && stage.progress !== undefined && (
                <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${stage.progress}%` }}
                  />
                </div>
              )}
            </div>
            
            {/* Loading spinner for active stage */}
            {isActive && stage.status === 'loading' && (
              <div className="w-4 h-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
            )}
          </div>
        );
      })}
    </div>
  );
}
