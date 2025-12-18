'use client';

import React, { useState, useRef } from 'react';

interface ProfilePictureUploadProps {
  currentImage?: string;
  onImageChange?: (imageUrl: string) => void;
  size?: number;
  initials?: string;
  children?: (handleClick: () => void) => React.ReactNode;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  currentImage,
  onImageChange,
  size = 80,
  initials = 'U',
  children
}) => {
  const [image, setImage] = useState<string | undefined>(currentImage);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        if (onImageChange) {
          onImageChange(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // If children render prop is provided, use it
  if (children) {
    return (
      <>
        {children(handleClick)}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </>
    );
  }

  // Otherwise render default UI
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: image ? 'transparent' : 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          border: '2px solid white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        {image ? (
          <img
            src={image}
            alt="Profile"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <span style={{
            fontSize: `${size * 0.4}px`,
            fontWeight: '700',
            color: 'white'
          }}>
            {initials}
          </span>
        )}
        
        {isHovering && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Change
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ProfilePictureUpload;
