'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1000);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex',
      background: 'linear-gradient(135deg, #FDF8F3 0%, #ECFDF5 100%)'
    }}>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 24px'
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: '#10B981',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '20px' }}>🎙️</span>
            </div>
            <span style={{ fontSize: '20px', fontWeight: '700', color: '#1F2937' }}>Voca-Coach</span>
          </Link>

          {/* Header */}
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
            Welcome back
          </h1>
          <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '32px' }}>
            Sign in to continue your journey.
          </p>

          {/* Google Button */}
          <button style={{
            width: '100%',
            padding: '14px 20px',
            background: 'white',
            border: '1.5px solid #E5E7EB',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            fontSize: '15px',
            fontWeight: '600',
            color: '#374151',
            cursor: 'pointer',
            marginBottom: '24px'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
            <span style={{ fontSize: '13px', color: '#9CA3AF' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '1.5px solid #E5E7EB',
                  borderRadius: '12px',
                  fontSize: '15px',
                  outline: 'none',
                  background: 'white'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '1.5px solid #E5E7EB',
                  borderRadius: '12px',
                  fontSize: '15px',
                  outline: 'none',
                  background: 'white'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px 20px',
                background: '#10B981',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Sign up link */}
          <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '15px', color: '#6B7280' }}>
            Don't have an account?{' '}
            <Link href="/signup" style={{ color: '#10B981', fontWeight: '600' }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
