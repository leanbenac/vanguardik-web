export interface ServiceConfig {
  id: string;
  slug: string;
  category: "Extensiones Web" | "Software" | "Diseño" | "Marketing" | "Automatización";
  title: string;
  tagline: string;
  shortDesc: string;
  highlightBadge?: string;
  accentColor: string; // Hex for glow accent
  deliverables: string[];
  techStack: string[];
  idealFor: string;
}

export const servicesCatalog: ServiceConfig[] = [
  {
    id: "browser-extensions",
    slug: "extensiones-de-navegador",
    category: "Extensiones Web",
    title: "Extensiones Corporativas (Chrome & Edge)",
    tagline: "Automatiza procesos operativos y elimina tareas repetitivas en el navegador de tu equipo.",
    shortDesc:
      "Automatizaciones privadas bajo Manifest V3: inyección masiva de datos en CMS/CRMs, auditores visuales de QA y herramientas internas que eliminan horas de carga manual.",
    highlightBadge: "ROI Inmediato",
    accentColor: "#f59e0b", // Amber Gold Glow
    deliverables: [
      "Desarrollo bajo estándar Manifest V3 (Chrome & Edge)",
      "Autocompletado masivo de catálogos y especificaciones",
      "Auditoría visual en tiempo real sobre el DOM (SEO y legales)",
      "Distribución privada vía Google Workspace / Políticas de TI",
      "Arquitectura Zero-Sink (OWASP ASVS) y soporte continuo",
    ],
    techStack: ["Manifest V3", "Chrome Enterprise APIs", "TypeScript", "Isolated Worlds", "REST / JCR JSON", "Service Workers"],
    idealFor: "Empresas B2B, equipos editoriales y startups que buscan multiplicar la velocidad operativa eliminando carga manual.",
  },
  {
    id: "software-engineering",
    slug: "desarrollo-software-web",
    category: "Software",
    title: "Ingeniería Web & Software a Medida",
    tagline: "Arquitectura moderna de software, APIs robustas y rendimiento extremo.",
    shortDesc:
      "Plataformas web de alta velocidad, microservicios y portales empresariales con tiempos de respuesta subsegundo y estándares bancarios de seguridad.",
    highlightBadge: "Core Capability",
    accentColor: "#6366f1", // Electric Indigo
    deliverables: [
      "Plataformas Web y aplicaciones Cloud a medida",
      "Arquitectura escalable y microservicios serverless",
      "Integraciones de pagos (Stripe, Mercado Pago) y sistemas internos",
      "APIs seguras con Zero-Trust y rate-limiting",
      "Optimización 100/100 Core Web Vitals (< 0.8s LCP)",
    ],
    techStack: ["TypeScript", "Next.js / React", "Node.js", "PostgreSQL", "Vanilla CSS", "Docker"],
    idealFor: "Empresas y startups que buscan una plataforma profesional que convierta y escale sin caerse.",
  },
  {
    id: "vanguard-design-ux",
    slug: "diseno-ux-vanguardia",
    category: "Diseño",
    title: "Diseño UI/UX & Motion de Vanguardia",
    tagline: "Interfaces inmersivas que cautivan, generan estatus y disparan la retención.",
    shortDesc:
      "Sistemas de diseño modulares, micro-interacciones fluidas y experiencias 3D inmersivas que transmiten autoridad de marca instantánea.",
    highlightBadge: "High Impact",
    accentColor: "#06b6d4", // Neon Cyan
    deliverables: [
      "Sistemas de diseño modulares (Design Tokens)",
      "Micro-interacciones y transiciones fluidas en 60 FPS",
      "Prototipos interactivos en Figma de alta fidelidad",
      "Dirección de arte y branding tecnológico",
      "Diseño adaptable optimizado para móvil y retina",
    ],
    techStack: ["Figma", "Framer Motion", "Design Systems", "3D CSS & SVG FX", "CSS Modules"],
    idealFor: "Marcas que no quieren parecer una plantilla genérica y necesitan transmitir autoridad instantánea.",
  },
  {
    id: "performance-growth-marketing",
    slug: "growth-marketing-adquisicion",
    category: "Marketing",
    title: "Growth Marketing & Optimización CRO",
    tagline: "Estrategia de conversión, SEO técnico y embudos de venta que generan pipeline real.",
    shortDesc:
      "Embudos de venta de alta conversión, SEO técnico y analítica avanzada orientados exclusivamente a generar pipeline comercial.",
    highlightBadge: "ROI Driven",
    accentColor: "#10b981", // Emerald Mint
    deliverables: [
      "Páginas de aterrizaje optimizadas para conversión (CRO)",
      "SEO técnico de alta velocidad y posicionamiento orgánico",
      "Configuración de analítica avanzada (GA4, PostHog, Tag Manager)",
      "Embudos B2B/B2C con calificación interactiva de leads",
      "Campañas publicitarias de precisión (Meta & Google Ads)",
    ],
    techStack: ["Google Analytics 4", "Search Console", "Meta Ads Manager", "PostHog", "CRO Testing"],
    idealFor: "Negocios que buscan transformar tráfico web en reuniones comerciales calificadas y ventas.",
  },
  {
    id: "ai-automations",
    slug: "agentes-ia-automatizacion",
    category: "Automatización",
    title: "Agentes de IA & Automatización de Flujos",
    tagline: "Sustituye horas de trabajo manual con workflows autónomos e inteligencia aplicada.",
    shortDesc:
      "Workflows autónomos conectados con tus CRMs, bases de conocimiento y mensajería para operar 24/7 sin fricción manual.",
    highlightBadge: "Future Ready",
    accentColor: "#a855f7", // Violet Glow
    deliverables: [
      "Agentes LLM conectados a bases de conocimiento propias",
      "Calificación y enrutamiento automático de leads en tiempo real",
      "Sincronización bidireccional entre Webhooks y CRMs",
      "Paneles de telemetría para monitoreo de métricas clave",
    ],
    techStack: ["OpenAI / Gemini APIs", "Python / Node", "Webhooks", "Make / n8n", "PostgreSQL"],
    idealFor: "Empresas que quieren escalar su capacidad operativa sin multiplicar linealmente sus costos de equipo.",
  },
];
