"use client";

import { Suspense, useEffect, useState } from "react";
import { clsx } from "clsx";

import Logo from "./Logo";
import Navbar from "./Navbar";
import ThemeToggle from "./ThemeToggle";
import NavigationLoader from "./NavigationLoader";

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
      if (window.scrollY > 10) setTop(false);
      else setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <div className={clsx(["header", !top && "shadow"])}>
      <Logo onClick={resetIndicator} />
      <Navbar
        navbarIndicatorPosition={navbarIndicatorPosition}
        setNavbarIndicatorPosition={setNavbarIndicatorPosition}
      />
      {/* https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
      <Suspense>
        <NavigationLoader />
      </Suspense>
      <ThemeToggle />
    </div>
  );
};

export default Header;
