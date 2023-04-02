import { createContext, useState,useEffect,React } from "react";
import getInitialTheme from "../../helpers/get-inital-theme";

const ThemeContext =createContext()
const ThemeProvider=({initialTheme,children})=>{
    const [theme, setTheme] = useState(getInitialTheme);

    const rawSetTheme = (rawTheme) => {
        const root = window.document.documentElement;
        const isDark = rawTheme === 'dark';

        root.classList.remove(isDark ? 'light' : 'dark');
        root.classList.add(rawTheme);

        localStorage.setItem('color-theme', rawTheme);
    };

    if (initialTheme) {
        rawSetTheme(initialTheme);
        // console.log("in if")
    }

    useEffect(() => {
        rawSetTheme(theme);
    }, [theme]);

    return(
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeProvider}
export default ThemeContext