// src/app/page.tsx

import { flat } from '@/data/flat-trav-iturribide';
import { Hero } from '@/components/Hero';
import { Gallery } from '@/components/Gallery';
import { Description } from '@/components/Description';
import { Neighborhood } from '@/components/Neighborhood';

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6">
      <Hero flat={flat} />
      <Gallery images={flat.images} />
      <Description description={flat.description} features={flat.features} />
      <Neighborhood
        services={flat.nearbyServices}
        approximateArea={flat.location.approximateArea}
      />
    </main>
  );
}
