import React from "react";

interface VanguardLogoProps {
  size?: number;
  className?: string;
}

/**
 * Vanguardik Monochrome Architectural Vector Mark ("The Precision V").
 * Designed on a strict 2:1 isometric grid using flat currentColor geometry
 * so it renders with 100% clarity in pure black & white at any scale.
 */
export const VanguardLogo: React.FC<VanguardLogoProps> = ({
  size = 22,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left Architectural Wing */}
      <path d="M3.5 6H9.8L14.2 14.8L11.05 21.1L3.5 6Z" fill="currentColor" />
      {/* Center Precision Apex Diamond */}
      <path d="M16 6L18.4 10.8L16 15.6L13.6 10.8L16 6Z" fill="currentColor" />
      {/* Right Ascending Vanguard Blade */}
      <path d="M22.2 6H28.5L18.2 26.6L15.05 20.3L22.2 6Z" fill="currentColor" />
    </svg>
  );
};

