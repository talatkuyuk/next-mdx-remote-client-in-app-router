import { Suspense } from "react";
import { headers } from "next/headers";
import { MDXRemote, type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import { readingTime } from "reading-time-estimator";

import { plugins } from "@/utils/mdx";
import { components } from "@/mdxComponents";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingComponent from "@/components/LoadingComponent";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

type ContentResponse =
  | {
      source: string;
      format: "md" | "mdx";
    }
  | {
      error: string;
    };

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
  const data: ContentResponse = await res.json();

  if ("error" in data) {
    return <ErrorComponent error={data.error} />;
  }

  const { source, format } = data;

  if (!source) {
    return <ErrorComponent error="The source could not found !" />;
  }

  const options: MDXRemoteOptions = {
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

  return (
    <Suspense fallback={<LoadingComponent />}>
      <MDXRemote
        source={source}
        options={options}
        components={components}
        onError={ErrorComponent}
      />
    </Suspense>
  );
}
