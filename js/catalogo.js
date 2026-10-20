/* ============================================================
   JOYERÍA DESTINY v2 — Datos del catálogo
   ------------------------------------------------------------
   Aquí se edita TODO el contenido de la tienda:
   · WHATSAPP    número de contacto (sin +, sin espacios)
   · CATEGORIAS  las 4 puertas de la página de inicio
   · PRODUCTOS   cada pieza del catálogo

   Cada producto necesita:
     id          número único (se usa en la dirección de la pieza)
     nombre      nombre visible
     categoria   'oro' | 'plata' | 'acero' | 'rodio'
     tipo        'manilla' | 'anillo' | 'combo'
     precio      número en pesos colombianos, o null = "a consultar"
     imagen      ruta de la foto (vertical 3:4 recomendada)
     alt         descripción de la foto (accesibilidad y Google)
     detalle     especificación; cada frase separada por punto se
                 muestra como una línea en la ficha de la pieza
   ============================================================ */

const WHATSAPP = '573042177260';

const CATEGORIAS = [
  {
    id: 'oro',
    nombre: 'Oro 18 kilates',
    material: 'Oro 18k',
    lema: 'La línea más noble de la casa',
    descripcion: 'Oro nacional de 18 kilates —75 % oro puro— en balines lisos y diamantados, ' +
                 'tejidos a mano sobre hilo. Una pieza para llevar toda la vida.',
    portada: 'assets/img/catalogo/el-brillo-que-reflejas.jpg'
  },
  {
    id: 'plata',
    nombre: 'Plata Ley 925',
    material: 'Plata 925',
    lema: 'Alta joyería para todos los días',
    descripcion: 'Plata ley 925 —92,5 % plata pura— en balinería diamantada, italiana y lisa, ' +
                 'con medallas de San Benito y San Miguel Arcángel.',
    portada: 'assets/img/catalogo/el-brillo.jpg',
    // Plata no muestra productos de inmediato: primero se elige una de estas líneas.
    lineas: [
      {
        id: 'manillas',
        nombre: 'Manillas',
        tipos: ['manilla', 'combo'],
        lema: 'Tejidas a mano, una por una',
        descripcion: 'Clásicas, trenzadas, con medalla o con piedras como cuarzo azul y ' +
                     'cornalina. Toda la balinería en plata ley 925.',
        portada: 'assets/img/catalogo/la-presencia.jpg'
      },
      {
        id: 'anillos',
        nombre: 'Anillos',
        tipos: ['anillo'],
        lema: 'El mismo oficio, para tu mano',
        descripcion: 'El mismo tejido y la misma balinería de plata ley 925 de nuestras ' +
                     'manillas, ahora en anillo.',
        portada: 'assets/img/catalogo/anillo-san-benito.jpg'
      }
    ]
  },
  {
    id: 'acero',
    nombre: 'Acero',
    material: 'Acero inoxidable',
    lema: 'Carácter hecho para resistir',
    descripcion: 'Balinería dorada en acero inoxidable, un metal que no se oxida y está hecho ' +
                 'para el uso diario. Presencia y resistencia al mejor precio.',
    portada: 'assets/img/catalogo/tres-carriles-acero.jpg'
  },
  {
    id: 'rodio',
    nombre: 'Rodio',
    material: 'Rodio',
    lema: 'El brillo para tu día a día',
    descripcion: 'Balinería en rodio de brillo intenso, pensada para acompañarte todos los ' +
                 'días. La puerta de entrada a la casa Destiny.',
    portada: 'assets/img/catalogo/clasica-negra-rodio.jpg'
  }
];

const PRODUCTOS = [

  /* ---------------- ORO 18 KILATES ---------------- */
  {
    id: 27, categoria: 'oro', tipo: 'manilla',
    nombre: 'El brillo que reflejas',
    precio: 427000,
    imagen: 'assets/img/catalogo/el-brillo-que-reflejas.jpg',
    alt: 'Manilla de hilo negro con una hilera de balines de oro 18 kilates diamantados',
    detalle: 'Balinería en oro 18 kilates. 9 balines #4 diamantados. 2 balines #3 diamantados.'
  },
  {
    id: 28, categoria: 'oro', tipo: 'manilla',
    nombre: 'Dorado carmesí',
    precio: 232000,
    imagen: 'assets/img/catalogo/dorado-carmesi.jpg',
    alt: 'Manilla tejida en hilo rojo y beige con balines de oro 18 kilates diamantados y cuentas rojas',
    detalle: 'Balinería en oro 18 kilates. 3 balines #4 diamantados. 2 balines #3 diamantados.'
  },

  /* ---------------- PLATA LEY 925 · MANILLAS ---------------- */
  {
    id: 1, categoria: 'plata', tipo: 'manilla',
    nombre: 'La Presencia',
    precio: 138200,
    imagen: 'assets/img/catalogo/la-presencia.jpg',
    alt: 'Manilla tejida en hilo negro con balinería de plata 925 en tamaños graduados, presentada en estuche',
    detalle: 'Balinería en plata 925. 6 balines #6 diamantados. 3 balines #8 diamantados. 2 balines #5 lisos.'
  },
  {
    id: 31, categoria: 'plata', tipo: 'manilla',
    nombre: 'El brillo',
    precio: 171600,
    imagen: 'assets/img/catalogo/el-brillo.jpg',
    alt: 'Manilla de hilo negro con doble hilera de balines de plata 925 diamantados y medalla central de San Benito',
    detalle: 'Balinería y dije en plata 925. 32 balines #4 diamantados. 2 balines #4 lisos.'
  },
  {
    id: 24, categoria: 'plata', tipo: 'manilla',
    nombre: 'San Benito tres carriles',
    precio: 152900,
    imagen: 'assets/img/catalogo/san-benito-tres-carriles.jpg',
    alt: 'Manilla ancha de hilo negro con tres carriles de balines de plata 925 y medalla central de San Benito',
    detalle: 'Balinería y dije en plata 925. 12 balines #5 diamantados. 2 balines #4 lisos. 20 balines #3 lisos.'
  },
  {
    id: 3, categoria: 'plata', tipo: 'manilla',
    nombre: 'El Lujo',
    precio: 139900,
    imagen: 'assets/img/catalogo/el-lujo-plata-925.jpg',
    alt: 'Manilla de hilo negro cubierta por una hilera densa de balines de plata 925 diamantados',
    detalle: 'Balinería en plata ley 925. 12 balines #5 diamantados. 22 balines #3 diamantados. 2 balines #4 lisos.'
  },
  {
    id: 30, categoria: 'plata', tipo: 'manilla',
    nombre: 'Trenzada beige',
    precio: 103900,
    imagen: 'assets/img/catalogo/trenzada-beige.jpg',
    alt: 'Manilla trenzada en hilo beige y negro con balines de plata 925 diamantados',
    detalle: 'Balinería en plata 925. 13 balines #5 diamantados.'
  },
  {
    id: 2, categoria: 'plata', tipo: 'manilla',
    nombre: 'San Miguel Arcángel bicolor',
    precio: 92400,
    imagen: 'assets/img/catalogo/san-miguel-arcangel-bicolor.jpg',
    alt: 'Manilla tejida en hilo negro y beige con dije ovalado de San Miguel Arcángel y balinería de plata 925',
    detalle: 'Dije y balinería en plata 925. 4 balines #5 diamantados. 2 balines #4 italianos. 2 balines #4 lisos.'
  },
  {
    id: 17, categoria: 'plata', tipo: 'manilla',
    nombre: 'Clásica beige',
    precio: 77600,
    imagen: 'assets/img/catalogo/clasica-beige-plata-925.jpg',
    alt: 'Manilla tejida en hilo beige con una hilera continua de balines de plata 925 italianos',
    detalle: 'Balinería en plata ley 925. 16 balines #4 italianos. 2 balines #4 lisos.'
  },
  {
    id: 18, categoria: 'plata', tipo: 'manilla',
    nombre: 'Clásica negra',
    precio: 77600,
    imagen: 'assets/img/catalogo/clasica-negra-plata-925.jpg',
    alt: 'Manilla tejida en hilo negro con una hilera continua de balines de plata 925 italianos',
    detalle: 'Balinería en plata ley 925. 16 balines #4 italianos. 2 balines #4 lisos.'
  },
  {
    id: 19, categoria: 'plata', tipo: 'manilla',
    nombre: 'Clásica roja',
    precio: 77600,
    imagen: 'assets/img/catalogo/clasica-roja-plata-925.jpg',
    alt: 'Manilla tejida en hilo rojo con una hilera continua de balines de plata 925 italianos',
    detalle: 'Balinería en plata ley 925. 16 balines #4 italianos. 2 balines #4 lisos.'
  },
  {
    id: 16, categoria: 'plata', tipo: 'manilla',
    nombre: 'La Inigualable',
    precio: 65000,
    imagen: 'assets/img/catalogo/la-inigualable.jpg',
    alt: 'Manilla con balines de plata 925 diamantados, disponible en hilo beige, verde y rojo',
    detalle: 'Balinería en plata ley 925. 6 balines #5 diamantados. 2 balines #4 lisos.'
  },
  {
    id: 22, categoria: 'plata', tipo: 'manilla',
    nombre: 'Full Black',
    precio: 53500,
    imagen: 'assets/img/catalogo/full-black.jpg',
    alt: 'Manilla tejida enteramente en hilo negro con dos balines de plata 925 diamantados en los extremos',
    detalle: 'Balinería en plata 925. 2 balines #6 diamantados.'
  },
  {
    id: 11, categoria: 'plata', tipo: 'manilla',
    nombre: 'Blue Desing',
    precio: 45000,
    imagen: 'assets/img/catalogo/blue-desing.jpg',
    alt: 'Manilla de cuentas de cuarzo azul alternadas con balines de plata 925 y cierre de hilo negro',
    detalle: 'Cuarzo azul y plata 925. 6 balines #4 italianos.'
  },
  {
    id: 26, categoria: 'plata', tipo: 'manilla',
    nombre: 'Full roja',
    precio: 45000,
    imagen: 'assets/img/catalogo/full-roja.jpg',
    alt: 'Manilla de cuentas de cornalina roja alternadas con balines de plata 925 italianos',
    detalle: 'Plata 925 y cornalina. 6 balines #4 italianos.'
  },
  {
    id: 20, categoria: 'plata', tipo: 'combo',
    nombre: 'Combo beige y negro',
    precio: 137400,
    imagen: 'assets/img/catalogo/combo-beige-y-negro.jpg',
    alt: 'Combo de dos manillas con balines de plata 925, una en hilo negro y otra en hilo beige',
    detalle: 'Dos manillas, una en hilo negro y otra en hilo beige. Balinería en plata 925.'
  },

  /* ---------------- PLATA LEY 925 · ANILLOS ---------------- */
  {
    id: 5, categoria: 'plata', tipo: 'anillo',
    nombre: 'Anillo de San Benito',
    precio: 63600,
    imagen: 'assets/img/catalogo/anillo-san-benito.jpg',
    alt: 'Anillo tejido en hilo negro con medalla de San Benito en plata 925 rodeada de balines diamantados',
    detalle: 'Balinería y dije en plata 925. 16 balines #3 diamantados.'
  },
  {
    id: 6, categoria: 'plata', tipo: 'anillo',
    nombre: 'Anillo San Miguel Arcángel',
    precio: 53500,
    imagen: 'assets/img/catalogo/anillo-san-miguel-arcangel.jpg',
    alt: 'Anillo tejido en hilo negro con medalla de San Miguel Arcángel en plata 925 y balines diamantados',
    detalle: 'Balinería y dije en plata 925. 12 balines #3 diamantados.'
  },
  {
    id: 4, categoria: 'plata', tipo: 'anillo',
    nombre: 'Anillo tejido',
    precio: 43900,
    imagen: 'assets/img/catalogo/anillo-tejido.jpg',
    alt: 'Anillo tejido en hilo negro con una hilera de balines de plata 925 italianos',
    detalle: 'Balinería en plata ley 925. 7 balines #4 italianos.'
  },

  /* ---------------- ACERO ---------------- */
  {
    id: 25, categoria: 'acero', tipo: 'manilla',
    nombre: 'Virgen María trenzada',
    precio: 53500,
    imagen: 'assets/img/catalogo/virgen-maria-trenzada.jpg',
    alt: 'Manilla trenzada en hilo rojo y beige con medalla dorada de la Virgen María y balines de acero inoxidable',
    detalle: 'Balinería y dije en acero inoxidable.'
  },
  {
    id: 9, categoria: 'acero', tipo: 'manilla',
    nombre: 'Tres carriles',
    precio: 39900,
    imagen: 'assets/img/catalogo/tres-carriles-acero.jpg',
    alt: 'Manilla ancha de hilo negro con tres carriles paralelos de balines dorados en acero inoxidable',
    detalle: 'Balinería en acero inoxidable.'
  },
  {
    id: 10, categoria: 'acero', tipo: 'manilla',
    nombre: 'El Lujo',
    precio: 39900,
    imagen: 'assets/img/catalogo/el-lujo-acero.jpg',
    alt: 'Manilla de hilo negro con balines dorados de dos tamaños alternados en acero inoxidable',
    detalle: 'Balinería en acero inoxidable.'
  },
  {
    id: 21, categoria: 'acero', tipo: 'manilla',
    nombre: 'Manilla zig zag',
    precio: 39900,
    imagen: 'assets/img/catalogo/manilla-zig-zag.jpg',
    alt: 'Manilla de hilo negro con balines dorados de acero inoxidable tejidos en zigzag',
    detalle: 'Balinería en acero inoxidable.'
  },
  {
    id: 14, categoria: 'acero', tipo: 'manilla',
    nombre: 'Manilla trenzada',
    precio: 37500,
    imagen: 'assets/img/catalogo/manilla-trenzada.jpg',
    alt: 'Manilla trenzada en hilo beige y rojo con balines dorados en acero inoxidable',
    detalle: 'Balinería en acero inoxidable.'
  },
  {
    id: 15, categoria: 'acero', tipo: 'combo',
    nombre: 'Combo trenzadas',
    precio: 59900,
    imagen: 'assets/img/catalogo/combo-trenzadas.jpg',
    alt: 'Combo de dos manillas trenzadas en hilo rojo y beige con balines dorados en acero inoxidable',
    detalle: 'Dos manillas trenzadas en hilo rojo y beige. Balinería en acero inoxidable.'
  },

  /* ---------------- RODIO ---------------- */
  {
    id: 29, categoria: 'rodio', tipo: 'manilla',
    nombre: 'Full balines 4 mm',
    precio: 42900,
    imagen: 'assets/img/catalogo/full-balines-4mm.jpg',
    alt: 'Manilla cubierta de balines dorados de 4 milímetros en rodio, con cierre tejido en hilo negro',
    detalle: 'Balinería en rodio.'
  },
  {
    id: 23, categoria: 'rodio', tipo: 'manilla',
    nombre: 'Clásica negra',
    precio: 30500,
    imagen: 'assets/img/catalogo/clasica-negra-rodio.jpg',
    alt: 'Manilla tejida en hilo negro con una hilera de balines dorados en rodio',
    detalle: 'Balinería en rodio.'
  },
  {
    id: 7, categoria: 'rodio', tipo: 'manilla',
    nombre: 'Clásica roja',
    precio: 30500,
    imagen: 'assets/img/catalogo/clasica-roja-rodio.jpg',
    alt: 'Manilla tejida en hilo rojo con una hilera de balines dorados en rodio',
    detalle: 'Balinería en rodio.'
  },
  {
    id: 12, categoria: 'rodio', tipo: 'manilla',
    nombre: 'Clásica beige',
    precio: 30500,
    imagen: 'assets/img/catalogo/clasica-beige-rodio.jpg',
    alt: 'Manilla tejida en hilo beige con una hilera de balines dorados en rodio',
    detalle: 'Balinería en rodio.'
  },
  {
    id: 8, categoria: 'rodio', tipo: 'combo',
    nombre: 'Combo clásico rojo',
    precio: 47900,
    imagen: 'assets/img/catalogo/combo-clasico-rojo.jpg',
    alt: 'Combo de dos manillas tejidas en hilo rojo con balines dorados en rodio, presentadas en su estuche',
    detalle: 'Dos manillas tejidas en hilo rojo. Balinería en rodio.'
  },
  {
    id: 13, categoria: 'rodio', tipo: 'combo',
    nombre: 'Combo clásico beige',
    precio: 47900,
    imagen: 'assets/img/catalogo/combo-clasico-beige.jpg',
    alt: 'Combo de dos manillas tejidas en hilo beige con balines dorados en rodio, presentadas en su estuche',
    detalle: 'Dos manillas tejidas en hilo beige. Balinería en rodio.'
  }
];
