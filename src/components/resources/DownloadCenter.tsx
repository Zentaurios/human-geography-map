'use client';

import { useState } from 'react';
import { Download, FileText, BookOpen, CheckCircle, Eye, Filter, Search } from 'lucide-react';
import { STUDY_MATERIALS, STUDY_MATERIAL_CATEGORIES, ACADEMIC_LEVELS } from '@/data/studyMaterials';
import { StudyMaterial } from '@/types/resource.types';

export function DownloadCenter() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewMaterial, setPreviewMaterial] = useState<StudyMaterial | null>(null);

  const filteredMaterials = STUDY_MATERIALS.filter(material => {
    const categoryMatch = selectedCategory === 'all' || material.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || material.level === selectedLevel;
    const searchMatch = searchQuery === '' || 
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return categoryMatch && levelMatch && searchMatch;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'guide':
        return <BookOpen className="w-5 h-5" />;
      case 'worksheet':
        return <FileText className="w-5 h-5" />;
      case 'assessment':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Download className="w-5 h-5" />;
    }
  };

  const getLevelColor = (level: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800 border-green-200',
      intermediate: 'bg-blue-100 text-blue-800 border-blue-200',
      advanced: 'bg-purple-100 text-purple-800 border-purple-200',
      ap: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleDownload = (material: StudyMaterial) => {
    // Here you would implement the actual download logic
    console.log('Downloading:', material.downloadUrl);
    // For now, just show an alert
    alert(`Downloading: ${material.title}`);
  };

  const handlePreview = (material: StudyMaterial) => {
    if (material.previewAvailable) {
      setPreviewMaterial(material);
    }
  };

  return (
    <section className="p-6 bg-white border rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Download className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold text-slate-900">Study Materials & Downloads</h2>
      </div>

      <p className="mb-6 text-slate-600">
        Comprehensive collection of study guides, worksheets, and assessment materials designed to support 
        your geography learning journey. All materials are free to download and designed for self-study.
      </p>

      <p className="mb-6 italic text-red-600">
        This a non-functional page but if any professionals in the field wish to submit resources, please contact us at <a className='text-blue-600'href="mailto:reisscoding@gmail.com">reisscoding@gmail.com</a>
      </p>

      {/* Filters and Search */}
      <div className="grid gap-4 mb-6 md:grid-cols-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-4 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          {STUDY_MATERIAL_CATEGORIES.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        {/* Level Filter */}
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="px-3 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Levels</option>
          {ACADEMIC_LEVELS.map(level => (
            <option key={level} value={level} className="capitalize">{level}</option>
          ))}
        </select>
      </div>

      {/* Results Summary */}
      <div className="p-4 mb-6 border border-blue-200 rounded-lg bg-blue-50">
        <p className="text-blue-800">
          <span className="font-semibold">{filteredMaterials.length}</span> materials found
          {selectedCategory !== 'all' && <span> in "{selectedCategory}"</span>}
          {selectedLevel !== 'all' && <span> for "{selectedLevel}" level</span>}
          {searchQuery && <span> matching "{searchQuery}"</span>}
        </p>
      </div>

      {/* Materials Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMaterials.map(material => (
          <div key={material.id} className="p-6 transition-shadow border rounded-lg border-slate-200 hover:shadow-md">
            {/* Header with badges */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium border rounded bg-slate-100 text-slate-800 border-slate-200">
                  {getIcon(material.type)}
                  {material.type}
                </span>
                <span className={`px-2 py-1 text-xs font-medium border rounded ${getLevelColor(material.level)}`}>
                  {material.level}
                </span>
              </div>
              
              {material.estimatedTime && (
                <span className="text-xs text-slate-500">
                  {material.estimatedTime}
                </span>
              )}
            </div>

            {/* Content */}
            <h3 className="mb-2 text-lg font-semibold line-clamp-2 text-slate-900">
              {material.title}
            </h3>

            <p className="mb-4 text-sm text-slate-600 line-clamp-3">
              {material.description}
            </p>

            {/* Metadata */}
            <div className="mb-4 space-y-2 text-xs text-slate-500">
              {material.pageCount && (
                <div className="flex justify-between">
                  <span>Pages:</span>
                  <span>{material.pageCount}</span>
                </div>
              )}
              {material.fileSize && (
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span>{material.fileSize}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Updated:</span>
                <span>{new Date(material.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Topics */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {material.topics.slice(0, 3).map(topic => (
                  <span
                    key={topic}
                    className="px-2 py-1 text-xs text-blue-700 border border-blue-200 rounded bg-blue-50"
                  >
                    {topic}
                  </span>
                ))}
                {material.topics.length > 3 && (
                  <span className="px-2 py-1 text-xs border rounded bg-slate-50 text-slate-600 border-slate-200">
                    +{material.topics.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Prerequisites */}
            {material.prerequisites && material.prerequisites.length > 0 && (
              <div className="p-3 mb-4 border rounded bg-amber-50 border-amber-200">
                <h4 className="mb-1 text-xs font-medium text-amber-800">Prerequisites:</h4>
                <ul className="space-y-1 text-xs text-amber-700">
                  {material.prerequisites.map((prereq, index) => (
                    <li key={index}>• {prereq}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => handleDownload(material)}
                className="inline-flex items-center justify-center flex-1 gap-2 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              
              {material.previewAvailable && (
                <button
                  onClick={() => handlePreview(material)}
                  className="px-3 py-2 transition-colors border rounded-lg text-slate-600 border-slate-300 hover:bg-slate-50"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Educational Standards */}
            {material.educationalStandards && material.educationalStandards.length > 0 && (
              <div className="pt-4 mt-4 border-t border-slate-200">
                <h4 className="mb-1 text-xs font-medium text-slate-700">Aligned with:</h4>
                <div className="flex flex-wrap gap-1">
                  {material.educationalStandards.map(standard => (
                    <span
                      key={standard}
                      className="px-2 py-1 text-xs text-green-700 border border-green-200 rounded bg-green-50"
                    >
                      {standard}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredMaterials.length === 0 && (
        <div className="py-12 text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-slate-400" />
          <h3 className="mb-2 text-lg font-medium text-slate-900">No materials found</h3>
          <p className="mb-4 text-slate-600">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedLevel('all');
              setSearchQuery('');
            }}
            className="text-blue-600 transition-colors hover:text-blue-700"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Download Tips */}
      <div className="p-6 mt-8 border rounded-lg bg-slate-50 border-slate-200">
        <h3 className="mb-3 font-semibold text-slate-900">Download Tips</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="mb-2 font-medium text-slate-800">For Best Results:</h4>
            <ul className="space-y-1 text-sm text-slate-600">
              <li>• Start with beginner materials if new to geography</li>
              <li>• Check prerequisites before downloading advanced materials</li>
              <li>• Use materials sequentially for structured learning</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-medium text-slate-800">Study Strategies:</h4>
            <ul className="space-y-1 text-sm text-slate-600">
              <li>• Print materials for offline study sessions</li>
              <li>• Complete worksheets before assessments</li>
              <li>• Review answer keys only after attempting problems</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{previewMaterial.title}</h3>
              <button
                onClick={() => setPreviewMaterial(null)}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
            </div>
            
            <div className="py-12 text-center text-slate-600">
              <FileText className="w-16 h-16 mx-auto mb-4 text-slate-400" />
              <p className="mb-2 text-lg">Material Preview</p>
              <p className="mb-4 text-sm">
                Preview functionality would show the first few pages of the material here.
              </p>
              <button
                onClick={() => handleDownload(previewMaterial)}
                className="inline-flex items-center gap-2 px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                Download Full Material
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
