'use client';

import { useState } from 'react';
import { Target, Clock, BookOpen, CheckCircle, ArrowRight, User, Calendar } from 'lucide-react';
import { STUDY_GOALS } from '@/types/resource.types';

interface StudyPlanData {
  userLevel: 'beginner' | 'intermediate' | 'advanced';
  studyGoals: string[];
  timeframe: '1-month' | '3-months' | '6-months';
  timeAvailable: number; // hours per week
  preferredStyle: 'visual' | 'reading' | 'interactive' | 'mixed';
}

export function StudyPlanGenerator() {
  const [step, setStep] = useState(1);
  const [planData, setPlanData] = useState<StudyPlanData>({
    userLevel: 'beginner',
    studyGoals: [],
    timeframe: '3-months',
    timeAvailable: 5,
    preferredStyle: 'mixed'
  });
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const updatePlanData = (updates: Partial<StudyPlanData>) => {
    setPlanData(prev => ({ ...prev, ...updates }));
  };

  const toggleGoal = (goal: string) => {
    const currentGoals = planData.studyGoals;
    if (currentGoals.includes(goal)) {
      updatePlanData({ studyGoals: currentGoals.filter(g => g !== goal) });
    } else {
      updatePlanData({ studyGoals: [...currentGoals, goal] });
    }
  };

  const generatePlan = async () => {
    setIsGenerating(true);
    
    // Simulate plan generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const plan = {
      duration: planData.timeframe,
      totalHours: getTimeframeHours(planData.timeframe),
      weeklyHours: planData.timeAvailable,
      phases: generatePhases(planData),
      recommendedResources: getRecommendedResources(planData),
      milestones: generateMilestones(planData)
    };
    
    setGeneratedPlan(plan);
    setIsGenerating(false);
    setStep(4);
  };

  const getTimeframeHours = (timeframe: string) => {
    const weeks = timeframe === '1-month' ? 4 : timeframe === '3-months' ? 12 : 24;
    return weeks * planData.timeAvailable;
  };

  const generatePhases = (data: StudyPlanData) => {
    const phases = [
      {
        name: 'Foundation Building',
        duration: '2-4 weeks',
        focus: 'Basic concepts and terminology',
        resources: ['Cultural Geography Vocabulary Builder', 'AP Human Geography Unit 1 Guide']
      },
      {
        name: 'Core Learning',
        duration: '4-8 weeks', 
        focus: 'Interactive tools and practical application',
        resources: ['Population Calculator', 'Migration Flow Visualizer', 'Urbanization Case Studies']
      },
      {
        name: 'Advanced Application',
        duration: '2-4 weeks',
        focus: 'Assessment and real-world analysis',
        resources: ['AP FRQ Practice Set', 'Economic Development Tracker', 'Research Projects']
      }
    ];
    
    return phases;
  };

  const getRecommendedResources = (data: StudyPlanData) => {
    const resources = [];
    
    if (data.studyGoals.includes('Pass AP Human Geography exam')) {
      resources.push('AP Human Geography Unit 1 Guide', 'AP FRQ Practice Set');
    }
    
    if (data.studyGoals.includes('Develop research skills')) {
      resources.push('UNESCO Educational Resources', 'World Bank Data Portal');
    }
    
    if (data.preferredStyle === 'interactive' || data.preferredStyle === 'mixed') {
      resources.push('Population Calculator', 'Climate Data Explorer', 'Migration Flow Visualizer');
    }
    
    return resources;
  };

  const generateMilestones = (data: StudyPlanData) => {
    return [
      { week: 2, title: 'Complete Foundation Phase', description: 'Master basic geography vocabulary and concepts' },
      { week: 6, title: 'Interactive Tools Mastery', description: 'Successfully use all core interactive learning tools' },
      { week: 10, title: 'Research Project', description: 'Complete independent geography research project' },
      { week: 12, title: 'Assessment Ready', description: 'Score 80%+ on practice assessments' }
    ];
  };

  const resetPlan = () => {
    setStep(1);
    setPlanData({
      userLevel: 'beginner',
      studyGoals: [],
      timeframe: '3-months',
      timeAvailable: 5,
      preferredStyle: 'mixed'
    });
    setGeneratedPlan(null);
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-semibold text-slate-900">Personalized Study Plan Generator</h3>
      </div>

      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map(stepNum => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNum 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {stepNum}
              </div>
              {stepNum < 4 && (
                <div className={`w-12 h-1 mx-2 ${
                  step > stepNum ? 'bg-purple-600' : 'bg-slate-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-sm text-slate-600">
          {step === 1 && 'Tell us about your background'}
          {step === 2 && 'Select your learning goals'}
          {step === 3 && 'Choose your preferences'}
          {step === 4 && 'Your personalized plan'}
        </div>
      </div>

      {/* Step 1: Background Assessment */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              What's your current geography knowledge level?
            </label>
            <div className="space-y-3">
              {[
                { value: 'beginner', label: 'Beginner', desc: 'New to human geography' },
                { value: 'intermediate', label: 'Intermediate', desc: 'Some coursework experience' },
                { value: 'advanced', label: 'Advanced', desc: 'AP or college level' }
              ].map(option => (
                <label key={option.value} className="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <input
                    type="radio"
                    name="userLevel"
                    value={option.value}
                    checked={planData.userLevel === option.value}
                    onChange={(e) => updatePlanData({ userLevel: e.target.value as any })}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium text-slate-900">{option.label}</div>
                    <div className="text-sm text-slate-600">{option.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Learning Goals */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              What are your learning goals? (Select all that apply)
            </label>
            <div className="grid md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {STUDY_GOALS.map(goal => (
                <label key={goal} className="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={planData.studyGoals.includes(goal)}
                    onChange={() => toggleGoal(goal)}
                    className="mr-3"
                  />
                  <span className="text-sm text-slate-700">{goal}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={planData.studyGoals.length === 0}
              className="inline-flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Preferences */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              How much time can you dedicate to studying per week?
            </label>
            <div className="space-y-3">
              {[
                { value: 2, label: '2-3 hours', desc: 'Light study schedule' },
                { value: 5, label: '5-7 hours', desc: 'Moderate commitment' },
                { value: 10, label: '10+ hours', desc: 'Intensive preparation' }
              ].map(option => (
                <label key={option.value} className="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <input
                    type="radio"
                    name="timeAvailable"
                    value={option.value}
                    checked={planData.timeAvailable === option.value}
                    onChange={(e) => updatePlanData({ timeAvailable: Number(e.target.value) })}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium text-slate-900">{option.label}</div>
                    <div className="text-sm text-slate-600">{option.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              What's your target timeframe?
            </label>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { value: '1-month', label: '1 Month', desc: 'Quick overview' },
                { value: '3-months', label: '3 Months', desc: 'Comprehensive study' },
                { value: '6-months', label: '6 Months', desc: 'Thorough mastery' }
              ].map(option => (
                <label key={option.value} className="flex flex-col p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer text-center">
                  <input
                    type="radio"
                    name="timeframe"
                    value={option.value}
                    checked={planData.timeframe === option.value}
                    onChange={(e) => updatePlanData({ timeframe: e.target.value as any })}
                    className="mb-2"
                  />
                  <div className="font-medium text-slate-900">{option.label}</div>
                  <div className="text-sm text-slate-600">{option.desc}</div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={generatePlan}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate Plan
                  <Target className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Generated Plan */}
      {step === 4 && generatedPlan && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">Your Personalized Study Plan</h4>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{generatedPlan.duration}</div>
                <div className="text-sm text-slate-600">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{generatedPlan.weeklyHours}h/week</div>
                <div className="text-sm text-slate-600">Weekly Study</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{generatedPlan.totalHours}h</div>
                <div className="text-sm text-slate-600">Total Hours</div>
              </div>
            </div>
          </div>

          {/* Learning Phases */}
          <div>
            <h5 className="font-semibold text-slate-900 mb-3">Learning Phases</h5>
            <div className="space-y-4">
              {generatedPlan.phases.map((phase: any, index: number) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h6 className="font-medium text-slate-900">{phase.name}</h6>
                    <span className="text-sm text-slate-500">{phase.duration}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{phase.focus}</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.resources.map((resource: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div>
            <h5 className="font-semibold text-slate-900 mb-3">Key Milestones</h5>
            <div className="space-y-3">
              {generatedPlan.milestones.map((milestone: any, index: number) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-slate-900">Week {milestone.week}: {milestone.title}</div>
                    <div className="text-sm text-slate-600">{milestone.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={resetPlan}
              className="px-6 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Create New Plan
            </button>
            <button
              className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Start Learning
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
