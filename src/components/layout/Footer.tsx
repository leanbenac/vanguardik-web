"use client";

import React from "react";
import { Mail, ArrowUpRight, ArrowUp } from "lucide-react";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/config/navigation";
import { VanguardLogo } from "@/components/ui/VanguardLogo";
import styles from "./Footer.module.css";

const GithubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.3 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand Column (1) */}
          <div className={styles.brandCol}>
            <div className={styles.brandLogo}>
              <span className={styles.brandMarkBox}>
                <VanguardLogo size={18} />
              </span>
              <span>{siteConfig.name}</span>
            </div>
            <p className={styles.tagline}>
              Ingeniería de software, extensiones corporativas y plataformas web ultrarrápidas para empresas de alto rendimiento.
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className={styles.emailLink}
            >
              <Mail size={15} />
              <span>{siteConfig.contactEmail}</span>
              <ArrowUpRight size={14} className={styles.emailArrow} />
            </a>
          </div>

          {/* Column 2: Servicios Modulares */}
          <div>
            <h4 className={styles.columnTitle}>Servicios Modulares</h4>
            <ul className={styles.linkList}>
              {footerNav.servicios.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className={styles.footerLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Estudio & Seguridad */}
          <div>
            <h4 className={styles.columnTitle}>Estudio & Seguridad</h4>
            <ul className={styles.linkList}>
              {footerNav.estudio.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className={styles.footerLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} {siteConfig.legalName}. Fundado por{" "}
            <span className={styles.founderHighlight}>
              {siteConfig.founders.join(" & ")}
            </span>
            .
          </div>

          <div className={styles.bottomRight}>
            <div className={styles.socialRow}>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub de ${siteConfig.name}`}
                className={styles.socialBtn}
              >
                <GithubIcon />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn de ${siteConfig.name}`}
                className={styles.socialBtn}
              >
                <LinkedinIcon />
              </a>
              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Twitter de ${siteConfig.name}`}
                className={styles.socialBtn}
              >
                <XIcon />
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram de ${siteConfig.name}`}
                className={styles.socialBtn}
              >
                <InstagramIcon />
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className={styles.backToTop}
              aria-label="Volver al inicio"
            >
              <span>Volver arriba</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
