<div align="center">

# ⚡ VANGUARDIK
### Engineering of the Vanguard · Corporate Browser Extensions · Commercial Impact
**The Official Digital Headquarters of Vanguardik Agency**

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict%205.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL%203D-049EF4?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Lenis Scroll](https://img.shields.io/badge/Lenis-Inertia%20Smooth%20Scroll-6366F1?style=for-the-badge)](https://lenis.darkroom.engineering/)
[![OWASP Zero-Trust](https://img.shields.io/badge/OWASP-Zero--Trust%20ASVS-10B981?style=for-the-badge&logo=shield)](https://owasp.org/)
[![Core Web Vitals](https://img.shields.io/badge/Lighthouse-100%2F100-06B6D4?style=for-the-badge&logo=lighthouse&logoColor=white)](https://pagespeed.web.dev/)

<p align="center">
  <b>Fundada y liderada por <a href="https://github.com/vanguardik">Leandro Benac</a> & <a href="https://github.com/vanguardik">Facundo Rodriguez Sabia</a>.</b><br/>
  <i>Desarrollamos infraestructura web de élite, extensiones corporativas de navegador y sistemas de adquisición para startups y empresas de alta escala.</i>
</p>

[🌐 Visitar Sitio Web](https://vanguardik.com) · [📬 Contactar Dirección](mailto:contacto@vanguardik.com) · [🏛️ Arquitectura Técnica](docs/VANGUARDIK_BLUEPRINT.md)

</div>

---

## 👥 Fundadores & Liderazgo de la Agencia

| Co-Fundador | Especialidad & Rol | Contacto |
| :--- | :--- | :--- |
| **Leandro Benac** | Dirección Técnica, Arquitectura Web & Automatizaciones | [GitHub](https://github.com/leanbenac) · [LinkedIn](https://linkedin.com) |
| **Facundo Rodriguez Sabia** | Estrategia de Crecimiento, Producto & Expansión Comercial | [LinkedIn](https://linkedin.com) |

> *"Ningún cuello de botella sobrevive a Vanguardik. Diseñamos plataformas con velocidad sub-segundo, blindaje de seguridad desde el día cero y arquitectura orientada a conversión comercial."*

---

## 🏛️ Pilares de Ingeniería & Diseño

1. **Estética Vanguard (Obsidian & Neon Accents)**:
   - Paleta cromática profunda con fondo obsidiana (`#06070a`), contrastes de titanio puro (`#f8fafc`) y acentos de alta frecuencia (`#6366f1` Electric Indigo, `#06b6d4` Neon Cyan, `#10b981` Emerald).
   - Fondos con gradientes radiales activos y desenfoques vítreos (`backdrop-filter: blur(12px)`).
2. **Inertia Smooth Scroll con Lenis**:
   - Scroll cinemático ultra fluido impulsado por `lenis` con aceleración exponencial (`1.15s`), sincronizado con animaciones Three.js y Framer Motion sin bloqueos de hilo principal.
3. **Marquesina Tecnológica Dinámica**:
   - Logotipos SVG vectoriales de alta precisión (Next.js, Chrome MV3, TypeScript, Three.js, OpenAI, Supabase, OWASP, Tailwind, Lighthouse, AWS).
   - Desaceleración cinemática fluida al hacer hover y resplandor reactivo en el color característico de cada tecnología.
4. **Blindaje de Seguridad Enterprise (Zero-Trust)**:
   - Cabeceras HTTP endurecidas en `next.config.ts`: `Content-Security-Policy` estricta, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` y HSTS forzado.
   - Validación y sanitización estricta de formularios y endpoints vía esquemas Zod (`src/lib/validations.ts`).
   - Rate limiting por IP y trampa invisible honeypot (`_gotcha`) contra bots maliciosos y scraping.
5. **Arquitectura Config-Driven**:
   - Cada servicio, caso de éxito o elemento de navegación está desacoplado del código JSX en `src/config/services.ts`, `src/config/navigation.ts` y `src/config/site.ts`.

---

## 🛠️ Stack Tecnológico

```
Frontend & Core:     Next.js 16 (App Router + Turbopack) · React 19 · TypeScript Strict
3D & Motion:         Three.js WebGL · Framer Motion · Lenis Inertia Scroll
Styling:             Vanilla CSS Tokens · CSS Modules · Responsive Fluid Design
Security & Backend:  Zod Schemas · Rate Limiter Memory Cache · Zero-Trust Headers
Icons:               Lucide Icons · Custom Precision SVGs
Testing & Audit:     100/100 Core Web Vitals · Strict Linting · Zero TypeScript Errors
```

---

## 🚀 Inicio Rápido (Desarrollo Local)

### Prerrequisitos
- Node.js 20+ o superior
- npm o pnpm

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO_O_ORG/vanguardik-web.git
cd vanguardik-web

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la plataforma activa con Hot Module Replacement (HMR).

### Compilación para Producción

```bash
# Auditar tipos y compilar bundle optimizado
npm run build

# Ejecutar el servidor de producción
npm run start
```

---

## 📬 Adaptador de Notificaciones de Leads

El endpoint seguro `POST /api/inquiry` procesa consultas comerciales, las sanitiza y las reenvía instantáneamente vía webhook a Discord, Telegram o Slack.

Crea un archivo `.env.local` basado en `.env.example`:

```env
LEAD_WEBHOOK_URL="https://discord.com/api/webhooks/..." # URL de tu webhook corporativo
```

---

## 📄 Licencia & Propiedad

Copyright © 2026 **Vanguardik Tech & Growth Agency**.  
Fundado por **Leandro Benac & Facundo Rodriguez Sabia**. Todos los derechos reservados.
