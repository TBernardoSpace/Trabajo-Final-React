Gamer-Max | Proyecto Final React (Talento Tech)

Este es un proyecto front-end de e-commerce construido con **React** y **Vite**. La aplicación simula una tienda virtual completa, implementando funcionalidades clave como gestión de catálogo de productos, carrito de compras y autenticación de usuarios.

El proyecto consume una API REST simulada creada con **MockAPI** para todas las operaciones de CRUD (Crear, Leer, Actualizar, Borrar).

---
FUNCIONALIDADES DESTACADAS:

- **Arquitectura (Context API):** Gestión de estado global de **Autenticación**, **Carrito** y **Productos**. Uso de `localStorage` para la persistencia de la sesión.
- **Administración (CRUD):** Implementación total de **Crear, Leer, Actualizar y Eliminar** productos a través de MockAPI. Incluye validación de formularios y manejo de errores.
- **Navegación:** **Filtro en tiempo real** (búsqueda) y **paginador** de productos para mejorar la navegación del catálogo.
- **Theming Avanzado:** **Modo Claro/Oscuro** a nivel de aplicación (controlado por `ThemeContext`). Estilos *Cyberpunk* (Dark) y *High-Tech Lab* (Light) con `styled-components`.
- **Diseño y UX:** Uso de `React Bootstrap` para el diseño responsivo, **carrusel** de imágenes en Home, y componente **Breadcrumb** para indicar la ruta de navegación.
- **Interactividad:** Uso de `React Toastify` para notificaciones y `React Icons` para la interfaz.

---
STACK TECNOLÓGICO:

- **Framework:** React 18
- **Bundler:** Vite
- **Routing:** React Router DOM v6
- **Gestión de Estado:** Context API + Hooks
- **Peticiones HTTP:** Axios
- **Backend:** MockAPI (simulado)

---
INSTRUCCIONES DE INSTALACIÓN Y EJECUCIÓN:

### 1. Pre-requisitos

- Tener instalado Node.js (versión 16 o superior).
- Tener una cuenta y un Endpoint de MockAPI configurado para el recurso `/products`.

### 2. Configuración de la API

1.  Abre el archivo `src/services/api.js`.
2.  Reemplaza la URL de `MOCKAPI_URL` con tu propio Endpoint base (debe terminar en `/api/v1`).

### 3. Instalación

1.  Clona el repositorio.
2.  Desde la terminal, en la carpeta raíz del proyecto, ejecuta:
    ```bash
    npm install
    ```

### 4. Ejecutar el Proyecto

1.  Inicia el servidor de desarrollo de Vite:
    ```bash
    npm run dev
    ```

