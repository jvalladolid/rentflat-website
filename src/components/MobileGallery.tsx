'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './MobileGallery/MobileGallery.module.css';
import { FlatImage } from '@/data/flat-dto';

interface MobileGalleryProps {
  images: FlatImage[];
  onOpen: (index: number) => void;
}

export function MobileGallery({ images, onOpen }: MobileGalleryProps) {
  return (
    <div className="md:hidden">
      <Swiper
        spaceBetween={8}
        slidesPerView={1.15}
        centeredSlides={true}
        style={{ paddingLeft: '8vw', paddingRight: '8vw' }}
      >
        {images.map((img, i) => (
          <SwiperSlide key={img.src} style={{ width: '85vw', maxWidth: '400px' }}>
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
                sizes="85vw"
              />
              {/* Overlay for prev/next slides, styled in CSS */}
              <span
                className="mobile-gallery-overlay pointer-events-none absolute inset-0 rounded-lg"
                aria-hidden="true"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
