const descuento = 0.20;

const productos = [

  {
    id: 1,
    nombre: 'La Presencia',
    material: 'Plata 925',
    precio: 138200,
    imagen: 'assets/img/catalogo/la-presencia.jpg',
    alt: 'Manilla tejida en hilo negro con balinería de plata 925 en tamaños graduados, presentada en estuche',
    descripcion: 'Balinería en plata 925. 6 balines #6 diamantados. 3 balines #8 diamantados. 2 balines #5 lisos.'
  },
  {
    id: 2,
    nombre: 'San Miguel Arcángel bicolor',
    material: 'Plata 925',
    precio: 92400,
    imagen: 'assets/img/catalogo/san-miguel-arcangel-bicolor.jpg',
    alt: 'Manilla tejida en hilo negro y beige con dije ovalado de San Miguel Arcángel y balinería de plata 925',
    descripcion: 'Dije y balinería en plata 925. 4 balines #5 diamantados. 2 balines #4 italianos. 2 balines #4 lisos.'
  },
  {
    id: 3,
    nombre: 'El Lujo',
    material: 'Plata 925',
    precio: 139900,
    imagen: 'assets/img/catalogo/el-lujo-plata-925.jpg',
    alt: 'Manilla de hilo negro cubierta por una hilera densa de balines de plata 925 diamantados',
    descripcion: 'Balinería en plata ley 925. 12 balines #5 diamantados. 22 balines #3 diamantados. 2 balines #4 lisos.'
  },

  {
    id: 4,
    tipo: 'anillo',
    nombre: 'Anillo tejido',
    material: 'Plata 925',
    precio: 43900,
    imagen: 'assets/img/catalogo/anillo-tejido.jpg',
    alt: 'Anillo tejido en hilo negro con una hilera de balines de plata 925 italianos',
    descripcion: 'Balinería en plata ley 925. 7 balines #4 italianos.'
  },
  {
    id: 5,
    tipo: 'anillo',
    nombre: 'Anillo de San Benito',
    material: 'Plata 925',
    precio: 63600,
    imagen: 'assets/img/catalogo/anillo-san-benito.jpg',
    alt: 'Anillo tejido en hilo negro con medalla de San Benito en plata 925 rodeada de balines diamantados',
    descripcion: 'Balinería y dije en plata 925. 16 balines #3 diamantados.'
  },
  {
    id: 6,
    tipo: 'anillo',
    nombre: 'Anillo San Miguel Arcángel',
    material: 'Plata 925',
    precio: 53500,
    imagen: 'assets/img/catalogo/anillo-san-miguel-arcangel.jpg',
    alt: 'Anillo tejido en hilo negro con medalla de San Miguel Arcángel en plata 925 y balines diamantados',
    descripcion: 'Balinería y dije en plata 925. 12 balines #3 diamantados.'
  },

  {
    id: 7,
    nombre: 'Clásica roja',
    material: 'Rodio',
    precio: 30500,
    imagen: 'assets/img/catalogo/clasica-roja-rodio.jpg',
    alt: 'Manilla tejida en hilo rojo con una hilera de balines dorados en rodio',
    descripcion: 'Balinería en rodio.'
  },
  {
    id: 9,
    nombre: 'Tres carriles',
    material: 'Acero',
    precio: 39900,
    imagen: 'assets/img/catalogo/tres-carriles-acero.jpg',
    alt: 'Manilla ancha de hilo negro con tres carriles paralelos de balines dorados en acero inoxidable',
    descripcion: 'Balinería en acero inoxidable.'
  },
  {
    id: 10,
    nombre: 'El Lujo',
    material: 'Acero',
    precio: 39900,
    imagen: 'assets/img/catalogo/el-lujo-acero.jpg',
    alt: 'Manilla de hilo negro con balines dorados de dos tamaños alternados en acero inoxidable',
    descripcion: 'Balinería en acero inoxidable.'
  },
  {
    id: 11,
    nombre: 'Blue Desing',
    material: 'Plata 925',
    precio: 45000,
    imagen: 'assets/img/catalogo/blue-desing.jpg',
    alt: 'Manilla de cuentas de cuarzo azul alternadas con balines de plata 925 y cierre de hilo negro',
    descripcion: 'Cuarzo azul y plata 925. 6 balines #4 italianos.'
  },
  {
    id: 12,
    nombre: 'Clásica beige',
    material: 'Rodio',
    precio: 30500,
    imagen: 'assets/img/catalogo/clasica-beige-rodio.jpg',
    alt: 'Manilla tejida en hilo beige con una hilera de balines dorados en rodio',
    descripcion: 'Balinería en rodio.'
  },
  {
    id: 14,
    nombre: 'Manilla trenzada',
    material: 'Acero',
    precio: 37500,
    imagen: 'assets/img/catalogo/manilla-trenzada.jpg',
    alt: 'Manilla trenzada en hilo beige y rojo con balines dorados en acero inoxidable',
    descripcion: 'Balinería en acero inoxidable.'
  },
  {

    id: 16,
    nombre: 'La Inigualable',
    material: 'Plata 925',
    precio: 65000,
    imagen: 'assets/img/catalogo/la-inigualable.jpg',
    alt: 'Manilla con balines de plata 925 diamantados, disponible en hilo beige, verde y rojo',
    descripcion: 'Balinería en plata ley 925. 6 balines #5 diamantados. 2 balines #4 lisos.'
  },
  {
    id: 17,
    nombre: 'Clásica beige',
    material: 'Plata 925',
    precio: 77600,
    imagen: 'assets/img/catalogo/clasica-beige-plata-925.jpg',
    alt: 'Manilla tejida en hilo beige con una hilera continua de balines de plata 925 italianos',
    descripcion: 'Balinería en plata ley 925. 16 balines #4 italianos. 2 balines #4 lisos.'
  },
  {
    id: 18,
    nombre: 'Clásica negra',
    material: 'Plata 925',
    precio: 77600,
    imagen: 'assets/img/catalogo/clasica-negra-plata-925.jpg',
    alt: 'Manilla tejida en hilo negro con una hilera continua de balines de plata 925 italianos',
    descripcion: 'Balinería en plata ley 925. 16 balines #4 italianos. 2 balines #4 lisos.'
  },
  {
    id: 19,
    nombre: 'Clásica roja',
    material: 'Plata 925',
    precio: 77600,
    imagen: 'assets/img/catalogo/clasica-roja-plata-925.jpg',
    alt: 'Manilla tejida en hilo rojo con una hilera continua de balines de plata 925 italianos',
    descripcion: 'Balinería en plata ley 925. 16 balines #4 italianos. 2 balines #4 lisos.'
  },
  {
    id: 21,
    nombre: 'Manilla zig zag',
    material: 'Acero',
    precio: 39900,
    imagen: 'assets/img/catalogo/manilla-zig-zag.jpg',
    alt: 'Manilla de hilo negro con balines dorados de acero inoxidable tejidos en zigzag',
    descripcion: 'Balinería en acero inoxidable.'
  },
  {
    id: 22,
    nombre: 'Full Black',
    material: 'Plata 925',
    precio: 53500,
    imagen: 'assets/img/catalogo/full-black.jpg',
    alt: 'Manilla tejida enteramente en hilo negro con dos balines de plata 925 diamantados en los extremos',
    descripcion: 'Balinería en plata 925. 2 balines #6 diamantados.'
  },
  {
    id: 23,
    nombre: 'Clásica negra',
    material: 'Rodio',
    precio: 30500,
    imagen: 'assets/img/catalogo/clasica-negra-rodio.jpg',
    alt: 'Manilla tejida en hilo negro con una hilera de balines dorados en rodio',
    descripcion: 'Balinería en rodio.'
  },
  {

    id: 24,
    nombre: 'San Benito tres carriles',
    material: 'Plata 925',
    precio: 152900,
    imagen: 'assets/img/catalogo/san-benito-tres-carriles.jpg',
    alt: 'Manilla ancha de hilo negro con tres carriles de balines de plata 925 y medalla central de San Benito',
    descripcion: 'Balinería y dije en plata 925. 12 balines #5 diamantados. 2 balines #4 lisos. 20 balines #3 lisos.'
  },
  {
    id: 25,
    nombre: 'Virgen María trenzada',
    material: 'Acero',
    precio: 53500,
    imagen: 'assets/img/catalogo/virgen-maria-trenzada.jpg',
    alt: 'Manilla trenzada en hilo rojo y beige con medalla dorada de la Virgen María y balines de acero inoxidable',
    descripcion: 'Balinería y dije en acero inoxidable.'
  },
  {
    id: 26,
    nombre: 'Full roja',
    material: 'Plata 925',
    precio: 45000,
    imagen: 'assets/img/catalogo/full-roja.jpg',
    alt: 'Manilla de cuentas de cornalina roja alternadas con balines de plata 925 italianos',
    descripcion: 'Plata 925 y cornalina. 6 balines #4 italianos.'
  },
  {
    id: 27,
    nombre: 'El brillo que reflejas',
    material: 'Oro 18k',
    precio: 427000,
    imagen: 'assets/img/catalogo/el-brillo-que-reflejas.jpg',
    alt: 'Manilla de hilo negro con una hilera de balines de oro 18 kilates diamantados',
    descripcion: 'Balinería en oro 18 kilates. 9 balines #4 diamantados. 2 balines #3 diamantados.'
  },
  {
    id: 28,
    nombre: 'Dorado carmesí',
    material: 'Oro 18k',
    precio: 232000,
    imagen: 'assets/img/catalogo/dorado-carmesi.jpg',
    alt: 'Manilla tejida en hilo rojo y beige con balines de oro 18 kilates diamantados y cuentas rojas',
    descripcion: 'Balinería en oro 18 kilates. 3 balines #4 diamantados. 2 balines #3 diamantados.'
  },
  {
    id: 29,
    nombre: 'Full balines 4 mm',
    material: 'Rodio',
    precio: 42900,
    imagen: 'assets/img/catalogo/full-balines-4mm.jpg',
    alt: 'Manilla cubierta de balines dorados de 4 milímetros en rodio, con cierre tejido en hilo negro',
    descripcion: 'Balinería en rodio.'
  },
  {
    id: 30,
    nombre: 'Trenzada beige',
    material: 'Plata 925',
    precio: 103900,
    imagen: 'assets/img/catalogo/trenzada-beige.jpg',
    alt: 'Manilla trenzada en hilo beige y negro con balines de plata 925 diamantados',
    descripcion: 'Balinería en plata 925. 13 balines #5 diamantados.'
  },
  {
    id: 31,
    nombre: 'El brillo',
    material: 'Plata 925',
    precio: 171600,
    imagen: 'assets/img/catalogo/el-brillo.jpg',
    alt: 'Manilla de hilo negro con doble hilera de balines de plata 925 diamantados y medalla central de San Benito',
    descripcion: 'Balinería y dije en plata 925. 32 balines #4 diamantados. 2 balines #4 lisos.'
  }
,
  {
    id: 8,
    tipo: 'combo',
    nombre: 'Combo clásico rojo',
    material: 'Rodio',
    precio: 47900,
    imagen: 'assets/img/catalogo/combo-clasico-rojo.jpg',
    alt: 'Combo de dos manillas tejidas en hilo rojo con balines dorados en rodio, presentadas en su estuche',
    descripcion: 'Dos manillas tejidas en hilo rojo · Balinería en rodio'
  },
  {
    id: 13,
    tipo: 'combo',
    nombre: 'Combo clásico beige',
    material: 'Rodio',
    precio: 47900,
    imagen: 'assets/img/catalogo/combo-clasico-beige.jpg',
    alt: 'Combo de dos manillas tejidas en hilo beige con balines dorados en rodio, presentadas en su estuche',
    descripcion: 'Dos manillas tejidas en hilo beige · Balinería en rodio'
  },
  {
    id: 15,
    tipo: 'combo',
    nombre: 'Combo trenzadas',
    material: 'Acero',
    precio: 59900,
    imagen: 'assets/img/catalogo/combo-trenzadas.jpg',
    alt: 'Combo de dos manillas trenzadas en hilo rojo y beige con balines dorados en acero inoxidable',
    descripcion: 'Dos manillas trenzadas en hilo rojo y beige · Balinería en acero inoxidable'
  },
  {
    id: 20,
    tipo: 'combo',
    nombre: 'Combo beige y negro',
    material: 'Plata 925',
    precio: 137400,
    imagen: 'assets/img/catalogo/combo-beige-y-negro.jpg',
    alt: 'Combo de dos manillas con balines de plata 925, una en hilo negro y otra en hilo beige',
    descripcion: 'Dos manillas, una en hilo negro y otra en hilo beige · Balinería en plata 925'
  }
];

const categorias = [
  {
    id: 'oro-18k',
    titulo: 'Colección de oro 18k',
    descripcion: 'La línea más noble de la casa: balines de oro 18k lisos y diamantados.',
    material: 'Oro 18k'
  },
  {
    id: 'plata-925',
    titulo: 'Plata ley',
    descripcion: 'Alta joyería sin necesidad de gastar millones.',
    material: 'Plata 925'
  },
  {
    id: 'acero-inoxidable',
    titulo: 'Acero inoxidable',
    descripcion: 'Bueno, bonito y barato.',
    material: 'Acero'
  },
  {
    id: 'rodio',
    titulo: 'Rodio',
    descripcion: 'El mejor brillo y estilo para tu día a día al mejor precio.',
    material: 'Rodio'
  },
  {
    id: 'combos',
    titulo: 'Combos',
    descripcion: 'Dos manillas en un solo pedido, a precio de conjunto.',
    tipo: 'combo'
  },
  {
    id: 'anillos',
    titulo: 'Anillos',
    descripcion: 'El mismo tejido y la misma balinería de plata ley 925, para la mano.',
    tipo: 'anillo'
  }
];

const whatsapp = '573042177260';
