/**
 * ==============================================================================
 * BLOG ACADÉMICO: LOS DISEÑOS DE INVESTIGACIÓN CUANTITATIVOS Y CUALITATIVOS
 * Archivo JavaScript Principal (Lógica interactiva, accesibilidad y estado)
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initReadingProgressBar();
  initNavbar();
  initTabs();
  initAccordion();
  initArticleFilters();
  initQuiz();
  initBackToTop();
});

/**
 * 1. MODO CLARO Y OSCURO CON PERSISTENCIA EN LOCALSTORAGE
 */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('theme-preference');
  
  // Preferencia del sistema operativo
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Aplicar tema inicial
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
      
      // Si Disqus ya está cargado, recargar para que adapte su paleta
      if (typeof DISQUS !== 'undefined') {
        DISQUS.reset({ reload: true });
      }
    });
  }

  // Escuchar cambios en la preferencia del sistema operativo si el usuario no ha forzado una elección
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme-preference')) {
      const systemTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', systemTheme);
    }
  });
}

/**
 * 2. BARRA DE PROGRESO DE LECTURA
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
 * 3. NAVEGACIÓN, MENÚ MÓVIL Y RESALTADO DE SECCIÓN ACTIVA
 */
function initNavbar() {
  const navToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('navbar-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Toggle menú en móviles
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Resaltado de sección activa con IntersectionObserver
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
 * 4. PESTAÑAS INTERACTIVAS (RUTA CUANTITATIVA)
 */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-tab');

      // Actualizar estado de botones
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Mostrar panel correspondiente
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

    // Accesibilidad teclado (flechas izquierda/derecha)
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
 * 5. ACORDEÓN INTERACTIVO (RUTA CUALITATIVA)
 */
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      // Cerrar otros acordeones para mantener la pantalla limpia
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          const otherHeader = otherItem.querySelector('.accordion-header');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
        }
      });

      // Alternar estado del elemento clicado
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
 * 6. FILTRO DE ARTÍCULOS CIENTÍFICOS REALES
 */
function initArticleFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const articleCards = document.querySelectorAll('.article-card');

  if (!filterButtons.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Actualizar botones
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Mostrar u ocultar tarjetas
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
 * 7. MINI QUIZ DE AUTOEVALUACIÓN CON RETROALIMENTACIÓN INMEDIATA
 */
function initQuiz() {
  const quizData = [
    {
      question: "¿Cuál es la diferencia fundamental entre un experimento puro y un cuasiexperimento en la ruta cuantitativa?",
      options: [
        "En el experimento puro se trabaja en laboratorios y en el cuasiexperimento únicamente en la industria.",
        "En el experimento puro los sujetos se asignan al azar a los grupos, mientras que en el cuasiexperimento los grupos ya están previamente formados (grupos intactos).",
        "El cuasiexperimento no manipula ninguna variable independiente y el experimento puro sí.",
        "El experimento puro requiere obligatoriamente observación participante y el cuasiexperimento no."
      ],
      correctIndex: 1,
      feedback: "¡Excelente! Según Hernández-Sampieri (2018), la asignación al azar garantiza la equivalencia inicial de los grupos en los experimentos puros. En los cuasiexperimentos se trabaja con grupos ya conformados (como dos cursos escolares o dos equipos de desarrollo de software)."
    },
    {
      question: "Si se aplica una encuesta única a 200 usuarios para medir la facilidad de uso de una app y asociarla con su frecuencia de compra mensual, ¿qué diseño cuantitativo se utiliza?",
      options: [
        "Experimental de laboratorio puro con grupo control.",
        "No experimental longitudinal de panel.",
        "No experimental transeccional (transversal) correlacional-causal.",
        "Preexperimental con pretest y postest."
      ],
      correctIndex: 2,
      feedback: "¡Correcto! Es no experimental porque no se manipulan deliberadamente las variables, y es transeccional correlacional-causal porque recopila los datos en un único momento en el tiempo para evaluar el grado de asociación entre variables."
    },
    {
      question: "En la ruta cualitativa, ¿qué diseño se enfoca en describir y analizar la cultura, rituales, normas y valores compartidos de un grupo específico (por ejemplo, una comunidad de código abierto)?",
      options: [
        "Diseño etnográfico.",
        "Diseño fenomenológico.",
        "Diseño experimental de cohorte.",
        "Diseño de series cronológicas múltiples."
      ],
      correctIndex: 0,
      feedback: "¡Muy bien! El diseño etnográfico estudia a comunidades o grupos que comparten una cultura o identidad para comprender su sistema social y significados compartidos desde la inmersión en su contexto natural."
    },
    {
      question: "¿Cuál es el propósito central de la Teoría Fundamentada (Grounded Theory) en la investigación cualitativa?",
      options: [
        "Verificar hipótesis deductivas mediante modelos estadísticos avanzados de covarianza.",
        "Generar inductivamente un marco conceptual o teoría anclada directamente en los datos empíricos y vivencias de los participantes.",
        "Probar la velocidad y rendimiento computacional de un algoritmo de ordenamiento.",
        "Elaborar una narración cronológica lineal de la vida de una sola persona."
      ],
      correctIndex: 1,
      feedback: "¡Acertaste! La teoría fundamentada no parte de una teoría previa para comprobarla, sino que construye conceptos teóricos sustantivos a partir de las comparaciones constantes entre los testimonios y observaciones recolectadas."
    },
    {
      question: "Cuando un investigador se involucra activamente en un aula o empresa para solucionar un problema concreto mediante ciclos continuos de planificar, actuar, observar y reflexionar, ¿qué diseño aplica?",
      options: [
        "Investigación-Acción.",
        "Experimento puro de tres grupos de Solomon.",
        "Diseño longitudinal de tendencia.",
        "Diseño transeccional exploratorio."
      ],
      correctIndex: 0,
      feedback: "¡Exacto! La Investigación-Acción combina la resolución colaborativa de problemas cotidianos inmediatos con la generación de conocimiento científico reflexivo, transformando la realidad de la comunidad participante."
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
    questionProgress.textContent = `Pregunta ${index + 1} de ${quizData.length}`;
    scoreCounter.textContent = `Aciertos: ${score} / ${quizData.length}`;
    questionTitle.textContent = q.question;
    optionsContainer.innerHTML = '';
    feedbackBox.className = 'quiz-feedback-box';
    feedbackBox.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];

    q.options.forEach((optText, optIndex) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span class="quiz-option-letter">${letters[optIndex]}</span><span>${optText}</span>`;

      // Si ya fue respondida anteriormente
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

    // Mostrar feedback si ya respondió
    if (userAnswers[index] !== null) {
      showFeedback(index, userAnswers[index] === q.correctIndex);
    }

    // Configurar botón Siguiente / Finalizar
    if (index === quizData.length - 1) {
      nextBtn.innerHTML = '<span>Ver Resultado Final</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>';
    } else {
      nextBtn.innerHTML = '<span>Siguiente Pregunta</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
    }
    nextBtn.style.display = userAnswers[index] !== null ? 'inline-flex' : 'none';
    restartBtn.style.display = 'none';
  }

  function selectAnswer(qIndex, selectedOptIndex) {
    userAnswers[qIndex] = selectedOptIndex;
    const q = quizData[qIndex];
    const isCorrect = selectedOptIndex === q.correctIndex;

    if (isCorrect) {
      score++;
      scoreCounter.textContent = `Aciertos: ${score} / ${quizData.length}`;
    }

    // Deshabilitar todos los botones y marcar acierto/error
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
    const iconCorrect = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    const iconIncorrect = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

    feedbackBox.className = `quiz-feedback-box show ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
    feedbackBox.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.5rem; font-weight:700;">
        ${isCorrect ? iconCorrect : iconIncorrect}
        <span>${isCorrect ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta'}</span>
      </div>
      <p style="margin-top: 0.4rem;">${q.feedback}</p>
    `;
  }

  nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < quizData.length - 1) {
      currentQuestionIndex++;
      renderQuestion(currentQuestionIndex);
    } else {
      // Pantalla final
      questionProgress.textContent = 'Autoevaluación completada';
      questionTitle.textContent = `¡Felicitaciones! Has obtenido ${score} de ${quizData.length} respuestas correctas.`;
      optionsContainer.innerHTML = '';
      
      let message = '';
      if (score === 5) {
        message = '¡Dominio total de los diseños de investigación! Tienes una comprensión sólida de los enfoques cuantitativo y cualitativo.';
      } else if (score >= 3) {
        message = '¡Buen trabajo! Tienes claros los fundamentos metodológicos esenciales. Puedes repasar las secciones de la ruta cuantitativa y cualitativa para perfeccionar los conceptos.';
      } else {
        message = 'Te recomendamos repasar las diferencias entre diseños experimentales y cualitativos en las pestañas del blog antes de tu evaluación académica.';
      }

      feedbackBox.className = 'quiz-feedback-box show feedback-correct';
      feedbackBox.innerHTML = `<strong>Balance del intento:</strong><p style="margin-top: 0.4rem;">${message}</p>`;

      nextBtn.style.display = 'none';
      restartBtn.style.display = 'inline-flex';
    }
  });

  restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers.fill(null);
    renderQuestion(0);
  });

  // Render inicial
  renderQuestion(0);
}

/**
 * 8. BOTÓN "VOLVER ARRIBA"
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

