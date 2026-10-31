# VANGUARDIK — Blueprint de Identidad, Arquitectura 2D/3D, Productos e Inversión

> Documento de alineación estratégica y técnica entre **Leandro Benac** y **Facundo Rodriguez Sabia** para definir el diseño final, la oferta comercial y el plan de lanzamiento de **Vanguardik**.

---

## 1. Nombre & Identidad de Marca

- **Nombre actual**: **Vanguardik** (`vanguardik.com`)
  - **Ventaja competitiva**: Dominio `.com` y posicionamiento en Google 100% libres (cero colisión SEO desde el día 1).
  - **Alternativa abierta**: Si aparece un nombre de 2 sílabas o impronta criolla con dominio libre que convenza a ambos, toda la web consume `src/config/site.ts`, por lo que cambiar el nombre lleva **menos de 30 segundos**.
- **Paleta & Estética ("Obsidian Cyber-HUD + 3D Perspective")**:
  - **Fondos**: Obsidian Void (`#06070a` / `#0c0e14`) con superficies glassmórficas (`backdrop-filter: blur(24px)`).
  - **Acentos de Luz**: Electric Indigo (`#6366f1`), Neon Cyan (`#06b6d4`), Emerald (`#10b981`) y Amber Gold (`#f59e0b`).
  - **Tipografía**: `Space Grotesk` (titulares geométricos, telemetría HUD y métricas) + `Plus Jakarta Sans` (lectura limpia y alta legibilidad B2B).

---

## 2. Dirección Visual & Tecnología 3D (Referencia: `re-the-drive.webflow.io` / Awwwards / Franco Beltramella)

Siguiendo la visión de Facu de combinar **2D + 3D + perspectivas + fluidez en mobile**, la arquitectura visual del repo ya implementa:

1. **Motor 3D WebGL con Three.js (`src/components/effects/VanguardScene3D.tsx`)**:
   - **Núcleo Holográfico 3D**: Estructura geodésica wireframe + nodos luminosos + núcleo energético cristalino + anillos giroscópicos orbitales en Three.js.
   - **Túnel Espacial en Eje Z**: Portales octagonales 3D en perspectiva y flujo de partículas reactivo al scroll y al movimiento del cursor.
   - **Optimización Mobile-First**: Control automático de `devicePixelRatio` (`<= 1.5` en mobile), ajuste de distancia focal de cámara según relación de aspecto vertical, y pausa automática del loop WebGL (`IntersectionObserver`) cuando el usuario baja a las secciones de lectura para mantener **100/100 en Core Web Vitals**.
2. **Híbrido 2D + 3D en Secciones (`HeroSection`, `ServicesBento`, `CaseStudyShowcase`)**:
   - **Hero Z-Dive**: Al hacer scroll, la cámara atraviesa el primer plano tipográfico 2D, vuela por el corredor 3D de Three.js y revela el **Command Core Deck** y las 4 tarjetas espaciales HUD.
   - **Tarjetas con Perspectiva 3D Real**: Inclinación interactiva (`rotateX`, `rotateY` con físicas de resorte) y capas flotantes en profundidad (`translateZ(24px)`) tanto en el catálogo de servicios como en el carrusel de casos de estudio.
   - **Próximo paso de Diseño (Facu + Lean)**: Iterar sobre esta base en Figma / Three.js / Shaders (o GSAP ScrollTrigger si quieren secuencias adicionales de modelos 3D GLTF/Spline por sección).

---

## 3. Mapa de Secciones de la Web (Estructura Actual Lista en el Repo)

1. **`01 // Hero (Inmersión 3D + Three.js)`**: Propuesta de valor central + inmersión de cámara en eje Z hacia el panel de telemetría.
2. **`02 // Tech Marquee & Proof Metrics`**: Cinta cinética reactiva a la velocidad del scroll + 4 métricas clave de autoridad (`< 0.8s`, `100%`, `+10x`).
3. **`03 // Arquitectura de Servicios (Interactive 3D Stage)`**: Selector con simulador interactivo en vivo para cada una de las 5 capacidades.
4. **`04 // El Motor Vanguardik (Comparativa & Metodología en 4 Pasos)`**: Trabajo manual tradicional vs. automatización determinística + pipeline de entrega en semanas.
5. **`05 // Casos de Estudio Reales (3D Carousel)`**:
   - *Caso 1*: Suite 360° Automotriz (De 12 horas a 13 minutos / -98% tiempo).
   - *Caso 2*: Content Tool de 12 Módulos (Autocompletado masivo + QA en DOM).
   - *Caso 3*: Paths Manager (Escáner en lote de Jira + Validador Pre-Publish).
   - *Caso 4*: E-Commerce Custom & CRO en Tiendanube.
6. **`06 // Simulador Interactivo de ROI B2B`**: Calculadora en vivo donde el cliente estima cuántas horas y dólares ahorra al año y envía esos datos directo al formulario.
7. **`07 // Seguridad por Diseño (OWASP ASVS / Zero-Trust)`**: Diferencial clave para venderle a empresas corporativas sin fricciones de IT.
8. **`08 // FAQ B2B + Drawer de Consulta Protegido`**: Respuestas sobre propiedad intelectual (100% del cliente), NDAs y formulario con validación Zod + Honeypot anti-bots.

---

## 4. Qué Productos Ofrecer (Matriz Comercial Empaquetada)

Para salir a vender rápido y con tickets claros, proponemos dividir la oferta en **3 Líneas de Producto ("Productized Services")**:

| Línea de Producto | ¿Qué es y qué resuelve? | Cliente Ideal | Tiempo de Entrega |
| :--- | :--- | :--- | :--- |
| **1. Experiencias Web 3D & Plataformas High-Impact** | Landing pages estilo *Awwwards* (Next.js + Three.js/WebGL + animaciones) y sitios corporativos que transmiten autoridad instantánea y convierten visitas en leads. | Startups Tech, Agencias, Desarrolladoras, Marcas Premium. | 2 a 4 semanas |
| **2. E-Commerce Custom & Optimización CRO** | Diseño y desarrollo a medida sobre **Tiendanube / Shopify** o custom, eliminando fricción móvil, mejorando velocidad y configurando tracking avanzado (GA4 + Meta Pixel). | Marcas Retail y E-Commerce en crecimiento que quieren vender más. | 2 a 3 semanas |
| **3. Extensiones Corporativas (Chrome MV3) & Automatización IA** | Herramientas internas privadas que eliminan carga manual en CMS/CRMs, validan QA en el DOM o conectan Jira/Planillas/IA ahorrando hasta un 85%-98% de tiempo operativo. | Equipos de Operaciones, Agencias de Contenido, Empresas B2B con flujos repetitivos. | 2 a 4 semanas |

---

## 5. Plan de Inversión Inicial (Cuánto y Cómo Invertir)

### Fase 1: Infraestructura Esencial (Costo Mínimo Operativo)
- **Dominio Oficial (`.com` / `.com.ar`)**: ~$12 – $15 USD / año (Cloudflare Registrar o Namecheap).
- **Hosting & Despliegue Edge**: **$0 USD / mes** en etapa inicial (Vercel Hobby/Pro o Cloudflare Pages con CDN global).
- **Correo Corporativo (`contacto@vanguardik.com`, `lean@`, `facu@`)**:
  - Opción Costo Cero: Cloudflare Email Routing (reenvío gratuito + envío SMTP vía Gmail/Resend).
  - Opción Google Workspace: ~$6 – $12 USD / mes por casilla.

### Fase 2: Adquisición de Clientes (¿Dónde poner capital y energía?)
1. **Canal Outbound B2B (Inversión $0 — Alto Retorno en Tickets Grandes)**:
   - Usar la propia web + videos cortos (Loom de 90 segundos) mostrando la experiencia 3D y los casos reales (ej. cómo una extensión baja 12 hs de carga a 13 min, o cómo transformar una tienda online).
   - Prospección directa por LinkedIn a Founders, E-Commerce Managers y Directores de Operaciones.
2. **Contenido & Autoridad Visual (Inversión de Tiempo Creativo)**:
   - Publicar breakdowns cortos de los efectos 3D (Three.js / WebGL) y automatizaciones en Reels / TikTok / LinkedIn / X, y postular la web de Vanguardik a **Awwwards / CSS Design Awards** para ganar prensa y tráfico calificado.
3. **Pauta Digital (Meta Ads / Google Search) — Cuando validen el primer embudo**:
   - Presupuesto sugerido de testeo: **$100 a $250 USD / mes** enfocados exclusivamente en decisores (E-Commerce que buscan rediseño en Tiendanube/Web o empresas que buscan desarrollo a medida).

