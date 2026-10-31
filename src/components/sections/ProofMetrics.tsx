"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import styles from "./ProofMetrics.module.css";

export const ProofMetrics: React.FC = () => {
  const [mousePos, setMousePos] = useState<{ [key: number]: { x: number; y: number } }>({});

  const handleMouseMove = (idx: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos((prev) => ({
      ...prev,
      [idx]: { x: e.clientX - rect.left, y: e.clientY - rect.top },
    }));
  };

  return (
    <section
      id="metricas"
      className={styles.section}
      aria-label="Métricas y Estándares"
    >
      <div className="container">
        <div className={styles.metricsGrid}>
          {siteConfig.metrics.map((metric, idx) => {
            const pos = mousePos[idx] || { x: 100, y: 50 };
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -5 }}
                onMouseMove={(e) => handleMouseMove(idx, e)}
                className={styles.metricCard}
              >
                <div
                  className={styles.cardGlow}
                  style={{
                    background: `radial-gradient(260px circle at ${pos.x}px ${pos.y}px, rgba(6, 182, 212, 0.14), transparent 70%)`,
                  }}
                />
                <div className={styles.metricContent}>
                  <div className={styles.metricValue}>{metric.value}</div>
                  <div className={styles.metricLabel}>{metric.label}</div>
                  <div className={styles.metricHelper}>{metric.helper}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
