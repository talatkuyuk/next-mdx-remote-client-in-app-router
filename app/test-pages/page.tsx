import Link from "@/components/Link";
import VisitGithub from "@/components/VisitGithub";

export default async function StaticBlog() {
  return (
    <div>
      <p>
        <strong>Welcome to test pages</strong>
      </p>
      <p>
        This part of the application is designed for supplying&nbsp;
        <code>
          <em>different options</em>
        </code>
        &nbsp;into <strong>next-mdx-remote-client</strong> to see its behaviour
        and understanding how to implement a blog page with{" "}
        <code>MDXRemote</code> or <code>evaluate</code>.
      </p>
      <VisitGithub />
      <ul className="test-pages">
        <li>
          <strong>A blog page with disabled imports/exports</strong>
          <div className="test-pages-link-container">
            <Link href="/test-pages/test-basic">MDXRemote</Link>
            {" or "}
            <Link href="/test-pages/test-basic/evaluate">evaluate</Link>
          </div>
        </li>
        <li>
          <strong>A blog page with enabled imports/exports</strong>
          <div className="test-pages-link-container">
            <Link href="/test-pages/test-import">MDXRemote</Link>
            {" or "}
            <Link href="/test-pages/test-import/evaluate">evaluate</Link>
          </div>
        </li>
        <li>
          <strong>A blog page with MDXProvider and context providers</strong>
          <div className="test-pages-link-container">
            <Link href="/test-pages/test-provider">MDXRemote</Link>
            {" or "}
            <Link href="/test-pages/test-provider/evaluate">evaluate</Link>
          </div>
        </li>
        <li>
          <strong>A blog page with an error</strong>
          <div className="test-pages-link-container">
            <Link href="/test-pages/test-error">MDXRemote</Link>
            {" or "}
            <Link href="/test-pages/test-error/evaluate">evaluate</Link>
          </div>
        </li>
        <li>
          <strong>A blog page with Table of Content (TOC)</strong>
          <div className="test-pages-link-container">
            <Link href="/test-pages/test-toc">MDXRemote</Link>
            {" or "}
            <Link href="/test-pages/test-toc/evaluate">evaluate</Link>
          </div>
        </li>
        <li>
          <strong>A blog page written in markdown not MDX</strong>
          <div className="test-pages-link-container">
            <Link href="/test-pages/test-markdown">MDXRemote</Link>
            {" or "}
            <Link href="/test-pages/test-markdown/evaluate">evaluate</Link>
          </div>
        </li>
        <li>
          <strong>
            A blog page getting dynamic content not available at build time
          </strong>
          <div className="test-pages-link-container">
            <Link href="/test-pages/test-dynamic?slug=test-toc-mdx">
              MDXRemote
            </Link>
            {" or "}
            <Link href="/test-pages/test-dynamic/evaluate?slug=test-toc-mdx">
              evaluate
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}
