import { useEffect, useState } from "react";
import { clsx } from "clsx";

import Logo from "./Logo";
import Navbar from "./Navbar";
import NavigationLoader from "./NavigationLoader";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [navbarIndicatorPosition, setNavbarIndicatorPosition] = useState<
    undefined | { left: number; width: number }
  >();

  const resetIndicator = () => {
    setNavbarIndicatorPosition(undefined);
  };

  const [top, setTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <div className={clsx(["header", !top && "shadow"])}>
      <NavigationLoader />
      <Logo onClick={resetIndicator} />
      <Navbar
        navbarIndicatorPosition={navbarIndicatorPosition}
        setNavbarIndicatorPosition={setNavbarIndicatorPosition}
      />
      <ThemeToggle />
    </div>
  );
};

export default Header;
