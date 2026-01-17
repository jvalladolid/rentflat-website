// src/components/Hero.tsx
import { Flat } from '@/data/flat-dto';

interface HeroProps {
  flat: Flat;
}

export function Hero({ flat }: HeroProps) {
  return (
    <section className="py-12">
      <h1 className="text-3xl font-bold">{flat.title}</h1>
      {flat.subtitle && <p className="mt-2 text-gray-600">{flat.subtitle}</p>}
      <p className="mt-4 text-xl font-semibold">{flat.price}</p>
      <p className="mt-1 text-gray-500">
        {flat.location.area}, {flat.location.city}
      </p>
    </section>
  );
}
