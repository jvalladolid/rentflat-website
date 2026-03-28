'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FlatImage } from '@/data/flat-dto';

interface MobileGalleryProps {
  images: FlatImage[];
  onOpen: (index: number) => void;
}

export function MobileGallery({ images, onOpen }: MobileGalleryProps) {
  return (
    <div className="md:hidden">
      <Swiper spaceBetween={8} slidesPerView={1}>
        {images.map((img, i) => (
          <SwiperSlide key={img.src}>
            <button
              type="button"
              onClick={() => onOpen(i)}
              className="relative w-full aspect-4/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Ampliar imagen"
              aria-label="Ampliar imagen"
            >
              <Image
                src={img.src}
                alt={img.alt || `Imagen ${i + 1}`}
                fill
                className="object-cover rounded-lg"
                sizes="100vw"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
