const VisitGithub = (props: React.ComponentPropsWithoutRef<"p">) => {
  return (
    <p {...props}>
      Visit github for&nbsp;
      <a
        href="https://github.com/talatkuyuk/next-mdx-remote-client-in-app-router"
        target="_blank"
      >
        source code
      </a>
      .
    </p>
  );
};

export default VisitGithub;
