import { useEffect, useState } from "react";

type Theme = "dark";

export function useTheme() {
    const [theme] = useState<Theme>("dark");

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        // Ensure dark class is present for any manual legacy selectors, though variables handle it now
        root.classList.add("dark");
    }, []);

    const toggleTheme = () => {
        // No-op
        console.log("Theme switching is disabled.");
    };

    return { theme, toggleTheme };
}
