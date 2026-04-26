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
        <strong>(*) Condiciones económicas y gastos adicionales</strong>
        <br />
        El precio ofertado corresponde a la renta mensual. Los gastos de suministros de la vivienda
        (luz, agua, gas), correrán a cargo de la parte arrendataria según su consumo, así como los
        recibos de ibi, comunidad (75 €/mes) y la tasa de residuos.
      </p>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        La renta mensual está compuesta por el valor que le corresponde atendiendo al índice de
        referencia de acuerdo a la normativa vigente, que se situa en los 935,26 €/mes, más el coste
        de la conexión a Internet de alta velocidad.
        <br />
        Se informa de que sobre esta vivienda no ha estado vigente ningún contrato de arrendamiento
        habitual en los últimos 5 años.
      </p>
    </section>
  );
}
