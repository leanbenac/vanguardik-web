export interface SiteConfig {
  name: string;
  legalName: string;
  logoPath: string;
  tagline: string;
  description: string;
  founders: string[];
  contactEmail: string;
  location: string;
  domain: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  metrics: {
    label: string;
    value: string;
    helper: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "Vanguardik",
  legalName: "Vanguardik Tech & Growth Agency",
  logoPath: "/images/vanguardik_logo.svg",
  tagline: "Ingeniería de Vanguardia, Automatización e Impacto Comercial.",
  description:
    "Estudio de ingeniería de software, extensiones corporativas (Chrome/Edge) y crecimiento digital acelerado. Desarrollamos plataformas web modernas y automatizaciones para startups y empresas B2B.",
  founders: ["Leandro Benac", "Facundo Rodriguez Sabia"],
  contactEmail: "contacto@vanguardik.com",
  location: "Buenos Aires / Remote Worldwide",
  domain: "https://vanguardik.com",
  socials: {
    github: "https://github.com/vanguardik",
    linkedin: "https://linkedin.com/company/vanguardik",
    twitter: "https://x.com/vanguardik_tech",
    instagram: "https://instagram.com/vanguardik.tech",
  },
  metrics: [
    {
      value: "100%",
      label: "Conversión y Retención",
      helper: "Arquitectura orientada a negocio",
    },
    {
      value: "< 0.8s",
      label: "Velocidad Sub-Segundo",
      helper: "100/100 Core Web Vitals",
    },
    {
      value: "24/7",
      label: "Disponibilidad",
      helper: "Monitoreo y despliegue continuo",
    },
    {
      value: "+10x",
      label: "Impacto Visual",
      helper: "Autoridad de marca inmediata",
    },
  ],
};
