"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, Clock, DollarSign } from "lucide-react";
import styles from "./RoiSimulator.module.css";

interface RoiSimulatorProps {
  onTriggerInquiry: (details: string) => void;
}

export const RoiSimulator: React.FC<RoiSimulatorProps> = ({
  onTriggerInquiry,
}) => {
  const [teamSize, setTeamSize] = useState<number>(10);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(6);
  const [hourlyCost, setHourlyCost] = useState<number>(25);

  // Calculations:
  // Custom browser extensions and automations recover ~65% of manual operational time
  const weeklyHoursLost = teamSize * hoursPerWeek;
  const yearlyHoursLost = weeklyHoursLost * 48; // 48 working weeks
  const yearlyHoursRecoverable = Math.round(yearlyHoursLost * 0.65);
  const yearlyCostSaved = yearlyHoursRecoverable * hourlyCost;
  const efficiencyRatio = Math.min(
    100,
    Math.round((yearlyHoursRecoverable / 3500) * 100)
  );
  const monthsEquivalent = (yearlyHoursRecoverable / 160).toFixed(1);

  const handleCtaClick = () => {
    const summary = `ROI_DIAGNOSIS::Equipo de ${teamSize} personas (${hoursPerWeek} hs/sem c/u) → Recuperación estimada de +${yearlyHoursRecoverable.toLocaleString(
      "es-ES"
    )} hs/año ($${yearlyCostSaved.toLocaleString("es-ES")} USD ahorrados/año)`;
    onTriggerInquiry(summary);
  };

  return (
    <section
      id="simulador"
      className={styles.section}
      aria-label="Simulador de Retorno de Inversión"
    >
      <div className="container">
        <motion.div
          className={styles.cardWrapper}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.header}>
            <h2 className={styles.title}>
              ¿Cuánto le cuestan los procesos manuales a{" "}
              <span className="gradient-text">tu empresa?</span>
            </h2>
            <p className={styles.desc}>
              Estimá el tiempo productivo y capital operativo que tu equipo
              recupera al implementar extensiones a medida y automatizaciones de alto rendimiento.
            </p>
          </div>

          <div className={styles.grid}>
            {/* Controls Column */}
            <div className={styles.controlsCol}>
              <div className={styles.controlGroup}>
                <div className={styles.controlLabelRow}>
                  <label
                    htmlFor="team-size-slider"
                    className={styles.controlLabel}
                  >
                    Personas en el equipo operativo
                  </label>
                  <span className={styles.controlValue}>
                    {teamSize} colaboradores
                  </span>
                </div>
                <input
                  id="team-size-slider"
                  type="range"
                  min="2"
                  max="80"
                  step="1"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.sliderHints}>
                  <span>2 personas</span>
                  <span>40</span>
                  <span>80+</span>
                </div>
              </div>

              <div className={styles.controlGroup}>
                <div className={styles.controlLabelRow}>
                  <label htmlFor="hours-slider" className={styles.controlLabel}>
                    Horas repetitivas por persona / semana
                  </label>
                  <span className={styles.controlValue}>
                    {hoursPerWeek} hs / semana
                  </span>
                </div>
                <input
                  id="hours-slider"
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.sliderHints}>
                  <span>2 hs</span>
                  <span>10 hs</span>
                  <span>20 hs</span>
                </div>
              </div>

              <div className={styles.controlGroup}>
                <div className={styles.controlLabelRow}>
                  <label htmlFor="cost-slider" className={styles.controlLabel}>
                    Costo promedio estimado por hora (USD)
                  </label>
                  <span className={styles.controlValue}>
                    ${hourlyCost} USD / h
                  </span>
                </div>
                <input
                  id="cost-slider"
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={hourlyCost}
                  onChange={(e) => setHourlyCost(Number(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.sliderHints}>
                  <span>$10</span>
                  <span>$50</span>
                  <span>$100+</span>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className={styles.resultsCol}>
              <div className={styles.resultsHeader}>
                <span className={styles.resultsTag}>Diagnóstico Proyectado</span>
                <span className={styles.resultsEquiv}>
                  ≈ {monthsEquivalent} meses-persona / año
                </span>
              </div>

              <div className={styles.metricCardsGrid}>
                <div className={styles.metricCard}>
                  <div className={styles.metricLabel}>
                    <Clock size={14} color="#34d399" />
                    <span>Tiempo Recuperado</span>
                  </div>
                  <motion.div
                    key={yearlyHoursRecoverable}
                    initial={{ scale: 0.94, opacity: 0.6 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className={styles.metricBigGreen}
                  >
                    +{yearlyHoursRecoverable.toLocaleString("es-ES")} hs
                  </motion.div>
                  <span className={styles.metricSub}>
                    ~65% de carga manual
                  </span>
                </div>

                <div className={styles.metricCard}>
                  <div className={styles.metricLabel}>
                    <DollarSign size={14} color="#38bdf8" />
                    <span>Ahorro Estimado / Año</span>
                  </div>
                  <motion.div
                    key={yearlyCostSaved}
                    initial={{ scale: 0.94, opacity: 0.6 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className={styles.metricBigCyan}
                  >
                    ${yearlyCostSaved.toLocaleString("es-ES")}{" "}
                    <span className={styles.currencyBadge}>USD</span>
                  </motion.div>
                  <span className={styles.metricSub}>
                    Capital operativo directo
                  </span>
                </div>
              </div>

              <div className={styles.efficiencyGauge}>
                <div className={styles.gaugeHeader}>
                  <span>Capacidad operativa liberada</span>
                  <span className={styles.gaugeValue}>
                    +{(teamSize * 0.65).toFixed(1)} colaboradores equiv.
                  </span>
                </div>
                <div className={styles.gaugeTrack}>
                  <motion.div
                    className={styles.gaugeFill}
                    animate={{ width: `${Math.min(100, Math.max(18, efficiencyRatio))}%` }}
                    transition={{ type: "spring", stiffness: 200, damping: 24 }}
                  />
                </div>
              </div>

              <button onClick={handleCtaClick} className={styles.ctaBtn}>
                <Calculator size={16} />
                <span>Agendar Diagnóstico Técnico</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
