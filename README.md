# Joyería Destiny — Sitio web

Sitio estático (HTML5 + Tailwind CSS vía CDN + JavaScript básico). No necesita instalación:
abre `index.html` con doble clic y funciona.

```
web joyas-destiny/
├── index.html      ← estructura y contenido
├── styles.css      ← estilos propios (botones, tarjetas, animaciones)
├── script.js       ← velo de entrada, header, revelado al scroll
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

## Nota sobre Tailwind

El sitio usa el CDN de Tailwind (`cdn.tailwindcss.com`), que compila los estilos en el
navegador — ideal para trabajar en local. Si algún día lo publicas con mucho tráfico,
conviene compilar Tailwind a un `.css` estático; el diseño no cambia.
