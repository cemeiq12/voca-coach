'use client';

import React from 'react';

interface Stat {
  label: string;
  value: string | number;
  icon?: string;
}

interface Recommendation {
  type: 'info' | 'warning' | 'success';
  message: string;
  timestamp?: string;
}

interface LiveStatsPanelProps {
  currentMood?: string;
  moodEmoji?: string;
  stats?: Stat[];
  recommendations?: Recommendation[];
  transcript?: string;
}

const LiveStatsPanel: React.FC<LiveStatsPanelProps> = ({
  currentMood = 'Neutral',
  moodEmoji = '😐',
  stats = [],
  recommendations = [],
  transcript
}) => {
  const getRecommendationStyle = (type: Recommendation['type']) => {
    const styles = {
      info: { bg: '#EFF6FF', border: '#3B82F6', color: '#1E40AF' },
      warning: { bg: '#FEF3E7', border: '#F59E0B', color: '#92400E' },
      success: { bg: '#F0FDF4', border: '#10B981', color: '#065F46' }
    };
    return styles[type];
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '24px',
      boxShadow: '0 4px 16px rgba(124, 58, 237, 0.12)'
    }}>
      <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937', marginBottom: '20px' }}>
        Live Statistics
      </h3>

      {/* Current Mood */}
      <div style={{
        background: 'linear-gradient(135deg, #F5F3FF 0%, #ECFEFF 100%)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{ fontSize: '32px' }}>{moodEmoji}</div>
        <div>
          <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '2px' }}>Current Mood</div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937' }}>{currentMood}</div>
        </div>
      </div>

      {/* Stats */}
      {stats.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#4B5563', marginBottom: '12px' }}>
            Your Stats
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#6B7280' }}>
                  {stat.icon && <span style={{ marginRight: '6px' }}>{stat.icon}</span>}
                  {stat.label}
                </span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#4B5563', marginBottom: '12px' }}>
            Recommendations
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recommendations.map((rec, i) => {
              const style = getRecommendationStyle(rec.type);
              return (
                <div
                  key={i}
                  style={{
                    background: style.bg,
                    borderLeft: `3px solid ${style.border}`,
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: style.color,
                    lineHeight: '1.4'
                  }}
                >
                  {rec.message}
                  {rec.timestamp && (
                    <div style={{ fontSize: '11px', marginTop: '4px', opacity: 0.7 }}>
                      {rec.timestamp}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Live Transcript */}
      {transcript && (
        <div style={{ marginTop: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#4B5563', marginBottom: '8px' }}>
            Live Transcript
          </div>
          <div style={{
            background: '#F9FAFB',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '13px',
            color: '#4B5563',
            lineHeight: '1.6',
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {transcript}
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveStatsPanel;
