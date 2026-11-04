/**
 * ==============================================================================
 * BLOG ACADÉMICO: LOS DISEÑOS DE INVESTIGACIÓN CUANTITATIVOS Y CUALITATIVOS
 * Archivo JavaScript Principal (Lógica interactiva, bilingüe, accesibilidad y estado)
 * ==============================================================================
 */

// Variable global de idioma activo
let currentLang = 'es';
let updateQuizLanguageFn = null;

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initReadingProgressBar();
  initNavbar();
  initTabs();
  initAccordion();
  initArticleFilters();
  initQuiz();
  initBackToTop();
});

/**
 * DICCIONARIO DE TRADUCCIÓN BILINGÜE (ESPAÑOL / INGLÉS)
 */
const i18nDictionary = {
  es: {
    nav_home: "Inicio",
    nav_intro: "Introducción",
    nav_quant: "Ruta Cuantitativa",
    nav_qual: "Ruta Cualitativa",
    nav_comp: "Comparación",
    nav_tech: "Técnicas",
    nav_articles: "Artículos",
    nav_quiz: "Quiz",
    nav_refs: "Referencias",
    hero_badge_quant: "Ruta Cuantitativa",
    hero_badge_qual: "Ruta Cualitativa",
    hero_badge_mixed: "Ruta Mixta",
    hero_title: 'Los Diseños de Investigación <span class="highlight-gradient">Científica</span>',
    hero_subtitle: "Comprende los planos estratégicos que guían la generación de conocimiento riguroso: desde experimentos controlados hasta inmersiones etnográficas, ilustrados en contextos de educación, lenguas y tecnología.",
    hero_author_sub: "Licenciatura en Inglés • Módulo de Metodología de la Investigación",
    hero_btn_read: 'Comenzar Lectura <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
    hero_btn_comp: "Ver Tabla Comparativa",
    intro_badge: "Fundamentos Epistemológicos",
    intro_title: "¿Qué es un diseño de investigación y por qué es indispensable?",
    intro_subtitle: "La arquitectura previa que determina la validez, solidez y rigor de cualquier hallazgo científico.",
    quant_badge: "Ruta Cuantitativa",
    quant_title: "Medición Numérica, Control y Comprobación de Hipótesis",
    quant_subtitle: "Bajo el paradigma postpositivista, la ruta cuantitativa busca explicar, predecir y controlar fenómenos a través de la recolección estructurada de datos y el análisis estadístico deductivo.",
    tab_exp: "Diseños Experimentales",
    tab_trans: "No Experimentales: Transeccionales",
    tab_long: "No Experimentales: Longitudinales",
    qual_badge: "Ruta Cualitativa",
    qual_title: "Inmersión Contextual, Inducción y Significado Humano",
    qual_subtitle: "La ruta cualitativa no busca medir numéricamente variables aisladas, sino comprender la complejidad de las vivencias, culturas, prácticas cotidianas y percepciones de los actores en su entorno natural.",
    comp_badge: "Matriz Metodológica",
    comp_title: "Comparación Directa: Cuantitativo vs. Cualitativo",
    comp_subtitle: "Comprender las diferencias epistemológicas y operativas es clave para elegir el diseño adecuado según el problema de estudio.",
    tech_badge: "Instrumentación Científica",
    tech_title: "Técnicas e Instrumentos de Recolección de Datos",
    tech_subtitle: "Las herramientas operativas que permiten capturar la evidencia empírica. Cada técnica responde a un propósito específico y tiene fortalezas y restricciones metodológicas.",
    art_badge: "Evidencia Científica Real",
    art_title: "Artículos de Investigación Publicados (2016 - 2026)",
    art_subtitle: "Investigaciones verificadas en bases de datos académicas (SciELO, Redalyc, Dialnet) orientadas a tecnología, educación y software que ilustran cada diseño.",
    art_btn_all: "Todos los Artículos (6)",
    art_btn_quant: "Diseños Cuantitativos (3)",
    art_btn_qual: "Diseños Cualitativos (3)",
    vid_badge: "Formación Multimedia",
    vid_title: "Recursos Audiovisuales Explicativos",
    vid_subtitle: "Videos formativos universitarios seleccionados para profundizar en los detalles operativos de los diseños de investigación cuantitativos y cualitativos.",
    prof_badge: "Repositorios Académicos",
    prof_title: "Portales para Profundizar en Metodología Científica",
    prof_subtitle: "Bases de datos indexadas y bibliotecas abiertas para consultar literatura empírica de calidad.",
    quiz_badge: "Comprueba lo Aprendido",
    quiz_title: "Quiz de Autoevaluación Metodológica",
    quiz_subtitle: "Pon a prueba tus conocimientos con estas 5 preguntas prácticas y recibe retroalimentación explicativa inmediata.",
    refs_badge: "Rigor Académico",
    refs_title: "Referencias Bibliográficas",
    refs_subtitle: "Fuentes fundamentales de la asignatura y literatura científica citada a lo largo de este blog.",
    comm_badge: "Debate e Interacción",
    comm_title: "Espacio de Comentarios y Discusión",
    comm_subtitle: "Invitamos a nuestro docente y compañeros de curso a compartir sus opiniones, observaciones críticas o preguntas sobre los diseños cuantitativos y cualitativos. ¿Has aplicado alguno en tus proyectos de investigación o docencia?",
    footer_col1_title: "Metodología de la Investigación",
    footer_col1_desc: "Blog académico digital elaborado para la actividad del módulo sobre diseños cuantitativos y cualitativos de investigación científica, aplicados a la educación, la enseñanza de lenguas y las tecnologías de información.",
    footer_col2_title: "Navegación Rápida",
    footer_col3_title: "Ficha Académica",
    footer_label_authors: "Autores:",
    footer_label_program: "Programa:",
    footer_label_module: "Módulo:",
    footer_label_year: "Año Académico:",
    footer_label_disqus: "Plataforma Disqus:"
  },
  en: {
    nav_home: "Home",
    nav_intro: "Introduction",
    nav_quant: "Quantitative Route",
    nav_qual: "Qualitative Route",
    nav_comp: "Comparison",
    nav_tech: "Techniques",
    nav_articles: "Articles",
    nav_quiz: "Quiz",
    nav_refs: "References",
    hero_badge_quant: "Quantitative Route",
    hero_badge_qual: "Qualitative Route",
    hero_badge_mixed: "Mixed Route",
    hero_title: 'Scientific Research <span class="highlight-gradient">Designs</span>',
    hero_subtitle: "Understand the strategic blueprints that guide the generation of rigorous knowledge: from controlled experiments to ethnographic immersions, illustrated in education, language learning, and technology.",
    hero_author_sub: "Bachelor of Arts in English • Research Methodology Module",
    hero_btn_read: 'Start Reading <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
    hero_btn_comp: "View Comparison Table",
    intro_badge: "Epistemological Foundations",
    intro_title: "What is a research design and why is it essential?",
    intro_subtitle: "The foundational architecture that determines the validity, robustness, and rigor of any scientific finding.",
    quant_badge: "Quantitative Route",
    quant_title: "Numerical Measurement, Control, and Hypothesis Testing",
    quant_subtitle: "Under the post-positivist paradigm, the quantitative route seeks to explain, predict, and control phenomena through structured data collection and deductive statistical analysis.",
    tab_exp: "Experimental Designs",
    tab_trans: "Non-Experimental: Cross-Sectional",
    tab_long: "Non-Experimental: Longitudinal",
    qual_badge: "Qualitative Route",
    qual_title: "Contextual Immersion, Induction, and Human Meaning",
    qual_subtitle: "The qualitative route does not seek to numerically measure isolated variables, but rather to understand the complexity of participants' lived experiences, cultures, daily practices, and perceptions in their natural environment.",
    comp_badge: "Methodological Matrix",
    comp_title: "Direct Comparison: Quantitative vs. Qualitative",
    comp_subtitle: "Understanding epistemological and operative differences is crucial to selecting the appropriate design for any given research problem.",
    tech_badge: "Scientific Instrumentation",
    tech_title: "Data Collection Techniques and Instruments",
    tech_subtitle: "Operational tools that allow capturing empirical evidence. Each technique serves a specific purpose with unique strengths and methodological limitations.",
    art_badge: "Real Scientific Evidence",
    art_title: "Published Research Articles (2016 - 2026)",
    art_subtitle: "Peer-reviewed studies indexed in academic databases (SciELO, Redalyc, Dialnet) focused on technology, education, and software illustrating each design.",
    art_btn_all: "All Articles (6)",
    art_btn_quant: "Quantitative Designs (3)",
    art_btn_qual: "Qualitative Designs (3)",
    vid_badge: "Multimedia Learning",
    vid_title: "Explanatory Audiovisual Resources",
    vid_subtitle: "Selected university lecture videos to delve into the operational details of quantitative and qualitative research designs.",
    prof_badge: "Academic Repositories",
    prof_title: "Portals to Deepen into Scientific Methodology",
    prof_subtitle: "Indexed databases and open libraries to explore high-quality empirical literature.",
    quiz_badge: "Test Your Knowledge",
    quiz_title: "Methodological Self-Assessment Quiz",
    quiz_subtitle: "Test your understanding with these 5 practical questions and receive immediate explanatory feedback.",
    refs_badge: "Academic Rigor",
    refs_title: "Bibliographic References",
    refs_subtitle: "Core textbooks of the course and primary scientific sources cited throughout this blog.",
    comm_badge: "Debate & Interaction",
    comm_title: "Comments and Discussion Space",
    comm_subtitle: "We invite our professor and classmates to share their opinions, critical comments, or questions about quantitative and qualitative designs. Have you applied any in your research or teaching projects?",
    footer_col1_title: "Research Methodology",
    footer_col1_desc: "Academic digital blog developed for the module activity on quantitative and qualitative scientific research designs, applied to education, language teaching, and information technologies.",
    footer_col2_title: "Quick Navigation",
    footer_col3_title: "Academic Profile",
    footer_label_authors: "Authors:",
    footer_label_program: "Program:",
    footer_label_module: "Module:",
    footer_label_year: "Academic Year:",
    footer_label_disqus: "Disqus Platform:"
  }
};

/**
 * 1. FUNCIÓN DE CAMBIO DE IDIOMA (ESPAÑOL / INGLÉS)
 */
function initLanguage() {
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const langOptEs = document.getElementById('lang-opt-es');
  const langOptEn = document.getElementById('lang-opt-en');
  
  const storedLang = localStorage.getItem('lang-preference');
  currentLang = storedLang === 'en' ? 'en' : 'es';

  function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('lang-preference', lang);

    // Actualizar indicador visual en el botón
    if (langOptEs && langOptEn) {
      if (lang === 'en') {
        langOptEs.classList.remove('active');
        langOptEn.classList.add('active');
        langToggleBtn.setAttribute('aria-label', 'Switch to Spanish');
      } else {
        langOptEs.classList.add('active');
        langOptEn.classList.remove('active');
        langToggleBtn.setAttribute('aria-label', 'Switch to English');
      }
    }

    // Traducir todos los elementos marcados con data-i18n
    const translatableElements = document.querySelectorAll('[data-i18n]');
    const dict = i18nDictionary[lang];

    translatableElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict && dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Actualizar el quiz al idioma correspondiente
    if (typeof updateQuizLanguageFn === 'function') {
      updateQuizLanguageFn(lang);
    }
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const newLang = currentLang === 'es' ? 'en' : 'es';
      applyLanguage(newLang);
    });
  }

  // Aplicar idioma inicial
  applyLanguage(currentLang);
}

/**
 * 2. MODO CLARO Y OSCURO CON PERSISTENCIA EN LOCALSTORAGE
 */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('theme-preference');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const activeTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', activeTheme);
  
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute('aria-label', `Cambiar a modo ${activeTheme === 'dark' ? 'claro' : 'oscuro'}`);
    
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme-preference', newTheme);
      themeToggleBtn.setAttribute('aria-label', `Cambiar a modo ${newTheme === 'dark' ? 'claro' : 'oscuro'}`);
      
      if (typeof DISQUS !== 'undefined') {
        DISQUS.reset({ reload: true });
      }
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme-preference')) {
      const systemTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', systemTheme);
    }
  });
}

/**
 * 3. BARRA DE PROGRESO DE LECTURA
 */
function initReadingProgressBar() {
  const progressBar = document.getElementById('reading-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    
    const progress = (window.pageYOffset / totalHeight) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }, { passive: true });
}

/**
 * 4. NAVEGACIÓN, MENÚ MÓVIL Y RESALTADO DE SECCIÓN ACTIVA
 */
function initNavbar() {
  const navToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('navbar-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }
}

/**
 * 5. PESTAÑAS INTERACTIVAS (RUTA CUANTITATIVA)
 */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-tab');

      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      tabPanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('active');
          panel.removeAttribute('hidden');
        } else {
          panel.classList.remove('active');
          panel.setAttribute('hidden', 'true');
        }
      });
    });

    button.addEventListener('keydown', (e) => {
      const buttonList = Array.from(tabButtons);
      const currentIndex = buttonList.indexOf(button);
      let nextIndex = null;

      if (e.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % buttonList.length;
      } else if (e.key === 'ArrowLeft') {
        nextIndex = (currentIndex - 1 + buttonList.length) % buttonList.length;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        buttonList[nextIndex].focus();
        buttonList[nextIndex].click();
      }
    });
  });
}

/**
 * 6. ACORDEÓN INTERACTIVO (RUTA CUALITATIVA)
 */
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          const otherHeader = otherItem.querySelector('.accordion-header');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
        }
      });

      if (isExpanded) {
        item.classList.remove('open');
        header.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * 7. FILTRO DE ARTÍCULOS CIENTÍFICOS REALES
 */
function initArticleFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const articleCards = document.querySelectorAll('.article-card');

  if (!filterButtons.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      articleCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 8. MINI QUIZ DE AUTOEVALUACIÓN CON RETROALIMENTACIÓN BILINGÜE
 */
function initQuiz() {
  const quizData = [
    {
      question_es: "¿Cuál es la diferencia fundamental entre un experimento puro y un cuasiexperimento en la ruta cuantitativa?",
      question_en: "What is the fundamental difference between a true experiment and a quasi-experiment in the quantitative route?",
      options_es: [
        "En el experimento puro se trabaja en laboratorios y en el cuasiexperimento únicamente en la industria.",
        "En el experimento puro los sujetos se asignan al azar a los grupos, mientras que en el cuasiexperimento los grupos ya están previamente formados (grupos intactos).",
        "El cuasiexperimento no manipula ninguna variable independiente y el experimento puro sí.",
        "El experimento puro requiere obligatoriamente observación participante y el cuasiexperimento no."
      ],
      options_en: [
        "In a true experiment work is done in laboratories and in a quasi-experiment only in industry.",
        "In a true experiment subjects are randomly assigned to groups, whereas in a quasi-experiment groups are already pre-formed (intact groups).",
        "The quasi-experiment does not manipulate any independent variable and the true experiment does.",
        "The true experiment strictly requires participant observation and the quasi-experiment does not."
      ],
      correctIndex: 1,
      feedback_es: "¡Excelente! Según Hernández-Sampieri (2018), la asignación al azar garantiza la equivalencia inicial de los grupos en los experimentos puros. En los cuasiexperimentos se trabaja con grupos ya conformados (como dos cursos de lenguas o dos grupos de alumnos).",
      feedback_en: "Excellent! According to Hernández-Sampieri (2018), random assignment guarantees initial equivalence in true experiments. In quasi-experiments, researchers work with pre-existing intact groups."
    },
    {
      question_es: "Si se aplica una encuesta única a 200 usuarios para medir la facilidad de uso de una app y asociarla con su frecuencia de compra mensual, ¿qué diseño cuantitativo se utiliza?",
      question_en: "If a single survey is administered to 200 users to measure app usability and associate it with monthly purchase frequency, which quantitative design is applied?",
      options_es: [
        "Experimental de laboratorio puro con grupo control.",
        "No experimental longitudinal de panel.",
        "No experimental transeccional (transversal) correlacional-causal.",
        "Preexperimental con pretest y postest."
      ],
      options_en: [
        "Pure laboratory experimental with control group.",
        "Non-experimental longitudinal panel design.",
        "Non-experimental cross-sectional correlational-causal design.",
        "Pre-experimental with pretest and posttest."
      ],
      correctIndex: 2,
      feedback_es: "¡Correcto! Es no experimental porque no se manipulan deliberadamente las variables, y es transeccional correlacional-causal porque recopila los datos en un único momento en el tiempo para evaluar el grado de asociación entre variables.",
      feedback_en: "Correct! It is non-experimental because variables are not deliberately manipulated, and cross-sectional correlational-causal because it collects data at a single point in time to assess the degree of association between variables."
    },
    {
      question_es: "En la ruta cualitativa, ¿qué diseño se enfoca en describir y analizar la cultura, rituales, normas y valores compartidos de un grupo específico (por ejemplo, una comunidad educativa o de aprendizaje de idiomas)?",
      question_en: "In the qualitative route, which design focuses on describing and analyzing the culture, rituals, norms, and shared values of a specific group (e.g., an educational or language-learning community)?",
      options_es: [
        "Diseño etnográfico.",
        "Diseño fenomenológico.",
        "Diseño experimental de cohorte.",
        "Diseño de series cronológicas múltiples."
      ],
      options_en: [
        "Ethnographic design.",
        "Phenomenological design.",
        "Experimental cohort design.",
        "Multiple time-series design."
      ],
      correctIndex: 0,
      feedback_es: "¡Muy bien! El diseño etnográfico estudia a comunidades o grupos que comparten una cultura o identidad para comprender su sistema social y significados compartidos desde la inmersión en su contexto natural.",
      feedback_en: "Well done! The ethnographic design studies communities or groups that share a culture or identity to understand their social system and shared meanings through immersion in their natural context."
    },
    {
      question_es: "¿Cuál es el propósito central de la Teoría Fundamentada (Grounded Theory) en la investigación cualitativa?",
      question_en: "What is the central purpose of Grounded Theory in qualitative research?",
      options_es: [
        "Verificar hipótesis deductivas mediante modelos estadísticos avanzados de covarianza.",
        "Generar inductivamente un marco conceptual o teoría anclada directamente en los datos empíricos y vivencias de los participantes.",
        "Probar la velocidad y rendimiento computacional de un algoritmo de ordenamiento.",
        "Elaborar una narración cronológica lineal de la vida de una sola persona."
      ],
      options_en: [
        "Test deductive hypotheses through advanced statistical models of covariance.",
        "Inductively generate a conceptual framework or theory grounded directly in the empirical data and experiences of the participants.",
        "Test the computational speed and efficiency of a sorting algorithm.",
        "Draft a linear chronological narrative of a single individual's life."
      ],
      correctIndex: 1,
      feedback_es: "¡Acertaste! La teoría fundamentada no parte de una teoría previa para comprobarla, sino que construye conceptos teóricos sustantivos a partir de las comparaciones constantes entre los testimonios y observaciones recolectadas.",
      feedback_en: "Spot on! Grounded theory does not begin with an established theory to test it, but constructs substantive theoretical concepts from constant comparisons among collected testimonies and observations."
    },
    {
      question_es: "Cuando un investigador se involucra activamente en un aula o empresa para solucionar un problema concreto mediante ciclos continuos de planificar, actuar, observar y reflexionar, ¿qué diseño aplica?",
      question_en: "When a researcher is actively involved in a classroom or organization to solve a specific problem through continuous cycles of planning, acting, observing, and reflecting, which design is applied?",
      options_es: [
        "Investigación-Acción.",
        "Experimento puro de tres grupos de Solomon.",
        "Diseño longitudinal de tendencia.",
        "Diseño transeccional exploratorio."
      ],
      options_en: [
        "Action Research.",
        "Solomon three-group true experiment.",
        "Longitudinal trend design.",
        "Exploratory cross-sectional design."
      ],
      correctIndex: 0,
      feedback_es: "¡Exacto! La Investigación-Acción combina la resolución colaborativa de problemas cotidianos inmediatos con la generación de conocimiento científico reflexivo, transformando la realidad de la comunidad participante.",
      feedback_en: "Exactly! Action Research combines the collaborative resolution of immediate practical problems with the generation of reflective scientific knowledge, transforming the community's reality."
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let userAnswers = new Array(quizData.length).fill(null);

  const questionProgress = document.getElementById('quiz-progress');
  const scoreCounter = document.getElementById('quiz-score');
  const questionTitle = document.getElementById('quiz-question-title');
  const optionsContainer = document.getElementById('quiz-options-container');
  const feedbackBox = document.getElementById('quiz-feedback-box');
  const nextBtn = document.getElementById('quiz-next-btn');
  const restartBtn = document.getElementById('quiz-restart-btn');

  if (!questionTitle || !optionsContainer) return;

  function renderQuestion(index) {
    const q = quizData[index];
    const isEn = currentLang === 'en';
    
    questionProgress.textContent = isEn 
      ? `Question ${index + 1} of ${quizData.length}` 
      : `Pregunta ${index + 1} de ${quizData.length}`;

    scoreCounter.textContent = isEn 
      ? `Score: ${score} / ${quizData.length}` 
      : `Aciertos: ${score} / ${quizData.length}`;

    questionTitle.textContent = isEn ? q.question_en : q.question_es;
    optionsContainer.innerHTML = '';
    feedbackBox.className = 'quiz-feedback-box';
    feedbackBox.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    const opts = isEn ? q.options_en : q.options_es;

    opts.forEach((optText, optIndex) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span class="quiz-option-letter">${letters[optIndex]}</span><span>${optText}</span>`;

      if (userAnswers[index] !== null) {
        btn.disabled = true;
        if (optIndex === q.correctIndex) {
          btn.classList.add('correct');
        } else if (optIndex === userAnswers[index]) {
          btn.classList.add('incorrect');
        }
      } else {
        btn.addEventListener('click', () => selectAnswer(index, optIndex));
      }

      li.appendChild(btn);
      optionsContainer.appendChild(li);
    });

    if (userAnswers[index] !== null) {
      showFeedback(index, userAnswers[index] === q.correctIndex);
    }

    if (index === quizData.length - 1) {
      nextBtn.innerHTML = `<span>${isEn ? 'View Final Result' : 'Ver Resultado Final'}</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>`;
    } else {
      nextBtn.innerHTML = `<span>${isEn ? 'Next Question' : 'Siguiente Pregunta'}</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
    }
    nextBtn.style.display = userAnswers[index] !== null ? 'inline-flex' : 'none';
    restartBtn.style.display = 'none';
  }

  function selectAnswer(qIndex, selectedOptIndex) {
    userAnswers[qIndex] = selectedOptIndex;
    const q = quizData[qIndex];
    const isCorrect = selectedOptIndex === q.correctIndex;
    const isEn = currentLang === 'en';

    if (isCorrect) {
      score++;
      scoreCounter.textContent = isEn 
        ? `Score: ${score} / ${quizData.length}` 
        : `Aciertos: ${score} / ${quizData.length}`;
    }

    const optionButtons = optionsContainer.querySelectorAll('.quiz-option-btn');
    optionButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correctIndex) {
        btn.classList.add('correct');
      } else if (idx === selectedOptIndex) {
        btn.classList.add('incorrect');
      }
    });

    showFeedback(qIndex, isCorrect);
    nextBtn.style.display = 'inline-flex';
  }

  function showFeedback(qIndex, isCorrect) {
    const q = quizData[qIndex];
    const isEn = currentLang === 'en';
    const iconCorrect = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    const iconIncorrect = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

    feedbackBox.className = `quiz-feedback-box show ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
    feedbackBox.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.5rem; font-weight:700;">
        ${isCorrect ? iconCorrect : iconIncorrect}
        <span>${isCorrect ? (isEn ? 'Correct Answer!' : '¡Respuesta Correcta!') : (isEn ? 'Incorrect Answer' : 'Respuesta Incorrecta')}</span>
      </div>
      <p style="margin-top: 0.4rem;">${isEn ? q.feedback_en : q.feedback_es}</p>
    `;
  }

  nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < quizData.length - 1) {
      currentQuestionIndex++;
      renderQuestion(currentQuestionIndex);
    } else {
      const isEn = currentLang === 'en';
      questionProgress.textContent = isEn ? 'Self-Assessment Completed' : 'Autoevaluación completada';
      questionTitle.textContent = isEn 
        ? `Congratulations! You got ${score} of ${quizData.length} correct answers.`
        : `¡Felicitaciones! Has obtenido ${score} de ${quizData.length} respuestas correctas.`;
      optionsContainer.innerHTML = '';
      
      let message = '';
      if (score === 5) {
        message = isEn 
          ? 'Mastery of research designs! You have a solid understanding of both quantitative and qualitative approaches.'
          : '¡Dominio total de los diseños de investigación! Tienes una comprensión sólida de los enfoques cuantitativo y cualitativo.';
      } else if (score >= 3) {
        message = isEn 
          ? 'Good job! You understand core methodological foundations. Review the quantitative and qualitative sections to polish your concepts.'
          : '¡Buen trabajo! Tienes claros los fundamentos metodológicos esenciales. Puedes repasar las secciones del blog para perfeccionar los conceptos.';
      } else {
        message = isEn 
          ? 'We recommend reviewing the differences between experimental and qualitative designs in the blog tabs before your evaluation.'
          : 'Te recomendamos repasar las diferencias entre diseños experimentales y cualitativos en las pestañas del blog antes de tu evaluación académica.';
      }

      feedbackBox.className = 'quiz-feedback-box show feedback-correct';
      feedbackBox.innerHTML = `<strong>${isEn ? 'Attempt Summary:' : 'Balance del intento:'}</strong><p style="margin-top: 0.4rem;">${message}</p>`;

      nextBtn.style.display = 'none';
      restartBtn.textContent = isEn ? 'Restart Quiz' : 'Reiniciar Cuestionario';
      restartBtn.style.display = 'inline-flex';
    }
  });

  restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers.fill(null);
    renderQuestion(0);
  });

  // Exponer función de actualización de idioma para el quiz
  updateQuizLanguageFn = function() {
    renderQuestion(currentQuestionIndex);
  };

  renderQuestion(0);
}

/**
 * 9. BOTÓN "VOLVER ARRIBA"
 */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top-btn');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 380) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
