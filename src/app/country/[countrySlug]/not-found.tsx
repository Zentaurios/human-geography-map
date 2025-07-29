'use client';

import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';

export default function CountryNotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <AlertCircle className="w-16 h-16 mb-6 text-yellow-500 mx-auto" />
        
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Country Not Found</h1>
        
        <p className="text-slate-600 mb-8">
          The country you're looking for doesn't exist or the URL may be incorrect. 
          Please check the spelling and try again.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              router.push('/country');
            }}
            className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse All Countries
          </button>
          
          <button
            onClick={() => {
              router.push('/');
            }}
            className="flex items-center justify-center gap-2 px-6 py-3 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
