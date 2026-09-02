/* ============================================================
   JOYERÍA DESTINY — Interacciones
   ============================================================ */

(function () {
  'use strict';

  /* --- 1. Momento de entrada: se retira el velo al cargar --- */
  var entry = document.getElementById('entry');
  function closeEntry() {
    if (entry) setTimeout(function () { entry.classList.add('is-gone'); }, 900);
  }
  if (document.readyState === 'complete') closeEntry();
  else window.addEventListener('load', closeEntry);
  // Red de seguridad: si alguna imagen tarda, el velo igual se retira
  setTimeout(closeEntry, 3500);


  /* --- 2. Menú móvil --- */
  var toggle = document.getElementById('navToggle');
  var panel  = document.getElementById('navMobile');

  function abrirMenu(abrir) {
    if (!toggle || !panel) return;
    panel.classList.toggle('is-open', abrir);
    toggle.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    toggle.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('menu-abierto', abrir);
  }

  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      abrirMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Al elegir un destino, el menú se cierra solo
    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { abrirMenu(false); });
    });

    // Escape cierra y devuelve el foco al botón
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        abrirMenu(false);
        toggle.focus();
      }
    });

    // Si la ventana crece hasta el tamaño de escritorio, el menú sobra
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) abrirMenu(false);
    });
  }


  /* --- 3. Header sólido al hacer scroll --- */
  var header = document.getElementById('header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });


  /* --- 4. Revelado progresivo de secciones --- */
  var items = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    items.forEach(function (el) { observer.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }


  /* --- 5. Scroll suave (respaldo para navegadores sin scroll-behavior) --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (ev) {
      var id = link.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      ev.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });


  /* --- 6. Año dinámico en el footer --- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

})();
