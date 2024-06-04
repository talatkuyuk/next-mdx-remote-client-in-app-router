export default function Hello({ name }: { name: string }) {
  return (
    <p className="hello-content" style={{ color: "var(--primary)" }}>
      Hello {name}
    </p>
  );
}
