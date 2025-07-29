'use client';

import { useState } from 'react';
import { ExternalLink, Shield, CheckCircle, AlertCircle, Unlock, Key, Lock, Search, Filter } from 'lucide-react';
import { EDUCATIONAL_INSTITUTIONS, INSTITUTION_CATEGORIES, TRUST_LEVELS, ACCESS_LEVELS } from '@/data/educationalLinks';
import { EducationalInstitution } from '@/types/resource.types';

export function ExternalLinks() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTrustLevel, setSelectedTrustLevel] = useState<string>('all');
  const [selectedAccessLevel, setSelectedAccessLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInstitutions = EDUCATIONAL_INSTITUTIONS.filter(institution => {
    const categoryMatch = selectedCategory === 'all' || institution.category === selectedCategory;
    const trustMatch = selectedTrustLevel === 'all' || institution.trustLevel === selectedTrustLevel;
    const accessMatch = selectedAccessLevel === 'all' || institution.accessLevel === selectedAccessLevel;
    const searchMatch = searchQuery === '' ||
      institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return categoryMatch && trustMatch && accessMatch && searchMatch;
  });

  const getTrustIcon = (level: string) => {
    switch (level) {
      case 'highest': return <Shield className="w-4 h-4" />;
      case 'high': return <CheckCircle className="w-4 h-4" />;
      case 'medium': return <AlertCircle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getAccessIcon = (level: string) => {
    switch (level) {
      case 'free': return <Unlock className="w-4 h-4" />;
      case 'limited': return <Key className="w-4 h-4" />;
      case 'premium': return <Lock className="w-4 h-4" />;
      default: return <Unlock className="w-4 h-4" />;
    }
  };

  const getTrustColor = (level: string) => {
    const colors = {
      highest: 'bg-green-100 text-green-800 border-green-200',
      high: 'bg-blue-100 text-blue-800 border-blue-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getAccessColor = (level: string) => {
    const colors = {
      free: 'bg-green-100 text-green-800 border-green-200',
      limited: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      premium: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleInstitutionClick = (institution: EducationalInstitution) => {
    window.open(institution.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border p-6">
      <div className="flex items-center gap-3 mb-6">
        <ExternalLink className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold text-slate-900">Educational Institution Resources</h2>
      </div>

      <p className="text-slate-600 mb-6">
        Access high-quality educational resources from trusted global institutions. 
        These links connect you to the same sources professionals use for research and analysis.
      </p>

      {/* Filters */}
      <div className="grid gap-4 mb-6 lg:grid-cols-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search institutions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="all">All Categories</option>
          {INSTITUTION_CATEGORIES.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        {/* Trust Level Filter */}
        <select
          value={selectedTrustLevel}
          onChange={(e) => setSelectedTrustLevel(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="all">All Trust Levels</option>
          <option value="highest">Highest Trust</option>
          <option value="high">High Trust</option>
          <option value="medium">Medium Trust</option>
        </select>

        {/* Access Level Filter */}
        <select
          value={selectedAccessLevel}
          onChange={(e) => setSelectedAccessLevel(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="all">All Access Levels</option>
          <option value="free">Free Access</option>
          <option value="limited">Limited Free</option>
          <option value="premium">Premium</option>
        </select>
      </div>

      {/* Results Summary */}
      <div className="mb-6 p-4 bg-white border border-blue-200 rounded-lg">
        <p className="text-blue-800">
          <span className="font-semibold">{filteredInstitutions.length}</span> institutions found
          {selectedCategory !== 'all' && <span> in "{selectedCategory}"</span>}
          {selectedTrustLevel !== 'all' && <span> with "{selectedTrustLevel}" trust level</span>}
          {selectedAccessLevel !== 'all' && <span> offering "{selectedAccessLevel}" access</span>}
        </p>
      </div>

      {/* Institution Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredInstitutions.map(institution => (
          <div
            key={institution.name}
            className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleInstitutionClick(institution)}
          >
            {/* Header with badges */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium border rounded ${getTrustColor(institution.trustLevel)}`}>
                  {getTrustIcon(institution.trustLevel)}
                  {TRUST_LEVELS[institution.trustLevel]?.label}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium border rounded ${getAccessColor(institution.accessLevel)}`}>
                  {getAccessIcon(institution.accessLevel)}
                  {ACCESS_LEVELS[institution.accessLevel]?.label}
                </span>
              </div>
              
              <ExternalLink className="w-5 h-5 text-slate-400" />
            </div>

            {/* Content */}
            <h3 className="font-semibold text-lg mb-2 text-slate-900 hover:text-blue-600 transition-colors">
              {institution.name}
            </h3>

            <p className="text-slate-600 text-sm mb-4 line-clamp-3">
              {institution.description}
            </p>

            {/* Category and Region */}
            <div className="flex justify-between items-center mb-4 text-xs text-slate-500">
              <span className="px-2 py-1 bg-slate-100 rounded">
                {institution.category}
              </span>
              {institution.region && (
                <span>{institution.region}</span>
              )}
            </div>

            {/* Resource Types */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-slate-700 mb-2">Resource Types:</h4>
              <div className="flex flex-wrap gap-1">
                {institution.resourceTypes.slice(0, 4).map(type => (
                  <span
                    key={type}
                    className="px-2 py-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded"
                  >
                    {type}
                  </span>
                ))}
                {institution.resourceTypes.length > 4 && (
                  <span className="px-2 py-1 text-xs bg-slate-50 text-slate-600 border border-slate-200 rounded">
                    +{institution.resourceTypes.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Subjects */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-slate-700 mb-2">Subject Areas:</h4>
              <div className="flex flex-wrap gap-1">
                {institution.subjects.slice(0, 3).map(subject => (
                  <span
                    key={subject}
                    className="px-2 py-1 text-xs bg-purple-50 text-purple-700 border border-purple-200 rounded"
                  >
                    {subject}
                  </span>
                ))}
                {institution.subjects.length > 3 && (
                  <span className="px-2 py-1 text-xs bg-slate-50 text-slate-600 border border-slate-200 rounded">
                    +{institution.subjects.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Language */}
            {institution.language && (
              <div className="text-xs text-slate-500">
                Language: {institution.language}
              </div>
            )}

            {/* Call to action */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-600 font-medium">
                  Visit Resource
                </span>
                <ExternalLink className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredInstitutions.length === 0 && (
        <div className="text-center py-12">
          <ExternalLink className="w-16 h-16 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No institutions found</h3>
          <p className="text-slate-600 mb-4">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedTrustLevel('all');
              setSelectedAccessLevel('all');
              setSearchQuery('');
            }}
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Trust & Access Level Legends */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Trust Levels */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-900 mb-3">Trust Level Guide</h3>
          <div className="space-y-2">
            {Object.entries(TRUST_LEVELS).map(([level, info]) => (
              <div key={level} className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium border rounded ${getTrustColor(level)}`}>
                  {getTrustIcon(level)}
                  {info.label}
                </span>
                <span className="text-xs text-slate-600">{info.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Access Levels */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-900 mb-3">Access Level Guide</h3>
          <div className="space-y-2">
            {Object.entries(ACCESS_LEVELS).map(([level, info]) => (
              <div key={level} className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium border rounded ${getAccessColor(level)}`}>
                  {getAccessIcon(level)}
                  {info.label}
                </span>
                <span className="text-xs text-slate-600">{info.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quality Assurance Notice */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-semibold text-green-900 mb-2">Quality Assurance</h3>
        <p className="text-sm text-green-800">
          All listed institutions are carefully vetted for educational quality and reliability. 
          We prioritize official government sources, accredited universities, and established 
          international organizations to ensure you access the most trustworthy information.
        </p>
      </div>
    </section>
  );
}
