import VisitGithub from "@/components/VisitGithub";

export default function Home() {
  return (
    <main style={{ display: "grid", justifyItems: "center" }}>
      <p style={{ marginBottom: "0", textAlign: "center" }}>
        This is a <strong>blog application</strong> using{" "}
        <strong>next-mdx-remote-client</strong> in{" "}
        <code>Next.js pages router</code>.
      </p>
      <VisitGithub style={{ marginTop: "0" }} />
      <div className="next-mdx-remote-client">next-mdx-remote-client</div>

      <p style={{ textAlign: "center" }}>
        It is a wrapper of the <code>@mdx-js/mdx</code> in order to load MDX
        content.
      </p>
      <p style={{ textAlign: "center" }}>
        You can reach the package on{" "}
        <a
          href="https://www.npmjs.com/package/next-mdx-remote-client"
          target="_blank"
        >
          npm
        </a>{" "}
        or the repository on{" "}
        <a
          href="https://github.com/ipikuka/next-mdx-remote-client"
          target="_blank"
        >
          github
        </a>
        .
      </p>
    </main>
  );
}
