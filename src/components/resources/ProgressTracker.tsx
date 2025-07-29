'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Award, Clock, BookOpen, Target, ChevronRight } from 'lucide-react';

interface ProgressData {
  completedResources: string[];
  skillLevels: Record<string, number>;
  studyStreak: number;
  totalStudyTime: number;
  weeklyGoal: number;
  achievements: Achievement[];
  recentActivity: ActivityItem[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  category: 'milestone' | 'streak' | 'skill' | 'completion';
}

interface ActivityItem {
  id: string;
  type: 'download' | 'interactive' | 'assessment' | 'reading';
  resource: string;
  timestamp: string;
  duration?: number;
}

export function ProgressTracker() {
  const [progressData, setProgressData] = useState<ProgressData>({
    completedResources: ['ap-human-geo-unit1', 'population-pyramid-worksheet', 'population-calculator'],
    skillLevels: {
      'Population Geography': 8,
      'Cultural Geography': 6,
      'Urban Geography': 7,
      'Economic Geography': 5,
      'Political Geography': 4,
      'Research Skills': 7
    },
    studyStreak: 12,
    totalStudyTime: 47,
    weeklyGoal: 10,
    achievements: [
      {
        id: '1',
        title: 'First Steps',
        description: 'Completed your first study material',
        icon: '🎯',
        earnedAt: '2025-01-15',
        category: 'milestone'
      },
      {
        id: '2',
        title: 'Week Warrior',
        description: 'Maintained a 7-day study streak',
        icon: '🔥',
        earnedAt: '2025-01-22',
        category: 'streak'
      },
      {
        id: '3',
        title: 'Population Expert',
        description: 'Mastered population geography concepts',
        icon: '👥',
        earnedAt: '2025-01-28',
        category: 'skill'
      }
    ],
    recentActivity: [
      {
        id: '1',
        type: 'interactive',
        resource: 'Population Growth Calculator',
        timestamp: '2025-02-10T14:30:00Z',
        duration: 25
      },
      {
        id: '2',
        type: 'download',
        resource: 'Migration Patterns Workbook',
        timestamp: '2025-02-10T13:15:00Z'
      },
      {
        id: '3',
        type: 'assessment',
        resource: 'AP FRQ Practice Set 1',
        timestamp: '2025-02-09T16:45:00Z',
        duration: 90
      }
    ]
  });

  const [weeklyProgress, setWeeklyProgress] = useState(7.5); // hours this week

  const weeklyProgressPercentage = Math.min((weeklyProgress / progressData.weeklyGoal) * 100, 100);
  const averageSkillLevel = Object.values(progressData.skillLevels).reduce((a, b) => a + b, 0) / Object.values(progressData.skillLevels).length;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'download':
        return '📥';
      case 'interactive':
        return '🎮';
      case 'assessment':
        return '📝';
      case 'reading':
        return '📖';
      default:
        return '📚';
    }
  };

  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-semibold text-slate-900">Your Learning Progress</h3>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-white rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">{progressData.completedResources.length}</div>
          <div className="text-sm text-slate-600">Resources Completed</div>
        </div>
        <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">{progressData.studyStreak}</div>
          <div className="text-sm text-slate-600">Day Study Streak</div>
        </div>
        <div className="text-center p-4 bg-white rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">{progressData.totalStudyTime}h</div>
          <div className="text-sm text-slate-600">Total Study Time</div>
        </div>
        <div className="text-center p-4 bg-white rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-600">{averageSkillLevel.toFixed(1)}/10</div>
          <div className="text-sm text-slate-600">Average Skill Level</div>
        </div>
      </div>

      {/* Weekly Goal Progress */}
      <div className="bg-white rounded-lg border border-green-200 p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-slate-900">This Week's Goal</h4>
          <span className="text-sm text-slate-600">{weeklyProgress}h / {progressData.weeklyGoal}h</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${weeklyProgressPercentage}%` }}
          />
        </div>
        <div className="text-sm text-slate-600">
          {weeklyProgressPercentage >= 100 
            ? '🎉 Goal achieved! Great work!' 
            : `${(progressData.weeklyGoal - weeklyProgress).toFixed(1)} hours to go`
          }
        </div>
      </div>

      {/* Skill Progress */}
      <div className="bg-white rounded-lg border border-green-200 p-4 mb-6">
        <h4 className="font-semibold text-slate-900 mb-4">Skill Development</h4>
        <div className="space-y-3">
          {Object.entries(progressData.skillLevels).map(([skill, level]) => (
            <div key={skill}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-700">{skill}</span>
                <span className="text-slate-600">{level}/10</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${level * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-lg border border-green-200 p-4 mb-6">
        <h4 className="font-semibold text-slate-900 mb-4">Recent Achievements</h4>
        <div className="space-y-3">
          {progressData.achievements.slice(0, 3).map(achievement => (
            <div key={achievement.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className="font-medium text-slate-900">{achievement.title}</div>
                <div className="text-sm text-slate-600">{achievement.description}</div>
                <div className="text-xs text-slate-500">
                  Earned {new Date(achievement.earnedAt).toLocaleDateString()}
                </div>
              </div>
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-green-200 p-4">
        <h4 className="font-semibold text-slate-900 mb-4">Recent Activity</h4>
        <div className="space-y-3">
          {progressData.recentActivity.map(activity => (
            <div key={activity.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <div className="text-lg">{getActivityIcon(activity.type)}</div>
              <div className="flex-1">
                <div className="font-medium text-slate-900">{activity.resource}</div>
                <div className="text-sm text-slate-600 capitalize">
                  {activity.type} 
                  {activity.duration && ` • ${activity.duration} minutes`}
                </div>
              </div>
              <div className="text-xs text-slate-500">
                {getRelativeTime(activity.timestamp)}
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 text-sm text-green-600 hover:text-green-700 transition-colors flex items-center justify-center gap-1">
          View all activity
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Motivational Message */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-3">
          <Target className="w-5 h-5 text-blue-600" />
          <div>
            <div className="font-medium text-slate-900">Keep up the great work!</div>
            <div className="text-sm text-slate-600">
              You're on track with your learning goals. 
              {progressData.studyStreak > 7 
                ? ' Your consistency is impressive!' 
                : ' Try to maintain a daily study habit for better retention.'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
