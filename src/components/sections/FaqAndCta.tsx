"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CtaTacticalHorizon } from "./CtaTacticalHorizon";
import styles from "./FaqAndCta.module.css";

interface FaqAndCtaProps {
  onOpenInquiry: () => void;
}

const faqs = [
  {
    q: "¿Cómo se distribuyen las extensiones corporativas sin hacerlas públicas?",
    a: "Desarrollamos bajo estándar Manifest V3 con despliegue privado vía Google Workspace Admin, políticas de TI o enlaces restringidos al dominio de tu empresa.",
  },
  {
    q: "¿Quién es dueño del código fuente y la propiedad intelectual?",
    a: "Tu empresa es dueña del 100% del código fuente, repositorios y documentación desde la entrega, sin licencias cerradas ni ataduras.",
  },
  {
    q: "¿Trabajan bajo acuerdos de confidencialidad (NDA)?",
    a: "Sí. Firmamos acuerdos de confidencialidad (NDA) desde el diagnóstico inicial y operamos bajo arquitectura Zero-Trust dentro de tu entorno.",
  },
  {
    q: "¿Con qué plataformas, CMS o CRMs pueden integrarse?",
    a: "Con cualquier sistema web o corporativo: Salesforce, HubSpot, Jira, AEM, Tiendanube, Shopify, ERPs internos y APIs REST/GraphQL.",
  },
  {
    q: "¿Cuánto tiempo toma lanzar una primera versión funcional (MVP)?",
    a: "Entregamos el primer prototipo funcional en 1 a 2 semanas, y el despliegue final en producción entre las semanas 3 y 4.",
  },
];

export const FaqAndCta: React.FC<FaqAndCtaProps> = ({ onOpenInquiry }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <>
      <section
        id="faq"
        className={styles.section}
        aria-labelledby="faq-section-title"
      >
      <div className="container">
        {/* FAQ Accordion */}
        <div className={styles.faqContainer}>
          <div className={styles.header}>
            <h2 id="faq-section-title" className={styles.title}>
              Claridad técnica antes de <span className="gradient-text">construir.</span>
            </h2>
            <p className={styles.subtitle}>
              Respuestas directas sobre propiedad intelectual, despliegue privado y arquitectura.
            </p>
          </div>

          <div className={styles.accordionList}>
            {faqs.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={`${styles.faqItem} ${
                    isOpen ? styles.faqItemOpen : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className={styles.faqTrigger}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <span
                      className={`${styles.chevronBox} ${
                        isOpen ? styles.chevronOpen : ""
                      }`}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: "easeOut" }}
                      >
                        <div className={styles.faqAnswer}>{item.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>

      {/* High-Impact Tactical Scrollytelling Horizon for Building the Technical Advantage */}
      <CtaTacticalHorizon onOpenInquiry={onOpenInquiry} />
    </>
  );
};

