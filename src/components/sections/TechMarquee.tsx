"use client";

import React, { useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import styles from "./TechMarquee.module.css";

/* =========================================================================
   Official & Precision SVG Technology Logotypes
   ========================================================================= */

const ChromeIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="21.17" y1="8" x2="12" y2="8" />
    <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
    <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
  </svg>
);

const NextjsIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm3.86 14.5-5.59-7.23v7.23H8.75V7.5h1.76l5.77 7.47V7.5h1.52v9h-1.94Z" />
  </svg>
);

const TypescriptIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M7 8h6M10 8v8M14.5 13.5c.5.5 1.2.9 2.1.9 1 0 1.6-.5 1.6-1.2 0-.8-.7-1.1-1.7-1.5-1.4-.5-2.5-1.2-2.5-2.6 0-1.4 1.1-2.4 2.8-2.4 1.2 0 2.1.4 2.7 1l-.8 1.1c-.5-.4-1.1-.7-1.9-.7-.9 0-1.4.5-1.4 1.1 0 .7.6 1 1.6 1.4 1.5.6 2.6 1.2 2.6 2.7 0 1.5-1.2 2.6-3 2.6-1.4 0-2.5-.5-3.2-1.2l.9-1.2Z" />
  </svg>
);

const ThreejsIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
    <path d="M12 22V12" />
    <path d="M21 7l-9 5-9-5" />
    <circle cx="12" cy="12" r="2.2" fill="currentColor" />
  </svg>
);

const OpenAIIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 8.76a4.485 4.485 0 0 1 2.366-1.973V12.4a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 8.76zm16.597 3.855l-5.833-3.387L15.119 8.06a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.663zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 10.09V7.763a.08.08 0 0 1 .033-.062l4.84-2.787a4.5 4.5 0 0 1 6.668 4.708zm-9.688 3.553L8.45 11.43l5.848-3.375 2.809 1.622-5.848 3.375z" />
  </svg>
);

const SupabaseIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.923 1.018a1.2 1.2 0 0 0-1.077.58L3.21 14.615a1.2 1.2 0 0 0 1.077 1.82h7.636l-1.07 6.547a1.2 1.2 0 0 0 2.154.58l8.636-13.017a1.2 1.2 0 0 0-1.077-1.82h-7.636l1.07-6.547a1.2 1.2 0 0 0-1.077-1.16z" />
  </svg>
);

const SecurityShieldIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const TailwindIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" />
  </svg>
);

const LighthouseIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const AwsIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.5 17.5c-3-1-4.5-3.5-4.5-6.5a6.5 6.5 0 0 1 12.3-2.8A5 5 0 0 1 22 13c0 2.8-2.2 5-5 5H6.5" />
    <path d="M12 12v6m0 0l-2-2m2 2l2-2" />
  </svg>
);

const capabilities = [
  {
    icon: <ChromeIcon size={16} />,
    label: "Chrome Extensions MV3",
    color: "#06b6d4",
  },
  {
    icon: <NextjsIcon size={16} />,
    label: "Next.js App Router",
    color: "#f8fafc",
  },
  {
    icon: <TypescriptIcon size={16} />,
    label: "TypeScript Strict",
    color: "#6366f1",
  },
  {
    icon: <ThreejsIcon size={16} />,
    label: "Three.js WebGL & 3D",
    color: "#38bdf8",
  },
  {
    icon: <OpenAIIcon size={16} />,
    label: "Agentes de IA & LLMs",
    color: "#10b981",
  },
  {
    icon: <SupabaseIcon size={16} />,
    label: "Supabase & Edge Data",
    color: "#34d399",
  },
  {
    icon: <SecurityShieldIcon size={16} />,
    label: "Zero-Trust & OWASP ASVS",
    color: "#a855f7",
  },
  {
    icon: <TailwindIcon size={16} />,
    label: "Tailwind & Motion",
    color: "#06b6d4",
  },
  {
    icon: <LighthouseIcon size={16} />,
    label: "100/100 Core Web Vitals",
    color: "#10b981",
  },
  {
    icon: <AwsIcon size={16} />,
    label: "AWS & Edge Serverless",
    color: "#38bdf8",
  },
];

function wrap(min: number, max: number, v: number): number {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export const TechMarquee: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 260,
  });

  // Gentle, clamped scroll influence (never exceeds ±1.6%)
  const scrollInfluence = useTransform(
    smoothVelocity,
    [-1400, 0, 1400],
    [1.6, 0, -1.6],
    { clamp: true }
  );

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_t, delta) => {
    // Delta in seconds, capped to prevent jumps on tab focus
    const dt = Math.min(delta / 1000, 0.05);

    // Subtle drift: gentle on hover (-0.35%), normal speed (-1.15%) + gentle scroll nudge
    const baseSpeed = isHovered ? -0.35 : -1.15;
    const moveBy = (baseSpeed + scrollInfluence.get()) * dt;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className={styles.marqueeSection}
      aria-hidden="true"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className={styles.trackWrapper} style={{ x }}>
        {[0, 1].map((groupIndex) => (
          <div key={groupIndex} className={styles.trackGroup}>
            {capabilities.map((item, idx) => (
              <div
                key={idx}
                className={styles.tickerItem}
                style={{
                  ["--hover-color" as string]: item.color,
                }}
              >
                <span
                  className={styles.iconWrapper}
                  style={{ color: item.color }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
