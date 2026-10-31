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
  ShoppingBag,
  ArrowRight,
  Puzzle,
  Cpu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { caseStudiesCatalog } from "@/config/portfolio";
import styles from "./CaseStudyShowcase.module.css";

interface CaseStudyShowcaseProps {
  onSelectCase: (caseTitle: string) => void;
}

const SHORT_LABELS: Record<string, string> = {
  "enterprise-360-asset-engine": "Suite 360°",
  "enterprise-content-tool-12-modules": "Content Tool (QA)",
  "pm-paths-manager-jira-validator": "Paths Manager",
  "ecommerce-custom-tiendanube": "E-Commerce CRO",
};

export const CaseStudyShowcase: React.FC<CaseStudyShowcaseProps> = ({
  onSelectCase,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

  const total = caseStudiesCatalog.length;
  const study = caseStudiesCatalog[activeIndex] || caseStudiesCatalog[0];

  // Subtle 3D Card Tilt on Mouse Move
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [2.2, -2.2]), {
    stiffness: 220,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-2.8, 2.8]), {
    stiffness: 220,
    damping: 28,
  });

  const handleGoTo = (nextIdx: number) => {
    setDirection(nextIdx > activeIndex ? 1 : -1);
    setActiveIndex(nextIdx);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    tiltX.set(x / rect.width - 0.5);
    tiltY.set(y / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const renderPlatformIcon = (category: string, color: string) => {
    if (category === "Extensiones & Herramientas") {
      return <Puzzle size={13} color={color} />;
    }
    if (category === "SaaS & Web App") {
      return <Cpu size={13} color={color} />;
    }
    return <ShoppingBag size={13} color={color} />;
  };

  return (
    <section
      id="casos"
      className={styles.section}
      aria-labelledby="cases-title"
    >
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="cases-title" className={styles.title}>
            Casos de Estudio
          </h2>
          <p className={styles.desc}>
            Software corporativo y arquitecturas en producción diseñadas para
            eliminar fricción operativa y multiplicar la conversión.
          </p>
        </motion.div>

        {/* Clean Top Navigation Bar */}
        <div className={styles.carouselControlsBar}>
          <div
            className={styles.slideTabs}
            role="tablist"
            aria-label="Seleccionar caso de estudio"
          >
            {caseStudiesCatalog.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleGoTo(idx)}
                  className={`${styles.slideTabBtn} ${
                    isActive ? styles.slideTabActive : ""
                  }`}
                  style={
                    isActive
                      ? {
                          borderColor: `${item.accentColor}70`,
                          color: "#ffffff",
                        }
                      : {}
                  }
                >
                  {isActive && (
                    <motion.span
                      layoutId="caseStudyActiveTabPill"
                      className={styles.slideTabPill}
                      style={{
                        background: `linear-gradient(135deg, ${item.accentColor}25, rgba(6, 182, 212, 0.12))`,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className={styles.slideTabLabel}>
                    <span className={styles.slideTabIndex}>0{idx + 1}.</span>
                    <span>{SHORT_LABELS[item.id] || item.category}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className={styles.arrowGroup}>
            <span className={styles.counterLabel}>
              0{activeIndex + 1} / 0{total}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              className={styles.arrowBtn}
              aria-label="Caso anterior"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className={styles.arrowBtn}
              aria-label="Siguiente caso"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        {/* Clean, Focused Case Card Stage */}
        <div className={styles.carouselViewport}>
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={styles.caseCard}
            style={{
              rotateX,
              rotateY,
              borderColor: `${study.accentColor}30`,
              boxShadow: `0 24px 60px rgba(0, 0, 0, 0.65), 0 0 45px ${study.accentColor}12`,
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={study.id}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 32 : -32,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -32 : 32,
                }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className={styles.cardContent}
              >
                {/* Header Metadata Strip */}
                <div className={styles.caseHeader}>
                  <div className={styles.badgeGroup}>
                    <span
                      className={styles.categoryBadge}
                      style={{
                        color: study.accentColor,
                        borderColor: `${study.accentColor}40`,
                        background: `${study.accentColor}10`,
                      }}
                    >
                      {study.category}
                    </span>
                  </div>

                  <div className={styles.platformPill}>
                    {renderPlatformIcon(study.category, study.accentColor)}
                    <span>{study.platform}</span>
                  </div>
                </div>

                <div className={styles.clientSub}>{study.clientName}</div>
                <h3 className={styles.caseTitle}>{study.title}</h3>
                <p className={styles.caseTagline}>{study.tagline}</p>

                {/* Metrics Stats Strip */}
                <div className={styles.metricsRow}>
                  {study.metrics.map((metric, idx) => (
                    <div key={idx} className={styles.metricItem}>
                      <div
                        className={styles.metricValue}
                        style={{ color: study.accentColor }}
                      >
                        {metric.value}
                      </div>
                      <div className={styles.metricLabel}>{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Clean Bottom Bar: Summary + Action CTA */}
                <div className={styles.caseFooter}>
                  <p className={styles.summaryText}>{study.summary}</p>

                  <button
                    onClick={() => onSelectCase(`Caso: ${study.title}`)}
                    className={styles.actionBtn}
                    style={{
                      background: `linear-gradient(135deg, ${study.accentColor}, #6366f1)`,
                      boxShadow: `0 0 24px ${study.accentColor}35`,
                    }}
                  >
                    <span>Quiero una solución similar</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
