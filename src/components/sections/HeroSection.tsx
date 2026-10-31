"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { VanguardScene3D } from "@/components/effects/VanguardScene3D";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  onOpenInquiry: (serviceTitle?: string) => void;
}

const ROTATING_PILLARS = [
  "Marketing que Escala.",
  "Extensiones Chrome B2B.",
  "Agentes de IA Autónomos.",
  "Diseño UI/UX Inmersivo.",
];

/* =========================================================================
   Custom Minimalist Geometric Symbols (Consistent stroke, scale & geometry)
   ========================================================================= */

// 1. Automatización de Procesos: Connected diagonal dual blades (flow & transformation)
const AutomationSymbol: React.FC = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.symbolSvg}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="symGradAuto" x1="10" y1="6" x2="34" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    {/* Upper kinetic diagonal blade */}
    <path
      d="M19 6L29 6L21 20L11 20L19 6Z"
      fill="url(#symGradAuto)"
      opacity="0.95"
    />
    {/* Lower kinetic diagonal blade */}
    <path
      d="M25 24L35 24L27 38L17 38L25 24Z"
      fill="url(#symGradAuto)"
      opacity="0.85"
    />
    {/* Clean connecting geometric bridge */}
    <path
      d="M21 20L25 24"
      stroke="#38bdf8"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

// 2. Rendimiento & Conversión: 3D wireframe isometric cube (architecture & optimization)
const PerformanceSymbol: React.FC = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.symbolSvg}
    aria-hidden="true"
  >
    {/* Top Diamond Face */}
    <polygon
      points="22,7 35,14.5 22,22 9,14.5"
      stroke="#38bdf8"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="rgba(56, 189, 248, 0.08)"
    />
    {/* Left Face */}
    <polygon
      points="9,14.5 22,22 22,37 9,29.5"
      stroke="#38bdf8"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Right Face */}
    <polygon
      points="22,22 35,14.5 35,29.5 22,37"
      stroke="#38bdf8"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="rgba(56, 189, 248, 0.04)"
    />
    {/* Modular Center Coordinate Node */}
    <circle cx="22" cy="22" r="2" fill="#38bdf8" />
  </svg>
);

// 3. Seguridad Zero-Trust: Isometric polygon/hexagon with interior floating protected core
const SecuritySymbol: React.FC = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.symbolSvg}
    aria-hidden="true"
  >
    {/* Outer Isometric Hexagonal Shield Frame */}
    <polygon
      points="22,6 36,14 36,30 22,38 8,30 8,14"
      stroke="#60a5fa"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="rgba(96, 165, 250, 0.06)"
    />
    {/* Internal Zero-Trust Tri-Axis */}
    <line x1="22" y1="6" x2="22" y2="22" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 2" />
    <line x1="8" y1="30" x2="22" y2="22" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 2" />
    <line x1="36" y1="30" x2="22" y2="22" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 2" />
    {/* Core Geometric Node */}
    <polygon
      points="22,17 26,22 22,27 18,22"
      fill="#60a5fa"
      stroke="#a5b4fc"
      strokeWidth="1.5"
    />
  </svg>
);

// 4. Código 100% Propio: Angular code bracket & slash composition in electric violet
const CodeSymbol: React.FC = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.symbolSvg}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="symGradCode" x1="8" y1="12" x2="36" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    {/* Left Angular Bracket */}
    <path
      d="M15 14L8 22L15 30"
      stroke="url(#symGradCode)"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Central Architectural Slash */}
    <line
      x1="25"
      y1="12"
      x2="19"
      y2="32"
      stroke="url(#symGradCode)"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    {/* Right Angular Bracket */}
    <path
      d="M29 14L36 22L29 30"
      stroke="url(#symGradCode)"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================================================================
   Service Definitions (Exact Titles & Copy from Specification)
   ========================================================================= */

const SERVICES_DATA = [
  {
    id: "auto-procesos",
    titleFull: "Automatización de Procesos",
    titleLine1: "Automatización",
    titleLine2: "de Procesos",
    desc: "Trabajá más, automático.",
    accentColor: "#06b6d4",
    themeClass: styles.cardTheme1,
    icon: <AutomationSymbol />,
  },
  {
    id: "rendimiento-conversion",
    titleFull: "Rendimiento & Conversión",
    titleLine1: "Rendimiento &",
    titleLine2: "Conversión",
    desc: "Convertí más.",
    accentColor: "#38bdf8",
    themeClass: styles.cardTheme2,
    icon: <PerformanceSymbol />,
  },
  {
    id: "seguridad-zero-trust",
    titleFull: "Seguridad Zero-Trust",
    titleLine1: "Seguridad",
    titleLine2: "Zero-Trust",
    desc: "Sin concesiones.",
    accentColor: "#60a5fa",
    themeClass: styles.cardTheme3,
    icon: <SecuritySymbol />,
  },
  {
    id: "codigo-propio",
    titleFull: "Código 100% Propio",
    titleLine1: "Código 100%",
    titleLine2: "Propio",
    desc: "A tu medida.",
    accentColor: "#c084fc",
    themeClass: styles.cardTheme4,
    icon: <CodeSymbol />,
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenInquiry }) => {
  const trackRef = useRef<HTMLElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_PILLARS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Scroll-Driven Z-Axis Camera Dive (0 = Clean Entrance, 1 = Deep Core Immersion)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
  });

  // 1. Clean Foreground Hero at scroll=0 -> Depth-of-field blur & 3D recession as you scroll (0 -> 0.42)
  const fgScale = useTransform(smoothScroll, [0, 0.42], [1, 1.38]);
  const fgOpacity = useTransform(smoothScroll, [0, 0.26, 0.4], [1, 0.85, 0]);
  const fgY = useTransform(smoothScroll, [0, 0.42], [0, -35]);
  const fgRotateX = useTransform(smoothScroll, [0, 0.42], [0, 9]);
  const fgBlur = useTransform(
    smoothScroll,
    [0, 0.18, 0.4],
    ["blur(0px)", "blur(2px)", "blur(7px)"]
  );
  const fgPointerEvents = useTransform(smoothScroll, (v) =>
    v > 0.36 ? "none" : "auto"
  );

  // 2. Holographic Tunnel Ring: Subtle at rest, then rushes outward on Z-axis during scroll
  const ring1Scale = useTransform(smoothScroll, [0, 0.75], [0.98, 2.1]);
  const ring1Opacity = useTransform(
    smoothScroll,
    [0, 0.15, 0.5, 0.75],
    [0.14, 0.45, 0.3, 0]
  );

  // 3. Editorial Architecture Services Stage: emerges cleanly as foreground Hero clears (0.28 -> 1.0)
  const servicesScale = useTransform(smoothScroll, [0.28, 0.65, 1], [0.96, 1, 1]);
  const servicesOpacity = useTransform(smoothScroll, [0.28, 0.52, 1], [0, 1, 1]);
  const servicesRotateX = useTransform(smoothScroll, [0.28, 0.65], [10, 0]);
  const servicesPointerEvents = useTransform(smoothScroll, (v) =>
    v > 0.32 ? "auto" : "none"
  );

  // Corridor floor perspective rush
  const gridShiftY = useTransform(smoothScroll, [0, 1], ["0%", "35%"]);

  // 3D Mouse Look-Around Camera Frustum
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const camRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 180,
    damping: 25,
  });
  const camRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 180,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Staggered cinematic entrance animation triggers when user scrolls into the section
  const [servicesInView, setServicesInView] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (smoothScroll.get() > 0.28) {
      setServicesInView(true);
    }
    const unsub = smoothScroll.on("change", (v) => {
      if (v > 0.28 && !servicesInView) {
        setServicesInView(true);
      } else if (v < 0.12 && servicesInView) {
        setServicesInView(false);
      }
    });
    return () => unsub();
  }, [smoothScroll, servicesInView]);

  const titleMotionProps = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    animate: servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] as const },
  };

  const getCardMotionProps = (idx: number) => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 1, y: 0, scale: 1 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0 },
      };
    }
    return {
      initial: { opacity: 0, y: 45, scale: 0.97 },
      animate: servicesInView
        ? { opacity: 1, y: 0, scale: 1 }
        : { opacity: 0, y: 45, scale: 0.97 },
      transition: {
        duration: 1.15,
        delay: 0.16 + idx * 0.16,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    };
  };

  return (
    <section
      ref={trackRef}
      className={styles.heroScrollTrack}
      aria-labelledby="hero-title"
    >
      <div
        className={styles.stickyViewport}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Real-Time Three.js WebGL 3D Core & Z-Corridor (Original Background Preserved) */}
        <VanguardScene3D
          scrollProgress={smoothScroll}
          mouseX={mouseX}
          mouseY={mouseY}
        />

        <motion.div
          className={styles.world3D}
          style={{
            rotateX: camRotateX,
            rotateY: camRotateY,
          }}
        >
          {/* Subtle X/Z Holographic Perspective Floor */}
          <motion.div
            className={styles.corridorFloor}
            style={{ y: gridShiftY }}
            aria-hidden="true"
          />

          {/* Single Subtle Z-Depth Portal Frame */}
          <motion.div
            className={styles.portalFrame}
            style={{ scale: ring1Scale, opacity: ring1Opacity }}
            aria-hidden="true"
          />

          {/* LAYER 1: Clean, Proportionally Fitted Foreground Hero (Preserved Intact) */}
          <motion.div
            className={styles.foregroundLayer}
            style={{
              scale: fgScale,
              opacity: fgOpacity,
              y: fgY,
              rotateX: fgRotateX,
              filter: fgBlur,
              pointerEvents: fgPointerEvents,
            }}
          >
            <h1 id="hero-title" className={styles.mainHeadline}>
              Software de Vanguardia, Automatización y{" "}
              <span className={styles.kineticWordWrapper}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.kineticGradientWord}
                  >
                    {ROTATING_PILLARS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className={styles.subHeadline}>
              Desarrollamos plataformas de alta velocidad y extensiones
              corporativas que eliminan el trabajo manual y aceleran tu negocio.
            </p>
          </motion.div>

          {/* LAYER 2: Editorial Architectural Services (Redesigned & Minimalist) */}
          <motion.div
            id="servicios-arquitectura"
            className={styles.servicesStage}
            style={{
              scale: servicesScale,
              opacity: servicesOpacity,
              rotateX: servicesRotateX,
              pointerEvents: servicesPointerEvents,
            }}
          >
            {/* Section Title */}
            <motion.h2
              className={styles.servicesTitle}
              {...titleMotionProps}
            >
              Arquitectura inteligente <br />
              para un futuro{" "}
              <span className={styles.gradientSinLimites}>sin límites.</span>
            </motion.h2>

            {/* The 4 Architectural Cards Grid */}
            <div className={styles.cardsGrid}>
              {SERVICES_DATA.map((service, idx) => (
                <motion.div
                  key={service.id}
                  className={styles.cardSlot}
                  {...getCardMotionProps(idx)}
                >
                  <div
                    className={`${styles.archCard} ${service.themeClass}`}
                    onClick={() => onOpenInquiry(service.titleFull)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onOpenInquiry(service.titleFull);
                      }
                    }}
                    aria-label={`Servicio: ${service.titleFull}. ${service.desc}`}
                  >
                    {/* SVG Frame with Top-Left Chamfer and Bottom-Right Glowing Corner */}
                    <svg
                      className={styles.cardFrameSvg}
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M 14 0 L 100 0 L 100 86 L 86 100 L 0 100 L 0 14 Z"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.08)"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                        className={styles.frameBasePath}
                      />
                      <path
                        d="M 100 76 L 100 86 L 86 100 L 76 100"
                        fill="none"
                        stroke={service.accentColor}
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                        className={styles.frameAccentPath}
                      />
                    </svg>

                    {/* Top: Símbolo Geométrico Minimalista */}
                    <div className={styles.cardSymbolRow}>
                      {service.icon}
                    </div>

                    {/* Middle: Title & Exact Short Copy */}
                    <div className={styles.cardInfo}>
                      <h3 className={styles.cardHeading}>
                        <span>{service.titleLine1}</span>
                        <br />
                        <span>{service.titleLine2}</span>
                      </h3>
                      <p className={styles.cardDesc}>{service.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Clean Vertical Descent Scroll Cue */}
        <motion.div
          className={styles.diveIndicator}
          style={{ opacity: fgOpacity }}
          aria-hidden="true"
        >
          <span className={styles.cueLine} />
        </motion.div>
      </div>
    </section>
  );
};
