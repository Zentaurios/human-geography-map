'use client';

import { useState, useEffect } from 'react';

interface ApiHealthData {
  semanticScholar: {
    status: number;
    ok: boolean;
    responseTime: number;
    totalPapers: number;
    error?: string;
    sampleTitle?: string;
  };
  openAlex: {
    status: number;
    ok: boolean;
    responseTime: number;
    totalPapers: number;
    error?: string;
    sampleTitle?: string;
  };
  summary: {
    overallHealth: 'healthy' | 'degraded' | 'down';
    workingApis: string[];
    avgResponseTime: number;
    recommendation: string;
  };
}

export default function EnhancedApiMonitor() {
  const [healthData, setHealthData] = useState<ApiHealthData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchApiHealth = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-apis');
      if (response.ok) {
        const data = await response.json();
        setHealthData(data.tests ? { ...data.tests, summary: data.summary } : null);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Failed to fetch API health:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiHealth();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(fetchApiHealth, 30000); // 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getStatusColor = (api: { ok: boolean; error?: string }) => {
    if (api.error) return '#ef4444';
    if (api.ok) return '#10b981';
    return '#f59e0b';
  };

  const getResponseTimeColor = (responseTime: number) => {
    if (responseTime < 1000) return '#10b981';
    if (responseTime < 3000) return '#f59e0b';
    return '#ef4444';
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return '#10b981';
      case 'degraded': return '#f59e0b';
      case 'down': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (!healthData) {
    return (
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          📊 API Health Monitor
        </h3>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            {loading ? '⏳' : '📡'}
          </div>
          <p style={{ color: '#6b7280' }}>
            {loading ? 'Testing APIs...' : 'Loading API status...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>📊 API Health Monitor</h3>
          <span style={{ 
            backgroundColor: getHealthColor(healthData.summary?.overallHealth),
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
            fontSize: '0.75rem'
          }}>
            {healthData.summary?.overallHealth || 'unknown'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            style={{
              backgroundColor: autoRefresh ? '#10b981' : '#6b7280',
              color: 'white',
              border: 'none',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: '0.75rem'
            }}
          >
            {autoRefresh ? '🔄 Auto ON' : '🔄 Auto OFF'}
          </button>
          <button
            onClick={fetchApiHealth}
            disabled={loading}
            style={{
              backgroundColor: loading ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '0.75rem'
            }}
          >
            {loading ? '⏳' : '🔄'} Refresh
          </button>
        </div>
      </div>
      
      {lastUpdated && (
        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem' }}>
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      )}
      
      {/* Overall Summary */}
      {healthData.summary && (
        <div style={{ 
          padding: '0.75rem', 
          border: '1px solid #d1d5db', 
          borderRadius: '0.375rem', 
          backgroundColor: '#f9fafb',
          marginBottom: '1rem'
        }}>
          <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Overall Status</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
            <div>
              <span style={{ color: '#6b7280' }}>Working APIs:</span>
              <span style={{ marginLeft: '0.5rem', fontWeight: '500' }}>{healthData.summary.workingApis.length}/2</span>
            </div>
            <div>
              <span style={{ color: '#6b7280' }}>Avg Response:</span>
              <span style={{ 
                marginLeft: '0.5rem', 
                fontWeight: '500',
                color: getResponseTimeColor(healthData.summary.avgResponseTime)
              }}>
                {healthData.summary.avgResponseTime}ms
              </span>
            </div>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
            {healthData.summary.recommendation}
          </p>
        </div>
      )}

      {/* API Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {/* Semantic Scholar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '0.75rem', 
          border: '1px solid #e5e7eb', 
          borderRadius: '0.375rem' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '0.75rem', 
              height: '0.75rem', 
              borderRadius: '50%', 
              backgroundColor: getStatusColor(healthData.semanticScholar) 
            }}></div>
            <div>
              <h4 style={{ fontWeight: '500' }}>Semantic Scholar</h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                {healthData.semanticScholar.totalPapers?.toLocaleString() || 0} papers available
              </p>
            </div>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <div style={{ 
              backgroundColor: getStatusColor(healthData.semanticScholar),
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              marginBottom: '0.25rem'
            }}>
              {healthData.semanticScholar.ok ? 'Healthy' : 'Down'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              {healthData.semanticScholar.responseTime}ms
            </div>
          </div>
        </div>

        {/* OpenAlex */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '0.75rem', 
          border: '1px solid #e5e7eb', 
          borderRadius: '0.375rem' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '0.75rem', 
              height: '0.75rem', 
              borderRadius: '50%', 
              backgroundColor: getStatusColor(healthData.openAlex) 
            }}></div>
            <div>
              <h4 style={{ fontWeight: '500' }}>OpenAlex</h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                {healthData.openAlex.totalPapers?.toLocaleString() || 0} papers available
              </p>
            </div>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <div style={{ 
              backgroundColor: getStatusColor(healthData.openAlex),
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              marginBottom: '0.25rem'
            }}>
              {healthData.openAlex.ok ? 'Healthy' : 'Down'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              {healthData.openAlex.responseTime}ms
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {(!healthData.semanticScholar.ok && !healthData.openAlex.ok) && (
        <div style={{ 
          marginTop: '1rem',
          padding: '0.75rem', 
          border: '1px solid #fca5a5', 
          backgroundColor: '#fef2f2', 
          borderRadius: '0.375rem' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1rem' }}>⚠️</span>
            <span style={{ fontWeight: '500', color: '#dc2626' }}>All APIs Down</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#dc2626' }}>
            The system will automatically fall back to curated research content.
            Check your internet connection or try again later.
          </p>
        </div>
      )}

      {/* Performance Indicator */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        fontSize: '0.75rem', 
        color: '#6b7280', 
        paddingTop: '0.75rem', 
        borderTop: '1px solid #e5e7eb',
        marginTop: '1rem'
      }}>
        <span>Performance Target: &lt;3s response time</span>
        <span>🔄 Updates every 30s</span>
      </div>
    </div>
  );
}