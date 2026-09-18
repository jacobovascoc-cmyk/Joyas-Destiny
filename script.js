(function () {
  'use strict';

  var DATOS_OK = typeof productos !== 'undefined' &&
                 typeof categorias !== 'undefined';

  function hayPrecio(n) {
    return n !== null && n !== undefined && n !== '' && !isNaN(Number(n));
  }

  function precio(n) {
    if (!hayPrecio(n)) return 'precio a consultar';
    return 'COP ' + Number(n).toLocaleString('es-CO');
  }

  function tasaDescuento() {
    var d = (typeof descuento !== 'undefined') ? Number(descuento) : 0;
    return (isNaN(d) || d <= 0 || d >= 1) ? 0 : d;
  }

  function conDescuento(n) {
    if (!hayPrecio(n) || !tasaDescuento()) return null;
    return Math.floor(Number(n) * (1 - tasaDescuento()) / 100) * 100;
  }

  function pesos(n) { return Number(n).toLocaleString('es-CO'); }

  function precioVigente(n) {
    var r = conDescuento(n);
    return precio(r === null ? n : r);
  }

  function wa(mensaje) {
    var num = (typeof whatsapp !== 'undefined') ? whatsapp : '573042177260';
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(mensaje);
  }

  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function textoAlt(p) {
    if (p.alt) return p.alt;
    return p.nombre + (p.material ? ' en ' + p.material : '') + ' — Joyería Destiny';
  }

  function perteneceA(p, cat) {
    if (cat.tipo) return p.tipo === cat.tipo;
    return !p.tipo && p.material === cat.material;
  }

  function fichaProducto(p, n) {
    var d = ['', ' reveal-d1', ' reveal-d2'][n % 3];

    var marco = 'product-media' + (p.tipo === 'anillo' ? ' product-media--anillo' : '');

    var enlace = wa('Hola Joyería Destiny, me interesa la ' + p.nombre +
                    ' (' + precioVigente(p.precio) + '). ¿Me das más información?');

    var rebajado = conDescuento(p.precio);
    var bloquePrecio;

    if (!hayPrecio(p.precio)) {
      bloquePrecio = '<p class="mt-5 price price-consultar">Precio a consultar</p>';
    } else if (rebajado === null) {

      bloquePrecio = '<p class="mt-5 price"><small>COP</small>' +
                     pesos(p.precio) + '</p>';
    } else {
      bloquePrecio =
        '<p class="mt-5 precio-promo">' +
          '<span class="precio-antes">COP ' + pesos(p.precio) + '</span>' +
          '<span class="price"><small>COP</small>' + pesos(rebajado) + '</span>' +
        '</p>' +
        '<p class="precio-ahorro">Ahorras COP ' + pesos(p.precio - rebajado) + '</p>';
    }

    return '' +
      '<article class="product-card group reveal' + d + '">' +
        '<a href="' + enlace + '" target="_blank" rel="noopener" class="block">' +
          '<div class="' + marco + '">' +
            '<img src="' + esc(p.imagen) + '"' +
                 ' alt="' + esc(textoAlt(p)) + '"' +
                 ' loading="lazy" decoding="async"' +
                 ' width="1200" height="' + (p.tipo === 'anillo' ? '1200' : '1500') + '" />' +
            '<span class="product-index">' + (n < 9 ? '0' : '') + (n + 1) + '</span>' +
            '<span class="product-hover">Pedir por WhatsApp</span>' +
          '</div>' +
          '<div class="mt-6 text-center">' +
            '<p class="text-[9px] tracking-luxe uppercase text-gold/80">' + esc(p.material) + '</p>' +
            '<h4 class="mt-3 font-display text-2xl lg:text-[1.7rem] font-light tracking-wide">' +
              esc(p.nombre) + '</h4>' +
            '<span class="rule"></span>' +
            bloquePrecio +
            '<p class="mt-3 text-sm font-light leading-relaxed text-ash">' +
              esc(p.descripcion) + '</p>' +
          '</div>' +
        '</a>' +
      '</article>';
  }

  function cabecera(cat, primera) {
    return '' +
      '<div id="' + cat.id + '" class="' +
           (primera ? 'mt-16 lg:mt-20' : 'mt-24 lg:mt-28') + ' reveal cat-anchor">' +
        '<div class="cat-head">' +
          '<span class="line"></span>' +
          '<div class="text-center px-2">' +
            '<h3 class="font-display text-2xl sm:text-3xl font-light tracking-wide text-gradient-gold">' +
              esc(cat.titulo) + '</h3>' +
            '<p class="mt-2 text-[10px] tracking-[0.25em] uppercase text-ash/80">' +
              esc(cat.descripcion) + '</p>' +
          '</div>' +
          '<span class="line"></span>' +
        '</div>' +
      '</div>';
  }

  function sinPiezas(cat) {
    return '' +
      '<div class="mt-10 proximamente reveal">' +
        '<p class="prox-titulo">Piezas en camino</p>' +
        '<p class="prox-texto">Estamos preparando esta línea. Escríbenos y te mostramos ' +
          'lo que hay disponible ahora mismo.</p>' +
        '<a class="prox-cta" href="' +
           wa('Hola Joyería Destiny, quiero información sobre las piezas en ' + cat.titulo + '.') +
           '" target="_blank" rel="noopener">' +
          '<svg class="prox-ico" viewBox="0 0 24 24" aria-hidden="true"><use href="#ico-wa" /></svg>' +
          'Consultar disponibilidad</a>' +
      '</div>';
  }

  function pintarCatalogo() {
    var caja = document.getElementById('catalogoGrid');
    if (!caja || !DATOS_OK) return;

    var html = '', n = 0;
    categorias.forEach(function (cat, i) {
      var suyos = productos.filter(function (p) { return perteneceA(p, cat); });
      html += cabecera(cat, i === 0);
      if (suyos.length) {
        html += '<div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ' +
                'gap-x-6 gap-y-14 lg:gap-x-8">';
        suyos.forEach(function (p) { html += fichaProducto(p, n++); });
        html += '</div>';
      } else {
        html += sinPiezas(cat);
      }
    });
    caja.innerHTML = html;
  }

  pintarCatalogo();

  var entry = document.getElementById('entry');
  function closeEntry() {
    if (entry) setTimeout(function () { entry.classList.add('is-gone'); }, 900);
  }
  if (document.readyState === 'complete') closeEntry();
  else window.addEventListener('load', closeEntry);

  setTimeout(closeEntry, 3500);

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

    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { abrirMenu(false); });
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        abrirMenu(false);
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) abrirMenu(false);
    });
  }

  var header = document.getElementById('header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

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

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (ev) {
      var id = link.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      ev.preventDefault();

      abrirMenu(false);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var cuenta = document.getElementById('cuenta');
  if (cuenta) {
    function amorYAmistad(anio) {
      var d = new Date(anio, 8, 1), sabados = [];
      while (d.getMonth() === 8) {
        if (d.getDay() === 6) sabados.push(new Date(d));
        d.setDate(d.getDate() + 1);
      }
      var f = sabados[2];
      f.setHours(23, 59, 59, 999);
      return f;
    }

    var ahora  = new Date();
    var limite = amorYAmistad(ahora.getFullYear());
    if (limite < ahora) limite = amorYAmistad(ahora.getFullYear() + 1);

    var MESES = ['enero','febrero','marzo','abril','mayo','junio','julio',
                 'agosto','septiembre','octubre','noviembre','diciembre'];
    var rotulo = document.getElementById('cuentaRotulo');
    if (rotulo) {
      rotulo.textContent = 'La promoción termina el sábado ' + limite.getDate() +
                           ' de ' + MESES[limite.getMonth()];
    }

    var dd = document.getElementById('cDias'),
        hh = document.getElementById('cHoras'),
        mm = document.getElementById('cMin'),
        ss = document.getElementById('cSeg');

    function dos(n) { return n < 10 ? '0' + n : String(n); }

    function tic() {
      var falta = limite - new Date();
      if (falta <= 0) {
        cuenta.classList.add('cuenta-fin');
        if (rotulo) rotulo.textContent = 'La promoción ha terminado';
        clearInterval(reloj);
        return;
      }
      var seg = Math.floor(falta / 1000);
      dd.textContent = dos(Math.floor(seg / 86400));
      hh.textContent = dos(Math.floor(seg / 3600) % 24);
      mm.textContent = dos(Math.floor(seg / 60) % 60);
      ss.textContent = dos(seg % 60);
    }

    tic();
    var reloj = setInterval(tic, 1000);
  }

  function vigilarFoto(img) {
    var caja = img.parentElement;
    if (!caja) return;

    function marcar()   { caja.classList.add('sin-arte'); }
    function desmarcar() { caja.classList.remove('sin-arte'); }

    img.addEventListener('error', marcar);
    img.addEventListener('load', function () {
      if (img.naturalWidth > 0) desmarcar();
    });

    if (img.complete && img.naturalWidth === 0) marcar();
  }

  document
    .querySelectorAll('.product-media img')
    .forEach(vigilarFoto);

})();
