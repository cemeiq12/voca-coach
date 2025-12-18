'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  distortion?: string;
}

export default function JournalPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm here to listen and help you reflect. What's on your mind today?" }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const [profilePic, setProfilePic] = useState<string>();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatLoading(true);

    try {
      const res = await fetch('/api/journal-insight', {
        method: 'POST',
        body: JSON.stringify({ message: userMsg, context: messages.slice(-3) }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.socraticPrompt || "That's interesting. Can you tell me more?",
        distortion: data.distortion
      }]);

      await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: userMsg,
          distortion: data.distortion || null,
          socraticPrompt: data.socraticPrompt || null,
        }),
      });
    } catch {
      const fallbackResponses = [
        "That's interesting. Can you tell me more about what led you to feel this way?",
        "I hear you. What do you think might be underlying these feelings?",
        "Thank you for sharing. How does this situation make you feel about yourself?",
        "That sounds challenging. What would you tell a friend in the same situation?"
      ];
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
      }]);
    } finally {
      setChatLoading(false);
    }
  };

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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        isAuthenticated={true}
        userName={user.name || 'User'}
        userEmail={user.email}
        profilePic={profilePic}
        onProfilePicChange={setProfilePic}
        onLogout={handleLogout}
        currentPage="/journal"
      />

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '24px',
          maxWidth: '700px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: m.role === 'user' ? 'flex-end' : 'flex-start'
            }}>
              {m.distortion && (
                <span style={{
                  fontSize: '11px',
                  color: '#F59E0B',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: '600',
                  background: '#FEF3E7',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>
                  🔍 Detected: {m.distortion}
                </span>
              )}
              <div style={{
                maxWidth: '80%',
                padding: '16px 20px',
                borderRadius: '20px',
                fontSize: '15px',
                lineHeight: '1.6',
                ...(m.role === 'user' ? {
                  background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                  color: 'white',
                  borderBottomRightRadius: '4px'
                } : {
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  color: '#1F2937',
                  borderBottomLeftRadius: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: '0 2px 8px rgba(124, 58, 237, 0.08)'
                })
              }}>
                {m.content}
              </div>
            </div>
          ))}
          
          {chatLoading && (
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{
                background: 'white',
                padding: '16px 20px',
                borderRadius: '20px',
                borderBottomLeftRadius: '4px',
                border: '1px solid #E5E7EB',
                display: 'flex',
                gap: '6px'
              }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    width: '8px',
                    height: '8px',
                    background: '#10B981',
                    borderRadius: '50%',
                    animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`
                  }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div style={{
        background: 'white',
        borderTop: '1px solid #E5E7EB',
        padding: '20px 24px'
      }}>
        <form onSubmit={handleSubmit} style={{
          maxWidth: '700px',
          margin: '0 auto',
          display: 'flex',
          gap: '12px'
        }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share your thoughts..."
            autoFocus
            style={{
              flex: 1,
              padding: '16px 20px',
              border: '1px solid #E5E7EB',
              borderRadius: '999px',
              fontSize: '15px',
              outline: 'none',
              background: '#F9FAFB'
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || chatLoading}
            style={{
              width: '52px',
              height: '52px',
              background: input.trim() && !chatLoading ? '#10B981' : '#E5E7EB',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              cursor: input.trim() && !chatLoading ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}
          >
            →
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
