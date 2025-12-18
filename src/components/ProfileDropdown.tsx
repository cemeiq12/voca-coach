'use client';

import React, { useState, useRef, useEffect } from 'react';
import ProfilePictureUpload from './ProfilePictureUpload';
import Link from 'next/link';

interface ProfileDropdownProps {
  userName: string;
  userEmail?: string;
  profilePic?: string;
  onProfilePicChange?: (imageUrl: string) => void;
  onLogout?: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  userName,
  userEmail,
  profilePic,
  onProfilePicChange,
  onLogout
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = () => {
    return userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: profilePic ? 'transparent' : 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
          border: '2px solid white',
          cursor: 'pointer',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease'
        }}
      >
        {profilePic ? (
          <img src={profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>{getInitials()}</span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '48px',
          right: 0,
          width: '280px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          border: '1px solid rgba(0,0,0,0.06)',
          overflow: 'hidden',
          zIndex: 1000
        }}>
          {/* Profile Section */}
          <div style={{
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
            borderBottom: '1px solid #F3F4F6'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: profilePic ? 'transparent' : 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                {profilePic ? (
                  <img src={profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>{getInitials()}</span>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>{userName}</div>
                {userEmail && (
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>{userEmail}</div>
                )}
              </div>
            </div>
            
            {/* Upload Picture Button */}
            <ProfilePictureUpload
              currentImage={profilePic}
              onImageChange={onProfilePicChange}
              size={0}
              initials=""
            >
              {(handleClick) => (
                <button
                  onClick={handleClick}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#4B5563',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F9FAFB';
                    e.currentTarget.style.borderColor = '#7C3AED';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  Upload Picture
                </button>
              )}
            </ProfilePictureUpload>
          </div>

          {/* Menu Items */}
          <div style={{ padding: '8px' }}>
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#4B5563',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Dashboard
            </Link>

            {onLogout && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#EF4444',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FEF2F2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
