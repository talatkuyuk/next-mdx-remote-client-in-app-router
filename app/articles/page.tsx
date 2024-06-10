import type { Metadata } from "next";

import { getPostInformation, getMarkdownFiles } from "@/utils/file";
import VisitGithub from "@/components/VisitGithub";
import Link from "@/components/Link";
import type { Post } from "@/types";

export const metadata: Metadata = {
  title: "Ipikuka Articles",
};

export default async function Articles() {
  const files = getMarkdownFiles();

  const article = (f: string) => f.includes("article");

  // "getPostInformation" uses "getFrontmatter" utility without compiling the source !
  const posts = files
    .filter(article)
    .map(getPostInformation)
    .filter((post): post is Post => post !== undefined);

  return (
    <div>
      <p>
        <strong>Welcome to articles</strong>
      </p>
      <p>
        This part of the application is designed for understanding how to
        implement a blog application with
        <strong> next-mdx-remote-client</strong>.
      </p>
      <VisitGithub />
      <div>
        In the github repository, you can see how to
        <ul>
          <li>
            get <code>frontmatters</code> without compiling the souce while
            listing articles,
          </li>
          <li>
            implement a simple but powerful&nbsp;
            <code>table of content (TOC)</code>,
          </li>
          <li>
            implement automatic MDX <code>syntax error</code> handling,
          </li>
          <li>
            provide options to <code>next-mdx-remote-client</code>.
          </li>
        </ul>
      </div>
      <p>
        <em>
          For simpicity and demonstration purpose, I created the content of the
          articles via&nbsp;
          <code>chatGPT</code>.
        </em>
      </p>
      <ul className="articles">
        {posts.filter(Boolean).map((post) => (
          <li key={post.title}>
            <strong>
              <Link href={`/articles/${post.slug}`}>{post.title}</Link>
            </strong>
            <p>
              <span>{String(post.date)}, </span>
              <span>
                written by <strong>{post.author}</strong>
              </span>
            </p>
            <p>{post.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
