/* ============================================================
   JOYERÍA DESTINY v2 — Navegación y vistas
   ------------------------------------------------------------
   Rutas (funcionan abriendo index.html directo, sin servidor):
     #/                    inicio: 4 puertas + identidad + la casa
     #/oro                 catálogo directo
     #/plata               elección de línea: Manillas o Anillos
     #/plata/manillas      catálogo de la línea
     #/plata/anillos       catálogo de la línea
     #/acero  #/rodio      catálogo directo
     #/pieza/27-nombre     ficha de una pieza

   "Atrás" vuelve a la página anterior conservando la posición de
   scroll. Si el visitante entró directo a una página interna
   (por ejemplo desde un enlace compartido), "Atrás" lo lleva a la
   página madre: pieza → su catálogo → su colección → inicio.
   ============================================================ */

(function () {
  'use strict';

  var raiz = document.documentElement;
  var app = document.getElementById('app');
  var waFlotante = document.getElementById('waFlotante');

  /* ---------------- Utilidades ---------------- */

  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function hayPrecio(n) {
    return n !== null && n !== undefined && n !== '' && !isNaN(Number(n));
  }

  function pesos(n) {
    return '$' + Number(n).toLocaleString('es-CO');
  }

  function precioTexto(p) {
    return hayPrecio(p.precio) ? pesos(p.precio) + ' COP' : 'precio a consultar';
  }

  function wa(mensaje) {
    return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(mensaje);
  }

  function slug(s) {
    return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function plural(n, uno, varios) { return n + ' ' + (n === 1 ? uno : varios); }

  function icono(id, clase) {
    return '<svg class="ico ' + (clase || '') + '" aria-hidden="true"><use href="#' + id + '"/></svg>';
  }

  /* ---------------- Consultas al catálogo ---------------- */

  function categoria(id) {
    for (var i = 0; i < CATEGORIAS.length; i++) if (CATEGORIAS[i].id === id) return CATEGORIAS[i];
    return null;
  }

  function linea(cat, id) {
    var ls = cat.lineas || [];
    for (var i = 0; i < ls.length; i++) if (ls[i].id === id) return ls[i];
    return null;
  }

  function lineaDe(p) {
    var cat = categoria(p.categoria);
    if (!cat || !cat.lineas) return null;
    for (var i = 0; i < cat.lineas.length; i++) {
      if (cat.lineas[i].tipos.indexOf(p.tipo) > -1) return cat.lineas[i];
    }
    return null;
  }

  function producto(id) {
    for (var i = 0; i < PRODUCTOS.length; i++) if (PRODUCTOS[i].id === id) return PRODUCTOS[i];
    return null;
  }

  // Piezas de una colección (y opcionalmente de una línea). Los combos van al final.
  function piezasDe(cat, lin) {
    return PRODUCTOS
      .map(function (p, i) { return { p: p, i: i }; })
      .filter(function (x) {
        return x.p.categoria === cat.id && (!lin || lin.tipos.indexOf(x.p.tipo) > -1);
      })
      .sort(function (a, b) {
        var ca = a.p.tipo === 'combo' ? 1 : 0, cb = b.p.tipo === 'combo' ? 1 : 0;
        return ca - cb || a.i - b.i;
      })
      .map(function (x) { return x.p; });
  }

  function etiquetaTipo(p) {
    if (p.tipo === 'anillo') return 'Anillo';
    if (p.tipo === 'combo') return 'Combo de 2 manillas';
    return 'Manilla';
  }

  function materialDe(p) {
    var cat = categoria(p.categoria);
    return cat ? cat.material : '';
  }

  function urlCatalogo(cat, lin) { return '#/' + cat.id + (lin ? '/' + lin.id : ''); }
  function urlPieza(p) { return '#/pieza/' + p.id + '-' + slug(p.nombre); }

  /* ---------------- Rutas ---------------- */

  function leerRuta() {
    // Solo los hash que empiezan por "#/" son rutas; cualquier otro (#app, #algo) es el inicio.
    if (location.hash && location.hash.indexOf('#/') !== 0) return { vista: 'inicio' };
    var partes = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    if (!partes.length) return { vista: 'inicio' };

    if (partes[0] === 'pieza') {
      var p = producto(parseInt(partes[1], 10));
      return p ? { vista: 'pieza', p: p } : { vista: 'nada' };
    }

    var cat = categoria(partes[0]);
    if (!cat) return { vista: 'nada' };

    if (cat.lineas) {
      if (!partes[1]) return { vista: 'lineas', cat: cat };
      var lin = linea(cat, partes[1]);
      return lin ? { vista: 'catalogo', cat: cat, lin: lin } : { vista: 'nada' };
    }
    return { vista: 'catalogo', cat: cat };
  }

  // Página madre de cada ruta: destino de "Atrás" cuando no hay página anterior.
  function rutaMadre(r) {
    if (r.vista === 'catalogo') return r.lin ? urlCatalogo(r.cat) : '#/';
    if (r.vista === 'pieza') return urlCatalogo(categoria(r.p.categoria), lineaDe(r.p));
    return '#/';
  }

  /* ---------------- Historial y posición de scroll ----------------
     Cada entrada del historial creada por la tienda lleva un índice
     ({ destiny: n }). Con él guardamos la posición de scroll de cada
     página y sabemos si "Atrás" puede volver dentro de la tienda.     */

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  var CLAVE_SCROLL = 'destiny-scroll';
  var posiciones = {};
  try { posiciones = JSON.parse(sessionStorage.getItem(CLAVE_SCROLL)) || {}; } catch (e) { posiciones = {}; }

  function guardarPosiciones() {
    try { sessionStorage.setItem(CLAVE_SCROLL, JSON.stringify(posiciones)); } catch (e) { /* modo privado */ }
  }

  function indiceDe(estado) {
    return estado && typeof estado.destiny === 'number' ? estado.destiny : null;
  }

  var actual = indiceDe(history.state);
  if (actual === null) {
    actual = 0;
    history.replaceState({ destiny: 0 }, '');
  }

  var rutaActual = null;
  var seccionPendiente = null;

  window.addEventListener('hashchange', function () {
    posiciones[actual] = window.scrollY;

    var indice = indiceDe(history.state);
    var esNueva = indice === null;

    if (esNueva) {
      if (!reemplazando) actual += 1;   // al subir a la página madre se reutiliza la misma entrada
      reemplazando = false;
      history.replaceState({ destiny: actual }, '');
      delete posiciones[actual];
    } else {
      actual = indice;
    }
    guardarPosiciones();
    pintar(esNueva ? 0 : (posiciones[actual] || 0), true);
  });

  // Si hay una página anterior de la tienda, se vuelve a ella. Si no (se entró por un enlace
  // directo), se sube a la página madre reemplazando la entrada actual, para que pulsar
  // "Atrás" de nuevo siga subiendo (pieza → catálogo → colección → inicio) y no rebote.
  var reemplazando = false;

  function irAtras() {
    if (actual > 0) { history.back(); return; }
    reemplazando = true;
    location.replace(rutaMadre(rutaActual));
  }

  /* ---------------- Piezas reutilizables ---------------- */

  function marcoFoto(src, alt, clase, carga) {
    return '<div class="marco-foto ' + (clase || '') + '">' +
             '<img src="' + esc(src) + '" alt="' + esc(alt) + '" ' +
                  'loading="' + (carga || 'lazy') + '" decoding="async" width="1200" height="1600" />' +
           '</div>';
  }

  function precioHTML(p, clase) {
    return hayPrecio(p.precio)
      ? '<p class="' + clase + '">' + pesos(p.precio) + ' <small>COP</small></p>'
      : '<p class="' + clase + ' a-consultar">Precio a consultar</p>';
  }

  function tarjeta(p, i) {
    return '' +
      '<a class="tarjeta revela" style="--d:' + (i % 4) + '" href="' + urlPieza(p) + '">' +
        '<div class="tarjeta-media">' +
          marcoFoto(p.imagen, p.alt, 'tarjeta-foto') +
          (p.tipo === 'combo' ? '<span class="sello">Combo · 2 piezas</span>' : '') +
        '</div>' +
        '<div class="tarjeta-info">' +
          '<h3 class="tarjeta-nombre">' + esc(p.nombre) + '</h3>' +
          '<p class="tarjeta-material">' + esc(materialDe(p)) + ' · ' + esc(etiquetaTipo(p)) + '</p>' +
          precioHTML(p, 'tarjeta-precio') +
        '</div>' +
      '</a>';
  }

  // Mensaje del botón "Diseñar mi pieza" (el mismo de la web oficial).
  var MENSAJE_A_MEDIDA = 'Hola Joyería Destiny, quiero una manilla a la medida (diseño personalizado).';

  // Última tarjeta de cada catálogo: el mismo llamado "¿Buscas algo que aún no está aquí?"
  // del inicio, con el mensaje de WhatsApp ajustado a la colección que se está viendo.
  function tarjetaDiseno(cat, lin) {
    var pieza = lin && lin.id === 'anillos' ? 'un anillo' : 'una manilla';
    return '' +
      '<a class="tarjeta tarjeta-diseno revela" href="' +
          wa('Hola Joyería Destiny, quiero ' + pieza + ' a la medida en ' + cat.nombre + ' (diseño personalizado).') +
          '" target="_blank" rel="noopener">' +
        '<div class="tarjeta-diseno-caja">' +
          '<img src="assets/img/logo.png" alt="" class="tarjeta-diseno-logo" />' +
          '<p class="tarjeta-diseno-titulo">¿Buscas algo que aún no está aquí?</p>' +
          '<p class="tarjeta-diseno-texto">Lo diseñamos para ti.</p>' +
          '<span class="tarjeta-diseno-cta">' + icono('i-wa') + 'Diseñar mi pieza</span>' +
        '</div>' +
      '</a>';
  }

  /* ---------------- Vista: inicio ---------------- */

  function puerta(cat, i) {
    var pie = cat.lineas
      ? cat.lineas.map(function (l) { return l.nombre; }).join(' · ')
      : plural(piezasDe(cat).length, 'pieza', 'piezas');

    return '' +
      '<a class="puerta" href="' + urlCatalogo(cat) + '" style="--d:' + i + '">' +
        marcoFoto(cat.portada, '', 'puerta-foto', i < 2 ? 'eager' : 'lazy') +
        '<span class="puerta-velo" aria-hidden="true"></span>' +
        '<span class="puerta-cabeza">' +
          '<span class="puerta-num">0' + (i + 1) + '<span> / 0' + CATEGORIAS.length + '</span></span>' +
          '<span class="puerta-nombre">' + esc(cat.nombre) + '</span>' +
          '<span class="puerta-lema">' + esc(cat.lema) + '</span>' +
        '</span>' +
        '<span class="puerta-pie">' +
          '<span class="btn-claro">Explorar ' + icono('i-flecha') + '</span>' +
          '<span class="puerta-cuenta">' + esc(pie) + '</span>' +
        '</span>' +
      '</a>';
  }

  function vistaInicio() {
    var materiales = [
      ['oro', 'Oro 18 kilates',
       'Dieciocho partes de oro puro sobre veinticuatro: el 75 % de cada balín es oro. Es el ' +
       'estándar de la alta joyería por su color cálido, su peso noble y un valor que permanece ' +
       'con los años.'],
      ['plata', 'Plata Ley 925',
       'El 92,5 % es plata pura; el 7,5 % restante es la aleación que le da firmeza. Es la plata ' +
       'de la joyería fina: brillo frío y elegante, ideal para todos los días. Si con el tiempo ' +
       'se opaca, un paño de pulir le devuelve su luz.'],
      ['acero', 'Acero inoxidable',
       'Un metal resistente que no se oxida, pensado para quien quiere una pieza con presencia ' +
       'que lo acompañe a diario sin preocupaciones.'],
      ['rodio', 'Rodio',
       'Balinería de brillo intenso para el día a día. La forma ideal de empezar tu colección y ' +
       'lucir una pieza Destiny desde el primer momento.']
    ];

    return '' +
      '<h1 class="sr-only" tabindex="-1">Joyería Destiny: elige tu colección</h1>' +

      '<section class="puertas" aria-label="Colecciones">' +
        CATEGORIAS.map(puerta).join('') +
      '</section>' +

      /* ---------- Diseño a la medida (textos de la web oficial) ---------- */
      '<section class="a-medida" aria-labelledby="aMedidaTitulo">' +
        '<div class="contenedor">' +
          '<h2 class="a-medida-titulo revela" id="aMedidaTitulo">¿Buscas algo que aún no está aquí?</h2>' +
          '<p class="a-medida-texto revela">Lo diseñamos para ti.</p>' +
          '<a class="btn-oro revela" href="' + wa(MENSAJE_A_MEDIDA) + '" target="_blank" rel="noopener">' +
            icono('i-wa') + 'Diseñar mi pieza</a>' +
        '</div>' +
      '</section>' +

      /* ---------- Identidad de marca ---------- */
      '<section id="identidad" class="identidad">' +
        '<div class="contenedor">' +
          '<p class="ceja revela">Identidad de marca</p>' +
          '<h2 class="titulo-seccion revela">El brillo que refleja <em>tu personalidad</em></h2>' +
          '<div class="prosa revela">' +
            '<p class="apertura">En Destiny creemos que una joya no se escoge: se reconoce. Es esa ' +
              'pieza que, al verla, ya sabes que habla de ti. Por eso cada manilla y cada anillo ' +
              'nace pensado para una persona, no para una vitrina.</p>' +
            '<p>Trabajamos con minerales de lujo —oro nacional 18 kilates, plata ley 925, acero ' +
              'inoxidable y rodio— y los unimos a un oficio que no admite prisa: el tejido a mano. ' +
              'El resultado son piezas sobrias y con carácter, hechas para acompañar decisiones, ' +
              'promesas y nuevos comienzos.</p>' +
          '</div>' +

          '<ol class="pilares">' +
            pilar('I', 'Autenticidad',
              'Garantizamos la autenticidad de cada mineral. Lo que dice la ficha de la pieza es ' +
              'exactamente lo que llevas en la muñeca.') +
            pilar('II', 'Oficio',
              'Cada pieza la teje personal especializado que cuida cada nudo, la tensión del hilo ' +
              'y la posición de cada balín. El detalle es lo que separa una joya de un accesorio.') +
            pilar('III', 'Significado',
              'San Benito, San Miguel Arcángel, la Virgen María. Muchas de nuestras piezas llevan ' +
              'una medalla, porque una joya también puede guardar fe, protección o memoria.') +
            pilar('IV', 'Personalidad',
              'El color del hilo, la balinería, el dije. Te acompañamos a personalizar tu pieza ' +
              'para que sea tuya de verdad, y no una más.') +
          '</ol>' +

          '<div class="materiales">' +
            '<div class="materiales-cabeza">' +
              '<h3 class="subtitulo revela">Guía de materiales</h3>' +
              '<p class="materiales-intro revela">Lo que hay detrás de cada nombre, explicado con claridad.</p>' +
            '</div>' +
            '<div class="materiales-lista">' +
            materiales.map(function (m, i) {
              return '' +
                '<a class="material revela" href="#/' + m[0] + '">' +
                  '<span class="material-num">0' + (i + 1) + '</span>' +
                  '<span class="material-cuerpo">' +
                    '<span class="material-nombre">' + m[1] + '</span>' +
                    '<span class="material-texto">' + m[2] + '</span>' +
                  '</span>' +
                  icono('i-flecha', 'material-flecha') +
                '</a>';
            }).join('') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      /* ---------- La casa Destiny ---------- */
      '<section id="casa" class="casa">' +
        '<div class="casa-portada">' +
          marcoFoto('assets/img/hero.jpg', 'Manilla de plata 925 tejida a mano por Joyería Destiny', 'casa-foto') +
          '<span class="casa-velo" aria-hidden="true"></span>' +
          '<div class="contenedor casa-portada-texto">' +
            '<p class="ceja revela">Casa Destiny</p>' +
            '<h2 class="titulo-seccion revela">No seguimos un camino, <em>construimos el nuestro</em></h2>' +
          '</div>' +
        '</div>' +

        '<div class="contenedor casa-cuerpo">' +
          '<p class="casa-texto revela">Joyería Destiny es una casa colombiana dedicada a las ' +
            'piezas que acompañan decisiones. Trabajamos con materiales de lujo buscando siempre ' +
            'que cada joya conecte contigo.</p>' +
          '<figure class="cita revela">' +
            '<blockquote>“Cada pieza lleva un destino. Encuentra el tuyo.”</blockquote>' +
          '</figure>' +
        '</div>' +
      '</section>';
  }

  function pilar(num, titulo, texto) {
    return '' +
      '<li class="pilar revela">' +
        '<span class="pilar-num">' + num + '</span>' +
        '<h3 class="pilar-titulo">' + titulo + '</h3>' +
        '<p class="pilar-texto">' + texto + '</p>' +
      '</li>';
  }

  /* ---------------- Vista: elección de línea (Plata) ---------------- */

  function vistaLineas(cat) {
    return '' +
      '<section class="lineas">' +
        '<header class="cabeza-vista contenedor">' +
          '<p class="ceja">Colección</p>' +
          '<h1 class="titulo-vista" tabindex="-1">' + esc(cat.nombre) + '</h1>' +
          '<p class="cabeza-desc">' + esc(cat.descripcion) + '</p>' +
          '<p class="cabeza-pregunta">¿Qué estás buscando?</p>' +
        '</header>' +
        '<div class="lineas-grid">' +
          cat.lineas.map(function (lin, i) {
            var n = piezasDe(cat, lin).length;
            return '' +
              '<a class="puerta puerta-linea" href="' + urlCatalogo(cat, lin) + '" style="--d:' + i + '">' +
                marcoFoto(lin.portada, '', 'puerta-foto', 'eager') +
                '<span class="puerta-velo" aria-hidden="true"></span>' +
                '<span class="puerta-cabeza">' +
                  '<span class="puerta-num">' + esc(cat.nombre) + '</span>' +
                  '<span class="puerta-nombre">' + esc(lin.nombre) + '</span>' +
                  '<span class="puerta-lema">' + esc(lin.lema) + '</span>' +
                '</span>' +
                '<span class="puerta-pie">' +
                  '<span class="btn-claro">Ver ' + esc(lin.nombre.toLowerCase()) + ' ' + icono('i-flecha') + '</span>' +
                  '<span class="puerta-cuenta">' + plural(n, 'pieza', 'piezas') + '</span>' +
                '</span>' +
              '</a>';
          }).join('') +
        '</div>' +
      '</section>';
  }

  /* ---------------- Vista: catálogo ---------------- */

  function vistaCatalogo(cat, lin) {
    var piezas = piezasDe(cat, lin);
    var fuente = lin || cat;

    return '' +
      '<section class="catalogo">' +
        '<header class="portada">' +
          marcoFoto(fuente.portada, '', 'portada-foto', 'eager') +
          '<span class="portada-velo" aria-hidden="true"></span>' +
          '<div class="portada-texto contenedor">' +
            '<p class="ceja">' + (lin ? esc(cat.nombre) : 'Colección') + '</p>' +
            '<h1 class="titulo-vista" tabindex="-1">' + esc(fuente.nombre) + '</h1>' +
            '<p class="portada-desc">' + esc(fuente.descripcion) + '</p>' +
          '</div>' +
        '</header>' +

        '<div class="contenedor">' +
          '<div class="barra-catalogo">' +
            '<span>' + plural(piezas.length, 'pieza', 'piezas') + '</span>' +
            '<span>Precios en pesos colombianos</span>' +
          '</div>' +
          '<div class="rejilla">' +
            piezas.map(tarjeta).join('') +
            tarjetaDiseno(cat, lin) +
          '</div>' +
        '</div>' +
      '</section>';
  }

  /* ---------------- Vista: ficha de la pieza ---------------- */

  function vistaPieza(p) {
    var cat = categoria(p.categoria);
    var lin = lineaDe(p);
    var lineas = String(p.detalle || '').split('.')
      .map(function (s) { return s.trim(); })
      .filter(Boolean);

    var hermanas = piezasDe(cat, lin).filter(function (x) { return x.id !== p.id; });
    if (hermanas.length < 3) {
      piezasDe(cat).forEach(function (x) {
        if (x.id !== p.id && hermanas.indexOf(x) === -1) hermanas.push(x);
      });
    }
    hermanas = hermanas.slice(0, 8);

    var etiqueta = materialDe(p) + ' · ' + etiquetaTipo(p);
    var pedir = wa('Hola Joyería Destiny, quiero pedir "' + p.nombre + '" (' + etiqueta + ', ' +
                   precioTexto(p) + '). ¿Está disponible?');
    var personalizar = wa('Hola Joyería Destiny, me gusta "' + p.nombre + '" (' + etiqueta +
                          ') y quiero personalizarla. ¿Qué opciones tengo?');

    return '' +
      '<article class="pieza">' +
        '<div class="pieza-galeria">' +
          '<button type="button" class="pieza-lupa" aria-label="Acercar la foto" data-lupa>' +
            marcoFoto(p.imagen, p.alt, 'pieza-foto', 'eager') +
            '<span class="pieza-pista">' + icono('i-lupa') + '<span>Toca para acercar</span></span>' +
          '</button>' +
        '</div>' +

        '<div class="pieza-info">' +
          '<nav class="migas" aria-label="Ruta">' +
            '<a href="' + urlCatalogo(cat) + '">' + esc(cat.nombre) + '</a>' +
            (lin ? '<span aria-hidden="true">/</span><a href="' + urlCatalogo(cat, lin) + '">' + esc(lin.nombre) + '</a>' : '') +
          '</nav>' +
          '<h1 class="pieza-nombre" tabindex="-1">' + esc(p.nombre) + '</h1>' +
          '<p class="pieza-tipo">' + esc(etiqueta) + '</p>' +
          precioHTML(p, 'pieza-precio') +

          '<div class="pieza-acciones" id="piezaAcciones">' +
            '<a class="btn-oro" href="' + pedir + '" target="_blank" rel="noopener">' +
              icono('i-wa') + 'Pedir por WhatsApp</a>' +
            '<a class="btn-linea" href="' + personalizar + '" target="_blank" rel="noopener">' +
              'Personalizar esta pieza</a>' +
          '</div>' +

          '<section class="pieza-detalle">' +
            '<h2 class="pieza-subtitulo">Detalle de la pieza</h2>' +
            '<ul>' + lineas.map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul>' +
          '</section>' +

          '<ul class="garantias">' +
            garantia('i-sello', 'Autenticidad garantizada', 'Respaldamos la autenticidad de cada mineral') +
            garantia('i-hilo', 'Tejida a mano', 'Por personal especializado de la casa') +
            garantia('i-pincel', 'Personalizable', 'Color del hilo, balinería y dije') +
            garantia('i-caja', 'Entrega en toda Colombia', 'Llega en su estuche') +
          '</ul>' +
        '</div>' +
      '</article>' +

      (hermanas.length ? '' +
        '<section class="relacionadas">' +
          '<div class="contenedor">' +
            '<h2 class="subtitulo">También en ' + esc(lin ? cat.nombre + ' · ' + lin.nombre : cat.nombre) + '</h2>' +
          '</div>' +
          '<div class="carrusel">' +
            hermanas.map(function (x) {
              return '' +
                '<a class="mini" href="' + urlPieza(x) + '">' +
                  marcoFoto(x.imagen, x.alt, 'mini-foto') +
                  '<span class="mini-nombre">' + esc(x.nombre) + '</span>' +
                  (hayPrecio(x.precio) ? '<span class="mini-precio">' + pesos(x.precio) + '</span>' : '') +
                '</a>';
            }).join('') +
          '</div>' +
        '</section>' : '') +

      '<div class="barra-compra" id="barraCompra" aria-hidden="true">' +
        '<div class="barra-compra-texto">' +
          '<span class="barra-compra-nombre">' + esc(p.nombre) + '</span>' +
          (hayPrecio(p.precio) ? '<span class="barra-compra-precio">' + pesos(p.precio) + ' COP</span>' : '') +
        '</div>' +
        '<a class="btn-oro btn-oro-compacto" href="' + pedir + '" target="_blank" rel="noopener" tabindex="-1">' +
          icono('i-wa') + 'Pedir</a>' +
      '</div>';
  }

  function garantia(ico, titulo, texto) {
    return '<li>' + icono(ico) + '<div><strong>' + titulo + '</strong><span>' + texto + '</span></div></li>';
  }

  /* ---------------- Vista: no encontrada ---------------- */

  function vistaNada() {
    return '' +
      '<section class="nada contenedor">' +
        '<p class="ceja">Página no encontrada</p>' +
        '<h1 class="titulo-vista" tabindex="-1">Esta pieza ya no está en vitrina</h1>' +
        '<p class="cabeza-desc">Puede que el enlace haya cambiado. Te invitamos a recorrer las colecciones.</p>' +
        '<a class="btn-oro" href="#/">Volver al inicio</a>' +
      '</section>';
  }

  /* ---------------- Pintar la vista actual ---------------- */

  function tituloDe(r) {
    var base = 'Joyería Destiny';
    if (r.vista === 'catalogo') return (r.lin ? r.lin.nombre + ' en ' : '') + r.cat.nombre + ' — ' + base;
    if (r.vista === 'lineas') return r.cat.nombre + ' — ' + base;
    if (r.vista === 'pieza') return r.p.nombre + ' · ' + materialDe(r.p) + ' — ' + base;
    if (r.vista === 'nada') return 'Página no encontrada — ' + base;
    return base + ' — El brillo que refleja tu personalidad';
  }

  function mensajeFlotante(r) {
    if (r.vista === 'catalogo' || r.vista === 'lineas') {
      return 'Hola Joyería Destiny, estoy viendo la colección ' +
             (r.lin ? r.lin.nombre + ' en ' : '') + r.cat.nombre + ' y quiero asesoría.';
    }
    return 'Hola Joyería Destiny, quiero asesoría para elegir una pieza.';
  }

  // Resalta en la cabecera (computador) la colección en la que está el cliente.
  function marcarColeccion(r) {
    var actualCat = r.cat ? r.cat.id : (r.p ? r.p.categoria : null);
    document.querySelectorAll(".cabecera-nav a").forEach(function (a) {
      if (a.getAttribute("data-cat") === actualCat) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function pintar(y, porNavegacion) {
    var r = leerRuta();
    rutaActual = r;

    var html;
    if (r.vista === 'inicio') html = vistaInicio();
    else if (r.vista === 'lineas') html = vistaLineas(r.cat);
    else if (r.vista === 'catalogo') html = vistaCatalogo(r.cat, r.lin);
    else if (r.vista === 'pieza') html = vistaPieza(r.p);
    else html = vistaNada();

    raiz.setAttribute('data-vista', r.vista);
    app.innerHTML = html;
    document.title = tituloDe(r);
    if (waFlotante) waFlotante.href = wa(mensajeFlotante(r));
    marcarColeccion(r);

    app.classList.remove('entra');
    void app.offsetWidth;
    app.classList.add('entra');

    var destino = seccionPendiente && document.getElementById(seccionPendiente);
    seccionPendiente = null;

    activarVista(y > 0 || !!destino);

    if (destino) destino.scrollIntoView();
    else window.scrollTo(0, y);
    mostrarCabecera();
    barraCompra.visible = false;
    revisarBarraCompra();

    if (porNavegacion) {
      var h1 = app.querySelector('h1');
      if (h1) h1.focus({ preventScroll: true });
    }
  }

  /* ---------------- Comportamiento de cada vista ---------------- */

  var observadores = [];

  function activarVista(restaurando) {
    observadores.forEach(function (o) { o.disconnect(); });
    observadores = [];

    var revelar = app.querySelectorAll('.revela, .puerta');
    if (restaurando || !('IntersectionObserver' in window)) {
      revelar.forEach(function (el) { el.classList.add('visible'); });
    } else {
      var obs = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
      revelar.forEach(function (el) { obs.observe(el); });
      observadores.push(obs);
    }

    barraCompra.acciones = document.getElementById('piezaAcciones');
    barraCompra.barra = document.getElementById('barraCompra');

    var lupa = app.querySelector('[data-lupa]');
    if (lupa) activarLupa(lupa);
  }

  // Lupa: tocar la foto la acerca en el punto tocado; con mouse, la foto sigue al cursor.
  function activarLupa(boton) {
    var img = boton.querySelector('img');
    var pista = boton.querySelector('.pieza-pista span');

    function origen(ev) {
      var r = boton.getBoundingClientRect();
      var x = ev && ev.clientX ? ((ev.clientX - r.left) / r.width) * 100 : 50;
      var y = ev && ev.clientY ? ((ev.clientY - r.top) / r.height) * 100 : 50;
      img.style.transformOrigin = Math.max(0, Math.min(100, x)) + '% ' + Math.max(0, Math.min(100, y)) + '%';
    }

    boton.addEventListener('click', function (ev) {
      var acercar = !boton.classList.contains('acercada');
      if (acercar) origen(ev);
      boton.classList.toggle('acercada', acercar);
      boton.setAttribute('aria-label', acercar ? 'Alejar la foto' : 'Acercar la foto');
      if (pista) pista.textContent = acercar ? 'Toca para alejar' : 'Toca para acercar';
    });

    boton.addEventListener('pointermove', function (ev) {
      if (ev.pointerType === 'mouse' && boton.classList.contains('acercada')) origen(ev);
    });
  }

  /* ---------------- Barra de compra (ficha de la pieza, celular) ----------------
     Aparece cuando los botones "Pedir" de la ficha ya quedaron arriba, fuera de pantalla. */

  var barraCompra = { acciones: null, barra: null, visible: false };

  function revisarBarraCompra() {
    var b = barraCompra;
    if (!b.acciones || !b.barra) return;
    var mostrar = b.acciones.getBoundingClientRect().bottom < 0;
    if (mostrar === b.visible) return;
    b.visible = mostrar;
    b.barra.classList.toggle('visible', mostrar);
    b.barra.setAttribute('aria-hidden', mostrar ? 'false' : 'true');
    b.barra.querySelector('a').tabIndex = mostrar ? 0 : -1;
  }

  /* ---------------- Cabecera: se oculta al bajar, vuelve al subir ---------------- */

  var ultimoY = window.scrollY;

  function mostrarCabecera() {
    raiz.classList.remove('cabecera-oculta');
    raiz.classList.toggle('cabecera-solida', window.scrollY > 24);
    ultimoY = window.scrollY;
  }

  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    raiz.classList.toggle('cabecera-solida', y > 24);
    if (y > ultimoY + 6 && y > 140) raiz.classList.add('cabecera-oculta');
    else if (y < ultimoY - 6 || y < 140) raiz.classList.remove('cabecera-oculta');
    if (Math.abs(y - ultimoY) > 6) ultimoY = y;
    revisarBarraCompra();
  }, { passive: true });

  /* ---------------- Clics delegados ---------------- */

  document.addEventListener('click', function (ev) {
    var atras = ev.target.closest('[data-atras]');
    if (atras) { ev.preventDefault(); irAtras(); return; }

    if (ev.target.closest('.saltar')) {
      ev.preventDefault();
      var h1 = app.querySelector('h1');
      (h1 || app).focus();
      return;
    }

    // Enlaces a secciones del inicio (Identidad, La casa) desde cualquier página.
    var ir = ev.target.closest('[data-seccion]');
    if (ir) {
      ev.preventDefault();
      var id = ir.getAttribute('data-seccion');
      if (rutaActual && rutaActual.vista === 'inicio') {
        var el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        seccionPendiente = id;
        location.hash = '#/';
      }
    }
  });

  // Foto que no carga: el marco muestra el sello de la casa en lugar de un hueco.
  document.addEventListener('error', function (ev) {
    var t = ev.target;
    if (t && t.tagName === 'IMG') {
      var marco = t.closest('.marco-foto');
      if (marco) marco.classList.add('sin-foto');
    }
  }, true);

  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();

  /* ---------------- Arranque ---------------- */

  if (typeof CATEGORIAS === 'undefined' || typeof PRODUCTOS === 'undefined') {
    app.innerHTML = '<p class="contenedor" style="padding:8rem 0">No se pudo cargar el catálogo (js/catalogo.js).</p>';
    return;
  }

  pintar(posiciones[actual] || 0, false);

  var entrada = document.getElementById('entrada');
  if (entrada) {
    var cerrar = function () { entrada.classList.add('fuera'); };
    if (document.readyState === 'complete') setTimeout(cerrar, 500);
    else window.addEventListener('load', function () { setTimeout(cerrar, 500); });
    setTimeout(cerrar, 1600);   // en conexiones lentas no se hace esperar al cliente
  }
})();
