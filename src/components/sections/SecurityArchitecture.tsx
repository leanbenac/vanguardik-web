"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  Lock,
  FileCheck2,
  EyeOff,
  Cpu,
  Globe2,
} from "lucide-react";
import { SecurityVault3D } from "@/components/effects/SecurityVault3D";
import styles from "./SecurityArchitecture.module.css";

const securityFeatures = [
  {
    icon: <Lock size={15} />,
    title: "Cabeceras HTTP & CSP",
    desc: "Zero-Sink, HSTS y bloqueo XSS",
  },
  {
    icon: <FileCheck2 size={15} />,
    title: "Validación Zero-Trust",
    desc: "Esquemas Zod en cada endpoint",
  },
  {
    icon: <EyeOff size={15} />,
    title: "Honeypot Anti-Bot",
    desc: "Filtro invisible sin CAPTCHAs",
  },
  {
    icon: <ShieldAlert size={15} />,
    title: "Rate Limit por IP",
    desc: "Defensa anti-DDoS en tiempo real",
  },
  {
    icon: <Cpu size={15} />,
    title: "Tokens Volátiles",
    desc: "Secretos aislados en memoria",
  },
  {
    icon: <Globe2 size={15} />,
    title: "Aislamiento & Edge",
    desc: "Manifest V3 y CDN serverless",
  },
];

export const SecurityArchitecture: React.FC = () => {
  const [mousePos, setMousePos] = useState<
    Record<number, { x: number; y: number }>
  >({});

  const handleMouseMove = (
    idx: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos((prev) => ({
      ...prev,
      [idx]: { x: e.clientX - rect.left, y: e.clientY - rect.top },
    }));
  };

  return (
    <section
      id="seguridad"
      className={styles.section}
      aria-labelledby="security-title"
    >
      <div className="container">
        <motion.div
          className={styles.cardWrapper}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {/* Subtle Ambient 3D WebGL Cryptographic Vault Background */}
          <SecurityVault3D />

          <div className={styles.headerRow}>
            <div className={styles.headerText}>
              <h2 id="security-title" className={styles.title}>
                Blindaje Integral para Tu Plataforma
              </h2>
              <p className={styles.desc}>
                Arquitectura de protección en profundidad activa en cada extensión
                corporativa, flujo de datos y endpoint desde el día cero.
              </p>
            </div>
          </div>

          <div className={styles.securityGrid}>
            {securityFeatures.map((item, idx) => {
              const pos = mousePos[idx] || { x: 120, y: 30 };
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  whileHover={{ y: -2 }}
                  onMouseMove={(e) => handleMouseMove(idx, e)}
                  className={styles.featureTile}
                >
                  <div
                    className={styles.tileGlow}
                    style={{
                      background: `radial-gradient(180px circle at ${pos.x}px ${pos.y}px, rgba(16, 185, 129, 0.15), transparent 70%)`,
                    }}
                  />
                  <div className={styles.tileIcon}>{item.icon}</div>
                  <div className={styles.tileText}>
                    <span className={styles.tileTitle}>{item.title}</span>
                    <span className={styles.tileDesc}>{item.desc}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
