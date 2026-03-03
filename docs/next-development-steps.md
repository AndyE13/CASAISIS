# Próximos pasos de desarrollo (fase inicial)

## 1) Diagnóstico rápido del repositorio actual

Estado observado:
- `index.html` tenía solo el bloque de contacto, mientras que los estilos y scripts ya contemplaban muchas más secciones (hero, impacto, programas, donación, footer).
- El CSS y JS ya estaban preparados para una landing completa, pero faltaba el ensamblaje semántico de HTML.
- El formulario Netlify ya estaba bien encaminado y se conservó sin romper el flujo.

## 2) Estructura de carpetas recomendada (escalable y React-friendly)

> Objetivo: separar claramente **contenido**, **presentación** y **comportamiento** para futura migración a componentes.

```text
/
├─ index.html
├─ pages/
│  ├─ nosotros.html
│  ├─ programas.html
│  ├─ transparencia.html
│  └─ contacto.html
├─ css/
│  ├─ styles.css
│  ├─ base/
│  │  ├─ variables.css
│  │  ├─ reset.css
│  │  └─ utilities.css
│  ├─ layout/
│  │  ├─ header.css
│  │  ├─ footer.css
│  │  └─ sections.css
│  └─ components/
│     ├─ buttons.css
│     ├─ cards.css
│     ├─ forms.css
│     └─ carousel.css
├─ js/
│  ├─ main.js
│  ├─ modules/
│  │  ├─ navbar.js
│  │  ├─ smooth-scroll.js
│  │  ├─ counters.js
│  │  ├─ animations.js
│  │  ├─ donations.js
│  │  └─ form-contact.js
│  └─ utils/
│     ├─ dom.js
│     └─ format.js
├─ assets/
│  ├─ img/
│  ├─ icons/
│  └─ docs/
└─ docs/
   ├─ content-map.md
   ├─ design-tokens.md
   └─ next-development-steps.md
```

## 3) Secciones sugeridas para completar (basado en la web institucional típica de fundaciones)

Para alinear el sitio con una estructura institucional robusta:
- Inicio (hero + propuesta de valor)
- Nosotros (misión, visión, historia, equipo)
- Programas / líneas de acción
- Impacto (métricas + testimonios)
- Transparencia (informes, aliados, estados financieros)
- Donaciones (métodos + CTA)
- Voluntariado
- Contacto
- Footer con datos legales y redes

## 4) Orden recomendado de implementación (sprints cortos)

1. **Sprint 1: Estructura base**
   - Completar Home semántico con todas las secciones clave.
   - Confirmar que formulario Netlify sigue operativo.
2. **Sprint 2: Contenido institucional**
   - Crear páginas internas (`nosotros`, `programas`, `transparencia`, `contacto`) con estructura semántica.
   - Integrar contenido real (textos, fotos, métricas verificadas).
3. **Sprint 3: UI system**
   - Fragmentar CSS en `base/layout/components`.
   - Normalizar tipografías, espaciados, botones y cards.
4. **Sprint 4: JS modular**
   - Separar `main.js` en módulos por responsabilidad.
   - Mantener un `init()` central y APIs pequeñas por módulo.
5. **Sprint 5: Preparación React**
   - Convertir secciones en "bloques independientes" (misma interfaz de props futura).
   - Documentar datos en JSON para desacoplar contenido de estructura.

## 5) Criterios para facilitar la migración futura a React

- Evitar lógica inline en HTML.
- Mantener IDs y clases con nombres por bloque (`hero-*`, `program-*`, `impact-*`).
- Centralizar textos en archivos de contenido (futuro `data/*.json`).
- Componentizar visualmente desde ahora (cards, botones, secciones).
- Evitar dependencias acopladas; usar JS utilitario simple y módulos pequeños.

## 6) Pendientes sugeridos inmediatos

- Reemplazar textos placeholder por contenido oficial validado por la fundación.
- Añadir favicon, Open Graph y SEO por página.
- Incorporar evidencias de impacto (fotos optimizadas + testimonios reales).
- Definir versión móvil final de navegación y jerarquía visual.
