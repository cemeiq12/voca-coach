'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import CircularProgress from '@/components/CircularProgress';

interface Biomarker {
  id: string;
  date: string;
  pitch: number;
  clarity: number;
  stress: number;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function BiomarkerDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [biomarkers, setBiomarkers] = useState<Biomarker[]>([]);
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [profilePic, setProfilePic] = useState<string>();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) fetchBiomarkers();
  }, [user]);

  const fetchBiomarkers = async () => {
    try {
      const res = await fetch('/api/biomarkers?days=7');
      if (res.ok) {
        const data = await res.json();
        setBiomarkers(data.biomarkers || []);
        if (data.biomarkers?.length > 0) generateInsight(data.biomarkers);
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

  const getChartData = () => {
    if (biomarkers.length === 0) {
      return {
        labels: DAYS,
        pitch: Array(7).fill(0),
        clarity: Array(7).fill(0),
        stress: Array(7).fill(0),
      };
    }

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
  const avgPitch = biomarkers.length > 0 ? Math.round(biomarkers.reduce((sum, b) => sum + b.pitch, 0) / biomarkers.length) : 0;
  const avgClarity = biomarkers.length > 0 ? Math.round(biomarkers.reduce((sum, b) => sum + b.clarity, 0) / biomarkers.length) : 0;
  const avgStress = biomarkers.length > 0 ? Math.round(biomarkers.reduce((sum, b) => sum + b.stress, 0) / biomarkers.length) : 0;

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (loading || !user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid #E5E7EB', borderTop: '4px solid #7C3AED', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <div style={{ color: '#6B7280' }}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar
        isAuthenticated={true}
        userName={user.name || 'User'}
        userEmail={user.email}
        profilePic={profilePic}
        onProfilePicChange={setProfilePic}
        onLogout={handleLogout}
        currentPage="/biomarkers"
      />

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
            Analytics Dashboard
          </h1>
          <p style={{ color: '#6B7280' }}>Monitor your vocal health patterns over time.</p>
        </div>

        {loadingData ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6B7280' }}>Loading biomarker data...</div>
        ) : biomarkers.length === 0 ? (
          <div style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '20px', padding: '60px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.5)', boxShadow: '0 8px 32px rgba(124, 58, 237, 0.08)' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📊</div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>No biomarker data yet</h2>
            <p style={{ color: '#6B7280', marginBottom: '24px' }}>Complete sessions to start tracking your patterns.</p>
            <a href="/de-escalation" style={{ display: 'inline-block', padding: '14px 28px', background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)', color: 'white', borderRadius: '12px', fontWeight: '600', textDecoration: 'none' }}>
              Start a Session
            </a>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
              <CircularProgress percentage={Math.round((avgPitch / 200) * 100)} label="Avg. Pitch" description={`${avgPitch} Hz`} color="purple" />
              <CircularProgress percentage={avgClarity} label="Clarity Score" description={`voice quality`} color="pink" />
              <CircularProgress percentage={100 - avgStress} label="Calm Level" description={avgStress < 30 ? 'Low stress' : avgStress < 60 ? 'Moderate' : 'High stress'} color="cyan" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
              {[
                { label: 'Pitch Variation (Hz)', data: chartData.pitch, color: '#7C3AED', max: 200 },
                { label: 'Voice Clarity (%)', data: chartData.clarity, color: '#EC4899', max: 100 },
                { label: 'Stress Indicators (%)', data: chartData.stress, color: '#06B6D4', max: 100 }
              ].map((chart, i) => (
                <div key={i} style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.5)', boxShadow: '0 8px 32px rgba(124, 58, 237, 0.08)' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '20px' }}>{chart.label}</h3>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
                    {chart.data.map((value, j) => (
                      <div key={j} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '100%', height: `${Math.max((value / chart.max) * 100, value > 0 ? 10 : 0)}px`, background: value > 0 ? `linear-gradient(to top, ${chart.color}, ${chart.color}88)` : '#F3F4F6', borderRadius: '4px 4px 0 0', transition: 'height 0.3s ease' }} />
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

            <div style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255, 255, 255, 0.5)', boxShadow: '0 8px 32px rgba(124, 58, 237, 0.08)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>AI Health Insight</h3>
              {loadingInsight ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#6B7280' }}>
                  <div style={{ width: '20px', height: '20px', border: '2px solid #7C3AED', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  Analyzing your vocal patterns...
                </div>
              ) : insight ? (
                <div style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                  {insight.split('\n').map((line, i) => {
                    // Convert markdown bold (**text**) to styled text
                    const boldRegex = /\*\*(.+?)\*\*/g;
                    if (line.match(boldRegex)) {
                      const parts = line.split(boldRegex);
                      return (
                        <div key={i} style={{ marginBottom: '8px' }}>
                          {parts.map((part, j) => 
                            j % 2 === 1 ? (
                              <strong key={j} style={{ fontWeight: '700', color: '#1F2937' }}>{part}</strong>
                            ) : (
                              <span key={j}>{part}</span>
                            )
                          )}
                        </div>
                      );
                    }
                    // Handle bullet points
                    if (line.trim().startsWith('*') && !line.trim().startsWith('**')) {
                      return (
                        <div key={i} style={{ marginLeft: '20px', marginBottom: '4px', display: 'flex', gap: '8px' }}>
                          <span style={{ color: '#7C3AED' }}>•</span>
                          <span>{line.trim().substring(1).trim()}</span>
                        </div>
                      );
                    }
                    // Regular lines
                    return line.trim() ? (
                      <div key={i} style={{ marginBottom: '8px' }}>{line}</div>
                    ) : (
                      <div key={i} style={{ height: '8px' }} />
                    );
                  })}
                </div>
              ) : (
                <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7' }}>Continue tracking your biomarkers to receive personalized AI insights.</p>
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
