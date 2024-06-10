import { Suspense } from "react";
import { MDXRemote, type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import { readingTime } from "reading-time-estimator";

import { getMarkdownExtension } from "@/utils";
import { plugins, remarkRehypeOptions } from "@/utils/mdx";
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

  const options: MDXRemoteOptions = {
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
