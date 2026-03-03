# Casa Isis — Rediseño UX/UI (fase inicial)

## 1) Nueva estructura UX propuesta

### Objetivo de experiencia
Construir una web clara, cálida y confiable para que personas, voluntarios y empresas comprendan el impacto de Casa Isis y encuentren una ruta de participación en pocos clics.

### Arquitectura de información
- **Inicio (`index.html`)**: narrativa emocional + métricas clave + llamadas a la acción.
- **Nosotros (`nosotros.html`)**: misión, visión y principios para generar confianza institucional.
- **Programas (`programas.html`)**: oferta programática organizada por líneas de intervención.
- **Voluntariado (`voluntariado.html`)**: propuesta de valor y formulario Netlify para postulación.
- **Aliados (`aliados.html`)**: opciones de colaboración y formulario Netlify para empresas.
- **Contacto (`contacto.html`)**: canales directos y promesa de respuesta.

## 2) Dirección visual sugerida

### Paleta inspirada en logo Casa Isis
- **Primario violeta** `#6F2DBD` (confianza + humanidad)
- **Primario oscuro** `#4B1D82` (profundidad y contraste)
- **Secundario dorado** `#F4B400` (esperanza/energía)
- **Acento turquesa** `#00A6A6` (comunidad + frescura)
- **Fondo suave** `#FDF9FF`
- **Texto principal** `#1F1B2D`

### Jerarquía tipográfica
- **Headings**: Poppins 600–800
- **Body/UI**: Inter 400–700
- Escala responsive basada en Bootstrap y clases semánticas (`display`, `h1`, `h2`, `lead`).

### Principios visuales
- Hero emocional con CTA dual (programas / voluntariado).
- Tarjetas suaves para bloques de confianza y lectura escaneable.
- Bloques narrativos de historias/testimonios.
- Contraste alto, `focus-visible`, estructura semántica y navegación consistente.

## 3) Arquitectura técnica creada (React-friendly)

```
/
├── index.html
├── nosotros.html
├── programas.html
├── voluntariado.html
├── aliados.html
├── contacto.html
├── assets/
│   ├── css/
│   │   ├── base.css
│   │   ├── components.css
│   │   └── pages.css
│   └── js/
│       └── site.js
└── docs/
    └── next-development-steps.md
```

### Reutilización de UI
- **Navbar** y **footer** se inyectan con JavaScript (`assets/js/site.js`) en cada página usando `data-page`.
- Esto evita duplicación y deja listo el camino para migrar a componentes React en una fase posterior.

### Formularios Netlify
- **Voluntariado**: `<form name="voluntariado" method="POST" data-netlify="true">`
- **Aliados**: `<form name="aliados" method="POST" data-netlify="true">`
- Ambos incluyen `form-name` y `netlify-honeypot`.

## Siguiente iteración recomendada
1. Integrar fotografías reales y testimonios validados por Casa Isis.
2. Añadir página de detalle por programa.
3. Incorporar microinteracciones y estados de éxito/error para formularios.
4. Hacer auditoría Lighthouse y correcciones AA completas.
