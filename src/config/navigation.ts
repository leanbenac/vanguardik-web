export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const headerNav: NavItem[] = [
  { label: "Servicios", href: "#servicios" },
  { label: "Método", href: "#metodo" },
  { label: "Casos de Éxito", href: "#casos" },
  { label: "Simulador ROI", href: "#simulador" },
  { label: "Seguridad", href: "#seguridad" },
  { label: "FAQ", href: "#faq" },
];

export const footerNav = {
  servicios: [
    { label: "Ingeniería de Software", href: "#servicios" },
    { label: "Extensiones Corporativas (Chrome)", href: "#servicios" },
    { label: "Diseño UI/UX Vanguardista", href: "#servicios" },
    { label: "Growth & CRO Marketing", href: "#servicios" },
    { label: "Automatizaciones & IA", href: "#servicios" },
  ],
  estudio: [
    { label: "Método & Propiedad Intelectual", href: "#metodo" },
    { label: "Simulador de Ahorro Operativo", href: "#simulador" },
    { label: "Blindaje & Seguridad", href: "#seguridad" },
    { label: "Preguntas Frecuentes", href: "#faq" },
  ],
};
