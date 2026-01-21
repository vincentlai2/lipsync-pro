import React from 'react';

interface PlaceholderAvatarProps {
  size?: number;
  name?: string;
  className?: string;
}

export const PlaceholderAvatar: React.FC<PlaceholderAvatarProps> = ({ 
  size = 80, 
  name = "User",
  className = "" 
}) => {
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate consistent color based on name
  const getColorFromName = (name: string) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600', 
      'from-green-500 to-green-600',
      'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-teal-500 to-teal-600',
      'from-red-500 to-red-600'
    ];
    
    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  const initials = getInitials(name);
  const gradientColor = getColorFromName(name);

  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className={`
          w-full h-full rounded-full 
          bg-gradient-to-br ${gradientColor}
          flex items-center justify-center
          text-white font-bold
          shadow-lg hover:shadow-xl transition-all duration-300
          border-4 border-white
        `}
        style={{ fontSize: size * 0.35 }}
      >
        {initials}
      </div>
      
      {/* Modern accent ring */}
      <div 
        className="absolute inset-0 rounded-full border-2 border-gray-200 opacity-20"
        style={{ 
          transform: 'scale(1.1)',
          animation: 'pulse 2s infinite'
        }}
      />
    </div>
  );
};

export default PlaceholderAvatar;