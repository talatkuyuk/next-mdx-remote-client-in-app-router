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
import DemoStateProvider from "@/contexts/DemoStateProvider";
import OuterMDXProvider from "@/contexts/OuterMDXProvider";

/**
 * implements MDXProvider (!) and a Context Provider usage
 *
 * "evaluate" can not read the context so OuterMDXProvider is effectless !!!
 */
export default async function TestPage() {
  const file = "test-context.mdx";
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
  expect(frontmatter.author).toBe("barbar");
  expect(scope.readingTime).toBe("5 min read");

  // **********************************************************

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <OuterMDXProvider>
      <DemoStateProvider>
        <Suspense fallback={<LoadingComponent />}>{content}</Suspense>
      </DemoStateProvider>
    </OuterMDXProvider>
  );
}
