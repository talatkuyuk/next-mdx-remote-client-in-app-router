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
 * import and export statements are disabled in MDX source
 */
export default async function TestPage() {
  const file = "test-basic.mdx";
  const format = getMarkdownExtension(file);
  const source = await getSource(file);

  if (!source) {
    return <ErrorComponent error="The source could not found !" />;
  }

  const options: EvaluateOptions<Scope> = {
    disableExports: true,
    disableImports: true,
    parseFrontmatter: true,
    scope: {
      readingTime: readingTime(source, 100).text,
      props: { foo: "props in scope is working" },
    },
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

  expect(mod).toEqual({}); // it is empty object due to disabled exports
  expect(frontmatter.author).toBe("foofoo");
  expect(scope.readingTime).toBe("5 min read");

  // **********************************************************

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return <Suspense fallback={<LoadingComponent />}>{content}</Suspense>;
}
