# 🛍️ POSSHOP - Sistema de Punto de Venta (Frontend)

![Estado del Proyecto: En Producción](https://img.shields.io/badge/Estado-En_Producci%C3%B3n-brightgreen?style=for-the-badge)

## 📝 Descripción

**POSSHOP Frontend** es la interfaz de usuario para el sistema de Punto de Venta (POSSHOP). Esta aplicación web interactúa con el [Backend de POSSHOP](https://github.com/PedroJperez2004/Backend---POSSHOP) para gestionar todas las operaciones, desde la autenticación de usuarios hasta el procesamiento de ventas, la gestión de productos y el control de inventario.

Este proyecto representa la **primera versión funcional** de la plataforma, y aunque **ya se encuentra en un entorno de producción**, se mantiene en **desarrollo activo**. Esto significa que estoy trabajando en nuevas características, optimizaciones y mejoras para hacer de POSSHOP una solución aún más completa y amigable para el usuario.

## ✨ Características Principales

*   **🔐 Autenticación y Autorización:** Interfaz para el inicio y cierre de sesión de usuarios, y gestión de roles.
*   **📦 Gestión de Productos:** CRUD intuitivo para productos, categorías e impuestos.
    *   **Creación, Edición y Eliminación de Productos:** Funcionalidades completas para administrar el catálogo de productos (solo administradores).
    *   **Visualización de Stock:** Consulta rápida y eficiente del inventario disponible para cada producto.
    *   **Carga de Imágenes:** Posibilidad de asociar imágenes a los productos para una mejor identificación visual.
    *   **Asociación de Categorías e Impuestos:** Gestión integrada de categorías y tasas de impuestos para cada producto.
*   **📈 Control de Inventario:** Visualización y gestión del stock.
    *   **Visualización Detallada del Stock:** Acceso a información precisa sobre las cantidades en inventario.
    *   **Actualización Automática Post-Venta:** El stock se ajusta automáticamente después de cada transacción de venta.
    *   **Movimientos de Inventario:** Funcionalidad para registrar entradas y salidas de productos manuales (ej. ajustes, recepciones).
*   **💸 Procesamiento de Ventas:** Interfaz de punto de venta (POS) para registrar y procesar ventas.
    *   **Selección y Búsqueda de Productos:** Herramientas intuitivas para encontrar y añadir productos al carrito.
    *   **Gestión de Carrito de Compras:** Interfaz clara para añadir, modificar y eliminar ítems del carrito.
    *   **Confirmación de Venta:** Proceso guiado para finalizar la transacción.
    *   **Feedback Visual:** Notificaciones claras de éxito o error durante el proceso de venta.
    *   **Emisión de Recibo:** Generación de recibos de venta para el cliente.
*   **📊 Historial de Ventas:** Consulta y detalles de ventas anteriores.
    *   **Listado Completo de Ventas:** Acceso a un historial detallado de todas las transacciones realizadas.
    *   **Detalle de una Venta Específica:** Visualización exhaustiva de los productos, cantidades y precios de cada venta.
    *   **Reversión de Ventas:** Funcionalidad para anular transacciones, ajustando automáticamente el inventario.
*   **🏷️ Gestión de Categorías:** CRUD intuitivo para categorías de productos (solo administradores).
    *   **Creación, Edición y Eliminación de Categorías:** Control total sobre la organización del catálogo de productos.
*   **🧾 Gestión de Impuestos:** CRUD intuitivo para las tasas de impuestos aplicables (solo administradores).
    *   **Creación, Edición y Eliminación de Impuestos:** Flexibilidad para configurar y actualizar las políticas fiscales.


## 👤 Roles y Flujos de Usuario (Muy Importante)

El sistema POSSHOP está diseñado para diferenciar las funcionalidades y el acceso según el rol del usuario, garantizando una operación eficiente y segura.

### Flujo de Administrador

Al iniciar sesión, el **Administrador** es dirigido a la sección de **Ventas**. Desde allí, tiene acceso completo al panel de navegación lateral, lo que le permite moverse libremente entre todas las secciones del sistema, incluyendo:

*   Gestión de Productos (Productos, Categorías, Impuestos)
*   Gestión de Inventario
*   Historial de Ventas
*   Gestión de Usuarios

### Flujo de Empleado

Al iniciar sesión, el **Empleado** también es dirigido a la sección de **Ventas**. Sin embargo, a diferencia del Administrador, el acceso del Empleado está restringido principalmente a esta sección, lo que le permite enfocarse en el proceso de venta sin distracciones, garantizando que su flujo de trabajo sea eficiente y directo.

### Flujo Principal de Uso para Empleados

El empleado sigue un flujo de trabajo optimizado para la atención al cliente y el procesamiento de ventas:

1.  **Login:** Acceso seguro al sistema.
2.  **Selección / Búsqueda de Productos:** Interfaz intuitiva para buscar productos por nombre, código o categoría, y añadirlos al carrito.
3.  **Carrito:** Visualización y gestión de los productos seleccionados para la venta, con opciones para ajustar cantidades o eliminar ítems.
4.  **Confirmación de Venta:** Finalización del proceso de compra.
5.  **Feedback Visual:** Confirmación instantánea del éxito o error de la transacción.
6.  **Recibo de la Venta:** Generación y visualización del comprobante de la transacción.
7.  **Ver Historial de Ventas y Reversar Venta:** Posibilidad de consultar ventas anteriores y, si es necesario, revertirlas.

## 🚀 Tecnologías Utilizadas

Este proyecto utiliza un stack de tecnologías moderno y eficiente para construir una interfaz de usuario robusta y reactiva.

### **Frontend**
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### **Herramientas de Desarrollo**
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

## 🌐 Consideraciones Técnicas

### Comunicación con el Backend

La interfaz frontend se comunica con el backend a través de una **API REST**. Para garantizar una experiencia de usuario fluida y robusta, se implementan las siguientes consideraciones:

*   **Consumo de API REST:** Utilización de `Axios` para realizar peticiones HTTP de manera eficiente y manejar las respuestas del servidor.
*   **Manejo de Estados de Carga:** Implementación de indicadores visuales (loaders, spinners) para informar al usuario sobre el estado de las operaciones asíncronas, mejorando la percepción de rendimiento.
*   **Manejo de Errores de la API:** Gestión centralizada de posibles errores HTTP (ej. `401 Unauthorized`, `403 Forbidden`, `500 Internal Server Error`) para mostrar mensajes de error claros y amigables al usuario, y realizar acciones apropiadas como redirecciones o reintentos.

## 🔧 Puesta en Marcha Local

Para correr este proyecto en tu máquina local, sigue esta guía paso a paso.

### **1. Prerrequisitos**

Asegúrate de tener instalado el siguiente software:

*   **Node.js:** Versión 18 o superior.
*   **npm:** Generalmente se instala con Node.js.
*   **POSSHOP Backend:** El backend de POSSHOP debe estar corriendo y accesible. Consulta su [repositorio](https://github.com/PedroJperez2004/Backend---POSSHOP) para instrucciones de instalación.

### **2. Guía de Instalación**

Sigue estos comandos en tu terminal:

1.  **Clona el repositorio y entra al directorio `fron-end`:**
    ```bash
    git clone git@github.com:PedroJperez2004/Frontend---POSSHOP.git
    cd fron-end
    ```

2.  **Instala todas las dependencias del proyecto:**
    Esto instalará React, Tailwind CSS, React Router DOM, Axios y todo lo necesario que está definido en `package.json`.
    ```bash
    npm install
    ```

3.  **Crea y configura las variables de entorno:**
    Crea un archivo llamado `.env` en la raíz del proyecto (`fron-end`). Aquí deberás especificar la URL base de tu API backend.

    ```dotenv
    VITE_API_BASE_URL=http://localhost:3000
    NODE_ENV=development
    ```
    > **Nota:** Asegúrate de que `http://localhost:3000` (o la dirección que uses) coincida con la URL donde está corriendo tu backend de POSSHOP.

4.  **¡Inicia el servidor de desarrollo!**
    ```bash
    npm run dev
    ```

Una vez que el servidor de desarrollo se inicie, podrás acceder a la aplicación frontend a través de la URL que Vite te proporcione (generalmente `http://localhost:5173`). Asegúrate de que tu backend esté funcionando correctamente para que la aplicación pueda cargar los datos y realizar operaciones.

## 🚀 Despliegue en Vercel

Este proyecto está desplegado en Vercel, lo que permite una integración continua y despliegues automáticos cada vez que se realizan cambios en la rama principal.

## 🔮 Funcionalidades Futuras

Estamos planeando expandir las capacidades de POSSHOP con las siguientes características:

*   **Reportes Avanzados:** Generación de informes detallados sobre ventas, inventario y rendimiento.
*   **Dashboard Personalizable:** Un panel de control interactivo para una visión general del negocio.
*   **Soporte Multi-sucursal:** Habilitar la gestión de múltiples ubicaciones o tiendas desde una única plataforma.
