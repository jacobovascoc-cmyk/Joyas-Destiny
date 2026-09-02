/** @type {import('tailwindcss').Config} */
/* Configuración de Joyería Destiny.
   Antes vivía dentro de index.html, incrustada en el script del CDN.
   Ahora la lee el compilador para generar tailwind.css. */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        obsidian: '#070B16',
        carbon:   '#0B1120',
        graphite: '#121A2C',
        gold:     '#C9A227',
        goldlite: '#E9CE7A',
        golddeep: '#8A6B1F',
        ivory:    '#F4F1EA',
        ash:      '#9AA0AE'
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:    ['Jost', 'Helvetica Neue', 'Arial', 'sans-serif']
      },
      letterSpacing: {
        luxe: '0.35em'
      }
    }
  }
}
