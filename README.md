# 🏺 Tarro de Razones Digital - San Valentín Edition ❤️

¡Bienvenido al **Tarro de Razones Digital**! Una aplicación web interactiva y visualmente impactante diseñada como un regalo único y personal. Este proyecto simula un tarro lleno de notas de amor, amistad o agradecimiento, permitiendo al usuario "sacar" una razón cada vez con animaciones, música y sorpresas ocultas.

## ✨ Características Principales

*   **Diseño Glassmorphism**: Estética moderna con efectos de cristal esmerilado, degradados suaves y sombras realistas.
*   **Interacción Física**: Animación de tapa que se abre, notas que flotan en 3D y partículas de corazones.
*   **Fondos Reactivos**: El ambiente de la página cambia de color según el tipo de nota (Romántico 💖, Divertido 💛, Profundo 💜, Easter Egg 👾).
*   **Sistema de "Easter Eggs"**:
    *   Soporte para **fotos sorpresa** estilo Polaroid.
    *   **Modo Retro/Hacker**: Un fondo especial tipo Matrix cuando se descubre un secreto.
*   **Audio Inmersivo**:
    *   Música de fondo suave (integración con YouTube API invisible).
    *   Efectos de sonido sintetizados (Web Audio API) para acciones como abrir, cerrar y sacar notas.
*   **Contador Inteligente**: Muestra cuántas razones has descubierto sin revelar el total, para mantener el misterio.
*   **Final Sorpresa**: Cuando se acaban las notas, aparece un modal con recompensa (¡Sushi o Gatos!).
*   **Tipografía Manuscrita**: Fuentes como 'Indie Flower' para dar un toque personal y 'Quicksand' para la legibilidad.

## 🚀 Tecnologías Utilizadas

*   **HTML5**: Estructura semántica.
*   **CSS3**: Variables CSS, Flexbox, Grid, Animaciones (@keyframes), Transformaciones 3D.
*   **JavaScript (Vanilla)**: Lógica de estado, manipulación del DOM, Web Audio API, YouTube Iframe API.
*   **FontAwesome**: Iconografía vectorial.
*   **Google Fonts**: Tipografías web optimizadas.

## 📂 Estructura del Proyecto

El código está organizado para ser fácil de entender y modificar:

```
SanValentinJar/
│
├── index.html      # Estructura principal de la página. Contiene los contenedores, modal y carga de librerías.
├── style.css       # Estilos visuales. Define el look & feel, animaciones y temas de color.
├── script.js       # Cerebro de la aplicación. Maneja la lógica, sonidos, datos de las razones y eventos.
├── reasons.json    # (Opcional) Archivo de respaldo con las razones. Actualmente integradas en script.js.
├── foto1.jpeg      # Imagen para el Easter Egg 1.
├── foto2.jpeg      # Imagen para el Easter Egg 2.
├── foto3.jpeg      # Imagen para el Easter Egg 3.
└── assets/         # (Si añades más recursos)
```

### Detalle de Archivos

1.  **`index.html`**:
    *   Usa un contenedor `#particles-container` para el fondo animado.
    *   Estructura la `.jar-container` (el tarro y la tapa) y el `.note-display` (la nota que sale).
    *   Incluye el reproductor oculto de YouTube en un `div#player`.

2.  **`script.js`**:
    *   **`const reasons`**: Array de objetos JSON que contiene todas las frases y fotos. ¡Aquí es donde editas el contenido!
    *   **`showReason()`**: La función core. Elige un índice aleatorio, decide el estilo (texto o foto), cambia el fondo y reproduce sonido.
    *   **`playSound(type)`**: Sintetizador de audio puro. No necesita archivos mp3 externos; genera ondas (senoidales, triangulares) en tiempo real.

3.  **`style.css`**:
    *   Usa **Variables CSS** (`:root`) para facilitar el cambio de paleta de colores.
    *   Las clases `.bg-romantic`, `.bg-funny`, `.bg-deep`, `.bg-retro` controlan los temas dinámicos.

## 🛠️ Guía de Personalización

### 1. Cambiar las Frases
Abre `script.js` y busca la constante `reasons`. Añade o modifica las líneas:

```javascript
{
    "text": "Tu texto aquí",
    "type": "romantic" // Opciones: "romantic", "funny", "deep"
},
```

### 2. Añadir Fotos (Easter Eggs)
Añade un objeto con tipo `photo` y asegúrate de poner la imagen en la carpeta del proyecto:

```javascript
{
    "text": "¡Mensaje de la foto!",
    "type": "photo",
    "image": "nuestra_foto.jpg"
},
```

### 3. Cambiar la Música
En `script.js`, busca la constante al inicio:
```javascript
const YOUTUBE_VIDEO_ID = '3S3pdc_bYkY'; // ID del video de YouTube
```
Cambia ese ID por el de cualquier video (asegúrate de que permita inserción).

## 📦 Instalación / Despliegue

Este proyecto no requiere "instalación" (Node.js, Python, etc.). Es estático.

1.  **Local**: Simplemente abre `index.html` en tu navegador.
    *   *Nota*: Chrome puede bloquear el audio autoplay o la API de YouTube si se abre como archivo local (`file://`). Se recomienda usar una extensión como "Live Server" en VS Code.
2.  **GitHub Pages (Recomendado)**:
    *   Sube estos archivos a un repositorio de GitHub.
    *   Ve a `Settings` > `Pages`.
    *   Selecciona la rama `main` y guarda.
    *   ¡Tu regalo estará online en segundos para compartir el enlace!

## 📜 Licencia

Este proyecto es de código abierto. ¡Siéntete libre de usarlo para regalar amor a quien quieras! ❤️

---
*Hecho un poco de código y mucho cariño.*
