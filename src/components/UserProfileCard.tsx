'use client';

import React from 'react';

interface UserProfileCardProps {
  name: string;
  avatar?: string;
  communicationStyle?: string;
  role?: string;
  interests?: string[];
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  name,
  avatar,
  communicationStyle,
  role,
  interests = []
}) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '24px',
      boxShadow: '0 4px 16px rgba(124, 58, 237, 0.12)',
      textAlign: 'center'
    }}>
      {/* Avatar */}
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
        fontSize: '28px',
        color: 'white',
        fontWeight: '700'
      }}>
        {avatar ? (
          <img src={avatar} alt={name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
        ) : (
          getInitials(name)
        )}
      </div>

      {/* Name */}
      <h3 style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: '16px'
      }}>
        {name}
      </h3>

      {/* Communication Style */}
      {communicationStyle && (
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
            Communication Style
          </div>
          <div className="tag" style={{ display: 'inline-flex' }}>
            {communicationStyle}
          </div>
        </div>
      )}

      {/* Role */}
      {role && (
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
            Role
          </div>
          <div className="tag tag-pink" style={{ display: 'inline-flex' }}>
            {role}
          </div>
        </div>
      )}

      {/* Interests */}
      {interests.length > 0 && (
        <div>
          <div style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
            Interests
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
            {interests.map((interest, i) => (
              <span key={i} className="tag tag-cyan" style={{ fontSize: '11px' }}>
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;
