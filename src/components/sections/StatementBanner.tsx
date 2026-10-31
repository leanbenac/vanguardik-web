"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import styles from "./StatementBanner.module.css";

export const StatementBanner: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
  });

  // Scroll-linked Depth-of-Field un-blur & vertical rise per line (like re-the-drive.webflow.io)
  const line1Blur = useTransform(
    smoothScroll,
    [0.08, 0.34, 0.72, 0.92],
    ["blur(11px)", "blur(0px)", "blur(0px)", "blur(7px)"]
  );
  const line1Y = useTransform(smoothScroll, [0.08, 0.36], [36, 0]);
  const line1Opacity = useTransform(
    smoothScroll,
    [0.05, 0.3, 0.75, 0.95],
    [0.12, 1, 1, 0.15]
  );

  const line2Blur = useTransform(
    smoothScroll,
    [0.14, 0.4, 0.72, 0.92],
    ["blur(11px)", "blur(0px)", "blur(0px)", "blur(7px)"]
  );
  const line2Y = useTransform(smoothScroll, [0.14, 0.42], [44, 0]);
  const line2Opacity = useTransform(
    smoothScroll,
    [0.1, 0.36, 0.75, 0.95],
    [0.12, 1, 1, 0.15]
  );

  const line3Blur = useTransform(
    smoothScroll,
    [0.2, 0.46, 0.74, 0.94],
    ["blur(11px)", "blur(0px)", "blur(0px)", "blur(7px)"]
  );
  const line3Y = useTransform(smoothScroll, [0.2, 0.48], [52, 0]);
  const line3Opacity = useTransform(
    smoothScroll,
    [0.16, 0.42, 0.76, 0.95],
    [0.12, 1, 1, 0.15]
  );

  const line4Blur = useTransform(
    smoothScroll,
    [0.26, 0.52, 0.76, 0.95],
    ["blur(12px)", "blur(0px)", "blur(0px)", "blur(8px)"]
  );
  const line4Y = useTransform(smoothScroll, [0.26, 0.54], [60, 0]);
  const line4Opacity = useTransform(
    smoothScroll,
    [0.22, 0.48, 0.78, 0.96],
    [0.1, 1, 1, 0.15]
  );

  const flareScale = useTransform(smoothScroll, [0.15, 0.5, 0.85], [0.75, 1.15, 0.9]);
  const flareOpacity = useTransform(smoothScroll, [0.1, 0.48, 0.88], [0.2, 0.85, 0.25]);

  // Ambient Ash / Telemetry Spores Canvas (matches statement__ash in Resident Evil DOM)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let isVisible = true;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.clientWidth * Math.min(window.devicePixelRatio, 1.5);
      canvas.height = canvas.clientHeight * Math.min(window.devicePixelRatio, 1.5);
    };
    resize();

    const particles = Array.from({ length: 48 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.35) * 0.45,
      vy: -0.25 - Math.random() * 0.55,
      r: 0.8 + Math.random() * 1.8,
      alpha: 0.15 + Math.random() * 0.5,
      hue: Math.random() > 0.45 ? "6, 182, 212" : "99, 102, 241",
    }));

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);

    const render = () => {
      animationId = requestAnimationFrame(render);
      if (!isVisible) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue}, ${p.alpha})`;
        ctx.fill();
      }
    };
    render();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.statement}
      aria-label="Manifiesto de impacto operativo Vanguardik"
    >
      {/* Floating Telemetry Ash / Spores Canvas */}
      <canvas
        ref={canvasRef}
        className={styles.statementAsh}
        aria-hidden="true"
      />

      {/* Atmospheric Radial Flare Wash */}
      <motion.div
        className={styles.statementFlare}
        style={{ scale: flareScale, opacity: flareOpacity }}
        aria-hidden="true"
      />

      <div className={styles.statementInner}>
        <p className={styles.statementText}>
          <motion.span
            className={styles.statementLine}
            style={{
              filter: line1Blur,
              y: line1Y,
              opacity: line1Opacity,
            }}
          >
            NINGÚN
          </motion.span>
          <motion.span
            className={styles.statementLine}
            style={{
              filter: line2Blur,
              y: line2Y,
              opacity: line2Opacity,
            }}
          >
            CUELLO DE BOTELLA
          </motion.span>
          <motion.span
            className={styles.statementLine}
            style={{
              filter: line3Blur,
              y: line3Y,
              opacity: line3Opacity,
            }}
          >
            SOBREVIVE A
          </motion.span>
          <motion.span
            className={`${styles.statementLine} ${styles.statementLineAccent}`}
            style={{
              filter: line4Blur,
              y: line4Y,
              opacity: line4Opacity,
            }}
          >
            VANGUARDIK
          </motion.span>
        </p>
      </div>
    </section>
  );
};

