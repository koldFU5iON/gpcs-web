// JSON-LD is serialised from static server-side objects only — no user input reaches this component.
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }} // safe: static objects, no user input
    />
  );
}
