// Offline page for service worker fallback
'use client';

import Link from 'next/link';
import { Globe, WifiOff, RefreshCw, Home } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-6">
            <WifiOff className="w-10 h-10 text-slate-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            You're Offline
          </h1>
          
          <p className="text-slate-600 mb-6">
            No internet connection detected. Some features may be limited, but you can still explore cached map data.
          </p>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-slate-900">Available Offline</span>
            </div>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Cached country data</li>
              <li>• Previously viewed maps</li>
              <li>• Basic geographic information</li>
              <li>• Country search (limited)</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <div className="flex items-center gap-3 mb-2">
              <WifiOff className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-yellow-900">Limited Offline</span>
            </div>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Live economic data</li>
              <li>• Real-time search results</li>
              <li>• New map layers</li>
              <li>• Updated country statistics</li>
            </ul>
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <Home className="w-4 h-4" />
            Continue Offline
          </Link>
        </div>
        
        <div className="mt-8 text-xs text-slate-500">
          <p>This page will automatically refresh when your connection returns.</p>
        </div>
      </div>
      
      {/* Auto-refresh when back online */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('online', function() {
              window.location.href = '/';
            });
          `
        }}
      />
    </div>
  );
}
