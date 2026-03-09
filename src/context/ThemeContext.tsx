"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "kde" | "rice";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("kde");

  // Load theme from localStorage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem("os-theme") as Theme;
    if (savedTheme === "kde" || savedTheme === "rice") {
      setThemeState(savedTheme);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("os-theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "kde" ? "rice" : "kde";
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
