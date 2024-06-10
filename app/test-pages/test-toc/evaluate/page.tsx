import { Suspense } from "react";
import { evaluate, type EvaluateOptions } from "next-mdx-remote-client/rsc";
import { readingTime } from "reading-time-estimator";

import type { Frontmatter, Scope } from "@/types";
import { getMarkdownExtension } from "@/utils";
import { plugins } from "@/utils/mdx";
import { expect } from "@/utils/expect";
import { getSource } from "@/utils/file";
import { components } from "@/mdxComponents";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingComponent from "@/components/LoadingComponent";

/**
 * implements getting a Table of Contents (TOC) of an article
 */
export default async function TestPage() {
  const file = "test-toc.mdx";
  const format = getMarkdownExtension(file);
  const source = await getSource(file);

  if (!source) {
    return <ErrorComponent error="The source could not found !" />;
  }

  const options: EvaluateOptions<Scope> = {
    disableImports: true,
    parseFrontmatter: true,
    scope: {
      readingTime: readingTime(source, 100).text,
      props: { foo: "props in scope is working" },
    },
    vfileDataIntoScope: ["toc"], // the "remark-flexible-toc" plugin produces vfile.data.toc
    mdxOptions: {
      format,
      ...plugins,
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

  expect((mod.factorial as Function)?.(mod.num)).toEqual(720);
  expect(frontmatter.author).toBe("toctoc");
  expect(scope.readingTime).toBe("5 min read");

  // **********************************************************

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return <Suspense fallback={<LoadingComponent />}>{content}</Suspense>;
}
