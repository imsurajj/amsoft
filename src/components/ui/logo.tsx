import React from 'react';

const Logo = ({ className = '', size = 40 }: { className?: string; size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ec4899' }} />
          <stop offset="100%" style={{ stopColor: '#8b5cf6' }} />
        </linearGradient>
      </defs>

      {/* Main logo shape - abstract representation of 'D' for Design */}
      <path
        d="M20 4C11.164 4 4 11.164 4 20C4 28.836 11.164 36 20 36C24.4183 36 28.4183 34.2091 31.3137 31.3137"
        stroke="url(#logoGradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Inner design elements */}
      <path
        d="M28 12L32 16L28 20"
        stroke="url(#logoGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      <circle
        cx="20"
        cy="20"
        r="6"
        stroke="url(#logoGradient)"
        strokeWidth="2.5"
        fill="none"
      />
    </svg>
  );
};

export default Logo;
