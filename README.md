# Blog Académico: Los Diseños de Investigación Cuantitativos y Cualitativos

Sitio web estático interactivo desarrollado para la actividad académica individual del módulo de **Metodología de la Investigación**.

- **Autores:** Lizeth Dejoy, Kamila Mogollón, Juan Rodriguez
- **Programa de Formación:** Licenciatura en Inglés
- **Módulo Académico:** Metodología de la Investigación
- **Año:** 2026
- **Sitio Web en Vivo (Netlify):** https://metodologia-investigacion-cua.netlify.app/

---

## Descripción del Proyecto

El blog tiene como propósito explicar de forma clara, accesible y rigurosa las diferentes formas de realizar investigación científica, analizando las características, diferencias y aplicaciones de las rutas **cuantitativa**, **cualitativa** y **mixta**.

Para conectar con el perfil formativo de desarrollo de software y sistemas de información, todos los conceptos metodológicos están articulados con ejemplos de la industria tecnológica (rendimiento de algoritmos, adopción de marcos ágiles como Scrum, auditoría de código, usabilidad y deuda técnica).

### Características Principales:
* **100% Estático:** Construido exclusivamente con HTML5 semántico, CSS3 moderno y JavaScript vanilla (sin frameworks, sin Node.js, sin proceso de compilación).
* **Modo Claro y Modo Oscuro:** Con botón accesible y persistencia de preferencia en `localStorage`.
* **Interactividad Ligera:**
  * Barra de progreso de lectura en tiempo real y navbar fija con resaltado de sección activa.
  * Pestañas para los diseños cuantitativos (experimentales y no experimentales).
  * Acordeón para los 6 diseños cualitativos principales.
  * Matriz comparativa adaptativa (tabla en pantallas de escritorio, tarjetas apiladas en dispositivos móviles).
  * Mini Quiz de autoevaluación de 5 preguntas con retroalimentación explicativa inmediata.
  * Botón flotante para volver arriba.
* **Artículos Reales Verificados (2016-2026):** 3 investigaciones cuantitativas y 3 cualitativas publicadas en revistas indexadas en **SciELO**, **Redalyc** y **Dialnet**.
* **Debate en Vivo con Disqus:** Integración completa de comentarios mediante el shortname oficial `investigacioncua` con script contador de respuestas.

---

## Despliegue en Netlify

El proyecto está diseñado para desplegarse de manera directa y continua desde GitHub:

1. **Sin comando de compilación:** Deja el campo `Build command` completamente vacío.
2. **Directorio raíz como sitio:** Deja el campo `Publish directory` vacío (o escribe `.`).
3. El archivo `index.html` ubicado en la raíz del repositorio será servido inmediatamente por Netlify.

Para ver las instrucciones detalladas paso a paso sobre cómo vincular Netlify, configurar Disqus y personalizar tus datos, consulta el archivo [GUIA_PUBLICACION.txt](GUIA_PUBLICACION.txt).

---

## Estructura de Archivos

```text
Blog-Juliana/
├── index.html              # Estructura semántica completa del blog
├── css/
│   └── styles.css          # Estilos CSS, variables de modo claro/oscuro y diseño responsive
├── js/
│   └── main.js             # Lógica interactiva: barra de lectura, tabs, acordeón y quiz
├── img/
│   ├── LEEME.txt           # Dimensiones recomendadas e instrucciones para cambiar imágenes
│   ├── hero-portada.svg    # Placeholder ilustrado para la portada
│   ├── cuantitativo-concept.svg
│   ├── cualitativo-concept.svg
│   ├── comparacion-metodos.svg
│   └── tecnicas-recoleccion.svg
├── .gitignore              # Filtro de archivos del sistema
├── README.md               # Este archivo de documentación
└── GUIA_PUBLICACION.txt    # Manual paso a paso para publicación en Netlify y ajustes finales
```

