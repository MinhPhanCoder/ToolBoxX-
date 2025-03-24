import React from 'react';
const GoogleIcon: React.FC<{
  size?: number;
  className?: string;
}> = ({
  size = 24,
  className = ''
}) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" stroke="none" fill="#FFF"></path>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="none" fill="#FFF"></path>
      <path d="M9.5 7.5v9h-3v-9h3z" stroke="none" fill="#EA4335"></path>
      <path d="M17.5 7.5v9h-3v-9h3z" stroke="none" fill="#34A853"></path>
      <path d="M14.5 11.5v2h-5v-2h5z" stroke="none" fill="#4285F4"></path>
      <path d="M6.5 7.5h11v9h-11z" stroke="none" fill="#FBBC05" fillOpacity=".4"></path>
    </svg>;
};
export default GoogleIcon;