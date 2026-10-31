"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { servicesCatalog } from "@/config/services";
import { ServiceHologram3D } from "@/components/effects/ServiceHologram3D";
import styles from "./ServicesBento.module.css";

interface ServicesBentoProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({
  onSelectService,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [cursorPos, setCursorPos] = useState({ x: 300, y: 200 });
  const currentService = servicesCatalog[activeTab] || servicesCatalog[0];

  // 3D Perspective Tilt Physics
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [3.5, -3.5]), {
    stiffness: 200,
    damping: 26,
  });
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-4.5, 4.5]), {
    stiffness: 200,
    damping: 26,
  });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
    tiltX.set(x / rect.width - 0.5);
    tiltY.set(y / rect.height - 0.5);
  };

  const handleCardMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section
      id="servicios"
      className={styles.section}
      aria-labelledby="services-title"
    >
      <div className="container">
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <h2 id="services-title" className={styles.sectionTitle}>
            Capacidades de Alto Impacto
          </h2>
        </motion.div>

        {/* Minimalist Interactive Pillar Selector with Liquid Sliding Indicator */}
        <div
          className={styles.tabsNav}
          role="tablist"
          aria-label="Selector de servicios"
        >
          {servicesCatalog.map((service, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={service.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveTab(idx);
                }}
                className={`${styles.tabBtn} ${
                  isActive ? styles.tabBtnActive : ""
                }`}
                style={
                  isActive
                    ? {
                        borderColor: service.accentColor,
                        boxShadow: `0 0 28px ${service.accentColor}40`,
                      }
                    : {}
                }
              >
                {isActive && (
                  <motion.span
                    layoutId="serviceTabActiveBg"
                    className={styles.tabActivePill}
                    style={{
                      background: `linear-gradient(135deg, ${service.accentColor}30, rgba(6, 182, 212, 0.16))`,
                    }}
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                )}
                <span className={styles.tabContent}>
                  <span className={styles.tabNumber}>0{idx + 1}.</span>
                  <span>{service.category}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic 3D Perspective Spotlight Stage with Cursor Glow & AnimatePresence */}
        <div className={styles.perspectiveViewport}>
          <motion.div
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            initial={{ opacity: 0, y: 36, rotateX: 9, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className={styles.spotlightCard}
            style={{
              rotateX,
              rotateY,
              boxShadow: `0 24px 70px rgba(0, 0, 0, 0.65), 0 0 50px ${currentService.accentColor}14`,
            }}
          >
          <div
            className={styles.spotlightCursorGlow}
            style={{
              background: `radial-gradient(500px circle at ${cursorPos.x}px ${cursorPos.y}px, ${currentService.accentColor}18, transparent 70%)`,
            }}
          />

          <div className={styles.spotlightGrid}>
            {/* Left Side: 2D Editorial Information & Value Props */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className={styles.spotlightInfo}
              >
                <div className={styles.badgeRow}>
                  <span
                    className={styles.categoryTag}
                    style={{ color: currentService.accentColor }}
                  >
                    {currentService.category}
                  </span>
                </div>

                <h3 className={styles.serviceTitle}>{currentService.title}</h3>

                <ul className={styles.deliverablesList}>
                  {currentService.deliverables.slice(0, 3).map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.05 }}
                      className={styles.deliverableItem}
                    >
                      <CheckCircle2
                        size={17}
                        className={styles.checkIcon}
                        style={{ color: currentService.accentColor }}
                      />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className={styles.actionRow}>
                  <button
                    onClick={() => onSelectService(currentService.title)}
                    className={styles.ctaBtn}
                    style={{
                      background: `linear-gradient(135deg, ${currentService.accentColor}, #06b6d4)`,
                      boxShadow: `0 0 28px ${currentService.accentColor}45`,
                    }}
                  >
                    <span>Solicitar Propuesta Técnica</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right Side: Live Three.js 3D Morphing Hologram Stage */}
            <div className={styles.mediaSide}>
              <ServiceHologram3D
                serviceId={currentService.id}
                accentColor={currentService.accentColor}
                simRunKey={activeTab}
              />

              {/* Animated Laser Scanline sweeping vertically */}
              <div
                className={styles.laserScanline}
                style={{
                  background: `linear-gradient(90deg, transparent, ${currentService.accentColor}, #06b6d4, transparent)`,
                }}
              />

              <div className={styles.mediaOverlay}>
                <div
                  className={styles.idealForTitle}
                  style={{ color: currentService.accentColor }}
                >
                  Perfil Ideal
                </div>
                <div className={styles.idealForText}>
                  {currentService.idealFor}
                </div>
              </div>
            </div>
          </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
