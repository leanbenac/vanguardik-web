"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  X,
  Check,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import styles from "./WorkflowComparison.module.css";

const legacyPainPoints = [
  {
    title: "Carga Manual Repetitiva",
    desc: "Horas perdidas copiando y pegando datos entre planillas, CMS y CRMs.",
  },
  {
    title: "Errores Humanos en QA",
    desc: "Textos legales omitidos o rutas incompletas detectadas tarde en producción.",
  },
  {
    title: "Plantillas Lentas y Genéricas",
    desc: "Sitios que tardan más de 3 segundos en cargar y no transmiten autoridad.",
  },
  {
    title: "Procesos Sin Automatización",
    desc: "Leads y consultas comerciales sin calificar ni alertas en tiempo real.",
  },
];

const vanguardAdvantages = [
  {
    title: "Inyección en 1 Clic (Manifest V3)",
    desc: "Extensiones a medida que completan catálogos y tareas en segundos (-85% tiempo).",
  },
  {
    title: "Auditoría QA en Tiempo Real",
    desc: "Motores en el navegador que detectan desvíos y validan reglas al instante.",
  },
  {
    title: "Ingeniería < 0.8s & Diseño 3D",
    desc: "100/100 Core Web Vitals, estética inmersiva y embudos pensados para vender.",
  },
  {
    title: "Flujos Autónomos & Zero-Trust",
    desc: "Validación estricta, protección anti-bots y conexión directa con tu CRM.",
  },
];

const executionSteps = [
  {
    num: "01",
    duration: "Días 1 a 3",
    title: "Diagnóstico & Blueprint",
    desc: "Relevamos tus cuellos de botella y diseñamos la arquitectura bajo NDA.",
    deliverable: "Blueprint Técnico & ROI",
  },
  {
    num: "02",
    duration: "Semanas 1 a 2",
    title: "Prototipo & Sprints",
    desc: "Desarrollamos el MVP funcional con avances visibles cada semana.",
    deliverable: "Demo en Entorno Real",
  },
  {
    num: "03",
    duration: "Semana 3",
    title: "Seguridad & Stress QA",
    desc: "Auditoría Zero-Sink, políticas CSP y pruebas de rendimiento extremo.",
    deliverable: "Blindaje & Testing QA",
  },
  {
    num: "04",
    duration: "Lanzamiento",
    title: "Despliegue & Escalado",
    desc: "Puesta en producción y entrega total del código fuente.",
    deliverable: "100% Propiedad Intelectual",
  },
];

export const WorkflowComparison: React.FC = () => {
  return (
    <section
      id="metodo"
      className={styles.section}
      aria-labelledby="comparison-title"
    >
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <h2 id="comparison-title" className={styles.title}>
            Operación manual tradicional vs.{" "}
            <span className="gradient-text">Arquitectura {siteConfig.name}</span>
          </h2>
          <p className={styles.desc}>
            Reemplazamos procesos lentos, plantillas genéricas y tareas
            manuales propensas a error por ingeniería determinística y diseño de
            alta conversión.
          </p>
        </motion.div>

        {/* Before vs After Matrix */}
        <div className={styles.comparisonGrid}>
          {/* Left: Traditional Manual Bottlenecks */}
          <motion.div
            className={styles.legacyCard}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardTitleGroup}>
                <span className={styles.cardTagLegacy}>Enfoque Tradicional</span>
                <h3 className={styles.cardHeading}>Operación Manual & Lenta</h3>
              </div>
              <span className={styles.statusBadgeLegacy}>
                Alta Fricción Operativa
              </span>
            </div>

            <ul className={styles.pointList}>
              {legacyPainPoints.map((item, idx) => (
                <li key={idx} className={styles.pointItem}>
                  <div className={styles.iconLegacy}>
                    <X size={16} />
                  </div>
                  <div className={styles.pointText}>
                    <span className={styles.pointLabel}>{item.title}</span>
                    <span className={styles.pointDesc}>{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Vanguardik Automated Ecosystem */}
          <motion.div
            className={styles.vanguardCard}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardTitleGroup}>
                <span className={styles.cardTagVanguard}>
                  Ecosistema {siteConfig.name}
                </span>
                <h3 className={styles.cardHeading}>
                  Automatización & Escala B2B
                </h3>
              </div>
              <span className={styles.statusBadgeVanguard}>
                ● Eficiencia Multiplicada
              </span>
            </div>

            <ul className={styles.pointList}>
              {vanguardAdvantages.map((item, idx) => (
                <li key={idx} className={styles.pointItem}>
                  <div className={styles.iconVanguard}>
                    <Check size={16} />
                  </div>
                  <div className={styles.pointText}>
                    <span className={styles.pointLabel}>{item.title}</span>
                    <span className={styles.pointDesc}>{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* 4-Step Execution Pipeline */}
        <motion.div
          className={styles.pipelineWrapper}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.pipelineHeader}>
            <h3 className={styles.pipelineTitle}>
              De la Idea a Producción en Semanas, No Meses
            </h3>
          </div>

          <div className={styles.stepsGrid}>
            {executionSteps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className={styles.stepCard}
              >
                <div className={styles.stepTopRow}>
                  <span className={styles.stepNumber}>PASO {step.num}</span>
                  <span className={styles.stepDuration}>{step.duration}</span>
                </div>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.desc}</p>
                <div className={styles.stepDeliverable}>
                  <CheckCircle2 size={14} />
                  <span>{step.deliverable}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

