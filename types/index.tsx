export type Frontmatter = {
  title: string;
  author: string;
  date: Date;
  summary: string;
};

export type Post = Frontmatter & { slug: string };

export type Scope = {
  readingTime: string;
  props?: {
    foo: string;
  };
};
