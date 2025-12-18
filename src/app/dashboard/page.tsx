'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import CircularProgress from '@/components/CircularProgress';
import EmotionScale from '@/components/EmotionScale';
import LiveStatsPanel from '@/components/LiveStatsPanel';
import StatusBadge from '@/components/StatusBadge';
import Navbar from '@/components/Navbar';

interface Stats {
  sessionCount: number;
  avgCalmScore: number;
  journalCount: number;
  streak: number;
}

interface Activity {
  type: 'session' | 'journal';
  time: string;
  action: string;
  result: string;
}

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [userName, setUserName] = useState('User');
  const [loadingData, setLoadingData] = useState(true);
  const [profilePic, setProfilePic] = useState<string | undefined>();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setActivity(data.activity || []);
        setUserName(data.userName || 'User');
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleProfilePicChange = (imageUrl: string) => {
    setProfilePic(imageUrl);
    console.log('Profile picture updated:', imageUrl);
  };

  if (loading || !user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #E5E7EB',
            borderTop: '4px solid #7C3AED',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <div style={{ color: '#6B7280' }}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Navbar */}
      <Navbar
        isAuthenticated={true}
        userName={userName}
        userEmail={user.email}
        profilePic={profilePic}
        onProfilePicChange={handleProfilePicChange}
        onLogout={handleLogout}
        currentPage="/dashboard"
      />

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Welcome Section with Status Badge */}
        <div style={{ marginBottom: '24px' }}>
          <StatusBadge status="info" label="Professional therapy enhancement tool only" />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
                Session Overview
              </h1>
              <p style={{ color: '#6B7280' }}>Welcome back, {userName.split(' ')[0]}</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                padding: '10px 20px',
                background: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#4B5563',
                cursor: 'pointer'
              }}>
                View all
              </button>
              <a href="/de-escalation" style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                display: 'inline-block',
                textDecoration: 'none'
              }}>
                Start Session
              </a>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
          {/* Left Column - Main Content */}
          <div>
            {/* Points of Improvement */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '32px',
              marginBottom: '24px',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 8px 32px rgba(124, 58, 237, 0.08)'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
                Points of Improvement
              </h2>
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
                Metrics based on your previous conversation
              </p>

              {/* Circular Progress Charts */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                <CircularProgress
                  percentage={stats?.avgCalmScore || 62}
                  label="Communication"
                  description="conversation clarity"
                  color="purple"
                />
                <CircularProgress percentage={81} label="Empathy" description="client engagement" color="pink" />
                <CircularProgress percentage={80} label="Engagement" description="speaking patterns" color="cyan" />
              </div>
            </div>

            {/* Emotions Analysis */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 8px 32px rgba(124, 58, 237, 0.08)'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1F2937', marginBottom: '20px' }}>
                Emotional Analysis
              </h2>

              <EmotionScale emoji="H" label="Happy" percentage={78} frequency="4 minutes" color="#7C3AED" />
              <EmotionScale emoji="N" label="Neutral" percentage={45} frequency="2 minutes" color="#EC4899" />
              <EmotionScale emoji="S" label="Sad" percentage={12} frequency="30 seconds" color="#06B6D4" />
              <EmotionScale emoji="F" label="Frustrated" percentage={8} frequency="15 seconds" color="#F59E0B" />
            </div>
          </div>

          {/* Right Column - Live Stats Panel */}
          <div>
            <LiveStatsPanel
              currentMood="Engaged"
              moodEmoji=""
              stats={[
                { label: 'Speaking time', value: `${stats?.sessionCount || 0} mins` },
                { label: 'Engagement', value: `${stats?.avgCalmScore || 0}%` }
              ]}
              recommendations={[
                { type: 'info', message: "Allow the patient more time to talk", timestamp: "2 min ago" }
              ]}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
