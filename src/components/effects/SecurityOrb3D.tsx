"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./SecurityOrb3D.module.css";

export const SecurityOrb3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 84;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 20);
    camera.position.set(0, 0, 4.4);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setSize(size, size);
    renderer.setPixelRatio(dpr);

    const group = new THREE.Group();
    scene.add(group);

    // Outer Emerald Forcefield Geodesic Dome
    const domeGeo = new THREE.IcosahedronGeometry(1.3, 1);
    const domeEdges = new THREE.EdgesGeometry(domeGeo);
    const domeMat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.65,
    });
    const domeWire = new THREE.LineSegments(domeEdges, domeMat);
    group.add(domeWire);

    // Inner Locked Vault Core
    const coreGeo = new THREE.OctahedronGeometry(0.72, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Perimeter Scanner Ring
    const ringGeo = new THREE.TorusGeometry(1.62, 0.028, 12, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.55,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.6;
    group.add(ringMesh);

    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let animId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) {
        lastTime = now;
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      domeWire.rotation.y += dt * 0.5;
      domeWire.rotation.x += dt * 0.22;

      coreMesh.rotation.y -= dt * 0.85;
      coreMesh.rotation.z += dt * 0.4;

      ringMesh.rotation.z -= dt * 0.65;
      ringMesh.rotation.y = Math.sin(now * 0.0015) * 0.35;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      domeGeo.dispose();
      domeEdges.dispose();
      domeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={styles.orbWidget}>
      <div ref={containerRef} className={styles.canvasBox} aria-hidden="true">
        <canvas ref={canvasRef} className={styles.orbCanvas} />
      </div>
      <div className={styles.telemetryCol}>
        <span className={styles.telemetryCode}>ZERO_TRUST // 3D VAULT</span>
        <span className={styles.telemetryTitle}>Estándar OWASP ASVS</span>
        <span className={styles.telemetryStatus}>
          <span className={styles.statusDot} />
          <span>Zero-Sink & CSP Activo</span>
        </span>
      </div>
    </div>
  );
};

