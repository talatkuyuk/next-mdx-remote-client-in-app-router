"use client";

import { forwardRef, useEffect, useTransition } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

import { useTransitionState } from "@/contexts/TransitionProvider";

// Copied from  https://github.com/vercel/next.js/blob/canary/packages/next/src/client/link.tsx#L180-L191
function isModifiedEvent(event: React.MouseEvent): boolean {
  const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement;
  const target = eventTarget.getAttribute("target");
  return (
    (target && target !== "_self") ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey || // triggers resource download
    (event.nativeEvent && event.nativeEvent.which === 2)
  );
}

/**
 * A custom Link component that wraps Next.js's next/link component.
 */
const Link: React.FC<Parameters<typeof NextLink>[0]> = forwardRef(function Link(
  { href, children, replace, onClick, ...rest },
  ref
) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { start, end, loading } = useTransitionState();

  useEffect(() => {
    if (isPending) {
      if (!loading) start();
    } else {
      if (loading) end();
    }
  }, [isPending]);

  return (
    <NextLink
      ref={ref}
      href={href}
      onClick={(e) => {
        if (isModifiedEvent(e)) return;
        e.preventDefault();
        onClick?.(e);
        startTransition(() => {
          const url = href.toString();

          if (replace) {
            router.replace(url);
          } else {
            router.push(url);
          }
        });
      }}
      {...rest}
    >
      {children}
    </NextLink>
  );
});

export default Link;
