// src/app/page.tsx
import { flat } from '@/data/flat-trav-iturribide';
import { Hero } from '@/components/Hero';
import { Gallery } from '@/components/Gallery';
import { Description } from '@/components/Description';
import { Neighborhood } from '@/components/Neighborhood';
import { MenuSection } from '@/components/MenuSection';

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6">
      <MenuSection /> {/* overlay; doesn't push content */}
      <section id="hero">
        <Hero flat={flat} />
      </section>
      <section id="gallery">
        <Gallery images={flat.images} />
      </section>
      <section id="description">
        <Description description={flat.description} features={flat.features} />
      </section>
      <section id="neighborhood">
        <Neighborhood
          services={flat.nearbyServices}
          approximateArea={flat.location.approximateArea}
        />
      </section>
    </main>
  );
}
