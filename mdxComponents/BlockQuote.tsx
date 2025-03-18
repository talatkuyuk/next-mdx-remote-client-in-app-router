export default function BlockQuote(
  props: React.ComponentPropsWithoutRef<"blockquote">
) {
  const { children, ...rest } = props;

  return <blockquote {...rest}>{children}</blockquote>;
}
