import { Suspense } from "react";
import { MDXRemote, type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import { readingTime } from "reading-time-estimator";

import { getMarkdownExtension } from "@/utils";
import { plugins } from "@/utils/mdx";
import { getSource } from "@/utils/file";
import { components } from "@/mdxComponents";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingComponent from "@/components/LoadingComponent";
import DemoStateProvider from "@/contexts/DemoStateProvider";
import OuterMDXProvider from "@/contexts/OuterMDXProvider";

/**
 * implements MDXProvider (!) and a Context Provider usage
 *
 * MDXRemote (server component) can not read the context so OuterMDXProvider is effectless !!!
 */
export default async function TestPage() {
  const file = "test-context.mdx";
  const format = getMarkdownExtension(file);
  const source = await getSource(file);

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
    mdxOptions: {
      format,
      ...plugins,
    },
  };

  return (
    <OuterMDXProvider>
      <DemoStateProvider>
        <Suspense fallback={<LoadingComponent />}>
          <MDXRemote
            source={source}
            options={options}
            components={components}
            onError={ErrorComponent}
          />
        </Suspense>
      </DemoStateProvider>
    </OuterMDXProvider>
  );
}
