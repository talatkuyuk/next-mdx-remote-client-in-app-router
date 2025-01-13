import { Suspense } from "react";
import { headers } from "next/headers";
import { evaluate, type EvaluateOptions } from "next-mdx-remote-client/rsc";
import { readingTime } from "reading-time-estimator";

import type { Frontmatter, Scope } from "@/types";
import { plugins } from "@/utils/mdx";
import { expect } from "@/utils/expect";
import { components } from "@/mdxComponents";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingComponent from "@/components/LoadingComponent";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

type ApiResponse = { source: string; format: "md" | "mdx" } | { error: string };

/**
 * implements getting dynamic content not available at build time
 *
 * This page is rendered at request time because of searchParams and headers
 */
export default async function TestPage({ searchParams }: Props) {
  const slug = searchParams["slug"];

  if (!slug) {
    return (
      <ErrorComponent error="Provide a slug for an article in search params" />
    );
  }

  const headersList = headers();
  const origin = headersList.get("x-origin");

  const res = await fetch(`${origin}/api/mdx-content?slug=${slug}`);
  const data: ApiResponse = await res.json();

  if ("error" in data) {
    return <ErrorComponent error={data.error} />;
  }

  const { source, format } = data;

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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  expect((mod.factorial as Function)?.(mod.num)).toEqual(720);
  expect(frontmatter.author).toBe("toctoc");
  expect(scope.readingTime).toBe("5 min read");

  // **********************************************************

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return <Suspense fallback={<LoadingComponent />}>{content}</Suspense>;
}
