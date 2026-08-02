type SectionPlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionPlaceholder({
  eyebrow,
  title,
  description,
}: SectionPlaceholderProps) {
  return (
    <section className="page-intro">
      <p className="page-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-description">{description}</p>
    </section>
  );
}
