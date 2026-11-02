"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import styles from "./TacticalRouteMap.module.css";

/**
 * Direct architectural & scrollytelling adaptation of Resident Evil's
 * `<section class="route-map" data-route-layout="split">`:
 * - 60/120fps zero-re-render Three.js 3D wireframe terrain flyover
 * - GPU-accelerated self-drawing SVG trajectory arc (no heavy SVG filter repaints)
 * - Timed HUD waypoints + traveling pulse beacon along the route
 * - 3-line kinetic lede reveal + direct-DOM telemetry Route Lock clock
 */
export const TacticalRouteMap: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Start tracking slightly before the pin locks so the entrance is silky smooth
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.25", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  // Self-drawing SVG route arc (pathLength 0 -> 1 is hardware-accelerated in Framer Motion)
  const arcPathLength = useTransform(smoothProgress, [0.02, 0.88], [0, 1]);

  // Waypoint opacities & subtle Y lift (NO CSS transition conflict!)
  const wp1Opacity = useTransform(smoothProgress, [0.02, 0.18], [0.18, 1]);
  const wp1Y = useTransform(smoothProgress, [0.02, 0.18], [10, 0]);

  const wp2Opacity = useTransform(smoothProgress, [0.28, 0.48], [0.18, 1]);
  const wp2Y = useTransform(smoothProgress, [0.28, 0.48], [10, 0]);

  const wp3Opacity = useTransform(smoothProgress, [0.58, 0.78], [0.18, 1]);
  const wp3Y = useTransform(smoothProgress, [0.58, 0.78], [10, 0]);

  // 3-Line Kinetic Lede subtle scroll-linked parallax & reveal
  const ledeLine1X = useTransform(smoothProgress, [0, 0.22], [-18, 0]);
  const ledeLine2X = useTransform(smoothProgress, [0.04, 0.28], [-24, 0]);
  const ledeLine3X = useTransform(smoothProgress, [0.08, 0.34], [-30, 0]);

  // Three.js 3D Topographic Wireframe Terrain & Waypoint Beacons (Silky 60/120fps)
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06070a, 0.062);

    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(
      50,
      width / Math.max(height, 1),
      0.1,
      70
    );
    camera.position.set(-1.6, 3.8, 9.5);
    camera.lookAt(1.6, -0.4, 0);

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
        console.warn("TacticalRouteMap: WebGL initialization failed", err);
        return;
      }
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);

    const worldGroup = new THREE.Group();
    worldGroup.position.x = isMobile ? 0 : 2.1;
    scene.add(worldGroup);

    // 3D Topographic Wireframe Terrain Plane (Optimized vertex count for 120fps)
    const segsX = isMobile ? 22 : 36;
    const segsY = isMobile ? 22 : 36;
    const planeGeo = new THREE.PlaneGeometry(18, 18, segsX, segsY);
    planeGeo.rotateX(-Math.PI / 2);

    const posAttr = planeGeo.getAttribute("position") as THREE.BufferAttribute;
    const baseHeights = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vz = posAttr.getZ(i);
      const dist = Math.sqrt(vx * vx + vz * vz);
      const wave =
        Math.sin(vx * 0.62) * Math.cos(vz * 0.62) * 0.82 +
        Math.sin(dist * 0.85) * 0.32;
      baseHeights[i] = wave;
      posAttr.setY(i, wave);
    }

    const terrainMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.24,
    });
    const terrainMesh = new THREE.Mesh(planeGeo, terrainMat);
    worldGroup.add(terrainMesh);

    // 3D Waypoint Radar Rings & Pulse Beacons on the Terrain
    const beaconGeos: THREE.BufferGeometry[] = [];
    const beaconMats: THREE.Material[] = [];
    const pulseRings: THREE.Mesh[] = [];
    const beaconCoords = [
      new THREE.Vector3(-1.8, 0.65, -2.2),
      new THREE.Vector3(0.8, 0.45, 0.2),
      new THREE.Vector3(2.6, 0.75, 2.5),
    ];

    beaconCoords.forEach((pt, idx) => {
      const rGeo = new THREE.RingGeometry(0.3, 0.37, 28);
      rGeo.rotateX(-Math.PI / 2);
      const rMat = new THREE.MeshBasicMaterial({
        color: idx === 2 ? 0x10b981 : 0x06b6d4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const rMesh = new THREE.Mesh(rGeo, rMat);
      rMesh.position.copy(pt);
      worldGroup.add(rMesh);
      pulseRings.push(rMesh);
      beaconGeos.push(rGeo);
      beaconMats.push(rMat);

      // Vertical telemetry spire line
      const spireGeo = new THREE.BufferGeometry().setFromPoints([
        pt,
        new THREE.Vector3(pt.x, pt.y + 1.85, pt.z),
      ]);
      const spireMat = new THREE.LineBasicMaterial({
        color: idx === 2 ? 0x10b981 : 0x6366f1,
        transparent: true,
        opacity: 0.7,
      });
      worldGroup.add(new THREE.Line(spireGeo, spireMat));
      beaconGeos.push(spireGeo);
      beaconMats.push(spireMat);
    });

    // Connect the 3 beacons in 3D space with a glowing trajectory curve
    const curve3D = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.8, 0.8, -2.2),
      new THREE.Vector3(-0.4, 1.35, -1.0),
      new THREE.Vector3(0.8, 0.65, 0.2),
      new THREE.Vector3(1.8, 1.25, 1.4),
      new THREE.Vector3(2.6, 0.9, 2.5),
    ]);
    const routeLineGeo = new THREE.BufferGeometry().setFromPoints(
      curve3D.getPoints(48)
    );
    const routeLineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75,
    });
    worldGroup.add(new THREE.Line(routeLineGeo, routeLineMat));
    beaconGeos.push(routeLineGeo);
    beaconMats.push(routeLineMat);

    // Traveling 3D Data Packet Sphere along the 3D curve
    const packetGeo = new THREE.SphereGeometry(0.14, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
    });
    const packetMesh = new THREE.Mesh(packetGeo, packetMat);
    worldGroup.add(packetMesh);
    beaconGeos.push(packetGeo);
    beaconMats.push(packetMat);

    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    observer.observe(section);

    const handleResize = () => {
      const w = section.clientWidth || window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    let animId: number;
    let smoothedScroll = 0;

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = now * 0.001;
      const targetS = Math.max(0, Math.min(1, scrollYProgress.get()));
      // Internal frame-rate independent lerp so camera never stutters
      smoothedScroll += (targetS - smoothedScroll) * 0.085;

      // Fly camera smoothly across the 3D topographic route
      camera.position.z = 9.4 - smoothedScroll * 3.6;
      camera.position.y = 3.7 - smoothedScroll * 0.75;
      camera.position.x = -1.5 + smoothedScroll * 1.3;
      camera.lookAt(1.6, -0.35, -smoothedScroll * 1.3);

      // Continuous gentle rotation + scroll rotation (NO dt multiplication bug!)
      worldGroup.rotation.y = -0.28 + smoothedScroll * 0.58 + t * 0.08;

      // Move the 3D data packet smoothly along the 3D trajectory curve
      const packetT = (smoothedScroll * 0.85 + (t * 0.18) % 1) % 1;
      const packetPos = curve3D.getPointAt(packetT);
      packetMesh.position.copy(packetPos);

      // Pulse the 3 waypoint radar rings
      for (let i = 0; i < pulseRings.length; i++) {
        const scale = 1 + Math.sin(t * 2.8 + i * 1.4) * 0.18;
        pulseRings[i].scale.set(scale, scale, 1);
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      planeGeo.dispose();
      terrainMat.dispose();
      beaconGeos.forEach((g) => g.dispose());
      beaconMats.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      id="manifiesto"
      className={styles.routeMapSection}
      aria-labelledby="route-map-title"
    >
      <div className={styles.routeMapPin}>
        {/* Three.js 3D Topographic Wireframe Route Canvas */}
        <canvas
          ref={canvasRef}
          className={styles.routeCanvas}
          aria-hidden="true"
        />
        <div className={styles.routeScrim} aria-hidden="true" />

        {/* Self-Drawing SVG Trajectory Arc (GPU-friendly vector glow without heavy drop-shadow filter) */}
        <svg
          className={styles.routeArcSvg}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="vgk-route-arc-grad"
              x1="48"
              y1="12"
              x2="92"
              y2="90"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#6366f1" stopOpacity="0" />
              <stop offset="0.2" stopColor="#06b6d4" stopOpacity="0.9" />
              <stop offset="0.8" stopColor="#10b981" stopOpacity="0.9" />
              <stop offset="1" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 48 12 C 53 22, 62 28, 66 44 C 70 60, 76 68, 88 88"
            className={styles.routeArcPathBg}
          />
          <motion.path
            d="M 48 12 C 53 22, 62 28, 66 44 C 70 60, 76 68, 88 88"
            className={styles.routeArcPathGlow}
            style={{ pathLength: arcPathLength }}
          />
          <motion.path
            d="M 48 12 C 53 22, 62 28, 66 44 C 70 60, 76 68, 88 88"
            className={styles.routeArcPathActive}
            style={{ pathLength: arcPathLength }}
          />
        </svg>

        {/* Timed Spatial HUD Waypoints */}
        <motion.div
          className={`${styles.routeHudWaypoint} ${styles.hudOrigin}`}
          style={{ opacity: wp1Opacity, y: wp1Y }}
          aria-hidden="true"
        >
          <span className={styles.hudStamp}>12:00 HS</span>
          <span className={styles.hudLabel}>Cuello de Botella Manual</span>
        </motion.div>

        <motion.div
          className={`${styles.routeHudWaypoint} ${styles.hudCheckpoint}`}
          style={{ opacity: wp2Opacity, y: wp2Y }}
          aria-hidden="true"
        >
          <span className={styles.hudStamp}>02:15 HS</span>
          <span className={styles.hudLabel}>Inyección DOM &amp; Arquitectura 3D</span>
        </motion.div>

        <motion.div
          className={`${styles.routeHudWaypoint} ${styles.hudDestination}`}
          style={{ opacity: wp3Opacity, y: wp3Y }}
          aria-hidden="true"
        >
          <span className={styles.hudStamp}>00:13 MIN</span>
          <span className={styles.hudLabel}>Producción · Cero Error Humano</span>
        </motion.div>

        {/* Left Editorial Copy Block */}
        <div className={styles.routeCopy}>
          <h2 className="sr-only" id="route-map-title">
            Manifiesto — Un equipo, una arquitectura, impacto inmediato
          </h2>

          <div className={styles.routeLede}>
            <motion.span
              className={styles.ledeLine}
              style={{ x: ledeLine1X }}
            >
              Una arquitectura.
            </motion.span>
            <motion.span
              className={`${styles.ledeLine} ${styles.ledeAccent}`}
              style={{ x: ledeLine2X }}
            >
              Cero fricción.
            </motion.span>
            <motion.span
              className={styles.ledeLine}
              style={{ x: ledeLine3X }}
            >
              Impacto inmediato.
            </motion.span>
          </div>

          <div className={styles.routeBody}>
            <p>
              Reemplazamos procesos manuales lentos por herramientas
              corporativas de alta velocidad y experiencias web 3D que reducen
              jornadas de 12 horas a 13 minutos.
            </p>
          </div>

          <dl className={styles.routeCredits}>
            <div className={styles.creditItem}>
              <dt>Dirección Técnica</dt>
              <dd>Benac &amp; Rodriguez Sabia</dd>
            </div>
            <div className={styles.creditItem}>
              <dt>Motor Espacial</dt>
              <dd>Three.js WebGL &amp; Next.js</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};
