
import React from 'react';
import { StatId } from '../types.ts';

interface IconProps {
  className?: string;
}

const BrainIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a1 1 0 0 0 .94.99c.63.06 1.25.13 1.88.22a1 1 0 0 0 .94-.99V4.5A2.5 2.5 0 0 1 18.5 2" />
    <path d="M4.5 9.5A2.5 2.5 0 0 1 2 7V5.5a1 1 0 0 1 1-1h1.2c.54 0 1.05.17 1.5.46" />
    <path d="M16.5 15.14c.45-.29.96-.46 1.5-.46H19a1 1 0 0 1 1-1V12a2.5 2.5 0 0 0-2.5-2.5" />
    <path d="M4.5 14.5A2.5 2.5 0 0 0 2 17v1.5a1 1 0 0 0 1 1h1.2a1 1 0 0 1 .94.99c.09.63.18 1.25.28 1.88a1 1 0 0 1-.94.99H3.5A2.5 2.5 0 0 0 1 24" />
    <path d="M19.5 9.5A2.5 2.5 0 0 0 22 7V5.5a1 1 0 0 0-1-1h-1.2a1 1 0 0 0-.94.99c-.09.63-.18-1.25-.28-1.88a1 1 0 0 0 .94.99H20.5A2.5 2.5 0 0 1 23 12" />
    <path d="M14 15.5c.6.05 1.18.1 1.75.15" />
    <path d="M9.5 14A2.5 2.5 0 0 0 7 11.5v-1.2a1 1 0 0 0-.94-.99c-.63-.06-1.25-.13-1.88-.22a1 1 0 0 0-.94.99V9.5A2.5 2.5 0 0 0 1.5 12" />
    <path d="M14.5 9.5A2.5 2.5 0 0 1 17 12v1.5a1 1 0 0 1-1 1h-1.2a1 1 0 0 1-.94-.99c-.09-.63-.18-1.25-.28-1.88a1 1 0 0 1 .94-.99H15.5A2.5 2.5 0 0 0 18 8" />
    <path d="M12 12v1.5a2.5 2.5 0 0 1-2.5 2.5" />
  </svg>
);

const GavelIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m14 13-7.5 7.5" />
    <path d="M18 17-5.5 1.5" />
    <path d="m15 11 8 8" />
    <path d="m21.5 11.5-8.5-8.5" />
    <path d="m12 6 5-5" />
    <path d="m8 10 5-5" />
    <path d="m3 21 6-6" />
  </svg>
);

const FungiIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 10.125a2.5 2.5 0 1 0 4.25 2.375" />
    <path d="M12.65 18.05A6 6 0 0 0 18 12.3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1 6 6 0 0 0 5.35 5.75" />
    <path d="M12.65 6.05A6 6 0 0 1 18 11.7a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1 6 6 0 0 1 5.35-5.65" />
    <path d="M11.35 18.05A6 6 0 0 1 6 12.3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1 6 6 0 0 1-5.35 5.75" />
    <path d="M11.35 6.05A6 6 0 0 0 6 11.7a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1 6 6 0 0 0-5.35-5.65" />
  </svg>
);

// FIX: Export MoneyIcon component
export const MoneyIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="12" x="2" y="6" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h.01" />
    <path d="M18 12h.01" />
  </svg>
);

export const HeartIcon: React.FC<IconProps & { filled: boolean }> = ({ className, filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
         fill={filled ? "currentColor" : "none"} strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
    </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25L12 15.75L4.5 8.25" />
    </svg>
);

export const GiftIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="18" height="4" rx="1"></rect>
        <path d="M12 8v13"></path>
        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
        <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path>
    </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export const STAT_ICONS: Record<StatId, React.FC<IconProps>> = {
  [StatId.SANIDADE]: BrainIcon,
  [StatId.PRESTIGIO]: GavelIcon,
  [StatId.FUNGOS]: FungiIcon,
  [StatId.DINHEIRO]: MoneyIcon,
};