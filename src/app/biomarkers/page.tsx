'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface Biomarker {
  id: string;
  date: string;
  pitch: number;
  clarity: number;
  stress: number;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function BiomarkerDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [biomarkers, setBiomarkers] = useState<Biomarker[]>([]);
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingInsight, setLoadingInsight] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchBiomarkers();
    }
  }, [user]);

  const fetchBiomarkers = async () => {
    try {
      const res = await fetch('/api/biomarkers?days=7');
      if (res.ok) {
        const data = await res.json();
        setBiomarkers(data.biomarkers || []);
        
        // Generate AI insight if we have data
        if (data.biomarkers?.length > 0) {
          generateInsight(data.biomarkers);
        }
      }
    } catch (error) {
      console.error('Failed to fetch biomarkers:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const generateInsight = async (biomarkerData: Biomarker[]) => {
    setLoadingInsight(true);
    try {
      const history = biomarkerData.map(b => ({
        date: new Date(b.date).toLocaleDateString(),
        medianPitch: b.pitch,
        pauseDuration: 0.5,
        articulationRate: 4.0,
        riskScore: Math.round(b.stress / 10),
      }));

      const res = await fetch('/api/analyze-trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history }),
      });

      if (res.ok) {
        const data = await res.json();
        setInsight(data.analysis);
      }
    } catch (error) {
      console.error('Failed to generate insight:', error);
    } finally {
      setLoadingInsight(false);
    }
  };

  // Process biomarkers for display
  const getChartData = () => {
    if (biomarkers.length === 0) {
      return {
        labels: DAYS,
        pitch: Array(7).fill(0),
        clarity: Array(7).fill(0),
        stress: Array(7).fill(0),
      };
    }

    // Create last 7 days array
    const last7Days: { day: string; pitch: number; clarity: number; stress: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const biomarker = biomarkers.find(b => {
        const bDate = new Date(b.date);
        bDate.setHours(0, 0, 0, 0);
        return bDate.getTime() === date.getTime();
      });

      last7Days.push({
        day: DAYS[date.getDay()],
        pitch: biomarker?.pitch || 0,
        clarity: biomarker?.clarity || 0,
        stress: biomarker?.stress || 0,
      });
    }

    return {
      labels: last7Days.map(d => d.day),
      pitch: last7Days.map(d => d.pitch),
      clarity: last7Days.map(d => d.clarity),
      stress: last7Days.map(d => d.stress),
    };
  };

  const chartData = getChartData();

  // Calculate stats
  const avgPitch = biomarkers.length > 0 
    ? Math.round(biomarkers.reduce((sum, b) => sum + b.pitch, 0) / biomarkers.length) 
    : 0;
  const avgClarity = biomarkers.length > 0 
    ? Math.round(biomarkers.reduce((sum, b) => sum + b.clarity, 0) / biomarkers.length) 
    : 0;
  const avgStress = biomarkers.length > 0 
    ? Math.round(biomarkers.reduce((sum, b) => sum + b.stress, 0) / biomarkers.length) 
    : 0;

  if (loading || !user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FDF8F3' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>🎙️</div>
          <div style={{ color: '#6B7280' }}>Loading...</div>
        </div>
      </div>
    );
  }

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

        <Link href="/dashboard" style={{
          padding: '10px 20px',
          background: '#F3F4F6',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#4B5563'
        }}>Back to Dashboard</Link>
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

        {loadingData ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6B7280' }}>
            Loading your biomarker data...
          </div>
        ) : biomarkers.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '60px',
            textAlign: 'center',
            border: '1px solid #E5E7EB'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📊</div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>
              No biomarker data yet
            </h2>
            <p style={{ color: '#6B7280', marginBottom: '24px' }}>
              Complete de-escalation sessions to start tracking your vocal health patterns.
            </p>
            <Link href="/de-escalation" style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: '#10B981',
              color: 'white',
              borderRadius: '12px',
              fontWeight: '600'
            }}>
              Start a Session
            </Link>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              marginBottom: '32px'
            }}>
              {[
                { label: 'Avg. Pitch', value: `${avgPitch} Hz`, icon: '🎵', color: '#10B981' },
                { label: 'Clarity Score', value: `${avgClarity}%`, icon: '✨', color: '#8B5CF6' },
                { label: 'Stress Level', value: avgStress < 30 ? 'Low' : avgStress < 60 ? 'Moderate' : 'High', icon: '🧘', color: '#F59E0B' }
              ].map((stat, i) => (
                <div key={i} style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #E5E7EB'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{stat.icon}</span>
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
                { label: 'Pitch Variation (Hz)', data: chartData.pitch, color: '#10B981', max: 200 },
                { label: 'Voice Clarity (%)', data: chartData.clarity, color: '#8B5CF6', max: 100 },
                { label: 'Stress Indicators (%)', data: chartData.stress, color: '#F59E0B', max: 100 }
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
                          height: `${Math.max((value / chart.max) * 100, value > 0 ? 10 : 0)}px`,
                          background: value > 0 ? `linear-gradient(to top, ${chart.color}, ${chart.color}88)` : '#F3F4F6',
                          borderRadius: '4px 4px 0 0',
                          transition: 'height 0.3s ease'
                        }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                    {chartData.labels.map((day, j) => (
                      <span key={j} style={{ fontSize: '11px', color: '#9CA3AF' }}>{day}</span>
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
              
              {loadingInsight ? (
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
              ) : insight ? (
                <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>{insight}</p>
              ) : (
                <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>
                  Continue tracking your biomarkers to receive personalized AI insights about your vocal health patterns.
                </p>
              )}
            </div>
          </>
        )}
      </main>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
