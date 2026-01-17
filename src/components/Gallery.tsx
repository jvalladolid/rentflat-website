// src/components/Gallery.tsx

'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { FlatImage } from '@/data/flat-dto';

interface GalleryProps {
  images: FlatImage[];
}

export function Gallery({ images }: GalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const open = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close, next, prev]);

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-4">Gallery</h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((img, index) => (
          <button
            key={img.src}
            onClick={() => open(index)}
            className="relative w-full h-64 overflow-hidden rounded focus:outline-none"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={close}
        >
          <div className="relative w-full max-w-5xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              className="object-contain"
              priority
            />

            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 text-white text-3xl"
              aria-label="Close"
            >
              ×
            </button>

            {/* Navigation */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl"
              aria-label="Previous"
            >
              ‹
            </button>

            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
