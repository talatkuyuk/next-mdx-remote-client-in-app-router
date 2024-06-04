import React, { useCallback, Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  navbarIndicatorPosition?:
    | {
        left: number;
        width: number;
      }
    | undefined;
  setNavbarIndicatorPosition: Dispatch<
    SetStateAction<
      | {
          left: number;
          width: number;
        }
      | undefined
    >
  >;
};
const Navbar = ({
  navbarIndicatorPosition,
  setNavbarIndicatorPosition,
}: Props) => {
  const path = usePathname();

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setNavbarIndicatorPosition({
      left: event.currentTarget.offsetLeft,
      width: event.currentTarget.offsetWidth,
    });
  };

  const elementRef = useCallback((node: HTMLAnchorElement) => {
    if (node && node.pathname === path) {
      setNavbarIndicatorPosition({
        left: node.offsetLeft,
        width: node.offsetWidth,
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="navbar">
      <div id="navbar-indicator" style={navbarIndicatorPosition} />
      <Link href="/test-pages" ref={elementRef} onClick={handleClick}>
        Test Pages
      </Link>
      <Link href="/articles" ref={elementRef} onClick={handleClick}>
        Articles
      </Link>
    </div>
  );
};

export default Navbar;
