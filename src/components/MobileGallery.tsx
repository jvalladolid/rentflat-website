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
      <Swiper spaceBetween={8} slidesPerView={1.1}>
        {images.map((img, i) => (
          <SwiperSlide key={img.src}>
            <button className="relative aspect-4/3 w-full" onClick={() => onOpen(i)}>
              <Image src={img.src} alt={img.alt} fill className="object-cover rounded" />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
