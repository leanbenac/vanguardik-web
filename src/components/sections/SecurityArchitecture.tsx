"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ShieldAlert,
  Lock,
  FileCheck2,
  EyeOff,
  Cpu,
  Globe2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { SecurityVault3D } from "@/components/effects/SecurityVault3D";
import styles from "./SecurityArchitecture.module.css";

export const SecurityArchitecture: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [hudText, setHudText] = useState<string>("Capa 01 · Perímetro Activo");

  // Track scroll travel across the 220vh track
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  // Animated SVG laser conduit connecting Node 1 -> Node 2 -> Node 3
  const laserPathLength = useTransform(smoothProgress, [0.08, 0.82], [0, 1]);

  // Sequential node opacity and subtle slide-in lifts
  const node1Opacity = useTransform(smoothProgress, [0, 0.22], [0.65, 1]);
  const node1Y = useTransform(smoothProgress, [0, 0.22], [8, 0]);

  const node2Opacity = useTransform(smoothProgress, [0.22, 0.52], [0.45, 1]);
  const node2Y = useTransform(smoothProgress, [0.22, 0.52], [8, 0]);

  const node3Opacity = useTransform(smoothProgress, [0.55, 0.85], [0.45, 1]);
  const node3Y = useTransform(smoothProgress, [0.55, 0.85], [8, 0]);

  useEffect(() => {
    const unsub = smoothProgress.on("change", (v) => {
      if (v < 0.36) {
        setActiveStep(1);
        setHudText("Capa 01 · Perímetro Conectado");
      } else if (v < 0.72) {
        setActiveStep(2);
        setHudText("Capa 02 · Zero-Trust Verificado");
      } else {
        setActiveStep(3);
        setHudText("Capa 03 · Núcleo Sellado (100%)");
      }
    });
    return () => unsub();
  }, [smoothProgress]);

  return (
    <section
      ref={sectionRef}
      id="seguridad"
      className={styles.securityScrollTrack}
      aria-labelledby="security-title"
    >
      <div className={styles.securityPin}>
        {/* Fullscreen Three.js WebGL Security Vault Assembly */}
        <SecurityVault3D scrollProgress={smoothProgress} />

        {/* Ambient Darkened Scrim */}
        <div className={styles.securityScrim} aria-hidden="true" />

        <div className={styles.securityContainer}>
          {/* Left Column: Authoritative Editorial Manifesto */}
          <div className={styles.editorialCol}>
            <h2 id="security-title" className={styles.title}>
              Blindaje Integral para{" "}
              <span className="gradient-text">Tu Plataforma.</span>
            </h2>

            <p className={styles.desc}>
              Arquitectura de protección en profundidad activa en cada extensión
              corporativa, flujo de datos y endpoint desde el día cero.
            </p>

            {/* Live Telemetry Metric Strip */}
            <div className={styles.telemetryStrip} aria-hidden="true">
              <div className={styles.telemetryItem}>
                <span className={styles.telemetryVal}>100%</span>
                <span className={styles.telemetryLbl}>Zero-Trust</span>
              </div>
              <div className={styles.telemetryDivider} />
              <div className={styles.telemetryItem}>
                <span className={styles.telemetryVal}>0 ms</span>
                <span className={styles.telemetryLbl}>Latencia Extra</span>
              </div>
              <div className={styles.telemetryDivider} />
              <div className={styles.telemetryItem}>
                <span className={styles.telemetryVal}>Zero Sink</span>
                <span className={styles.telemetryLbl}>Auditoría MV3</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek & Compact Connected Defense Pipeline */}
          <div className={styles.pipelineCol}>
            <div className={styles.pipelineWrapper}>
              {/* Dynamic SVG Connecting Laser Conduit */}
              <svg
                className={styles.conduitSvg}
                viewBox="0 0 20 220"
                fill="none"
                aria-hidden="true"
              >
                {/* Background dashed conduit bus */}
                <line
                  x1="10"
                  y1="20"
                  x2="10"
                  y2="200"
                  stroke="rgba(6, 182, 212, 0.16)"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
                {/* Active connecting laser beam drawn with scroll */}
                <motion.line
                  x1="10"
                  y1="20"
                  x2="10"
                  y2="200"
                  stroke="url(#defenseLaserGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ pathLength: laserPathLength }}
                />
                <defs>
                  <linearGradient
                    id="defenseLaserGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* NODE 01: Perímetro & Red */}
              <motion.div
                className={`${styles.pipelineCard} ${
                  activeStep >= 1 ? styles.cardActive : ""
                }`}
                style={{ opacity: node1Opacity, y: node1Y }}
              >
                <div className={styles.cardBeacon}>
                  <span className={styles.beaconNumber}>01</span>
                  <div className={styles.beaconPing} />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Perímetro &amp; Red</h3>
                    <span className={styles.cardStatusBadge}>
                      {activeStep >= 1 ? "Capa 01 Conectada" : "En Espera"}
                    </span>
                  </div>
                  <div className={styles.compactTags}>
                    <span className={styles.compactTag}>
                      <Lock size={12} className={styles.tagIcon} />
                      Cabeceras HTTP &amp; CSP
                    </span>
                    <span className={styles.compactTag}>
                      <ShieldAlert size={12} className={styles.tagIcon} />
                      Rate Limit por IP
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* NODE 02: Lógica Zero-Trust */}
              <motion.div
                className={`${styles.pipelineCard} ${
                  activeStep >= 2 ? styles.cardActive : ""
                }`}
                style={{ opacity: node2Opacity, y: node2Y }}
              >
                <div className={styles.cardBeacon}>
                  <span className={styles.beaconNumber}>02</span>
                  <div className={styles.beaconPing} />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Validación Zero-Trust</h3>
                    <span className={styles.cardStatusBadge}>
                      {activeStep >= 2 ? "Capa 02 Sincronizada" : "En Espera"}
                    </span>
                  </div>
                  <div className={styles.compactTags}>
                    <span className={styles.compactTag}>
                      <FileCheck2 size={12} className={styles.tagIcon} />
                      Validación Zod
                    </span>
                    <span className={styles.compactTag}>
                      <EyeOff size={12} className={styles.tagIcon} />
                      Honeypot Anti-Bot
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* NODE 03: Aislamiento & Runtime */}
              <motion.div
                className={`${styles.pipelineCard} ${
                  activeStep >= 3 ? styles.cardActive : ""
                }`}
                style={{ opacity: node3Opacity, y: node3Y }}
              >
                <div className={styles.cardBeacon}>
                  <span className={styles.beaconNumber}>03</span>
                  <div className={styles.beaconPing} />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Aislamiento &amp; Runtime</h3>
                    <span className={styles.cardStatusBadge}>
                      {activeStep >= 3 ? "Capa 03 Blindada" : "En Espera"}
                    </span>
                  </div>
                  <div className={styles.compactTags}>
                    <span className={styles.compactTag}>
                      <Cpu size={12} className={styles.tagIcon} />
                      Tokens Volátiles
                    </span>
                    <span className={styles.compactTag}>
                      <Globe2 size={12} className={styles.tagIcon} />
                      Aislamiento &amp; Edge MV3
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Integrated Compact Telemetry Pill (Directly beneath node 03, zero 3D obstruction) */}
              <div className={styles.inlineHud} aria-hidden="true">
                <ShieldCheck size={14} className={styles.hudShieldIcon} />
                <span className={styles.hudLabel}>Estado del Escudo:</span>
                <strong className={styles.hudValue}>{hudText}</strong>
                {activeStep === 3 && (
                  <CheckCircle2 size={13} className={styles.hudCheckIcon} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
