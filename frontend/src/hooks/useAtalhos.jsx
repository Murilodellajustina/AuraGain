import { useEffect } from "react";

/**
 * Hook personalizado para gerir atalhos de teclado de forma global.
 * @param {Object} atalhosMap 
 */
export default function useAtalhos(atalhosMap) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['INPUT', 'TEXTAREA'].includes(e.target.tagName) && !e.altKey && !e.ctrlKey) {
                return;
            }

            const combinacaoAtual = 
                (e.ctrlKey ? "Ctrl+" : "") + 
                (e.altKey ? "Alt+" : "") + 
                (e.shiftKey ? "Shift+" : "") + 
                e.key.toUpperCase();

            if (atalhosMap[combinacaoAtual]) {
                e.preventDefault();
                atalhosMap[combinacaoAtual]();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [atalhosMap]);
}