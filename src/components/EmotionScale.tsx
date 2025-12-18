'use client';

import React from 'react';

interface EmotionScaleProps {
  emoji: string;
  label: string;
  percentage: number;
  frequency?: string;
  color?: string;
}

const EmotionScale: React.FC<EmotionScaleProps> = ({
  emoji,
  label,
  percentage,
  frequency,
  color = '#7C3AED'
}) => {
  return (
    <div className="emotion-scale">
      <div style={{
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `${color}15`,
        borderRadius: '50%',
        fontWeight: '700',
        fontSize: '16px',
        color: color,
        border: `2px solid ${color}30`
      }}>{emoji}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>{label}</span>
          {frequency && (
            <span style={{ fontSize: '12px', color: '#6B7280' }}>{frequency}</span>
          )}
        </div>
        <div className="emotion-bar">
          <div
            className="emotion-bar-fill"
            style={{
              width: `${percentage}%`,
              background: color
            }}
          />
        </div>
      </div>
      <div style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280', minWidth: '36px', textAlign: 'right' }}>
        {percentage}%
      </div>
    </div>
  );
};

export default EmotionScale;
