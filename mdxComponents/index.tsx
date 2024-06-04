import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import type { MDXComponents } from "next-mdx-remote-client/rsc";

import Button from "./Button";
import CountButton from "./CountButton";
import Hello from "./Hello";
import ContextConsumer from "./ContextConsumer";
import Toc from "./Toc";
import BlockQuote, { default as blockquote } from "./BlockQuote";
import Admonition, { admonition } from "./Admonition";
import pre from "./pre";

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
  blockquote,
  BlockQuote,
  admonition,
  Admonition,
  pre,
  ContextConsumer,
};
