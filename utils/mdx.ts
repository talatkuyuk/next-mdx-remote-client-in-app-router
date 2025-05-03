import { type PluggableList } from "unified";
import { nodeTypes } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import remarkFlexibleMarkers from "remark-flexible-markers";
import remarkFlexibleCodeTitles from "remark-flexible-code-titles";
import remarkFlexibleContainers, {
  type FlexibleContainerOptions,
} from "remark-flexible-containers";
import remarkFlexibleParagraphs from "remark-flexible-paragraphs";
import remarkFlexibleToc from "remark-flexible-toc";
import remarkInsert from "remark-ins";
import rehypeRaw from "rehype-raw";
import rehypeCodeMeta from "rehype-code-meta";
import rehypeHighlight from "rehype-highlight";
import rehypeHighlightLines from "rehype-highlight-code-lines";
import rehypeSlug from "rehype-slug";
import rehypePreLanguage from "rehype-pre-language";
import rehypeImageToolkit from "rehype-image-toolkit";
import recmaMdxEscapeMissingComponents from "recma-mdx-escape-missing-components";
import recmaMdxChangeProps from "recma-mdx-change-props";
import recmaMdxImportReact from "recma-mdx-import-react";

import { toTitleCase } from ".";
import { html } from "./rehype-handlers";

const remarkPlugins: PluggableList = [
  remarkGfm,
  remarkInsert,
  remarkFlexibleMarkers, // order of plugins matters
  remarkEmoji,
  remarkFlexibleParagraphs,
  [
    remarkFlexibleContainers,
    {
      title: () => null,
      containerTagName: "admonition",
      containerProperties: (type, title) => {
        return {
          ["data-type"]: type?.toLowerCase(),
          ["data-title"]: title ?? toTitleCase(type),
        };
      },
    } as FlexibleContainerOptions,
  ],
  remarkFlexibleCodeTitles,
  remarkFlexibleToc,
];

const rehypePlugins: PluggableList = [
  rehypeCodeMeta,
  [rehypeRaw, { passThrough: nodeTypes }], // to allow HTML elements in "md" format, "passThrough" is for "mdx" works as well
  rehypeHighlight,
  [rehypeHighlightLines, { showLineNumbers: true }],
  rehypeSlug,
  rehypePreLanguage,
  rehypeImageToolkit,
];

const recmaPlugins: PluggableList = [
  [
    recmaMdxEscapeMissingComponents,
    ["Bar", "Toc", "ContextConsumer", "ComponentFromOuterProvider"],
  ],
  recmaMdxChangeProps,
  recmaMdxImportReact,
];

export const plugins = {
  remarkPlugins,
  rehypePlugins,
  recmaPlugins,
};

export const remarkRehypeOptions = { handlers: { html } };
