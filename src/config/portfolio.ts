export interface CaseStudy {
  id: string;
  clientName: string;
  category:
    | "Extensiones & Herramientas"
    | "E-Commerce & Retail"
    | "SaaS & Web App"
    | "Branding & Growth";
  platform: string;
  featuredBadge?: string;
  title: string;
  tagline: string;
  summary: string;
  metrics: {
    label: string;
    value: string;
  }[];
  deliverables: string[];
  techHighlights: string[];
  gradient: string;
  accentColor: string;
}

export const caseStudiesCatalog: CaseStudy[] = [
  {
    id: "enterprise-360-asset-engine",
    clientName: "Sector Automotriz (NDA)",
    category: "Extensiones & Herramientas",
    platform: "Chrome Extension (Manifest V3)",
    featuredBadge: "De 12 Horas a 13 Minutos",
    title: "Suite 360°: Inyección Masiva de Catálogos",
    tagline:
      "De 12 horas de carga manual repetitiva a 13 minutos automatizados con cero errores.",
    summary:
      "Extensión corporativa que automatiza la creación de 259 directorios y la subida de más de 4.200 fotogramas 360° con auditoría en tiempo real para Cloud CMS.",
    metrics: [
      { label: "Reducción de Tiempo", value: "-98%" },
      { label: "Carpetas Creadas", value: "15 seg" },
      { label: "Assets Subidos", value: "13 min" },
    ],
    deliverables: [
      "Subida binaria concurrente con auto-aprobación de metadata",
      "Auditoría interactiva pre-vuelo (resolución, cuadros y peso)",
      "Dashboard visual de configuración sin tocar código a mano",
    ],
    techHighlights: ["Manifest V3", "TypeScript", "Cloud CMS"],
    gradient:
      "linear-gradient(135deg, rgba(245, 158, 11, 0.16), rgba(99, 102, 241, 0.14))",
    accentColor: "#f59e0b",
  },
  {
    id: "enterprise-content-tool-12-modules",
    clientName: "Equipos de QA Global (NDA)",
    category: "Extensiones & Herramientas",
    platform: "Chrome Extension (Manifest V3)",
    featuredBadge: "12 Módulos en Producción",
    title: "Content Tool: Autocompletado & Auditoría QA",
    tagline:
      "Doce herramientas especializadas unificadas en una sola extensión corporativa.",
    summary:
      "Automatiza el llenado de especificaciones técnicas e inyecta capas de diagnóstico visual en el DOM para detectar desvíos antes de publicar.",
    metrics: [
      { label: "Módulos Integrados", value: "12" },
      { label: "Tiempo en Specs", value: "-85%" },
      { label: "Fugas en QA", value: "0%" },
    ],
    deliverables: [
      "Autocompletado masivo desde hojas de cálculo",
      "Inspectores visuales en vivo para SEO y textos legales",
      "Recolector multi-nivel de rutas de publicación",
    ],
    techHighlights: ["Manifest V3", "DOM Mutation", "Isolated Worlds"],
    gradient:
      "linear-gradient(135deg, rgba(6, 182, 212, 0.16), rgba(99, 102, 241, 0.14))",
    accentColor: "#06b6d4",
  },
  {
    id: "pm-paths-manager-jira-validator",
    clientName: "Project Managers & Leads (NDA)",
    category: "Extensiones & Herramientas",
    platform: "Chrome Extension (Manifest V3)",
    featuredBadge: "Automatización Jira & CMS",
    title: "Paths Manager: Sincronización Jira & CMS",
    tagline:
      "Consolidación de rutas y verificación de servidores en un solo clic.",
    summary:
      "Escanea automáticamente tickets y sub-tareas en Jira, repara errores de formato y comprueba en paralelo que los recursos existan en producción.",
    metrics: [
      { label: "Consolidación", value: "1 Clic" },
      { label: "Falsos Positivos", value: "0%" },
      { label: "Módulos de Flujo", value: "3" },
    ],
    deliverables: [
      "Escáner en lote de sub-tareas con filtrado inteligente",
      "Motor Auto-Fix de locales y detección de conflictos",
      "Validador asíncrono con enlace directo al ticket con error",
    ],
    techHighlights: ["Jira REST API", "DOM Parser", "Manifest V3"],
    gradient:
      "linear-gradient(135deg, rgba(168, 85, 247, 0.16), rgba(99, 102, 241, 0.14))",
    accentColor: "#a855f7",
  },
  {
    id: "ecommerce-custom-tiendanube",
    clientName: "Marca Retail & E-Commerce",
    category: "E-Commerce & Retail",
    platform: "Tiendanube Custom Architecture",
    featuredBadge: "Alta Conversión & CRO",
    title: "E-Commerce de Alto Rendimiento & CRO",
    tagline:
      "De una plantilla estándar a una tienda exclusiva orientada a maximizar ventas.",
    summary:
      "Arquitectura a medida con checkout móvil sin fricción, navegación intuitiva y una identidad visual inmersiva que multiplica la tasa de conversión.",
    metrics: [
      { label: "Optimización Móvil", value: "100%" },
      { label: "Fricción en Checkout", value: "-45%" },
      { label: "Velocidad de Carga", value: "< 1s" },
    ],
    deliverables: [
      "Diseño de interfaz exclusivo y embudo optimizado",
      "Integración de analítica avanzada (GA4 y Meta Pixel)",
      "Compresión extrema de assets y carga ultrarrápida",
    ],
    techHighlights: ["Tiendanube Engine", "CRO", "Core Web Vitals"],
    gradient:
      "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.15))",
    accentColor: "#10b981",
  },
];
