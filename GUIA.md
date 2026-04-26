# Guía de construcción — Drizzt Design

Bitácora cronológica de la web propia del estudio.

## Stack y decisiones generales

**Cliente:** Drizzt Design (estudio propio)
**Sector:** Diseño y desarrollo web para estudios profesionales
**Stack:** HTML + CSS + JavaScript puro
**Tipografías:** Space Grotesk (display) + Inter (body) — vibe tech/editorial
**Paleta:** charcoal (#0a0a0a) + azul cielo vibrante (#60a5fa, hover #3b82f6) — diferenciado de Gausark
**Páginas:** index, servicios, proyectos, nosotros, contacto

## 1. Decisiones iniciales

### 2026-04-26 — Crear web propia del estudio Drizzt Design

**Qué:** Iniciado el proyecto en `a:\drizzt-design\` siguiendo los patrones del kit `crear-web-premium`. Marca propia para el estudio (Juan), separada del proyecto cliente Gausark.
**Por qué:** Tener una web profesional propia que sirva de tarjeta de presentación para captar clientes futuros, y al mismo tiempo demostrar el nivel de calidad del trabajo.
**Cómo:** Estructura inicial replicada del orquestador. Hero preparado con `<!-- SCROLL-VIDEO-SECTION -->` esperando vídeo del usuario.
**Archivos:** index.html, servicios.html, proyectos.html, nosotros.html, contacto.html, sitemap.xml, robots.txt, .gitignore, .claude/

## 2. Setup del proyecto

### 2026-04-26 — Skills locales y scripts de deploy

**Qué:** Copiadas las 4 skills core del kit (`scroll-video`, `seo-optimizer`, `deploy-github-vercel`, `guia-progresiva`) y los scripts `setup-deploy.sh` + `deploy.sh` al proyecto.
**Por qué:** Proyecto autocontenido — no depende del plugin global para funcionar.
**Archivos:** .claude/skills/, .claude/scripts/, .claude/commands/deploy.md

## 3. Estructura y arquitectura

### 2026-04-26 — Generar las 5 páginas con identidad propia

**Qué:** Creadas todas las páginas con paleta dark + naranja vibrante (#fb923c) distinta de Gausark (#ff9901). Tipografías Space Grotesk + Inter para vibe tech-editorial. Cada página independiente con su CSS inline (patrón web-rebuilder).
**Cómo:** Diseño editorial con bordes finos, números grandes en las secciones, hover con borde naranja en cards, hero asimétrico alineado a la izquierda.
**Archivos:** index.html, servicios.html, proyectos.html, nosotros.html, contacto.html

> Paleta cambiada el 2026-04-26 a tonos azulados: ver entrada en _Diseño y UI_.

## 4. Diseño y UI

### 2026-04-26 — Hero preparado para vídeo de transición pendiente

**Qué:** El hero usa el patrón `scroll-video` con wrapper sticky 175vh, pero con un placeholder `.hero-placeholder` (gradiente animado naranja/charcoal) en lugar del `<video>`. El JS de scroll-video está comentado.
**Por qué:** El usuario aún no ha enviado el clip de transición. La web ya luce bien con el placeholder; cuando llegue el vídeo solo hay que descomentar el `<video>` y el script.
**Cómo:** Comentario claro en el HTML del hero indicando exactamente qué descomentar.
**Archivos:** index.html

> Paleta cambiada el 2026-04-26 a tonos azulados: ahora el gradiente del placeholder es azul/charcoal.

### 2026-04-26 — Cambiar paleta principal de naranja a tonos azulados

**Qué:** Reemplazado el accent naranja (`#fb923c` / hover `#ea7c1f`) por azul cielo vibrante (`#60a5fa` / hover `#3b82f6`) en las 5 páginas. También actualizados los gradientes radiales del hero del index (`rgba(251,146,60,...)` → `rgba(96,165,250,...)`).
**Por qué:** El usuario pidió tonos azulados como color principal. El azul `#60a5fa` (sky-400) mantiene contraste WCAG AA sobre el charcoal `#0a0a0a` y conserva el carácter premium del diseño editorial.
**Cómo:** `replace_all` sobre los hex `#fb923c` → `#60a5fa` y `#ea7c1f` → `#3b82f6` en cada HTML, más reemplazo manual de los dos `rgba(251,146,60,...)` en index.html.
**Archivos:** index.html, servicios.html, proyectos.html, nosotros.html, contacto.html

### 2026-04-26 — Capa visual premium "Tech / Glow" en las 5 páginas

**Qué:** Subido el nivel visual del sitio de "editorial sobrio" a award-site. Añadido `assets/premium.css` (~470 líneas) y `assets/premium.js` (~190 líneas) compartidos entre los 5 HTML, con: mesh-gradient orbs azules con parallax al mouse, cursor custom magnético, kinetic typography en H1 (reveal letra a letra), gradient-text animado en `<em>`, eyebrow pill con dot pulsante, glassmorphism + 3D tilt en cards (`.servicio`, `.proyecto`, `.principio`, `.proyecto-card`), word-by-word reveal en H2 con `.word-reveal`, scroll-progress bar superior con gradient azul→cyan, page transitions wipe entre navegaciones internas (solo si referrer mismo origen), marquee horizontal de servicios en index, footer monumental "DRIZZT DESIGN" en 21vw como obra gráfica, IntersectionObserver para fade+slide on-scroll, CTAs con gradient + glow box-shadow, hover underline-glow en nav, secciones translúcidas para que se vean los orbs detrás.
**Por qué:** El usuario lo dejó claro: _"de aquí nos van a contratar"_. Y luego: _"haz que siempre sea así, en todos los proyectos en los que te diga que quiero una web premium"_. La web del estudio tiene que vender el estudio — el lenguaje visual ES la cartera. Establecido como baseline para todo proyecto futuro etiquetado como "premium" (guardado en memoria global del usuario).
**Cómo:** Construidos `assets/premium.css` y `assets/premium.js` como capa única. En cada uno de los 5 HTML inyectado: `<link>` a premium.css tras el `<style>` inline, divs `.scroll-progress` + `.orbs` (con 3 hijos) tras `<body>`, `.footer-monumental` antes de `.footer-bottom`, `.cursor` + `.page-transition` + `<script>` premium.js antes de `</body>`. Solo en index: marquee tras hero y `.word-reveal` en los 4 H2 de sección. Sin libs externas, todo vanilla. Respeta `prefers-reduced-motion` (apaga animaciones complejas) y mobile (oculta cursor custom, tilt, 2 de los 3 orbs).
**Archivos:** assets/premium.css, assets/premium.js, index.html, servicios.html, proyectos.html, nosotros.html, contacto.html

## 5. Contenido y datos

## 6. Integraciones externas

## 7. Funcionalidades

## 8. Performance y SEO

### 2026-04-26 — SEO completo aplicado a las 5 páginas

**Qué:** Meta tags, Open Graph, Twitter Cards, JSON-LD (ProfessionalService + WebSite + ItemList + AboutPage + ContactPage según corresponda), sitemap.xml y robots.txt. Canonicals apuntando a `https://drizzt-design.vercel.app/`.
**Archivos:** los 5 HTML + sitemap.xml + robots.txt

## 9. Deploy e infraestructura

## 10. Mantenimiento y notas

### Pendiente cuando llegue el vídeo de transición:

1. Subir el `.mp4` original a `assets/hero.mp4`
2. Ejecutar el re-encoding con FFmpeg (ver skill `scroll-video`):
   - Versión desktop: `assets/hero-scrub.mp4` (CRF 14, all I-frames)
   - Versión móvil 720p: `assets/hero-scrub-mobile.mp4`
3. Generar `assets/og-image.jpg` desde un frame del vídeo
4. En `index.html`:
   - Reemplazar `<div class="hero-placeholder"></div>` por el `<video>` (ver comentario en el HTML)
   - Descomentar el bloque `SCROLL-VIDEO STUB` al final del `<script>`
5. `/deploy "Vídeo hero añadido"`

### Pendiente de revisar:
- Email real del estudio (placeholder: hola@drizzt.design)
- Cuenta Instagram / LinkedIn
- ID Formspree del formulario de contacto
- Logo del estudio (si lo hay) → favicon + brand del header
- Llenar las cards de portfolio reales
