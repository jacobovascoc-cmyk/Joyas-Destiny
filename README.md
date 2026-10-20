# Joyería Destiny — v2 (mobile-first)

Rediseño completo de la tienda, pensado primero para celular. Es una versión **independiente**:
no toca nada de `Joyería-Destiny-Oficial/` (la web publicada) ni de `joyeria-destiny/`.

## Cómo abrirla

Doble clic en `index.html`. No necesita instalar nada ni servidor: la navegación funciona
con rutas `#/…`, que se pueden abrir directo desde el disco, subir a GitHub Pages o compartir
por WhatsApp.

**Para verla como en un celular desde el computador:** doble clic en
`../ver-en-celular.html` (está en la carpeta *Joyas destiny*, al lado de esta). Muestra la
página dentro de un teléfono a tamaño real (390 px de ancho) y tiene botones para cambiar a
tablet o computador. Esa herramienta no forma parte de la página: no la subas a la web.

```
destiny_v2/
├── CNAME               dominio joyeriadestiny.com (no borrar)
├── .nojekyll           indica a GitHub que publique los archivos tal cual
├── index.html          estructura común: cabecera, pie, WhatsApp flotante
├── css/destiny.css     todo el diseño (mobile-first; tablet ≥640 px; computador ≥1024 px)
├── js/catalogo.js      ← AQUÍ SE EDITA EL CONTENIDO: categorías, productos, precios, WhatsApp
├── js/app.js           navegación, vistas y comportamiento
└── assets/img/         logo, foto de "La casa" y fotos del catálogo (copiadas de la web actual)
```

## Rutas

| Dirección | Qué muestra |
|---|---|
| `#/` | Inicio: las 4 puertas, "¿Buscas algo que aún no está aquí?", Identidad de marca y Casa Destiny |
| `#/oro` | Catálogo completo de oro 18 kilates, directo |
| `#/plata` | Elección de línea: **Manillas** o **Anillos** (botones con foto) |
| `#/plata/manillas` · `#/plata/anillos` | Catálogo de esa línea |
| `#/acero` · `#/rodio` | Catálogo completo, directo |
| `#/pieza/24-san-benito-tres-carriles` | Ficha de una pieza |

**Botón "Atrás"** (arriba a la izquierda en todas las páginas internas): vuelve a la página
anterior en el mismo punto donde el cliente la dejó. Si alguien entra por un enlace directo
(por ejemplo, uno compartido por WhatsApp), "Atrás" sube por la tienda:
pieza → catálogo → colección → inicio, sin sacarlo del sitio.

## Editar el catálogo (`js/catalogo.js`)

**Agregar una pieza:** copia un bloque `{ … }` de `PRODUCTOS` y cambia sus datos.

```js
{
  id: 32,                       // número que no se repita
  categoria: 'plata',           // 'oro' | 'plata' | 'acero' | 'rodio'
  tipo: 'anillo',               // 'manilla' | 'anillo' | 'combo'
  nombre: 'Anillo nuevo',
  precio: 59900,                // o null para mostrar "Precio a consultar"
  imagen: 'assets/img/catalogo/anillo-nuevo.jpg',
  alt: 'Descripción de la foto',
  detalle: 'Balinería en plata 925. 10 balines #3 diamantados.'
}
```

- En Plata, el `tipo` decide la línea: `anillo` va a **Anillos**; `manilla` y `combo` van a **Manillas**.
- Cada frase de `detalle` separada por punto se muestra como una línea en la ficha.
- Los combos aparecen al final de su catálogo con el sello "Combo · 2 piezas".
- El orden en el archivo es el orden en la tienda.

**Cambiar una portada:** en `CATEGORIAS`, el campo `portada` de cada colección (y de cada
línea de Plata) apunta a la foto que se ve en las puertas y en la cabecera del catálogo.

**Si una foto falta**, la tienda no muestra un hueco: el marco muestra el logo con
"Foto en camino".

## Fotos

Todas las fotos actuales son verticales 3:4, que es el formato que usa la tienda.

- **Producto:** vertical 3:4 (por ejemplo 1200 × 1600 px), JPG de menos de 300 KB.
- **Portadas de las puertas:** el texto va arriba y el botón abajo, así que la pieza debe
  quedar en la franja central de la foto.
- **La casa Destiny** (`assets/img/hero.jpg`): horizontal, con la pieza hacia la derecha.

## Subir a GitHub (reemplaza la web de joyeriadestiny.com)

La carpeta ya trae todo lo necesario: `CNAME` (mantiene el dominio joyeriadestiny.com)
y `.nojekyll`. Se sube **el contenido** de `destiny_v2`, no la carpeta `destiny_v2` como tal.

Regla de oro: **cada carpeta se arrastra sola**. Arrastrar una mezcla de archivos y carpetas a
la vez hace que GitHub deje carpetas por fuera y la web sale sin fotos.

En github.com → tu repositorio → **Add file → Upload files**, cuatro tandas, cada una con
**Commit changes**:

1. Carpeta `css` (sola).
2. Carpeta `js` (sola).
3. Carpeta `assets` (sola).
4. Los archivos sueltos: `index.html`, `CNAME`, `.nojekyll`, `README.md`.
   `index.html` va de último para que la web nunca apunte a archivos que aún no subieron.

Espera 1–2 minutos y abre joyeriadestiny.com (en computador, Ctrl + F5 para ver la versión nueva).

En GitHub deben quedar `css/`, `js/` y `assets/` en la raíz, al lado de `index.html`.
Si ves una carpeta llamada `destiny_v2`, se subió la carpeta entera: está mal.

Los archivos de la versión anterior que queden en el repositorio (`styles.css`,
`script.js`, `tailwind.css`, `data/`…) ya no se usan y no estorban; puedes borrarlos
cuando quieras. La copia de la versión anterior sigue en `Joyería-Destiny-Oficial/`.

## Textos para revisar

- "¿Buscas algo que aún no está aquí?" y Casa Destiny usan los textos de la web oficial.
- Identidad de marca, la Guía de materiales (en `js/app.js`) y las descripciones de cada
  colección (en `js/catalogo.js`) son textos nuevos.
