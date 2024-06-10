"use client";

import { type CSSProperties, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import BeatLoader from "react-spinners/BeatLoader";

import { useTransitionState } from "@/contexts/TransitionProvider";

export default function NavigationLoader() {
  const { loading, end } = useTransitionState();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // log the url
    // console.log(`${pathname}?${searchParams}`);

    if (loading) end();
  }, [pathname, searchParams]); //eslint-disable-line react-hooks/exhaustive-deps

  const cssOverride: CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    right: "3rem",
    borderColor: "var(--error)",
  };

  return (
    <BeatLoader
      loading={loading}
      color="var(--greenary)"
      size={10}
      cssOverride={cssOverride}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
