import { Suspense } from "react";
import { evaluate, type EvaluateOptions } from "next-mdx-remote-client/rsc";
import { readingTime } from "reading-time-estimator";

import type { Frontmatter, Scope } from "@/types";
import { getMarkdownExtension } from "@/utils";
import { plugins, remarkRehypeOptions } from "@/utils/mdx";
import { expect } from "@/utils/expect";
import { getSource } from "@/utils/file";
import { components } from "@/mdxComponents";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingComponent from "@/components/LoadingComponent";

/**
 * The source is a markdown file NOT MDX
 */
export default async function TestPage() {
  const file = "test-markdown.md";
  const format = getMarkdownExtension(file);
  const source = await getSource(file);

  if (!source) {
    return <ErrorComponent error="The source could not found !" />;
  }

  const options: EvaluateOptions<Scope> = {
    parseFrontmatter: true,
    // actually scope is useless in markdown, just to show it is effectless
    scope: {
      readingTime: readingTime(source, 100).text,
    },
    mdxOptions: {
      format,
      ...plugins,
      remarkRehypeOptions,
    },
  };

  const { content, frontmatter, mod, scope, error } = await evaluate<
    Frontmatter,
    Scope
  >({
    source,
    options,
    components,
  });

  // *** JUST FOR TESTING FOR GETTING RESULTS FROM EVALUATE ***

  expect(mod).toEqual({}); // markdown files does not export anything
  expect(frontmatter.author).toBe("markdown");
  expect(scope.readingTime).toBe("6 min read");

  // **********************************************************

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return <Suspense fallback={<LoadingComponent />}>{content}</Suspense>;
}
