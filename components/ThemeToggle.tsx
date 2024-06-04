import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleCurrentTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleCurrentTheme}
      className={styles.themeToggle}
      aria-label={"Theme Toggle Button"}
    >
      <MoonIcon className={styles.light} height="20" />
      <SunIcon className={styles.dark} height="20" />
    </button>
  );
};

export default ThemeToggle;
