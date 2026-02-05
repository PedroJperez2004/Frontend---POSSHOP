export const getFullImageUrl = (url) => {
    if (!url) return null;

    // Si la URL ya es completa (ej. de Cloudinary), la devolvemos tal cual
    if (url.startsWith('http')) {
        return url;
    }

    // Si es una ruta local, le pegamos la URL del backend
    // Asegúrate de que VITE_API_URL no termine en "/" para que no se duplique
    const baseUrl = import.meta.env.VITE_API_URL.endsWith('/')
        ? import.meta.env.VITE_API_URL.slice(0, -1)
        : import.meta.env.VITE_API_URL;

    return `${baseUrl}${url}`;
};