// src/components/Gallery.tsx

import Image from 'next/image';
import { FlatImage } from '@/data/flat-dto';

interface GalleryProps {
  images: FlatImage[];
}

export function Gallery({ images }: GalleryProps) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-4">Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((img, index) => (
          <div key={img.src} className="relative w-full h-64 overflow-hidden rounded">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>{' '}
    </section>
  );
}
