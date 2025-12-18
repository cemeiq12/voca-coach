'use client';

import React from 'react';

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'info' | 'overtime';
  label: string;
  icon?: React.ReactNode;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, icon }) => {
  const styles = {
    success: {
      bg: '#ECFDF5',
      border: '#10B981',
      color: '#065F46',
      text: '#059669'
    },
    warning: {
      bg: '#FEF3E7',
      border: '#F59E0B',
      color: '#92400E',
      text: '#D97706'
    },
    info: {
      bg: '#EFF6FF',
      border: '#3B82F6',
      color: '#1E40AF',
      text: '#2563EB'
    },
    overtime: {
      bg: '#F5F3FF',
      border: '#7C3AED',
      color: '#5B21B6',
      text: '#7C3AED'
    }
  };

  const style = styles[status];

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 14px',
      background: style.bg,
      border: `1px solid ${style.border}`,
      borderRadius: 'var(--radius-full)',
      fontSize: '13px',
      fontWeight: '600',
      color: style.text
    }}>
      {icon && <span>{icon}</span>}
      {label}
    </div>
  );
};

export default StatusBadge;
