"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./ServiceHologram3D.module.css";

interface ServiceHologram3DProps {
  serviceId: string;
  accentColor: string;
  simRunKey: number;
}

export const ServiceHologram3D: React.FC<ServiceHologram3DProps> = ({
  serviceId,
  accentColor,
  simRunKey,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    serviceId,
    accentColor,
    burstFactor: 1,
    targetScale: 1,
    currentScale: 0.5,
  });

  // Trigger a 3D energy pulse whenever the user switches service tabs or clicks "Simular"
  useEffect(() => {
    stateRef.current.serviceId = serviceId;
    stateRef.current.accentColor = accentColor;
    stateRef.current.burstFactor = 3.6;
    stateRef.current.currentScale = 0.62;
  }, [serviceId, accentColor, simRunKey]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

    const scene = new THREE.Scene();
    const width = container.clientWidth || 420;
    const height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(
      50,
      width / Math.max(height, 1),
      0.1,
      50
    );
    camera.position.set(0, 0.25, 6.2);

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

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Shared dynamic materials whose color morphs per service tab
    const primaryMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(stateRef.current.accentColor),
      transparent: true,
      opacity: 0.68,
    });

    const secondaryMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });

    const pointsMat = new THREE.PointsMaterial({
      color: new THREE.Color(stateRef.current.accentColor),
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });

    // Build the 5 distinct 3D Sculptures (one per service pillar)
    const sculptures: Record<string, THREE.Group> = {};
    const geometriesToDispose: THREE.BufferGeometry[] = [];

    // 1. Browser Extensions: 3D Modular Cube Matrix + Orbiting DOM Satellites
    {
      const group = new THREE.Group();
      const mainBox = new THREE.BoxGeometry(1.75, 1.75, 1.75);
      const edges = new THREE.EdgesGeometry(mainBox);
      geometriesToDispose.push(mainBox, edges);
      group.add(new THREE.LineSegments(edges, primaryMat));

      const innerBox = new THREE.BoxGeometry(0.95, 0.95, 0.95);
      geometriesToDispose.push(innerBox);
      group.add(new THREE.Mesh(innerBox, secondaryMat));

      // 8 Corner Satellite Cubes (representing injected DOM modules)
      const satGeo = new THREE.BoxGeometry(0.32, 0.32, 0.32);
      const satEdges = new THREE.EdgesGeometry(satGeo);
      geometriesToDispose.push(satGeo, satEdges);

      const offsets = [-1.25, 1.25];
      offsets.forEach((ox) =>
        offsets.forEach((oy) =>
          offsets.forEach((oz) => {
            const sat = new THREE.LineSegments(satEdges, primaryMat);
            sat.position.set(ox, oy, oz);
            group.add(sat);
          })
        )
      );
      sculptures["browser-extensions"] = group;
      rootGroup.add(group);
    }

    // 2. Software Engineering: 3D High-Frequency TorusKnot + Cloud Rings
    {
      const group = new THREE.Group();
      const knotGeo = new THREE.TorusKnotGeometry(1.25, 0.34, isMobile ? 64 : 96, 12);
      const knotEdges = new THREE.EdgesGeometry(knotGeo);
      geometriesToDispose.push(knotGeo, knotEdges);
      group.add(new THREE.LineSegments(knotEdges, primaryMat));
      group.add(new THREE.Points(knotGeo, pointsMat));

      const ringGeo = new THREE.TorusGeometry(2.15, 0.02, 12, 72);
      geometriesToDispose.push(ringGeo);
      const ring = new THREE.Mesh(ringGeo, secondaryMat);
      ring.rotation.x = Math.PI / 3;
      group.add(ring);

      sculptures["software-engineering"] = group;
      rootGroup.add(group);
    }

    // 3. Vanguard Design & UX: Gyroscopic Geodesic Sphere + 3 Axial Rings
    {
      const group = new THREE.Group();
      const icoGeo = new THREE.IcosahedronGeometry(1.45, 2);
      const icoEdges = new THREE.EdgesGeometry(icoGeo);
      geometriesToDispose.push(icoGeo, icoEdges);
      group.add(new THREE.LineSegments(icoEdges, primaryMat));
      group.add(new THREE.Points(icoGeo, pointsMat));

      for (let i = 0; i < 3; i++) {
        const rGeo = new THREE.TorusGeometry(1.85 + i * 0.28, 0.018, 12, 80);
        geometriesToDispose.push(rGeo);
        const rMesh = new THREE.Mesh(rGeo, secondaryMat);
        rMesh.rotation.set((i * Math.PI) / 3, (i * Math.PI) / 4, 0);
        group.add(rMesh);
      }

      sculptures["vanguard-design-ux"] = group;
      rootGroup.add(group);
    }

    // 4. Growth Marketing: 3D Ascending Conversion Funnel / Vortex Rings
    {
      const group = new THREE.Group();
      const coneGeo = new THREE.ConeGeometry(1.75, 2.5, 8, 4, true);
      const coneEdges = new THREE.EdgesGeometry(coneGeo);
      geometriesToDispose.push(coneGeo, coneEdges);
      const coneLine = new THREE.LineSegments(coneEdges, primaryMat);
      coneLine.rotation.x = Math.PI;
      group.add(coneLine);

      for (let i = 0; i < 4; i++) {
        const radius = 0.55 + i * 0.38;
        const levelRingGeo = new THREE.TorusGeometry(radius, 0.02, 12, 64);
        geometriesToDispose.push(levelRingGeo);
        const levelRing = new THREE.Mesh(levelRingGeo, secondaryMat);
        levelRing.rotation.x = Math.PI / 2;
        levelRing.position.y = -0.9 + i * 0.6;
        group.add(levelRing);
      }

      sculptures["performance-growth-marketing"] = group;
      rootGroup.add(group);
    }

    // 5. AI Automations: 3D Neural Octahedron Constellation & Synaptic Nodes
    {
      const group = new THREE.Group();
      const octGeo = new THREE.OctahedronGeometry(1.35, 1);
      const octEdges = new THREE.EdgesGeometry(octGeo);
      geometriesToDispose.push(octGeo, octEdges);
      group.add(new THREE.LineSegments(octEdges, primaryMat));
      group.add(new THREE.Points(octGeo, pointsMat));

      const outerCage = new THREE.DodecahedronGeometry(2.1, 0);
      const outerEdges = new THREE.EdgesGeometry(outerCage);
      geometriesToDispose.push(outerCage, outerEdges);
      group.add(new THREE.LineSegments(outerEdges, primaryMat));
      group.add(new THREE.Points(outerCage, pointsMat));

      sculptures["ai-automations"] = group;
      rootGroup.add(group);
    }

    // Pause WebGL when off-screen
    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Interactive Silky Mouse Parallax on the 3D Sculpture
    let mouseTargetX = 0;
    let mouseTargetY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouseTargetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.85;
        mouseTargetY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.65;
      } else {
        mouseTargetX = 0;
        mouseTargetY = 0;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 420;
      const h = container.clientHeight || 420;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize, { passive: true });

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

      const st = stateRef.current;

      // Update active sculpture visibility & color
      const targetColor = new THREE.Color(st.accentColor);
      primaryMat.color.lerp(targetColor, 0.12);
      pointsMat.color.lerp(targetColor, 0.12);

      Object.entries(sculptures).forEach(([id, grp]) => {
        grp.visible = id === st.serviceId;
      });
      if (!sculptures[st.serviceId]) {
        sculptures["browser-extensions"].visible = true;
      }

      // Smooth spring scale & rotation burst decay
      st.burstFactor += (1 - st.burstFactor) * 0.08;
      st.currentScale += (st.targetScale - st.currentScale) * 0.1;

      // Mouse look interpolation
      currentMouseX += (mouseTargetX - currentMouseX) * 0.06;
      currentMouseY += (mouseTargetY - currentMouseY) * 0.06;

      const floatY = Math.sin(now * 0.002) * 0.14;
      rootGroup.position.y = floatY;
      rootGroup.scale.setScalar(st.currentScale);

      rootGroup.rotation.y += dt * 0.45 * st.burstFactor;
      rootGroup.rotation.x = Math.sin(now * 0.0012) * 0.18 + currentMouseY;
      rootGroup.rotation.z = Math.cos(now * 0.001) * 0.12 - currentMouseX * 0.35;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      geometriesToDispose.forEach((g) => g.dispose());
      primaryMat.dispose();
      secondaryMat.dispose();
      pointsMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.hologramContainer} aria-hidden="true">
      <div className={styles.stageGridFloor} />
      <canvas ref={canvasRef} className={styles.hologramCanvas} />
    </div>
  );
};

