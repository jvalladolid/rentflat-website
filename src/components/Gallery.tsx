// src/components/Gallery.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { FlatImage } from '@/data/flat-dto';

import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

interface GalleryProps {
  images: FlatImage[];
}

/** Type guards for legacy MediaQueryList methods without using `any`. */
function hasAddEvent(mq: MediaQueryList): mq is MediaQueryList & {
  addEventListener: (type: 'change', listener: (e: MediaQueryListEvent) => void) => void;
} {
  return typeof mq.addEventListener === 'function';
}

function hasRemoveEvent(mq: MediaQueryList): mq is MediaQueryList & {
  removeEventListener: (type: 'change', listener: (e: MediaQueryListEvent) => void) => void;
} {
  return typeof mq.removeEventListener === 'function';
}

function hasLegacyAdd(mq: MediaQueryList): mq is MediaQueryList & {
  addListener: (listener: (e: MediaQueryListEvent) => void) => void;
} {
  return 'addListener' in mq && typeof (mq as { addListener?: unknown }).addListener === 'function';
}

function hasLegacyRemove(mq: MediaQueryList): mq is MediaQueryList & {
  removeListener: (listener: (e: MediaQueryListEvent) => void) => void;
} {
  return (
    'removeListener' in mq &&
    typeof (mq as { removeListener?: unknown }).removeListener === 'function'
  );
}

function addMQListener(mq: MediaQueryList, handler: (e: MediaQueryListEvent) => void) {
  if (hasAddEvent(mq)) {
    mq.addEventListener('change', handler);
  } else if (hasLegacyAdd(mq)) {
    mq.addListener(handler);
  }
}

function removeMQListener(mq: MediaQueryList, handler: (e: MediaQueryListEvent) => void) {
  if (hasRemoveEvent(mq)) {
    mq.removeEventListener('change', handler);
  } else if (hasLegacyRemove(mq)) {
    mq.removeListener(handler);
  }
}

/**
 * Detect Tailwind's md breakpoint (>=768px) to switch tile counts:
 * - mobile: 2x2 (show 4)
 * - md+: 3 across (show 3)
 */
function useIsMdUp() {
  const getIsMdUp = () =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;

  // Initialize BEFORE the effect runs (prevents setState in effect)
  const [isMdUp, setIsMdUp] = useState<boolean>(getIsMdUp);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => setIsMdUp(e.matches);

    // Subscribe only (no initial setState here)
    addMQListener(mq, onChange);
    return () => removeMQListener(mq, onChange);
  }, []);

  return isMdUp;
}

export function Gallery({ images }: GalleryProps) {
  const isMdUp = useIsMdUp();

  // Visible tiles: 4 on mobile (2x2), 3 on md+ (3 across)
  const visibleCount = isMdUp ? 3 : 4;

  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  // Prepare slides for the lightbox
  const slides = useMemo(
    () =>
      images.map((img) => ({
        src: img.src,
        alt: img.alt,
        description: img.alt, // Captions plugin reads this
        // width, height // optional if known to avoid layout shift
      })),
    [images],
  );

  const maxToShow = Math.min(visibleCount, images.length);
  const remaining = images.length - maxToShow;

  const openAt = (index: number) => {
    setStartIndex(index);
    setIsOpen(true);
  };

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-4">GALERÍA DE IMÁGENES</h2>

      {/* Grid: 2×2 on mobile, 3-across on md+ */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.slice(0, maxToShow).map((img, index) => {
          const isOverflowTile = remaining > 0 && index === maxToShow - 1;

          return (
            <button
              key={img.src}
              onClick={() => openAt(index)}
              className="relative w-full aspect-square overflow-hidden rounded focus:outline-none group"
              aria-label={isOverflowTile ? `Ver +${remaining} imágenes` : img.alt}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, (min-width: 768px) 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority={index === 0}
              />

              {/* Semi-transparent +N overlay on the last visible tile */}
              {isOverflowTile && (
                <div
                  className="absolute inset-0 bg-black/50 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="text-white text-xl font-semibold">+{remaining}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={slides}
          index={startIndex}
          plugins={[Captions, Zoom]}
          controller={{ closeOnBackdropClick: true }}
          animation={{ fade: 250 }}
          carousel={{ finite: false }} // loop through images
        />
      )}
    </section>
  );
}
