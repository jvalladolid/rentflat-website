'use client';

import Image from 'next/image';
import { FlatImage } from '@/data/flat-dto';

interface DesktopGalleryProps {
  images: FlatImage[];
  onOpen: (index: number) => void;
}

export function DesktopGallery({ images, onOpen }: DesktopGalleryProps) {
  return (
    <div className="hidden md:grid gap-3 grid-cols-4 auto-rows-[120px]">
      {/* HERO */}
      <button
        type="button"
        onClick={() => onOpen(0)}
        className="relative col-span-2 row-span-2 group focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Abrir galería en pantalla completa"
        aria-label="Abrir galería en pantalla completa"
      >
        <Image
          src={images[0].src}
          alt={images[0].alt || 'Imagen principal'}
          fill
          className="object-cover rounded-lg"
          sizes="(min-width: 768px) 50vw, 100vw"
          priority
        />
        <span className="sr-only">Abrir galería</span>
      </button>

      {/* THUMBNAILS */}
      {images.slice(1, 5).map((img, i) => {
        const isLast = i === 3 && images.length > 5;
        const idx = i + 1;

        return (
          <button
            key={img.src}
            type="button"
            onClick={() => onOpen(idx)}
            className="relative group focus:outline-none focus:ring-2 focus:ring-blue-500"
            title={isLast ? 'Ver todas las fotos' : 'Ampliar imagen'}
            aria-label={isLast ? 'Ver todas las fotos' : 'Ampliar imagen'}
          >
            <Image
              src={img.src}
              alt={img.alt || `Imagen ${idx + 1}`}
              fill
              className="object-cover rounded-lg"
              sizes="(min-width: 768px) 25vw, 100vw"
            />

            {isLast && (
              <>
                {/* capa oscura + contador en español */}
                <span aria-hidden="true" className="absolute inset-0 bg-black/35 rounded-lg" />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center text-white font-medium"
                >
                  +{images.length - 5}
                </span>
                <span className="sr-only">Ver todas las fotos</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
