'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

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

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
}

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [userName, setUserName] = useState('User');
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
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
            { href: '/dashboard', label: 'Dashboard', active: true },
            { href: '/de-escalation', label: 'De-escalation' },
            { href: '/biomarkers', label: 'Biomarkers' },
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              background: '#F3F4F6',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#4B5563',
              cursor: 'pointer'
            }}
          >
            Sign out
          </button>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, #10B981, #14B8A6)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: '14px'
          }}>{userName.charAt(0).toUpperCase()}</div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Welcome Section */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
            Welcome back, {userName.split(' ')[0]} 👋
          </h1>
          <p style={{ color: '#6B7280' }}>Here's an overview of your vocal wellness journey.</p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {loadingData ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#6B7280' }}>
              Loading your stats...
            </div>
          ) : (
            [
              { label: 'Sessions', value: stats?.sessionCount || 0, icon: '🎙️', bg: '#ECFDF5', change: 'Total sessions' },
              { label: 'Calm Score', value: `${stats?.avgCalmScore || 0}%`, icon: '🧘', bg: '#FEF3E7', change: 'Average score' },
              { label: 'Journal Entries', value: stats?.journalCount || 0, icon: '📓', bg: '#F3F0FF', change: 'Reflections' },
              { label: 'Streak', value: `${stats?.streak || 0} days`, icon: '🔥', bg: '#FEF2F2', change: stats?.streak ? 'Keep it up!' : 'Start today!' }
            ].map((stat, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #E5E7EB'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  background: stat.bg,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  marginBottom: '16px'
                }}>{stat.icon}</div>
                <div style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '4px' }}>{stat.value}</div>
                <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>{stat.label}</div>
                <div style={{ fontSize: '12px', color: '#10B981' }}>{stat.change}</div>
              </div>
            ))
          )}
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Quick Actions */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #E5E7EB'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '20px' }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { href: '/de-escalation', label: 'Start De-escalation Session', icon: '🌬️', desc: 'Real-time stress monitoring' },
                { href: '/biomarkers', label: 'Check Biomarkers', icon: '📊', desc: 'View vocal health trends' },
                { href: '/journal', label: 'Write in Journal', icon: '📓', desc: 'Reflect with AI guidance' },
                { href: '/persona', label: 'Practice Conversations', icon: '🎭', desc: 'Talk to AI personas' }
              ].map((action, i) => (
                <Link key={i} href={action.href} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: '#F9FAFB',
                  borderRadius: '12px',
                  transition: 'all 0.2s'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    background: '#ECFDF5',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>{action.icon}</div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '2px' }}>{action.label}</div>
                    <div style={{ fontSize: '13px', color: '#6B7280' }}>{action.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid #E5E7EB'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '20px' }}>Recent Activity</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {activity.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px', color: '#6B7280' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>📝</div>
                  <p>No activity yet. Start a session or write a journal entry!</p>
                </div>
              ) : (
                activity.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: '16px',
                    paddingBottom: i < activity.length - 1 ? '16px' : '0',
                    borderBottom: i < activity.length - 1 ? '1px solid #F3F4F6' : 'none'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: '#10B981',
                      borderRadius: '50%',
                      marginTop: '6px'
                    }} />
                    <div>
                      <div style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '4px' }}>{formatTimeAgo(item.time)}</div>
                      <div style={{ fontWeight: '500', color: '#1F2937', marginBottom: '2px' }}>{item.action}</div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>{item.result}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Start Session CTA */}
        <div style={{
          marginTop: '32px',
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          borderRadius: '20px',
          padding: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>
              Ready to practice?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.9)' }}>
              Start a new session or continue your wellness journey.
            </p>
          </div>
          <Link href="/de-escalation" style={{
            padding: '14px 28px',
            background: 'white',
            color: '#059669',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '15px'
          }}>
            Start Session
          </Link>
        </div>
      </main>
    </div>
  );
}
