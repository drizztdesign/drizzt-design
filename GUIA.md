# Guía de construcción — Drizzt Design

Bitácora cronológica de la web propia del estudio.

## Stack y decisiones generales

**Cliente:** Drizzt Design (estudio propio)
**Sector:** Diseño y desarrollo web para estudios profesionales
**Stack:** HTML + CSS + JavaScript puro
**Tipografías:** Space Grotesk (display) + Inter (body) — vibe tech/editorial
**Paleta:** charcoal (#0a0a0a) + naranja vibrante (#fb923c) — diferenciado de Gausark
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

## 4. Diseño y UI

### 2026-04-26 — Hero preparado para vídeo de transición pendiente

**Qué:** El hero usa el patrón `scroll-video` con wrapper sticky 175vh, pero con un placeholder `.hero-placeholder` (gradiente animado naranja/charcoal) en lugar del `<video>`. El JS de scroll-video está comentado.
**Por qué:** El usuario aún no ha enviado el clip de transición. La web ya luce bien con el placeholder; cuando llegue el vídeo solo hay que descomentar el `<video>` y el script.
**Cómo:** Comentario claro en el HTML del hero indicando exactamente qué descomentar.
**Archivos:** index.html

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
