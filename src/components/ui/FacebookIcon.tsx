import React from 'react';
const FacebookIcon: React.FC<{
  size?: number;
  className?: string;
}> = ({
  size = 24,
  className = ''
}) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="#1877F2" stroke="#1877F2"></path>
    </svg>;
};
export default FacebookIcon;