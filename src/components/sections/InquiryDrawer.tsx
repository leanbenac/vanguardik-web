"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";
import { siteConfig } from "@/config/site";
import styles from "./InquiryDrawer.module.css";

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const VALID_OPTIONS = [
  "Extensiones Corporativas & Herramientas Internas (Chrome, Edge)",
  "Ingeniería Web & Software Escalable",
  "Diseño de Vanguardia, UI/UX & Motion",
  "Growth Marketing & Adquisición Acelerada",
  "Agentes de IA & Automatización de Procesos",
  "Ecosistema Integral (Tech + Design + Marketing)",
];

function getInitialFormState(initialService: string) {
  if (initialService.startsWith("ROI_DIAGNOSIS::")) {
    const diagnosisText = initialService.replace("ROI_DIAGNOSIS::", "");
    return {
      serviceCategory:
        "Extensiones Corporativas & Herramientas Internas (Chrome, Edge)",
      message: `[Diagnóstico Simulador ROI: ${diagnosisText}]\n\nHola, nos gustaría evaluar una solución de automatización para nuestro equipo.`,
    };
  }
  if (initialService.startsWith("Caso:")) {
    const isExtensionCase = initialService.toLowerCase().includes("cms");
    return {
      serviceCategory: isExtensionCase
        ? "Extensiones Corporativas & Herramientas Internas (Chrome, Edge)"
        : "Ingeniería Web & Software Escalable",
      message: `Me interesa desarrollar una solución similar a "${initialService.replace(
        "Caso: ",
        ""
      )}". `,
    };
  }
  if (VALID_OPTIONS.includes(initialService)) {
    return {
      serviceCategory: initialService,
      message: "",
    };
  }
  return {
    serviceCategory: VALID_OPTIONS[0],
    message: "",
  };
}

export const InquiryDrawer: React.FC<InquiryDrawerProps> = ({
  isOpen,
  onClose,
  initialService = "",
}) => {
  const initialDefaults = getInitialFormState(initialService);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    serviceCategory: initialDefaults.serviceCategory,
    message: initialDefaults.message,
    _hp: "", // Honeypot trap
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Ocurrió un error al enviar el formulario."
        );
      }

      // Success
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#06b6d4", "#10b981"],
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Error desconocido.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleResetAndClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
      >
        <button
          onClick={handleResetAndClose}
          className={styles.closeBtn}
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <div className={styles.modalHeader}>
              <h2 id="inquiry-title" className={styles.modalTitle}>
                Hablemos de Tu Proyecto
              </h2>
              <p className={styles.modalDesc}>
                Completa el formulario y analizaremos tu caso para preparar una
                propuesta de arquitectura técnica, automatización o crecimiento.
              </p>
            </div>

            {errorMsg && <div className={styles.errorBanner}>{errorMsg}</div>}

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Invisible Honeypot field for bot protection */}
              <input
                type="text"
                name="_hp"
                value={formData._hp}
                onChange={handleChange}
                className={styles.honeypot}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">
                  Nombre completo *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">
                  Email de contacto / corporativo *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="nombre@empresa.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="company">
                  Empresa o Proyecto actual
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Nombre de tu empresa (opcional)"
                  value={formData.company}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="serviceCategory">
                  Área principal de interés
                </label>
                <select
                  id="serviceCategory"
                  name="serviceCategory"
                  value={formData.serviceCategory}
                  onChange={handleChange}
                  className={styles.select}
                >
                  {VALID_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} style={{ background: "#0c0e14" }}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="message">
                  Cuéntanos sobre tus objetivos *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="¿Qué desafío buscas resolver y en qué plazos?"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={styles.submitBtn}
                id="submit-inquiry-btn"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Enviando de forma segura...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar Consulta Segura</span>
                    <Send size={16} />
                  </>
                )}
              </button>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  color: "var(--text-muted)",
                  fontSize: "12px",
                  marginTop: "6px",
                }}
              >
                <ShieldCheck size={14} color="var(--accent-emerald)" />
                <span>
                  Datos protegidos con cifrado y validación Zero-Trust
                </span>
              </div>
            </form>
          </>
        ) : (
          <div className={styles.successBox}>
            <div className={styles.successIcon}>
              <CheckCircle2 size={32} />
            </div>
            <h3 className={styles.successTitle}>¡Mensaje Enviado con Éxito!</h3>
            <p className={styles.successText}>
              Gracias {formData.name}. Hemos recibido los detalles de tu
              consulta. El equipo fundador de {siteConfig.name} ({siteConfig.founders.join(" y ")}) revisará tu
              solicitud y te responderá en un plazo máximo de 24 horas.
            </p>
            <button
              onClick={handleResetAndClose}
              className={styles.submitBtn}
              style={{ margin: "0 auto" }}
            >
              Listo, Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
