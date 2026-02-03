# POSSHOP - Frontend

Frontend para un sistema de Punto de Venta (POS) construido con React, Vite y Tailwind CSS.

## Descripción

Este proyecto proporciona la interfaz de usuario para un sistema POS. Permite a los usuarios gestionar productos, inventario, ventas y usuarios. Interactúa con una API de backend para obtener y almacenar datos.

## Características

-   **Gestión de Ventas:** Crear nuevas ventas, ver el historial de ventas y revertir ventas.
-   **Control de Inventario:** Rastrear movimientos de stock (entradas y salidas), ver el kardex de productos y gestionar los niveles de inventario.
-   **Gestión de Productos:** Funcionalidad CRUD (Crear, Leer, Actualizar, Eliminar) completa para productos, incluyendo categorización y gestión de impuestos.
-   **Gestión de Usuarios:** Gestionar usuarios y sus roles dentro del sistema.
-   **Categorías e Impuestos:** Crear y gestionar categorías de productos e impuestos.
-   **Autenticación:** Funcionalidad de inicio y cierre de sesión de usuario.
-   **Diseño Responsivo:** La aplicación está diseñada para ser utilizada en diferentes tamaños de pantalla.

## Tech Stack y Dependencias Clave

El comando `npm install` instalará todas las dependencias necesarias del archivo `package.json`. Las tecnologías y librerías clave incluyen:

-   **Framework**: [React](https://reactjs.org/) (`react`)
-   **Herramienta de Construcción**: [Vite](https://vitejs.dev/) (`vite`)
-   **Estilos**: [Tailwind CSS](https://tailwindcss.com/) (`tailwindcss`)
-   **Enrutamiento**: [React Router](https://reactrouter.com/) (`react-router-dom`)
-   **Cliente HTTP**: [Axios](https://axios-http.com/) (`axios`) para realizar peticiones a la API.
-   **Linting**: [ESLint](https://eslint.org/) (`eslint`) para la calidad del código.

## Prerrequisitos

Asegúrate de tener instalado el siguiente software en tu sistema:

-   [Node.js](https://nodejs.org/) (se recomienda la versión 18 o superior)
-   [npm](https://www.npmjs.com/) (normalmente viene con Node.js)

## Instalación y Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/PedroJperez2004/Frontend---POSSHOP.git
    cd Frontend---POSSHOP
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto y añade la siguiente variable. Esta debe apuntar a la URL donde se está ejecutando tu API de backend.

    ```env
    # URL de la API de backend
    VITE_API_URL=http://localhost:3000
    ```
    *Nota: El prefijo `VITE_` es necesario para que Vite exponga la variable de entorno al código del lado del cliente.*


## Ejecutando la Aplicación

Para iniciar el servidor de desarrollo (con recarga en caliente), ejecuta:
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173` (o el siguiente puerto disponible).

## Scripts Disponibles

-   `npm run dev`: Inicia el servidor de desarrollo con Vite.
-   `npm run build`: Construye la aplicación para producción en la carpeta `dist/`.
-   `npm run lint`: Analiza el código con ESLint para comprobar errores y problemas de estilo.
-   `npm run preview`: Inicia un servidor local para previsualizar la compilación de producción desde la carpeta `dist/`.

## Estructura del Proyecto

El proyecto sigue una arquitectura modular para separar responsabilidades:

```
src/
├── App.jsx                # Componente principal con la configuración de enrutamiento
├── main.jsx               # Punto de entrada de la aplicación
├── assets/                # Activos estáticos como imágenes y SVGs
├── components/            # Componentes de UI globales y reutilizables (ej. modales, botones)
├── modules/               # Lógica de negocio, dividida por funcionalidad
│   ├── products/
│   │   ├── components/    # Componentes de React específicos del módulo de productos
│   │   ├── hooks/         # Hooks personalizados para gestionar el estado y la lógica
│   │   └── services/      # Funciones para realizar llamadas a la API (ej. getProducts)
│   └── ... (otros módulos como users, sales, etc.)
├── pages/                 # Componentes de página de nivel superior que corresponden a rutas
├── services/              # Servicios de API globales (ej. instancia de Axios configurada)
└── shared/                # Utilidades, hooks, constantes, etc. compartidos
```
