import { Suspense } from "react";
import type { Metadata } from "next";
import { MDXRemote, type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import { readingTime } from "reading-time-estimator";

import type { Frontmatter } from "@/types";
import { plugins, remarkRehypeOptions } from "@/utils/mdx";
import { getMarkdownFromSlug, getMarkdownFiles } from "@/utils/file";
import { components } from "@/mdxComponents";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingComponent from "@/components/LoadingComponent";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const file = await getMarkdownFromSlug(params.slug);

  if (!file) return {};

  const { frontmatter } = getFrontmatter<Frontmatter>(file.source);

  return {
    title: frontmatter.title ?? "Article",
  };
}

/**
 * "MDXRemote" to be rendered
 */
export default async function Post({ params }: Props) {
  const result = await getMarkdownFromSlug(params.slug);

  if (!result) {
    return <ErrorComponent error="The source could not found !" />;
  }

  const { source, format } = result;

  const options: MDXRemoteOptions = {
    disableImports: true, // import statements in MDX don't work in pages router
    parseFrontmatter: true,
    scope: {
      readingTime: readingTime(source, 100).text,
      props: { foo: "props in scope is working" },
    },
    vfileDataIntoScope: "toc", // the "remark-flexible-toc" plugin produces vfile.data.toc
    mdxOptions: {
      format,
      ...plugins,
      remarkRehypeOptions: format === "md" ? remarkRehypeOptions : undefined,
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

export async function generateStaticParams() {
  const files = getMarkdownFiles();

  const article = (f: string) => f.includes("article");

  return files.filter(article).map((filename) => ({
    // replace the last dot with dash in the filename for slug
    slug: filename.replace(/\.(?=[^.]*$)/, "-"),
  }));
}
