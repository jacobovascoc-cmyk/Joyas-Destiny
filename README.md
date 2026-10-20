<div align="center">

# Joyería Destiny

### *El brillo que refleja tu personalidad*

**[joyeriadestiny.com](https://joyeriadestiny.com)**

Manillas y anillos en **oro 18 kilates**, **plata ley 925**, **acero** y **rodio**,
tejidos a mano en Colombia.

</div>

---

## Una boutique en la palma de la mano

La nueva página de Joyería Destiny no se siente como una tienda en línea más. Se siente
como **entrar a una joyería**: luz baja, piezas en primer plano y un asesor a un mensaje de
distancia.

Está diseñada **primero para el celular**, porque ahí es donde nuestros clientes descubren,
comparan y compran. En el computador se despliega con la misma elegancia, con más espacio
para que cada pieza respire.

---

## La experiencia

### 1. Cuatro puertas, una decisión
Al abrir la página, el cliente no ve un menú: ve **cuatro fotografías que llenan la
pantalla**, una por material. **Oro 18 kilates**, **Plata Ley 925**, **Acero** y **Rodio**.
Con cada deslizamiento aparece una nueva, encajada en su lugar. En segundos el cliente sabe
qué vendemos y cuál es su estilo.

### 2. Cada colección tiene su propia sala
Tocar una puerta lleva a una **página exclusiva para ese material**, con su portada, su
historia y todas sus piezas.

- **Oro 18 kilates** muestra de inmediato la colección completa.
- **Plata Ley 925** primero pregunta *"¿Qué estás buscando?"* y ofrece dos caminos con
  imagen: **Manillas** o **Anillos**. Como un asesor que guía antes de mostrar.
- **Acero** y **Rodio** abren directo su vitrina.

### 3. La pieza, de cerca
Cada joya tiene su propia ficha:

- **Fotografía que se acerca con un toque**, para ver el tejido y cada balín como si
  estuviera en la mano.
- **Precio claro** en pesos colombianos.
- **El detalle real de la pieza**: material, número y tipo de balines.
- **Pedir por WhatsApp** con un solo toque. El mensaje ya va escrito con el nombre,
  el material y el precio de la pieza.
- **Personalizar esta pieza**: hilo, balinería y dije a gusto del cliente.
- **Otras piezas de la misma colección**, para seguir explorando sin volver atrás.

Al bajar por la ficha, una **barra de compra fija** acompaña al cliente para que pedir esté
siempre a un toque.

### 4. Volver nunca es empezar de nuevo
El botón **"Atrás"** regresa al cliente **exactamente al punto donde estaba**. Si llega por un
enlace compartido por WhatsApp, "Atrás" lo guía dentro de la tienda en lugar de sacarlo
de ella.

### 5. Lo que aún no existe, lo creamos
Justo después de las colecciones, y al final de cada catálogo:

> **¿Buscas algo que aún no está aquí?**
> *Lo diseñamos para ti.*

Un toque y el cliente está conversando con nosotros sobre su pieza a la medida.

---

## La marca, contada con calma

Más abajo, la página cuenta quiénes somos:

- **Identidad de marca**: autenticidad, oficio, significado y personalidad.
- **Guía de materiales**: qué significa realmente *18 kilates*, *ley 925*, *acero* y *rodio*,
  explicado con claridad.
- **Casa Destiny**: *"No seguimos un camino, construimos el nuestro."*

> *"Cada pieza lleva un destino. Encuentra el tuyo."*

---

## Detalles que no se ven, pero se sienten

| | |
|---|---|
| **Hecha para el celular** | Se probó en pantallas desde 320 px hasta computadores de 1440 px, sin nada que se salga ni se corte. |
| **Rápida** | Sin programas pesados de por medio: abre al instante, incluso con datos móviles. |
| **Fácil de tocar** | Botones y enlaces con el tamaño adecuado para el dedo. |
| **WhatsApp en todas partes** | Cabecera, botón flotante, cada pieza y cada catálogo. El mensaje cambia según lo que el cliente está viendo. |
| **Bien presentada al compartirla** | Al enviar el enlace por WhatsApp o redes, aparece con foto, título y descripción. |
| **Siempre completa** | Si alguna foto faltara, su espacio muestra el sello de la casa en lugar de un hueco. |
| **Accesible** | Textos alternativos en cada foto, navegación con teclado y respeto por quienes prefieren menos animaciones. |

---

## Para el equipo

### Cambiar productos, precios o fotos
Todo el catálogo vive en un solo archivo: **`js/catalogo.js`**. Ahí se agregan piezas, se
cambian precios y se eligen las fotos de portada. No hace falta tocar nada más.

```js
{
  id: 32,                        // número que no se repita
  categoria: 'plata',            // 'oro' | 'plata' | 'acero' | 'rodio'
  tipo: 'anillo',                // 'manilla' | 'anillo' | 'combo'
  nombre: 'Nombre de la pieza',
  precio: 59900,                 // o null para "Precio a consultar"
  imagen: 'assets/img/catalogo/nombre-de-la-foto.jpg',
  alt: 'Descripción de la foto',
  detalle: 'Balinería en plata 925. 10 balines #3 diamantados.'
}
```

Fotos de producto: **verticales 3:4** (por ejemplo 1200 × 1600 px), JPG de menos de 300 KB,
con nombres en minúscula y sin espacios ni tildes.

### Estructura

```
CNAME               dominio joyeriadestiny.com (no borrar)
.nojekyll           publicación directa en GitHub Pages
index.html          estructura de la página
css/destiny.css     diseño completo
js/catalogo.js      productos, precios, categorías y WhatsApp
js/app.js           navegación entre colecciones y piezas
assets/img/         logo, fotos de portada y catálogo
```

### Publicar cambios
En GitHub: **Add file → Upload files**. Cada carpeta se arrastra **sola**, y los archivos
sueltos van en una tanda aparte. Nunca se mezclan carpetas y archivos en la misma subida.

---

<div align="center">

**Joyería Destiny** · Hecho en Colombia

*El brillo que refleja tu personalidad*

</div>
