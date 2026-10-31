"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import styles from "./VanguardScene3D.module.css";

interface VanguardScene3DProps {
  scrollProgress: MotionValue<number>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export const VanguardScene3D: React.FC<VanguardScene3DProps> = ({
  scrollProgress,
  mouseX,
  mouseY,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

    // 1. Scene & Fog Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06070a, 0.05);

    // 2. Perspective Camera (3D Z-Axis Dive)
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const aspect = width / Math.max(height, 1);

    const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 100);
    const baseCamZ = aspect > 1.85 ? 9.6 : (aspect < 1 ? 12.8 : 10.5);
    camera.position.set(0, 0, baseCamZ);

    // 3. WebGL Renderer
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

    // 4. Single Iconic 3D Geodesic Figure + Orbital Rings (Clean & Balanced)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 4a. Clean 3D Geodesic Icosahedron Wireframe
    const outerGeo = new THREE.IcosahedronGeometry(2.75, 1);
    const outerEdges = new THREE.EdgesGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.36,
    });
    const outerWireframe = new THREE.LineSegments(outerEdges, outerMat);
    coreGroup.add(outerWireframe);

    // 4b. Glowing Vertex Nodes on the Geodesic Corners
    const vertexMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: isMobile ? 0.09 : 0.075,
      transparent: true,
      opacity: 0.85,
    });
    const vertexNodes = new THREE.Points(outerGeo, vertexMat);
    coreGroup.add(vertexNodes);

    // 4c. Neural Synaptic Thought Pulses (Impulsos que recorren las conexiones moleculares como si pensara)
    const edgePositions = outerEdges.getAttribute("position");
    interface NeuralEdge {
      start: THREE.Vector3;
      end: THREE.Vector3;
    }
    const neuralEdges: NeuralEdge[] = [];
    for (let i = 0; i < edgePositions.count; i += 2) {
      neuralEdges.push({
        start: new THREE.Vector3(edgePositions.getX(i), edgePositions.getY(i), edgePositions.getZ(i)),
        end: new THREE.Vector3(edgePositions.getX(i + 1), edgePositions.getY(i + 1), edgePositions.getZ(i + 1)),
      });
    }

    const findConnectedNeighbors = (targetPoint: THREE.Vector3, currentEdgeIdx: number) => {
      const neighbors: { edgeIdx: number; fromStart: boolean }[] = [];
      const thresholdSq = 0.002;
      for (let e = 0; e < neuralEdges.length; e++) {
        if (e === currentEdgeIdx) continue;
        if (neuralEdges[e].start.distanceToSquared(targetPoint) < thresholdSq) {
          neighbors.push({ edgeIdx: e, fromStart: true });
        } else if (neuralEdges[e].end.distanceToSquared(targetPoint) < thresholdSq) {
          neighbors.push({ edgeIdx: e, fromStart: false });
        }
      }
      return neighbors;
    };

    const pulseCount = isMobile ? 22 : 38;
    interface NeuralPulse {
      edgeIdx: number;
      fromStart: boolean;
      progress: number;
      speed: number;
      life: number;
      maxLife: number;
    }

    const pulsePalette = [
      new THREE.Color(0x38bdf8), // Neon cyan spark
      new THREE.Color(0x06b6d4), // Vibrant teal
      new THREE.Color(0xc084fc), // Thought violet
      new THREE.Color(0x60a5fa), // Ice blue
      new THREE.Color(0xffffff), // Synaptic flash
    ];

    const pulses: NeuralPulse[] = [];
    const pulsePositions = new Float32Array(pulseCount * 3);
    const pulseColors = new Float32Array(pulseCount * 3);

    for (let i = 0; i < pulseCount; i++) {
      const edgeIdx = Math.floor(Math.random() * neuralEdges.length);
      const color = pulsePalette[i % pulsePalette.length];
      pulses.push({
        edgeIdx,
        fromStart: Math.random() > 0.5,
        progress: Math.random(),
        speed: 0.32 + Math.random() * 0.46,
        life: 0,
        maxLife: 4 + Math.floor(Math.random() * 7),
      });

      pulseColors[i * 3] = color.r;
      pulseColors[i * 3 + 1] = color.g;
      pulseColors[i * 3 + 2] = color.b;
    }

    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePositions, 3));
    pulseGeo.setAttribute("color", new THREE.BufferAttribute(pulseColors, 3));

    // Create a soft glowing radial flare sprite texture
    let pulseTexture: THREE.CanvasTexture | null = null;
    const canvasSprite = document.createElement("canvas");
    canvasSprite.width = 64;
    canvasSprite.height = 64;
    const spriteCtx = canvasSprite.getContext("2d");
    if (spriteCtx) {
      const grad = spriteCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.2, "rgba(56, 189, 248, 0.95)");
      grad.addColorStop(0.55, "rgba(6, 182, 212, 0.35)");
      grad.addColorStop(0.85, "rgba(168, 85, 247, 0.12)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      spriteCtx.fillStyle = grad;
      spriteCtx.fillRect(0, 0, 64, 64);
      pulseTexture = new THREE.CanvasTexture(canvasSprite);
    }

    const pulseMat = new THREE.PointsMaterial({
      size: isMobile ? 0.22 : 0.28,
      map: pulseTexture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.95,
    });

    const pulseMesh = new THREE.Points(pulseGeo, pulseMat);
    coreGroup.add(pulseMesh);

    // 4c. Two Sleek Orbital Gyroscope Rings Framing the Geodesic
    const ring1Geo = new THREE.TorusGeometry(3.85, 0.014, 12, isMobile ? 64 : 110);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.38,
    });
    const gyroRing1 = new THREE.Mesh(ring1Geo, ring1Mat);
    gyroRing1.rotation.x = Math.PI / 2.7;
    gyroRing1.rotation.y = Math.PI / 6;
    coreGroup.add(gyroRing1);

    const ring2Geo = new THREE.TorusGeometry(4.45, 0.012, 12, isMobile ? 64 : 110);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.25,
    });
    const gyroRing2 = new THREE.Mesh(ring2Geo, ring2Mat);
    gyroRing2.rotation.x = -Math.PI / 3.1;
    gyroRing2.rotation.z = Math.PI / 4;
    coreGroup.add(gyroRing2);

    // 5. Streaming Z-Space Data Particles
    const particleCount = isMobile ? 180 : 340;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x06b6d4), // Neon Cyan
      new THREE.Color(0x6366f1), // Electric Indigo
      new THREE.Color(0x10b981), // Emerald
      new THREE.Color(0xf59e0b), // Amber Gold
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 3.2 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      positions[i3] = Math.cos(theta) * radius;
      positions[i3 + 1] = Math.sin(theta) * radius * 0.72;
      positions[i3 + 2] = (Math.random() - 0.65) * 28;

      const c = palette[i % palette.length];
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.065 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.68,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 6. Visibility Observer (Pause WebGL when scrolled off-screen)
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    // 7. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      const newAspect = newW / Math.max(newH, 1);

      camera.aspect = newAspect;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // 8. Animation Loop (Synchronized with Scroll Z-Dive & Mouse Frustum)
    let animFrameId: number;
    let lastTime = performance.now();
    let smoothCamX = 0;
    let smoothCamY = 0;

    const animate = (now: number) => {
      animFrameId = requestAnimationFrame(animate);
      if (!isVisible) {
        lastTime = now;
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const scrollVal = scrollProgress.get(); // 0 -> 1
      const mx = mouseX.get(); // -0.5 -> 0.5
      const my = mouseY.get(); // -0.5 -> 0.5

      const idleWaveX = Math.sin(now * 0.0005) * 0.32;
      const idleWaveY = Math.cos(now * 0.0004) * 0.22;
      const targetX = mx * 2.4 + idleWaveX;
      const targetY = -my * 1.8 + idleWaveY;

      smoothCamX += (targetX - smoothCamX) * 0.08;
      smoothCamY += (targetY - smoothCamY) * 0.08;

      const currentAspect =
        (container.clientWidth || 1) / Math.max(container.clientHeight || 1, 1);
      const startZ =
        currentAspect > 1.85 ? 9.6 : currentAspect < 1 ? 12.6 : 10.2;
      const endZ = currentAspect < 1 ? 3.8 : 2.6;

      // Camera plunges along Z-axis as user scrolls down the Hero track
      camera.position.x = smoothCamX;
      camera.position.y = smoothCamY;
      camera.position.z = startZ - scrollVal * (startZ - endZ);
      camera.lookAt(smoothCamX * 0.25, smoothCamY * 0.25, -4);

      // Rotate the 3D Geodesic Figure & Orbital Rings smoothly
      const spinBoost = 1 + scrollVal * 2.4;
      outerWireframe.rotation.y += dt * 0.22 * spinBoost;
      outerWireframe.rotation.x += dt * 0.11 * spinBoost;
      vertexNodes.rotation.copy(outerWireframe.rotation);
      pulseMesh.rotation.copy(outerWireframe.rotation);

      // Slightly boost wireframe glow as camera dives on scroll
      outerMat.opacity = 0.34 + scrollVal * 0.22;

      gyroRing1.rotation.z += dt * 0.28 * spinBoost;
      gyroRing2.rotation.y -= dt * 0.22 * spinBoost;

      coreGroup.rotation.y = smoothCamX * 0.18;
      coreGroup.rotation.x = -smoothCamY * 0.18;

      // Stream peripheral particles forward along Z-axis
      const posAttr = particleGeo.getAttribute(
        "position"
      ) as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      const streamSpeed = (1.6 + scrollVal * 6.2) * dt;

      for (let i = 0; i < particleCount; i++) {
        const zIdx = i * 3 + 2;
        posArray[zIdx] += streamSpeed;
        if (posArray[zIdx] > 11) {
          posArray[zIdx] = -17;
        }
      }
      posAttr.needsUpdate = true;

      // Update Neural Synaptic Pulses along molecular bonds
      for (let i = 0; i < pulseCount; i++) {
        const p = pulses[i];
        p.progress += dt * p.speed * (1 + scrollVal * 1.6);

        if (p.progress >= 1.0) {
          p.progress = 0;
          p.life++;
          const curEdge = neuralEdges[p.edgeIdx];
          const destPoint = p.fromStart ? curEdge.end : curEdge.start;

          const nextOptions = findConnectedNeighbors(destPoint, p.edgeIdx);
          if (nextOptions.length > 0) {
            const chosen = nextOptions[Math.floor(Math.random() * nextOptions.length)];
            p.edgeIdx = chosen.edgeIdx;
            p.fromStart = chosen.fromStart;
          } else {
            p.edgeIdx = Math.floor(Math.random() * neuralEdges.length);
            p.fromStart = Math.random() > 0.5;
          }

          if (p.life > p.maxLife) {
            p.life = 0;
            p.maxLife = 4 + Math.floor(Math.random() * 7);
            p.edgeIdx = Math.floor(Math.random() * neuralEdges.length);
          }
        }

        const e = neuralEdges[p.edgeIdx];
        const t = p.progress;
        const x = p.fromStart
          ? e.start.x + (e.end.x - e.start.x) * t
          : e.end.x + (e.start.x - e.end.x) * t;
        const y = p.fromStart
          ? e.start.y + (e.end.y - e.start.y) * t
          : e.end.y + (e.start.y - e.end.y) * t;
        const z = p.fromStart
          ? e.start.z + (e.end.z - e.start.z) * t
          : e.end.z + (e.start.z - e.end.z) * t;

        pulsePositions[i * 3] = x;
        pulsePositions[i * 3 + 1] = y;
        pulsePositions[i * 3 + 2] = z;
      }
      pulseGeo.attributes.position.needsUpdate = true;

      // Organic "Thinking" Brainwave Wave (nodos que respiran como procesando datos)
      const brainPulse = Math.sin(now * 0.0024);
      const brainSecondary = Math.cos(now * 0.0016);
      vertexMat.opacity = 0.7 + brainPulse * 0.25;
      vertexMat.size = (isMobile ? 0.09 : 0.075) * (1.0 + brainSecondary * 0.22);
      outerMat.opacity = (0.34 + scrollVal * 0.22) * (0.92 + brainPulse * 0.15);
      pulseMat.opacity = 0.85 + brainPulse * 0.15;

      renderer.render(scene, camera);
    };

    animFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);

      outerGeo.dispose();
      outerEdges.dispose();
      outerMat.dispose();
      vertexMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      if (pulseTexture) pulseTexture.dispose();
      renderer.dispose();
    };
  }, [scrollProgress, mouseX, mouseY]);

  return (
    <div ref={containerRef} className={styles.canvasWrapper} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.webglCanvas} />
      <div className={styles.vignetteOverlay} />
    </div>
  );
};
