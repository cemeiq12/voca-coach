'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock data for biomarkers
const MOCK_DATA = [
  { day: 'Mon', pitch: 142, clarity: 85, stress: 32 },
  { day: 'Tue', pitch: 148, clarity: 82, stress: 45 },
  { day: 'Wed', pitch: 145, clarity: 88, stress: 28 },
  { day: 'Thu', pitch: 152, clarity: 79, stress: 52 },
  { day: 'Fri', pitch: 138, clarity: 91, stress: 22 },
  { day: 'Sat', pitch: 135, clarity: 94, stress: 18 },
  { day: 'Sun', pitch: 140, clarity: 92, stress: 20 },
];

export default function BiomarkerDashboard() {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI insight generation
    setTimeout(() => {
      setInsight("Your voice patterns show positive trends this week. Stress levels dropped 35% compared to last week, and your vocal clarity improved significantly. The lower pitch readings on the weekend suggest better relaxation. Consider maintaining your weekend relaxation practices during weekdays.");
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#FDF8F3' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #E5E7EB',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: '#10B981',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '18px' }}>🎙️</span>
          </div>
          <span style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937' }}>Voca-Coach</span>
        </Link>

        <nav style={{ display: 'flex', gap: '24px' }}>
          {[
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/de-escalation', label: 'De-escalation' },
            { href: '/biomarkers', label: 'Biomarkers', active: true },
            { href: '/journal', label: 'Journal' },
            { href: '/persona', label: 'Persona' }
          ].map(item => (
            <Link key={item.href} href={item.href} style={{
              fontSize: '14px',
              fontWeight: '500',
              color: item.active ? '#10B981' : '#6B7280',
              padding: '8px 0',
              borderBottom: item.active ? '2px solid #10B981' : 'none'
            }}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/" style={{
          padding: '10px 20px',
          background: '#F3F4F6',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#4B5563'
        }}>Back to Home</Link>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
            📊 Biomarker Trends
          </h1>
          <p style={{ color: '#6B7280' }}>Monitor your vocal health patterns over time.</p>
        </div>

        {/* Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {[
            { label: 'Avg. Pitch', value: '143 Hz', change: '-5%', icon: '🎵', color: '#10B981' },
            { label: 'Clarity Score', value: '87%', change: '+8%', icon: '✨', color: '#8B5CF6' },
            { label: 'Stress Level', value: 'Low', change: '-35%', icon: '🧘', color: '#F59E0B' }
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #E5E7EB'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>{stat.icon}</span>
                <span style={{ 
                  fontSize: '12px', 
                  fontWeight: '600',
                  color: stat.change.startsWith('-') && stat.label === 'Stress Level' ? '#10B981' : stat.change.startsWith('+') ? '#10B981' : '#EF4444',
                  background: stat.change.startsWith('-') && stat.label === 'Stress Level' ? '#ECFDF5' : stat.change.startsWith('+') ? '#ECFDF5' : '#FEF2F2',
                  padding: '4px 8px',
                  borderRadius: '999px'
                }}>{stat.change}</span>
              </div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '14px', color: '#6B7280' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {[
            { label: 'Pitch Variation (Hz)', data: MOCK_DATA.map(d => d.pitch), color: '#10B981', max: 160 },
            { label: 'Voice Clarity (%)', data: MOCK_DATA.map(d => d.clarity), color: '#8B5CF6', max: 100 },
            { label: 'Stress Indicators', data: MOCK_DATA.map(d => d.stress), color: '#F59E0B', max: 100 }
          ].map((chart, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #E5E7EB'
            }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '20px' }}>{chart.label}</h3>
              {/* Simple bar chart */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
                {chart.data.map((value, j) => (
                  <div key={j} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '100%',
                      height: `${(value / chart.max) * 100}px`,
                      background: `linear-gradient(to top, ${chart.color}, ${chart.color}88)`,
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.3s ease'
                    }} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                {MOCK_DATA.map((d, j) => (
                  <span key={j} style={{ fontSize: '11px', color: '#9CA3AF' }}>{d.day}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* AI Insight */}
        <div style={{
          background: 'linear-gradient(135deg, #ECFDF5 0%, #FEF3E7 100%)',
          borderRadius: '20px',
          padding: '28px',
          border: '1px solid #D1FAE5'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '24px' }}>✨</span>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937' }}>AI Health Insight</h3>
          </div>
          
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#6B7280' }}>
              <div style={{
                width: '20px',
                height: '20px',
                border: '2px solid #10B981',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Analyzing your vocal patterns...
            </div>
          ) : (
            <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>{insight}</p>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
