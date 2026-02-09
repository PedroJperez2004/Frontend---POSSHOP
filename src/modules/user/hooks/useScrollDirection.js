import { useState, useEffect } from 'react';

export function useScrollDirection(elementRef) {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const target = elementRef?.current;
        if (!target) return;

        const controlNavbar = () => {
            const currentScrollY = target.scrollTop;

            // Solo actuamos si el scroll se ha movido más de 10px para evitar rebotes
            if (Math.abs(currentScrollY - lastScrollY) < 10) return;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false); // Bajando -> Ocultar
            } else {
                setIsVisible(true);  // Subiendo -> Mostrar
            }
            setLastScrollY(currentScrollY);
        };

        target.addEventListener('scroll', controlNavbar);
        return () => target.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY, elementRef]);

    return isVisible;
}