import React from 'react';

export const MagicWandIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
    <path d="M16 3l1.5 1.5" />
    <path d="M8 21l-1.5-1.5" />
    <path d="M12 12l-8-8" />
    <path d="M12 12l8 8" />
  </svg>
);

export const LayoutTemplateIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="18" height="7" x="3" y="3" rx="1" />
    <rect width="9" height="7" x="3" y="14" rx="1" />
    <rect width="5" height="7" x="16" y="14" rx="1" />
  </svg>
);

export const ImageIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

export const FilmIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <path d="M7 3v18" />
    <path d="M17 3v18" />
    <path d="M3 7h18" />
    <path d="M3 12h18" />
    <path d="M3 17h18" />
  </svg>
);

export const RefreshCwIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M3 21v-5h5" />
    </svg>
);

export const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

export const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);


export const MedhaviLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="180" height="50" viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        {/* Graphic part */}
        <g transform="translate(0, 5)">
            {/* Sun Rays - orange */}
            <path d="M22 4 C24 7, 26 10, 28 12 L29.5 9 C27.5 6, 25 4, 22 4 Z" fill="#F37F39" />
            <path d="M18 2 C20 5, 22 8, 24 10 L26 7 C24 5, 21.5 3, 18 2 Z" fill="#F37F39" />
            {/* Wings - blue */}
            <path d="M25.5 6.5 Q 18 20, 10 32 Q 13 25, 22 6.5 Z" fill="#00AEEF" />
            <path d="M19.5 6.5 Q 12 20, 4 32 Q 7 25, 16 6.5 Z" fill="#00AEEF" />
            <path d="M13.5 6.5 Q 6 20, -2 32 Q 1 25, 10 6.5 Z" fill="#00AEEF" />
        </g>
        {/* Text part */}
        <g transform="translate(46, 0)">
            <text y="15" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="18" fill="#005587">
                MEDHƏVİ
            </text>
            <text y="29" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="12" fill="#F37F39" letterSpacing="0.05em">
                SKILLS UNIVERSITY
            </text>
            <line x1="0" y1="34.5" x2="130" y2="34.5" stroke="#00AEEF" strokeWidth="1"/>
            <text y="46" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="10" fill="#00AEEF">
                Skill • Empower • Liberate
            </text>
        </g>
    </svg>
);