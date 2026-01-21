import React from 'react';

interface PlaceholderLogoProps {
  size?: number;
  className?: string;
}

export const PlaceholderLogo: React.FC<PlaceholderLogoProps> = ({ 
  size = 120, 
  className = "" 
}) => {
  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Modern gradient background */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        
        {/* Main circle background */}
        <circle
          cx="60"
          cy="60"
          r="55"
          fill="url(#logoGradient)"
          className="animate-pulse"
        />
        
        {/* Inner design - representing lip sync waves */}
        <path
          d="M25 60 Q35 45 45 60 T65 60 T85 60 Q90 45 95 60"
          stroke="url(#accentGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          className="animate-pulse"
        />
        
        {/* Accent dots */}
        <circle cx="30" cy="60" r="3" fill="white" opacity="0.8" />
        <circle cx="60" cy="60" r="4" fill="white" />
        <circle cx="90" cy="60" r="3" fill="white" opacity="0.8" />
        
        {/* Modern geometric accent */}
        <rect
          x="50"
          y="25"
          width="20"
          height="3"
          rx="1.5"
          fill="white"
          opacity="0.6"
        />
        <rect
          x="45"
          y="92"
          width="30"
          height="3"
          rx="1.5"
          fill="white"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};

export default PlaceholderLogo;