"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useScroll, useSpring, type MotionValue } from "framer-motion";
import styles from "./SecurityVault3D.module.css";

interface SecurityVault3DProps {
  scrollProgress?: MotionValue<number>;
}

/**
 * SecurityVault3D: Interactive Multi-Layer Defense Shield with Scroll-Driven Assembly.
 * Dynamically connects 4 concentric protective layers (Perímetro, Zero-Trust, Sandbox, Core)
 * as the user scrolls into the section, completing the shield with laser connectors and verification pulses.
 */
export const SecurityVault3D: React.FC<SecurityVault3DProps> = ({ scrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fallback internal scroll tracking if no external progress is provided
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.92", "center 0.48"],
  });

  const internalSmooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  const activeProgress = scrollProgress || internalSmooth;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5);

    // 1. Scene & Atmosphere Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0c12, 0.05);

    let width = container.clientWidth || 1000;
    let height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(
      42,
      width / Math.max(height, 1),
      0.1,
      40
    );
    camera.position.set(0, 0.4, 7.8);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !isMobile,
        powerPreference: "default",
      });
    } catch {
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: false,
          powerPreference: "default",
        });
      } catch (err) {
        console.warn("SecurityVault3D: WebGL initialization failed", err);
        return;
      }
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);

    const masterGroup = new THREE.Group();
    // Position comfortably on the right side in desktop layout, centered in mobile
    masterGroup.position.set(isMobile ? 0 : 2.8, isMobile ? -0.1 : 0, 0);
    const baseScale = isMobile ? 1.05 : 1.35;
    masterGroup.scale.set(baseScale, baseScale, baseScale);
    scene.add(masterGroup);

    const disposables: (THREE.BufferGeometry | THREE.Material)[] = [];

    // --- CAPA 1: Escudo Perimetral Exterior (Cabeceras HTTP, CSP & Red) ---
    const outerRingGeo = new THREE.TorusGeometry(2.35, 0.024, 8, 48);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.2,
    });
    disposables.push(outerRingGeo, outerRingMat);
    const outerRingMesh = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRingMesh.rotation.x = Math.PI / 2.3;
    masterGroup.add(outerRingMesh);

    const outerDomeGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const outerDomeEdges = new THREE.EdgesGeometry(outerDomeGeo);
    const outerDomeMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.08,
    });
    disposables.push(outerDomeGeo, outerDomeEdges, outerDomeMat);
    const outerDomeMesh = new THREE.LineSegments(outerDomeEdges, outerDomeMat);
    masterGroup.add(outerDomeMesh);

    // --- CAPA 2: Escudo Intermedio (Validación Zero-Trust & Honeypot Anti-Bot) ---
    const midShieldGeo = new THREE.OctahedronGeometry(1.42, 1);
    const midShieldEdges = new THREE.EdgesGeometry(midShieldGeo);
    const midShieldMat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.15,
    });
    disposables.push(midShieldGeo, midShieldEdges, midShieldMat);
    const midShieldMesh = new THREE.LineSegments(midShieldEdges, midShieldMat);
    masterGroup.add(midShieldMesh);

    const midRingGeo = new THREE.TorusGeometry(1.48, 0.02, 8, 36);
    const midRingMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.2,
    });
    disposables.push(midRingGeo, midRingMat);
    const midRingMesh = new THREE.Mesh(midRingGeo, midRingMat);
    midRingMesh.rotation.x = -Math.PI / 2.5;
    masterGroup.add(midRingMesh);

    // --- CAPA 3: Aislamiento & Sandbox de Memoria (Tokens & Manifest V3) ---
    const innerShieldGeo = new THREE.IcosahedronGeometry(0.92, 0);
    const innerShieldEdges = new THREE.EdgesGeometry(innerShieldGeo);
    const innerShieldMat = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.2,
    });
    disposables.push(innerShieldGeo, innerShieldEdges, innerShieldMat);
    const innerShieldMesh = new THREE.LineSegments(innerShieldEdges, innerShieldMat);
    masterGroup.add(innerShieldMesh);

    // --- CAPA 4: Núcleo Criptográfico Central (Data Core) ---
    const coreGeo = new THREE.OctahedronGeometry(0.48, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    disposables.push(coreGeo, coreMat);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    const coreSolidGeo = new THREE.OctahedronGeometry(0.24, 0);
    const coreSolidMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
    });
    disposables.push(coreSolidGeo, coreSolidMat);
    const coreSolidMesh = new THREE.Mesh(coreSolidGeo, coreSolidMat);
    coreMesh.add(coreSolidMesh);

    // --- 5. LÍNEAS LÁSER DINÁMICAS QUE CONECTAN LAS CAPAS ---
    const connectorLinesCount = 12;
    const connectorPoints: THREE.Vector3[] = [];
    const layerLinks: { outer: THREE.Vector3; mid: THREE.Vector3; inner: THREE.Vector3 }[] = [];

    const outerVertices = outerDomeGeo.getAttribute("position");
    const midVertices = midShieldGeo.getAttribute("position");

    for (let i = 0; i < connectorLinesCount; i++) {
      const idxOuter = (i * 2) % outerVertices.count;
      const idxMid = (i * 3) % midVertices.count;

      const pOuter = new THREE.Vector3(
        outerVertices.getX(idxOuter),
        outerVertices.getY(idxOuter),
        outerVertices.getZ(idxOuter)
      );
      const pMid = new THREE.Vector3(
        midVertices.getX(idxMid),
        midVertices.getY(idxMid),
        midVertices.getZ(idxMid)
      );
      const pInner = pMid.clone().multiplyScalar(0.45);

      layerLinks.push({ outer: pOuter, mid: pMid, inner: pInner });

      connectorPoints.push(pOuter, pMid);
      connectorPoints.push(pMid, pInner);
    }

    const connectorGeo = new THREE.BufferGeometry().setFromPoints(connectorPoints);
    const connectorMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.1,
    });
    disposables.push(connectorGeo, connectorMat);
    const connectorMesh = new THREE.LineSegments(connectorGeo, connectorMat);
    masterGroup.add(connectorMesh);

    // --- 6. PULSOS DE VERIFICACIÓN QUE VIAJAN ENTRE LAS CAPAS ---
    const pulseCount = 18;
    const pulseGeo = new THREE.BufferGeometry();
    const pulsePositions = new Float32Array(pulseCount * 3);
    const pulseSpeeds = new Float32Array(pulseCount);
    const pulseProgress = new Float32Array(pulseCount);
    const pulseLinkIdx = new Int32Array(pulseCount);

    for (let i = 0; i < pulseCount; i++) {
      pulseLinkIdx[i] = i % layerLinks.length;
      pulseProgress[i] = Math.random();
      pulseSpeeds[i] = 0.6 + Math.random() * 0.8;
    }

    pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePositions, 3));
    const pulseMat = new THREE.PointsMaterial({
      color: 0x34d399,
      size: isMobile ? 0.065 : 0.08,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });
    disposables.push(pulseGeo, pulseMat);
    const pulsePoints = new THREE.Points(pulseGeo, pulseMat);
    masterGroup.add(pulsePoints);

    // 7. Parallax Interactivo con el Mouse
    let targetRotY = 0;
    let targetRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetRotY = nx * 0.32;
      targetRotX = -ny * 0.22;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 8. Visibility Observer
    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 1000;
      height = container.clientHeight || 420;
      const mobile = width < 768;
      masterGroup.position.set(mobile ? 0 : 2.8, mobile ? -0.1 : 0, 0);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // 9. Bucle de Animación con Scrollytelling de Ensamblaje en 3D
    let animId: number;
    let lastTime = performance.now();
    let currentScroll = 0;

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Scroll interpolation (0 when entering to 1 when fully scrolled)
      const targetS = Math.max(0, Math.min(1, activeProgress.get()));
      currentScroll += (targetS - currentScroll) * 0.085;

      // Camera glides dynamically with scroll
      camera.position.z = THREE.MathUtils.lerp(9.6, 7.8, currentScroll);
      camera.position.y = THREE.MathUtils.lerp(1.4, 0.4, currentScroll);

      // Smooth parallax & scroll-driven rotation
      const baseGroupY = THREE.MathUtils.lerp(-0.7, 0.15, currentScroll);
      const baseGroupX = THREE.MathUtils.lerp(0.32, 0.06, currentScroll);
      masterGroup.rotation.y = baseGroupY + (targetRotY - masterGroup.rotation.y) * 0.05 + dt * 0.15;
      masterGroup.rotation.x = baseGroupX + (targetRotX - masterGroup.rotation.x) * 0.05;

      // --- Capa 1: Perímetro exterior se acopla con el scroll ---
      const scale1 = THREE.MathUtils.lerp(1.4, 1.0, currentScroll);
      outerRingMesh.scale.set(scale1, scale1, 1);
      outerDomeMesh.scale.setScalar(scale1);
      outerRingMat.opacity = THREE.MathUtils.lerp(0.2, 0.72, currentScroll);
      outerDomeMat.opacity = THREE.MathUtils.lerp(0.08, 0.28, currentScroll);

      outerDomeMesh.rotation.y += dt * 0.18;
      outerDomeMesh.rotation.x += dt * 0.08;
      outerRingMesh.rotation.z -= dt * 0.25;

      // --- Capa 2: Escudo intermedio Zero-Trust se expande y rota ---
      const scale2 = THREE.MathUtils.lerp(0.5, 1.0, currentScroll);
      midShieldMesh.scale.setScalar(scale2);
      midRingMesh.scale.set(scale2, scale2, 1);
      midShieldMat.opacity = THREE.MathUtils.lerp(0.12, 0.5, currentScroll);
      midRingMat.opacity = THREE.MathUtils.lerp(0.18, 0.75, currentScroll);

      midShieldMesh.rotation.y -= dt * 0.32;
      midShieldMesh.rotation.z += dt * 0.12;
      midRingMesh.rotation.z += dt * 0.4;

      // --- Capa 3: Aislamiento & Sandbox de Memoria se sella ---
      const scale3 = THREE.MathUtils.lerp(0.3, 1.0, currentScroll);
      innerShieldMesh.scale.setScalar(scale3);
      innerShieldMat.opacity = THREE.MathUtils.lerp(0.15, 0.6, currentScroll);

      innerShieldMesh.rotation.y += dt * 0.5;
      innerShieldMesh.rotation.x -= dt * 0.25;

      // --- Capa 4: Núcleo Criptográfico Central crece y pulsa ---
      const scaleCore = THREE.MathUtils.lerp(0.2, 1.0, currentScroll);
      coreMesh.scale.setScalar(scaleCore);
      coreMat.opacity = THREE.MathUtils.lerp(0.25, 0.95, currentScroll);

      coreMesh.rotation.y -= dt * 0.85;
      coreMesh.rotation.z += dt * 0.45;

      // --- Conexiones Láser se iluminan con el ensamblaje de capas ---
      const pulseWave = Math.sin(now * 0.003);
      connectorMat.opacity = THREE.MathUtils.lerp(0.05, 0.45, currentScroll) + pulseWave * 0.08;

      // --- Pulsos de Verificación de Integridad ---
      pulseMat.opacity = THREE.MathUtils.lerp(0.2, 0.95, currentScroll);

      const pArr = (pulseGeo.attributes.position as THREE.BufferAttribute).array as Float32Array;
      for (let i = 0; i < pulseCount; i++) {
        pulseProgress[i] += dt * pulseSpeeds[i] * (0.6 + currentScroll * 0.6);
        if (pulseProgress[i] > 1) {
          pulseProgress[i] = 0;
          pulseLinkIdx[i] = Math.floor(Math.random() * layerLinks.length);
        }

        const link = layerLinks[pulseLinkIdx[i]];
        const t = pulseProgress[i];

        let x: number, y: number, z: number;
        if (t < 0.5) {
          const subT = t * 2;
          x = THREE.MathUtils.lerp(link.outer.x, link.mid.x, subT);
          y = THREE.MathUtils.lerp(link.outer.y, link.mid.y, subT);
          z = THREE.MathUtils.lerp(link.outer.z, link.mid.z, subT);
        } else {
          const subT = (t - 0.5) * 2;
          x = THREE.MathUtils.lerp(link.mid.x, link.inner.x, subT);
          y = THREE.MathUtils.lerp(link.mid.y, link.inner.y, subT);
          z = THREE.MathUtils.lerp(link.mid.z, link.inner.z, subT);
        }

        pArr[i * 3] = x;
        pArr[i * 3 + 1] = y;
        pArr[i * 3 + 2] = z;
      }
      pulseGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      disposables.forEach((item) => item.dispose());
      renderer.dispose();
    };
  }, [activeProgress]);

  return (
    <div
      ref={containerRef}
      className={styles.vaultCanvasContainer}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={styles.vaultCanvas} />
    </div>
  );
};
