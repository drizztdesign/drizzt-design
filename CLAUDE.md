# CLAUDE.md — Drizzt Design

> **⚠ Proyecto en paralelo con Gausark (`a:\gausarkpremiumweb\`)**
>
> Cualquier mejora **genérica** (form, deploy, scroll-video, SEO, accesibilidad,
> performance, fix de bug) **DEBE aplicarse a ambos proyectos** sin esperar a que
> el usuario lo pida explícitamente.
>
> Solo el contenido específico (copy, colores de marca, fotos, datos de cliente)
> queda en este proyecto.

## Marca

**Drizzt Design** — Estudio propio de diseño y desarrollo web. Target:
estudios de arquitectura, ingeniería y servicios profesionales.

## Stack y convenciones

- HTML + CSS + JS puro (sin frameworks)
- Tipografías: Space Grotesk (display) + Inter (body)
- Paleta: charcoal `#0a0a0a` + azul cielo `#60a5fa` (sky-400)
- 5 páginas: index, servicios, proyectos, nosotros, contacto
- Hero preparado para scroll-driven video (placeholder hasta que llegue el clip)
- SEO completo (Schema.org ProfessionalService)

## Producción

- 🌐 https://drizzt-design.vercel.app/
- 📦 https://github.com/drizztdesign/drizzt-design
- Auto-deploy: cada `git push origin main` despliega solo

## Para desplegar cambios

```bash
bash .claude/scripts/deploy.sh "mensaje commit"
# o desde Claude Code:
/deploy "mensaje commit"
```

## Aplicar cambio en ambos proyectos (workflow obligatorio)

Cuando hagas un cambio genérico aquí, repítelo en `a:\gausarkpremiumweb\`:

```bash
# 1. Aplicar cambio en este proyecto
# 2. Aplicar cambio equivalente en Gausark
# 3. /deploy en ambos
# 4. Confirmar al usuario: "Aplicado en Drizzt y Gausark"
```

Si el patrón también amerita actualizar el kit (`a:\CLAUDESKILLS\.claude\skills\`),
hacerlo y sincronizar al plugin global.

## Pendiente

- Vídeo de transición para el hero (cuando lo envíe Juan)
- Email/Instagram reales (placeholders: `hola@drizzt.design` / `#`)
- IDs reales del Google Form (form_id + entries — ver comentario en contacto.html)
- Llenar las 3 cards de portfolio restantes en `proyectos.html`
