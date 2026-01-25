'use client';

import Image from 'next/image';
import { FlatImage } from '@/data/flat-dto';

interface DesktopGalleryProps {
  images: FlatImage[];
  onOpen: (index: number) => void;
}

export function DesktopGallery({ images, onOpen }: DesktopGalleryProps) {
  return (
    <div className="hidden md:grid grid-cols-5 gap-2 h-105">
      {/* HERO */}
      <button className="relative col-span-4 h-full" onClick={() => onOpen(0)}>
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          className="object-cover rounded-l"
          priority
        />
      </button>

      {/* THUMBNAILS */}
      <div className="flex flex-col gap-2">
        {images.slice(1, 5).map((img, i) => {
          const isLast = i === 3 && images.length > 5;

          return (
            <button key={img.src} className="relative flex-1" onClick={() => onOpen(i + 1)}>
              <Image src={img.src} alt={img.alt} fill className="object-cover rounded-r" />

              {isLast && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">+{images.length - 5}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
