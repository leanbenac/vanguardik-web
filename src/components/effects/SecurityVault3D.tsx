"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./SecurityVault3D.module.css";

/**
 * SecurityVault3D
 * Ambient, subtle 3D Cryptographic Vault & Wireframe Padlock scene
 * functioning as an atmospheric background layer for "Blindaje Integral".
 *
 * Engineered with gentle opacity and depth so that all foreground
 * security capsules remain 100% crisp, contrast-rich, and readable.
 */
export const SecurityVault3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5);

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0c12, 0.07);

    let width = container.clientWidth || 1000;
    let height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(40, width / Math.max(height, 1), 0.1, 40);
    camera.position.set(0, 0, 8.8);
    camera.lookAt(0, 0, 0);

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

    // Master Group for smooth mouse parallax
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Tracking disposables
    const disposables: (THREE.BufferGeometry | THREE.Material)[] = [];

    // --- High-Precision Architectural Cryptographic Padlock ---
    const lockGroup = new THREE.Group();
    const lockScale = isMobile ? 0.95 : 1.22;
    lockGroup.scale.set(lockScale, lockScale, lockScale);
    lockGroup.position.set(isMobile ? 0 : 3.4, isMobile ? 0 : 0.1, 0);
    masterGroup.add(lockGroup);

    // 1. Vault Body: Chamfered hexagonal prism (subtle emerald/cyan wireframe)
    const bodyGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.95, 6);
    bodyGeo.rotateY(Math.PI / 6);
    const bodyEdges = new THREE.EdgesGeometry(bodyGeo);
    disposables.push(bodyGeo, bodyEdges);

    const bodyEdgeMat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.22,
    });
    const bodyWireMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    disposables.push(bodyEdgeMat, bodyWireMat);

    const bodyWire = new THREE.LineSegments(bodyEdges, bodyEdgeMat);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyWireMat);
    lockGroup.add(bodyWire);
    lockGroup.add(bodyMesh);

    // Corner Vertex Sparkle Dots on the vault body
    const cornerMat = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.045,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    disposables.push(cornerMat);
    const cornerPoints = new THREE.Points(bodyGeo, cornerMat);
    lockGroup.add(cornerPoints);

    // 2. Padlock Shackle (Curved Arch in Neon Cyan, low opacity)
    const shackleArcGeo = new THREE.TorusGeometry(0.44, 0.065, 12, 32, Math.PI);
    disposables.push(shackleArcGeo);

    const shackleMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.28,
    });
    disposables.push(shackleMat);

    const shackleArc = new THREE.LineSegments(new THREE.EdgesGeometry(shackleArcGeo), shackleMat);
    shackleArc.position.set(0, 0.48, 0);
    lockGroup.add(shackleArc);

    // Vertical legs connecting arch to body
    const legLeftGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.28, 8);
    const legRightGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.28, 8);
    disposables.push(legLeftGeo, legRightGeo);

    const legLeft = new THREE.LineSegments(new THREE.EdgesGeometry(legLeftGeo), shackleMat);
    legLeft.position.set(-0.44, 0.34, 0);
    const legRight = new THREE.LineSegments(new THREE.EdgesGeometry(legRightGeo), shackleMat);
    legRight.position.set(0.44, 0.34, 0);
    lockGroup.add(legLeft);
    lockGroup.add(legRight);

    // 3. Cryptographic Core: Floating Isometric Diamond Node
    const coreGeo = new THREE.OctahedronGeometry(0.18, 0);
    const coreEdges = new THREE.EdgesGeometry(coreGeo);
    disposables.push(coreGeo, coreEdges);

    const coreMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    disposables.push(coreMat);

    const coreMesh = new THREE.LineSegments(coreEdges, coreMat);
    coreMesh.position.set(0, 0, 0);
    lockGroup.add(coreMesh);

    // Biometric scanner reticle ring
    const reticleGeo = new THREE.RingGeometry(0.24, 0.27, 24);
    disposables.push(reticleGeo);
    const reticleMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.14,
    });
    disposables.push(reticleMat);
    const reticleMesh = new THREE.Mesh(reticleGeo, reticleMat);
    reticleMesh.position.set(0, 0, 0.42);
    lockGroup.add(reticleMesh);

    // 4. Concentric Gyroscopic Cipher Rings (Subtle and atmospheric)
    const ring1Geo = new THREE.RingGeometry(1.22, 1.25, 48);
    const ring2Geo = new THREE.RingGeometry(1.42, 1.45, 48);
    disposables.push(ring1Geo, ring2Geo);

    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.11,
    });
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.08,
    });
    disposables.push(ringMat1, ringMat2);

    const cipherRing1 = new THREE.Mesh(ring1Geo, ringMat1);
    cipherRing1.rotation.x = Math.PI / 3;
    lockGroup.add(cipherRing1);

    const cipherRing2 = new THREE.Mesh(ring2Geo, ringMat2);
    cipherRing2.rotation.y = Math.PI / 4;
    cipherRing2.rotation.x = -Math.PI / 6;
    lockGroup.add(cipherRing2);

    // --- 5. Micro Data Sparks (Floating atmospheric telemetry dust across the card) ---
    const particleCount = isMobile ? 22 : 42;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 14;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    disposables.push(particleGeo);

    const particleMat = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.045,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    disposables.push(particleMat);

    const particleField = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particleField);

    // Target mouse parallax coordinates
    let targetRotY = 0;
    let targetRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 0.22;
      targetRotX = y * 0.12;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // IntersectionObserver for 0% CPU/GPU idle when offscreen
    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.04 }
    );
    observer.observe(container);

    // Animation Loop
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

      // Smooth, slow, calm rotation of the padlock
      lockGroup.rotation.y += dt * 0.24;
      lockGroup.rotation.x = Math.sin(now * 0.0008) * 0.05;

      // Core diamond counter-rotation
      coreMesh.rotation.y -= dt * 0.45;
      coreMesh.rotation.z += dt * 0.25;

      // Rotating cipher rings
      cipherRing1.rotation.z += dt * 0.38;
      cipherRing2.rotation.z -= dt * 0.26;

      // Subtle vertical breathing float around origin
      lockGroup.position.y = (isMobile ? 0 : 0.1) + Math.sin(now * 0.0014) * 0.06;

      // Subtle mouse parallax easing
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.04;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.04;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      disposables.forEach((item) => item.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.vaultCanvasContainer} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.vaultCanvas} />
    </div>
  );
};
