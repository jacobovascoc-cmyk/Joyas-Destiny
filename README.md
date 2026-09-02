# Joyería Destiny — Sitio web

Sitio estático (HTML5 + Tailwind CSS compilado + JavaScript básico). No necesita instalación
para verlo: abre `index.html` con doble clic y funciona, incluso sin conexión a internet.

```
Joyería Destiny Guithub/
├── index.html          ← estructura y contenido
├── tailwind.css        ← GENERADO. No lo edites a mano (ver "Tailwind" abajo)
├── styles.css          ← estilos propios (menú, botones, tarjetas, animaciones)
├── script.js           ← velo de entrada, menú móvil, header, revelado al scroll
├── tailwind.config.js  ← paleta de colores y tipografías
├── package.json        ← comando de compilación
├── src/input.css       ← entrada del compilador
├── .nojekyll           ← le dice a GitHub que no procese el sitio con Jekyll
└── img/
    ├── logo.png
    ├── hero.jpg          ← fondo de la portada
    └── p-01.jpg … p-15.jpg   ← las 15 manillas del catálogo
```


> Los archivos `producto-1.png`…`producto-4.jpg` son del catálogo anterior y **ya no se usan**.
> Puedes borrarlos de `img/` sin que nada se rompa.

## Catálogo actual (15 piezas)

| # | Pieza | Precio COP | Imagen |
|---|---|---|---|
| 01 | Manilla San Benito de protección | 90.000 | `p-01.jpg` |
| 02 | Manilla balines seguidos | 60.000 | `p-02.jpg` |
| 03 | Manilla doble carril | 90.000 | `p-03.jpg` |
| 04 | Manilla clásica (acero dorado) | 20.000 | `p-04.jpg` |
| 05 | Manilla zig zag | 30.000 | `p-05.jpg` |
| 06 | Manilla clásica doble tono | 25.000 | `p-06.jpg` |
| 07 | Manilla de Colombia | 35.000 | `p-07.jpg` |
| 08 | Manilla selección Colombia | 40.000 | `p-08.jpg` |
| 09 | Manilla bandera de Colombia | 35.000 | `p-09.jpg` |
| 10 | Manilla abundancia y prosperidad | 30.000 | `p-10.jpg` |
| 11 | Manilla tres carriles acero | 35.000 | `p-11.jpg` |
| 12 | Manilla tricolor | 25.000 | `p-12.jpg` |
| 13 | Manilla full balines 4 y 6 mm | 100.000 | `p-13.jpg` |
| 14 | Manilla ADN | 60.000 | `p-14.jpg` |
| 15 | Manilla clásica (plata 925) | 50.000 | `p-15.jpg` |

Agrupadas en cuatro series: **Plata ley 925**, **Acero dorado**, **Selección Colombia** y **Otros diseños**.

## Cambiar las fotos de las manillas

Dos opciones:

1. **Sin tocar el código:** reemplaza el archivo en `img/` conservando el mismo nombre
   (`p-07.jpg`, por ejemplo).
2. **Editando el HTML:** cambia el `src="img/..."` por la ruta de tu foto y actualiza el `alt`.

El fondo de la portada es `img/hero.jpg`, dentro de la sección `#inicio`.

**Formato recomendado de foto de producto:** vertical 4:5 (ej. 1200 × 1500 px), fondo oscuro o
neutro, la manilla centrada. El recorte es `object-fit: cover`, así que la pieza debe estar
al centro para que no se corte. **Guarda las fotos en JPG o PNG** (los `.HEIC` del iPhone no
los muestra el navegador).

## Datos de la marca en el sitio

- **WhatsApp:** `https://wa.me/573042177260` — aparece en el header, el hero, cada producto,
  el cierre del catálogo, el footer y el botón flotante. Cada enlace lleva un mensaje
  pre-escrito distinto con el nombre y el precio de la pieza que le interesa al cliente.
  Para cambiar el número, busca y reemplaza `573042177260` en `index.html`.
- **Con precios:** cada tarjeta muestra el valor en COP. La venta se cierra por WhatsApp.

## Editar los productos

Cada tarjeta es un bloque `<article class="product-card">`. Para cambiar un producto edita:

| Elemento | Qué es |
|---|---|
| `product-index` (`01`…`15`) | numeración de la pieza |
| `text-[9px] tracking-luxe` | material o serie (Plata 925, Acero dorado…) |
| `<h3>` | nombre de la pieza |
| `<p class="price">` | precio en COP |
| `<p>` final | descripción / características |
| `href` del `<a>` | mensaje pre-escrito de WhatsApp (texto codificado en URL) |

Las series se separan con un bloque `<div class="cat-head">`; para añadir una serie nueva,
copia ese bloque y la grilla que le sigue.

## Paleta — azul obsidiana

| Nombre | Hex | Uso |
|---|---|---|
| obsidian | `#070B16` | fondo principal (azul obsidiana profundo) |
| carbon | `#0B1120` | fondos de sección alterna |
| graphite | `#121A2C` | superficies elevadas |
| gold | `#C9A227` | acentos, filetes, botones |
| goldlite | `#E9CE7A` | luces del degradado dorado y precios |
| ivory | `#F4F1EA` | texto principal |
| ash | `#9AA0AE` | texto secundario (gris azulado) |

El halo azul tenue de la portada es la clase `.aura` en `styles.css`.

## Tailwind — IMPORTANTE si editas el HTML

Los estilos de maquetación (grillas, espaciados, tamaños, colores) vienen de Tailwind, que está
**compilado en el archivo `tailwind.css`**. El sitio no descarga nada de internet: por eso funciona
aunque falle un CDN, aunque el visitante tenga un bloqueador o aunque no haya conexión.

> ⚠️ **Si añades o cambias una clase de Tailwind en `index.html`** (por ejemplo `text-2xl`,
> `lg:grid-cols-4`, `bg-carbon`), tienes que **recompilar** o ese estilo no existirá:
>
> ```
> npm run build
> ```
>
> Y subir el `tailwind.css` actualizado junto con el `index.html`.
> Esto **no** hace falta si sólo cambias textos, precios, fotos o enlaces de WhatsApp.

Mientras diseñas, puedes dejar la recompilación automática en marcha con:

```
npm run watch
```

Los colores y las tipografías de la marca se editan en `tailwind.config.js`, no en el HTML.

## Publicación — cómo subir el sitio

El sitio está en **GitHub Pages** con Cloudflare por delante (dominio `joyeriadestiny.com`).

Sube el **contenido** de la carpeta `Joyería Destiny Guithub` (no la carpeta en sí) a la raíz
del repositorio.

**Estos 4 archivos y 1 carpeta son el sitio. Tienen que estar TODOS en el repositorio:**

| Qué | Nota |
|---|---|
| `index.html` | la página |
| `tailwind.css` | los estilos de maquetación — **sin él la página se ve desarmada** |
| `styles.css` | los estilos propios |
| `script.js` | las animaciones |
| `img/` | **17 archivos.** Si falta, las fotos salen rotas |

> ⚠️ El fallo que tuvo el sitio fue exactamente ese: se subieron los archivos de texto pero
> la carpeta `img/` no llegó. Después de subir, **comprueba que `img/` tenga los 17 archivos**
> dentro del repositorio, no sólo en tu PC.

Los archivos `tailwind.config.js`, `package.json`, `src/` y `.claude/` son herramientas de
trabajo. No estorban si se suben, pero el sitio no los necesita para funcionar.

**No borres el archivo `CNAME`** si existe en el repositorio: es lo que conecta el dominio
`joyeriadestiny.com` con GitHub Pages.

Al terminar, purga la caché en el panel de Cloudflare y recarga con Ctrl + F5.

### Comprobar que quedó bien

Abre estas dos direcciones en el navegador:

- `https://joyeriadestiny.com/tailwind.css` → debe mostrar texto CSS, no un error 404.
- `https://joyeriadestiny.com/img/logo.png` → debe mostrar el logo, no un error 404.

Si las dos funcionan, la página está bien.

## Estructura de la página

Una sola página con anclas internas. No hay más archivos HTML:

| Sección | Ancla | Qué es |
|---|---|---|
| Portada | `#inicio` | foto grande, titular y dos botones |
| Franja de valores | — | cuatro argumentos de marca |
| Catálogo | `#catalogo` | las 15 piezas en 4 series |
| La Casa | `#casa` | historia y frase de marca |
| Footer | — | logo, navegación y teléfono |

La navegación cambia según el ancho de pantalla:

- **Menos de 768 px:** botón de menú que abre un panel a pantalla completa.
- **768 px o más:** los enlaces se muestran directamente en el header.

El corte está definido en `styles.css` (`@media (min-width: 768px)`), no con clases de
Tailwind: `styles.css` se carga después y ganaría de todos modos.

## Detalles que conviene no romper

- **`<script>` con `classList.add("js")` en el `<head>`:** sin esa clase el CSS muestra
  todo visible. Es la red de seguridad para que, si el JavaScript falla, la página se vea
  entera en vez de quedar en negro. No lo muevas al final ni lo borres.
- **El icono de WhatsApp** está definido una sola vez como `<symbol id="ico-wa">` justo
  después de `<body>` y se reutiliza con `<use href="#ico-wa">`. Si lo borras, desaparecen
  los cinco iconos.
- **El desplazamiento de las anclas** se controla solo con `scroll-padding-top` en
  `styles.css`. No añadas `scroll-mt-*` a las secciones: los dos valores se suman.
