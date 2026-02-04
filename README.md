# ⚛️ POSSHOP - Frontend (Cliente Web)

Interfaz de usuario del sistema **POSSHOP**. Es una **Single Page Application (SPA)** moderna, rápida y reactiva, diseñada para ofrecer una experiencia de usuario fluida y eficiente en la gestión del punto de venta.

---

## ✨ Funcionalidades Principales

Esta aplicación consume la API del backend de POSSHOP para proporcionar una interfaz gráfica intuitiva que permite al usuario:

-   🔐 **Inicio de Sesión Seguro:** Interfaz para la autenticación de usuarios que se comunica con el backend para obtener tokens de acceso.
-   📊 **Dashboard Principal:** Un panel de control que presenta información clave y accesos directos a los módulos más importantes.
-   📦 **Gestión de Productos:**
    -   Visualizar un listado de todos los productos con paginación.
    -   Crear, editar y eliminar productos a través de formularios modales.
    -   Subir y previsualizar imágenes de productos.
-   🛒 **Interfaz de Ventas:** Un módulo dedicado para registrar nuevas ventas de forma rápida.
-   🗂️ **Paneles de Administración:** Secciones para gestionar las categorías, impuestos y usuarios del sistema.
-   📱 **Diseño Adaptable (Responsive):** La interfaz está construida con un enfoque *mobile-first* y es totalmente funcional en distintos dispositivos, desde ordenadores de escritorio hasta tablets y móviles.

---

## 🏗️ Arquitectura y Despliegue en Producción

La arquitectura del frontend está optimizada para la velocidad y la experiencia del desarrollador, utilizando un stack moderno desplegado en una plataforma líder.

-   **Tipo de Aplicación:** Es una **Single Page Application (SPA)** construida con React. Esto permite una experiencia de usuario casi instantánea sin recargas de página completas durante la navegación.

-   **Hosting y Despliegue:**
    -   La aplicación está desplegada en **Vercel**, una plataforma optimizada para aplicaciones de frontend modernas.
    -   Se beneficia de un **flujo de CI/CD** conectado a un repositorio de GitHub. Cada `push` a la rama principal despliega automáticamente una nueva versión en producción.
    -   Vercel distribuye el contenido a través de su **Edge Network (CDN) global**, lo que garantiza tiempos de carga muy bajos para usuarios de todo el mundo.

-   **Comunicación con el Backend:**
    -   El frontend es completamente independiente del backend. Toda la comunicación se realiza a través de llamadas a la **API REST de POSSHOP** mediante el cliente HTTP `axios`.

---

## 💻 Pila Tecnológica (Stack)

| Componente | Tecnología | Razón de la Elección |
| :--- | :--- | :--- |
| 🔵 **Framework** | **React** | Librería líder para construir interfaces de usuario interactivas y componentizadas. |
| ⚡ **Build Tool** | **Vite** | Proporciona un entorno de desarrollo extremadamente rápido y compila un paquete de producción altamente optimizado. |
| ☁️ **Hosting** | **Vercel** | Plataforma ideal para el despliegue de proyectos React/Vite, con CI/CD y CDN integrados. |
| 🎨 **Estilos** | **Tailwind CSS** | Framework de CSS *utility-first* que permite construir diseños complejos y personalizados rápidamente. |
| 🌐 **Routing** | **React Router** | Solución estándar para el enrutamiento del lado del cliente en aplicaciones React. |
| 📡 **Cliente HTTP**| **Axios** | Cliente robusto y fácil de usar para realizar peticiones a la API del backend. |

---

## 📄 Licencia

Este proyecto es de mi propiedad y sirve como demostración de mis habilidades.
