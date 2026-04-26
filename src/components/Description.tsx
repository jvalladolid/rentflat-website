// src/components/Description.tsx
interface DescriptionProps {
  description: string;
  features: string[];
}

export function Description({ description, features }: DescriptionProps) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-4">DESCRIPCIÓN</h2>
      <p className="mb-6">{description}</p>

      <ul className="list-disc pl-5 space-y-1">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        (*) Texto pendiente por definir.
      </p>
    </section>
  );
}
