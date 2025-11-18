import React, { createContext, useState, useContext, useEffect } from 'react';


export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    
    useEffect(() => {
        const body = document.body;
        
        localStorage.setItem('theme', theme);
        
        
        document.documentElement.setAttribute('data-bs-theme', theme);

        
        body.classList.remove('theme-light', 'theme-dark');
        body.classList.add(`theme-${theme}`);

    }, [theme]);

    

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            
            {children}
        </ThemeContext.Provider>
    );
};