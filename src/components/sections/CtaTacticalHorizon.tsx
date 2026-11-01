"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { ArrowRight } from "lucide-react";
import styles from "./CtaTacticalHorizon.module.css";

interface CtaTacticalHorizonProps {
  onOpenInquiry: () => void;
}

/**
 * Clean & High-Impact CTA Section (Natural Scroll & Ambient 3D Depth).
 * Keeps the bold typography, direct action button, and 3-stage strategic milestones
 * with an atmospheric 3D background that does NOT hijack or lock the user's scroll.
 */
export const CtaTacticalHorizon: React.FC<CtaTacticalHorizonProps> = ({
  onOpenInquiry,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5);

    // 1. Scene & Atmosphere Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06070a, 0.05);

    const width = section.clientWidth || window.innerWidth;
    const height = section.clientHeight || 520;

    const camera = new THREE.PerspectiveCamera(
      45,
      width / Math.max(height, 1),
      0.1,
      60
    );
    camera.position.set(0, 2.8, 8.2);
    camera.lookAt(0, -0.2, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !isMobile,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);

    const worldGroup = new THREE.Group();
    worldGroup.position.set(isMobile ? 0 : 2.4, 0.1, 0);
    worldGroup.rotation.x = 0.36;
    scene.add(worldGroup);

    // --- 2. 3D Wireframe Cybernetic Funnel ---
    const coneRadiusTop = 3.4;
    const coneRadiusBottom = 0.6;
    const coneHeight = 3.6;
    const funnelGeo = new THREE.CylinderGeometry(
      coneRadiusTop,
      coneRadiusBottom,
      coneHeight,
      isMobile ? 18 : 28,
      isMobile ? 6 : 10,
      true
    );
    const funnelEdges = new THREE.EdgesGeometry(funnelGeo);
    const funnelMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.25,
    });
    const funnelWire = new THREE.LineSegments(funnelEdges, funnelMat);
    worldGroup.add(funnelWire);

    // --- 3. Concentric Suspended Stage Rings ---
    const ringGeos: THREE.TorusGeometry[] = [];
    const ringMats: THREE.MeshBasicMaterial[] = [];
    const ringMeshes: THREE.Mesh[] = [];

    const ringsConfig = [
      { r: 3.45, y: 1.7, tube: 0.024, color: 0x6366f1, opacity: 0.75 },
      { r: 2.2, y: 0.25, tube: 0.022, color: 0x06b6d4, opacity: 0.8 },
      { r: 1.05, y: -1.2, tube: 0.018, color: 0x10b981, opacity: 0.88 },
      { r: 0.62, y: -1.8, tube: 0.016, color: 0x34d399, opacity: 0.95 },
    ];

    ringsConfig.forEach((cfg) => {
      const geo = new THREE.TorusGeometry(cfg.r, cfg.tube, 8, 44);
      ringGeos.push(geo);
      const mat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
      });
      ringMats.push(mat);

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = cfg.y;
      mesh.rotation.x = Math.PI / 2;
      worldGroup.add(mesh);
      ringMeshes.push(mesh);
    });

    // --- 4. Focal Core Octahedron ---
    const coreGeo = new THREE.OctahedronGeometry(0.38, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = -1.95;
    worldGroup.add(coreMesh);

    // --- 5. Flowing Inward Vortex Particles ---
    const particleCount = isMobile ? 30 : 48;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleAngles = new Float32Array(particleCount);
    const particleY = new Float32Array(particleCount);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particleAngles[i] = Math.random() * Math.PI * 2;
      particleY[i] = 1.7 - Math.random() * 3.5;
      particleSpeeds[i] = 0.4 + Math.random() * 0.5;

      const p = (1.7 - particleY[i]) / 3.5;
      const r = THREE.MathUtils.lerp(coneRadiusTop, coneRadiusBottom, Math.max(0, Math.min(1, p)));
      particlePositions[i * 3] = Math.cos(particleAngles[i]) * r;
      particlePositions[i * 3 + 1] = particleY[i];
      particlePositions[i * 3 + 2] = Math.sin(particleAngles[i]) * r;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: isMobile ? 0.05 : 0.065,
      transparent: true,
      opacity: 0.55,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particles);

    // 6. Interactive Mouse Parallax
    let targetRotY = 0;
    let targetRotX = 0.36;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      targetRotY = nx * 0.22;
      targetRotX = 0.36 + ny * 0.12;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 7. Visibility Observer (Zero CPU when off-screen)
    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(section);

    const handleResize = () => {
      if (!section) return;
      const w = section.clientWidth || window.innerWidth;
      const h = section.clientHeight || 520;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // 8. Animation Loop
    let animId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smooth parallax & gentle rotation
      worldGroup.rotation.y += (targetRotY - worldGroup.rotation.y) * 0.04 + dt * 0.12;
      worldGroup.rotation.x += (targetRotX - worldGroup.rotation.x) * 0.04;

      // Rotate individual rings
      ringMeshes.forEach((mesh, idx) => {
        mesh.rotation.z += (idx % 2 === 0 ? 1 : -1) * dt * (0.32 + idx * 0.08);
      });

      // Core rotation
      coreMesh.rotation.y -= dt * 1.5;
      coreMesh.rotation.z += dt * 0.8;

      // Particle inward flow
      const pArr = (particleGeo.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        particleAngles[i] += dt * (1.2 + 1.6 / Math.max(1, 1.7 - particleY[i]));
        particleY[i] -= dt * particleSpeeds[i];

        if (particleY[i] < -1.8) {
          particleY[i] = 1.7;
        }

        const p = Math.max(0, Math.min(1, (1.7 - particleY[i]) / 3.5));
        const r = THREE.MathUtils.lerp(coneRadiusTop, coneRadiusBottom, p);

        pArr[i * 3] = Math.cos(particleAngles[i]) * r;
        pArr[i * 3 + 1] = particleY[i];
        pArr[i * 3 + 2] = Math.sin(particleAngles[i]) * r;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      funnelGeo.dispose();
      funnelEdges.dispose();
      funnelMat.dispose();

      ringGeos.forEach((g) => g.dispose());
      ringMats.forEach((m) => m.dispose());

      coreGeo.dispose();
      coreMat.dispose();

      particleGeo.dispose();
      particleMat.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className={styles.ctaSection}
      aria-labelledby="cta-tactical-title"
    >
      {/* Background 3D Cybernetic Ambient Canvas */}
      <canvas ref={canvasRef} className={styles.ctaCanvas} aria-hidden="true" />
      <div className={styles.ctaScrim} aria-hidden="true" />

      <div className={styles.ctaContainer}>
        {/* Centered Editorial Copy Block */}
        <div className={styles.ctaCopy}>
          <h2 id="cta-tactical-title" className={styles.ctaTitle}>
            Construyamos la ventaja técnica de{" "}
            <span className="gradient-text">tu empresa.</span>
          </h2>

          <p className={styles.ctaDesc}>
            Conversá directamente con nuestro equipo de ingeniería. Analizamos
            tus cuellos de botella y definimos la arquitectura ideal para tu equipo.
          </p>

          <div className={styles.ctaActionRow}>
            <button
              onClick={onOpenInquiry}
              className={styles.ctaPrimaryBtn}
              id="cta-tactical-inquiry-btn"
            >
              <span>Agendar Diagnóstico Técnico</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
