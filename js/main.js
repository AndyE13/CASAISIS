/**
 * ISISRICO - Script principal
 * Funcionalidades: contadores animados, scroll suave, navbar sticky,
 * validación de formulario, animaciones al scroll, CTAs de donación.
 * Estructura modular pensada para futura migración a React.
 */

(function () {
  'use strict';

  /* ========== CONFIGURACIÓN GLOBAL ========== */
  const CONFIG = {
    scrollOffset: 70,
    counterDuration: 2000,
    counterStep: 50,
  };

  /* ========== NAVBAR: cambio de estilo al hacer scroll ========== */
  function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const onScroll = () => {
      if (window.scrollY > CONFIG.scrollOffset) {
        navbar.classList.add('scrolled');
        navbar.style.backgroundColor = 'rgba(13, 110, 253, 0.95)';
      } else {
        navbar.classList.remove('scrolled');
        navbar.style.backgroundColor = '';
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // estado inicial
  }

  /* ========== SCROLL SUAVE para enlaces internos ========== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }

  /* ========== CONTADORES ANIMADOS (sección Impacto) ========== */
  function animateValue(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);
      element.textContent = current.toLocaleString('es');

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = end.toLocaleString('es');
      }
    }

    requestAnimationFrame(update);
  }

  function initCounters() {
    const counters = document.querySelectorAll('.impact-number');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10) || 0;
          const duration = parseInt(el.getAttribute('data-duration'), 10) || CONFIG.counterDuration;

          animateValue(el, 0, target, duration);
          observer.unobserve(el);
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  /* ========== ANIMACIONES AL HACER SCROLL ========== */
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (!animatedElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    animatedElements.forEach((el) => observer.observe(el));
  }

  /* ========== BOTONES DE MONTO DE DONACIÓN ========== */
  function initDonationAmounts() {
    const amountButtons = document.querySelectorAll('.btn-donation-amount');
    const customInput = document.getElementById('customAmount');
    const btnDonateFinal = document.getElementById('btnDonateFinal');

    let selectedAmount = null;

    amountButtons.forEach((btn) => {
      btn.addEventListener('click', function () {
        amountButtons.forEach((b) => b.classList.remove('active'));
        this.classList.add('active');
        selectedAmount = parseInt(this.getAttribute('data-amount'), 10);
        if (customInput) customInput.value = '';
      });
    });

    if (customInput) {
      customInput.addEventListener('input', function () {
        amountButtons.forEach((b) => b.classList.remove('active'));
        selectedAmount = this.value ? parseInt(this.value, 10) : null;
      });
    }

    if (btnDonateFinal) {
      btnDonateFinal.addEventListener('click', function (e) {
        e.preventDefault();
        const amount = selectedAmount || (customInput && parseInt(customInput.value, 10)) || null;
        if (amount && amount > 0) {
          // En producción aquí irías a pasarela de pago
          alert('Gracias por tu generosidad. Redirigiendo a la pasarela de pago... (simulación). Monto: $' + amount);
        } else {
          alert('Por favor selecciona un monto o escribe otro en el campo "Otro".');
        }
      });
    }
  }

  /* ========== VALIDACIÓN DEL FORMULARIO DE CONTACTO ========== */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameInput = form.querySelector('#contactName');
    const emailInput = form.querySelector('#contactEmail');
    const messageInput = form.querySelector('#contactMessage');

    function showError(input, message) {
      input.classList.add('is-invalid');
      const feedback = input.nextElementSibling;
      if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.textContent = message;
      }
    }

    function clearError(input) {
      input.classList.remove('is-invalid');
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      [nameInput, emailInput, messageInput].forEach((i) => clearError(i));

      if (!nameInput.value.trim()) {
        showError(nameInput, 'Por favor escribe tu nombre.');
        isValid = false;
      }

      if (!emailInput.value.trim()) {
        showError(emailInput, 'Por favor escribe tu email.');
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, 'Por favor escribe un email válido (ej: nombre@dominio.com).');
        isValid = false;
      }

      if (!messageInput.value.trim()) {
        showError(messageInput, 'Por favor escribe tu mensaje.');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'El mensaje debe tener al menos 10 caracteres.');
        isValid = false;
      }

      if (isValid) {
        // Simulación de envío; en producción: fetch a tu backend
        alert('¡Mensaje enviado! Te responderemos pronto.');
        form.reset();
      }
    });

    [nameInput, emailInput, messageInput].forEach((input) => {
      input.addEventListener('input', function () {
        clearError(this);
      });
      input.addEventListener('blur', function () {
        if (this.classList.contains('is-invalid') && this.value.trim()) {
          clearError(this);
        }
      });
    });
  }

  /* ========== AÑO ACTUAL EN FOOTER ========== */
  function setCurrentYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ========== INICIALIZACIÓN ========== */
  function init() {
    initNavbarScroll();
    initSmoothScroll();
    initCounters();
    initScrollAnimations();
    initDonationAmounts();
    initContactForm();
    setCurrentYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
