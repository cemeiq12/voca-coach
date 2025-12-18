'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh' }}>
      
      {/* Navbar */}
      <Navbar isAuthenticated={false} />

      {/* ========== HERO SECTION ========== */}
      <section style={{
        paddingTop: '140px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative blobs */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(124, 58, 237, 0.1)',
            borderRadius: '999px',
            marginBottom: '24px'
          }}>
            <span style={{ width: '8px', height: '8px', background: '#7C3AED', borderRadius: '50%' }} />
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#6D28D9' }}>AI-Powered Therapy Companion</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: '700',
            lineHeight: '1.15',
            color: '#1F2937',
            marginBottom: '24px',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Master communication with
            <span style={{ 
              display: 'block', 
              background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>AI-powered coaching</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '20px',
            color: '#6B7280',
            maxWidth: '560px',
            margin: '0 auto 40px',
            lineHeight: '1.7'
          }}>
            Voca-Coach helps therapists and professionals improve communication, track emotional insights, and enhance client engagement.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
            <Link href="/signup" style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
              color: 'white',
              borderRadius: '999px',
              fontSize: '17px',
              fontWeight: '600',
              boxShadow: '0 4px 24px rgba(124, 58, 237, 0.3)'
            }}>
              Try Free for 7 Days
            </Link>
            <Link href="/de-escalation" style={{
              padding: '16px 32px',
              background: 'white',
              color: '#1F2937',
              borderRadius: '999px',
              fontSize: '17px',
              fontWeight: '600',
              border: '2px solid #E5E7EB'
            }}>
              See Demo
            </Link>
          </div>

          {/* App Preview Image */}
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: 'white',
            borderRadius: '24px',
            padding: '20px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #ECFDF5 0%, #FEF3E7 100%)',
              borderRadius: '16px',
              padding: '40px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px'
            }}>
              {/* Mini feature cards */}
              {[
                { icon: '🌬️', title: 'De-escalation', desc: 'Real-time stress monitoring' },
                { icon: '📊', title: 'Biomarkers', desc: 'Track vocal health' },
                { icon: '📓', title: 'Journal', desc: 'Guided reflection' },
                { icon: '🎭', title: 'Persona', desc: 'Practice conversations' }
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
                  <div style={{ fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ fontSize: '14px', color: '#6B7280' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section id="features" style={{ padding: '100px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: 'rgba(56, 184, 255, 0.1)',
              borderRadius: '999px',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#38B8FF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Features</span>
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
              Everything you need to communicate better
            </h2>
            <p style={{ fontSize: '18px', color: '#6B7280', maxWidth: '560px', margin: '0 auto' }}>
              Our tools work together to help you find peace and confidence in your conversations.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { icon: '🎯', title: 'Real-time Feedback', desc: 'Get instant insights on your tone and stress levels as you speak.', bg: 'rgba(56, 184, 255, 0.1)' },
              { icon: '📈', title: 'Progress Tracking', desc: 'Monitor your improvement with intuitive charts and trends.', bg: 'rgba(139, 94, 255, 0.1)' },
              { icon: '🧘', title: 'CBT Techniques', desc: 'Challenge negative thoughts with proven therapy methods.', bg: 'rgba(122, 239, 255, 0.1)' },
              { icon: '🔒', title: 'Private & Secure', desc: 'Your voice and thoughts stay private with encryption.', bg: 'rgba(56, 184, 255, 0.1)' },
              { icon: '✨', title: 'AI-Powered', desc: 'Smart coaching that adapts to your unique speaking patterns.', bg: 'rgba(139, 94, 255, 0.1)' },
              { icon: '💬', title: 'Practice Mode', desc: 'Rehearse difficult conversations in a safe space.', bg: 'rgba(122, 239, 255, 0.1)' }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: '20px',
                padding: '32px',
                border: '1px solid #F3F4F6',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: item.bg,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginBottom: '20px'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how-it-works" style={{ padding: '100px 0', background: 'rgba(56, 184, 255, 0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: 'white',
              borderRadius: '999px',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#38B8FF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>How it Works</span>
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: '700', color: '#1F2937' }}>
              Three simple steps to calm
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {[
              { num: '01', title: 'Record or Speak', desc: 'Use your microphone to capture your voice during conversations or practice sessions.' },
              { num: '02', title: 'Get Real-time Analysis', desc: 'Our AI analyzes your tone, pace, and stress levels instantly.' },
              { num: '03', title: 'Improve & Reflect', desc: 'Receive personalized tips and track your progress over time.' }
            ].map((step, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
                }}>
                  <span style={{ fontSize: '24px', fontWeight: '700', color: '#8B5EFF' }}>{step.num}</span>
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#1F2937', marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ fontSize: '16px', color: '#6B7280', lineHeight: '1.6', maxWidth: '280px', margin: '0 auto' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section id="testimonials" style={{ padding: '100px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: 'rgba(56, 184, 255, 0.1)',
              borderRadius: '999px',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#38B8FF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Testimonials</span>
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: '700', color: '#1F2937' }}>
              Loved by thousands
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {[
              { name: 'Sarah M.', role: 'Therapist', text: 'Voca-Coach helps me prepare for difficult sessions. The de-escalation feature is a game-changer.' },
              { name: 'James K.', role: 'Executive', text: 'I have become much more aware of my speaking patterns. My team noticed the difference.' },
              { name: 'Emily R.', role: 'Student', text: 'The journal helped me overcome presentation anxiety. I feel so much more confident now.' }
            ].map((t, i) => (
              <div key={i} style={{
                background: '#FDF8F3',
                borderRadius: '20px',
                padding: '32px',
                position: 'relative'
              }}>
                {/* Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[1,2,3,4,5].map(n => (
                    <span key={n} style={{ color: '#F59E0B', fontSize: '18px' }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.7', marginBottom: '24px' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #38B8FF, #8B5EFF)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600'
                  }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1F2937' }}>{t.name}</div>
                    <div style={{ fontSize: '14px', color: '#6B7280' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section style={{
        padding: '100px 24px',
        background: 'linear-gradient(135deg, #38B8FF 0%, #8B5EFF 100%)',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '700', color: 'white', marginBottom: '16px' }}>
          Ready to find your calm?
        </h2>
        <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', marginBottom: '40px', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
          Join thousands who have transformed their communication with Voca-Coach.
        </p>
        <Link href="/signup" style={{
          display: 'inline-block',
          padding: '18px 40px',
          background: 'white',
          color: '#8B5EFF',
          borderRadius: '999px',
          fontSize: '18px',
          fontWeight: '600',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
        }}>
          Start Your Free Trial
        </Link>
      </section>

      {/* ========== FOOTER ========== */}
      <footer style={{ padding: '60px 24px 40px', background: '#1F2937' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px', marginBottom: '40px' }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #38B8FF, #8B5EFF)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '18px' }}>🎙️</span>
                </div>
                <span style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>Voca-Coach</span>
              </div>
              <p style={{ fontSize: '14px', color: '#9CA3AF', lineHeight: '1.6' }}>
                AI-powered vocal coaching for better wellbeing.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '16px' }}>Product</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['De-escalation', 'Biomarkers', 'Journal', 'Persona'].map(item => (
                  <Link key={item} href={`/${item.toLowerCase()}`} style={{ color: '#9CA3AF', fontSize: '14px' }}>{item}</Link>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '16px' }}>Company</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['About', 'Privacy', 'Terms', 'Contact'].map(item => (
                  <Link key={item} href="#" style={{ color: '#9CA3AF', fontSize: '14px' }}>{item}</Link>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #374151', paddingTop: '24px', textAlign: 'center' }}>
            <p style={{ color: '#6B7280', fontSize: '14px' }}>© 2025 Voca-Coach. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
