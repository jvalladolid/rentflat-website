// src/app/page.tsx

import { flat } from '@/data/flat-trav-iturribide';
import { Hero } from '@/components/Hero';
import { Gallery } from '@/components/Gallery';
import { Description } from '@/components/Description';
import { Neighborhood } from '@/components/Neighborhood';
import { MenuSection } from '@/components/MenuSection';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: flat.title,
  description: flat.description,
  openGraph: {
    title: flat.title,
    description: flat.description,
    type: 'website',
    locale: 'es_ES',
    url: 'https://yourdomain.com/',
    images: [
      {
        url: flat.images[0]?.src || '',
        alt: flat.images[0]?.alt || flat.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: flat.title,
    description: flat.description,
    images: [flat.images[0]?.src || ''],
  },
  alternates: {
    canonical: 'https://yourdomain.com/',
  },
};

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6">
      <MenuSection /> {/* overlay; doesn't push content */}
      <section id="hero">
        {/* h1 is rendered in Hero */}
        <Hero flat={flat} />
      </section>
      <section id="gallery">
        <h2 className="text-xl font-bold mb-4">GALERÍA</h2>
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
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Apartment',
            name: flat.title,
            description: flat.description,
            address: {
              '@type': 'PostalAddress',
              addressLocality: flat.location.city,
              addressRegion: 'Bizkaia',
              addressCountry: 'ES',
            },
            numberOfRooms: flat.numberOfRooms,
            floorLevel: flat.floorDesc,
            url: 'https://yourdomain.com/',
            image: flat.images.map((img) => ({ url: img.src, alt: img.alt })),
            offers: {
              '@type': 'Offer',
              price: flat.price,
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer service',
              url: 'https://wa.me/message/T7MRHP2DZ2VJD1',
            },
          }),
        }}
      />
    </main>
  );
}
