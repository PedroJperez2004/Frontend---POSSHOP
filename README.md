# 🛍️ POSSHOP - Sistema de Punto de Venta (Frontend)

![Estado del Proyecto: En Producción](https://img.shields.io/badge/Estado-En_Producci%C3%B3n-brightgreen?style=for-the-badge)

## 📝 Descripción

**POSSHOP Frontend** es la interfaz de usuario para el sistema de Punto de Venta (POSSHOP). Esta aplicación web interactúa con el [Backend de POSSHOP](https://github.com/PedroJperez2004/Backend---POSSHOP) para gestionar todas las operaciones, desde la autenticación de usuarios hasta el procesamiento de ventas, la gestión de productos y el control de inventario.

Este proyecto representa la **primera versión funcional** de la plataforma, y aunque **ya se encuentra en un entorno de producción**, se mantiene en **desarrollo activo**. Esto significa que estoy trabajando en nuevas características, optimizaciones y mejoras para hacer de POSSHOP una solución aún más completa y amigable para el usuario.

## ✨ Características Principales

*   **🔐 Autenticación y Autorización:** Interfaz para el inicio y cierre de sesión de usuarios, y gestión de roles.
*   **📦 Gestión de Productos:** CRUD intuitivo para productos, categorías e impuestos.
*   **📈 Control de Inventario:** Visualización y gestión del stock.
*   **💸 Procesamiento de Ventas:** Interfaz de punto de venta (POS) para registrar y procesar ventas.
*   **📊 Historial de Ventas:** Consulta y detalles de ventas anteriores.

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
