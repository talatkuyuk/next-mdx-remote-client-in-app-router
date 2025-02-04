import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import type { MDXComponents } from "next-mdx-remote-client/rsc";

import ContextConsumer from "./ContextConsumer";
import Button from "./Button";
import CountButton from "./CountButton";
import Hello from "./Hello";
import Toc from "./Toc";
import { default as pre } from "./Pre";
import Admonition, { admonition } from "./Admonition";
import BlockQuote, { default as blockquote } from "./BlockQuote";

export const components: MDXComponents = {
  Toc,
  Button,
  CountButton,
  Hello,
  Dynamic: dynamic(() => import("./dynamic")),
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="custom-strong" {...props} />
  ),
  wrapper: (props: React.ComponentPropsWithoutRef<"div">) => {
    return <div id="mdx-layout">{props.children}</div>;
  },
  Image,
  Link,
  pre,
  blockquote,
  BlockQuote,
  admonition,
  Admonition,
  ContextConsumer,
};
