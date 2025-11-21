# SistemaDePedidosRestaurante

Repositorio colaborativo para el desarrollo del sistema distribuido de procesamiento de pedidos en un restaurante.

Instrucciones rápidas para ejecutar el frontend de ejemplo (React + Vite):

1. Abrir terminal en `c:\Users\User\Documentos\SistemaDePedidosRestaurante`
2. Ejecutar:
   - `npm install`
   - `npm run dev`
3. Abrir `http://localhost:5173` en la tablet o navegador.

Este proyecto contiene un frontend sencillo y agradable para tomar pedidos en una tablet. Está pensado como punto de partida para integrar con un backend.

Agregar imágenes al menú (sencillo):

1. Crear la carpeta `public/images` en el proyecto (misma raíz que index.html).
2. Colocar los archivos de imagen allí, por ejemplo:
   - `public/images/hamburguesa.jpg`
   - `public/images/papas.jpg`
   - `public/images/cheeseburger.jpg`
   - `public/images/refresco.jpg`
3. En `src/App.jsx` asignar la ruta pública en cada producto: `image: "/images/nombre.jpg"`.
   - Ejemplo ya incluido en el proyecto: `/images/hamburguesa.jpg`
4. Reiniciar el servidor de desarrollo (`npm run dev`). Las imágenes se servirán desde `/images/...`.


Depuración si las imágenes no se ven:

- Asegúrate de que las imágenes estén en `public/images` (ruta completa: `c:\Users\User\Documentos\SistemaDePedidosRestaurante\public\images\tuimagen.jpg`). Vite sirve `public/` en la raíz como `/`.
- Reinicia el servidor de desarrollo tras mover/añadir archivos: `npm run dev`.
- Prueba abrir la imagen directamente en el navegador: `http://localhost:5173/images/hamburguesa.jpg` (ajusta nombre/extension).
- Revisa la consola y la pestaña Network del navegador; si ves 404, el nombre o la ruta está mal (mayúsculas/minúsculas cuentan).
- En `src/App.jsx` usa rutas públicas como `/images/nombre.jpg`. El frontend ahora normaliza rutas sin `/` al inicio, pero es mejor usar la ruta absoluta `/images/...`.
- Evita espacios o caracteres especiales en los nombres de archivo.
- Si quieres empaquetar imágenes en el build en vez de `public/`, indícalo y te doy el patrón con imports estáticos para Vite.

Notas rápidas si ves "Imagen no disponible" y aparece `/images/hamburguesa.jpg`:

- Verifica la ubicación exacta:
  - Si usaste la carpeta pública: el archivo debe estar en:
    c:\Users\User\Documentos\SistemaDePedidosRestaurante\public\images\hamburguesa.jpg
    y deberías poder abrir en el navegador: http://localhost:5173/images/hamburguesa.jpg
  - Si colocaste las imágenes dentro de la carpeta del código (por ejemplo `src/assets` o `src/images`), la app ahora las busca automáticamente allí también. Ejemplos:
    - c:\Users\User\Documentos\SistemaDePedidosRestaurante\src\assets\hamburguesa.jpg
    - c:\Users\User\Documentos\SistemaDePedidosRestaurante\src\images\hamburguesa.jpg
  - Para imágenes dentro de `src/` puedes en `src/App.jsx` usar:
    - image: "hamburguesa.jpg"   (solo nombre; la app intentará resolver en src/assets y src/images)
    - o image: "/images/hamburguesa.jpg" si la colocaste en public/images
- Atención a mayúsculas/minúsculas y extensiones (.jpg vs .jpeg vs .png).
- Reinicia el servidor dev después de mover archivos: npm run dev.
- Si el fallback muestra una URL generada por Vite (desde src/assets), prueba a abrir esa URL en el navegador.
- Si sigues con problemas copia aquí:
  - el nombre exacto del archivo (incluida extensión),
  - la ruta donde lo colocaste (public/images o src/assets o src/images),
  - y la entrada image en src/App.jsx para ese producto.
