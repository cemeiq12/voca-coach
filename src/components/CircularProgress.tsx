'use client';

import React, { useEffect, useState } from 'react';

interface CircularProgressProps {
  percentage: number;
  label: string;
  description?: string;
  color: 'purple' | 'pink' | 'cyan';
  size?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  label,
  description,
  color,
  size = 120
}) => {
  const [progress, setProgress] = useState(0);
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const colorMap = {
    purple: '#7C3AED',
    pink: '#EC4899',
    cyan: '#06B6D4'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div className="circular-progress" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colorMap[color]}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 1s ease-in-out',
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%'
            }}
          />
        </svg>
        <div className="circular-progress-text">{progress}%</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
          {label}
        </div>
        {description && (
          <div style={{ fontSize: '12px', color: '#6B7280' }}>
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export default CircularProgress;
