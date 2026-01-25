'use client';

import { useState, useMemo } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import 'yet-another-react-lightbox/styles.css';

import { FlatImage } from '@/data/flat-dto';
import { DesktopGallery } from './DesktopGallery';
import { MobileGallery } from './MobileGallery';

interface GalleryProps {
  images: FlatImage[];
}

export function Gallery({ images }: GalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = useMemo(() => images.map((img) => ({ src: img.src, alt: img.alt })), [images]);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <section className="py-8">
      <DesktopGallery images={images} onOpen={openAt} />
      <MobileGallery images={images} onOpen={openAt} />

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom, Fullscreen]}
        labels={{
          Close: 'Cerrar',
          Next: 'Siguiente',
          Previous: 'Anterior',
          'Zoom in': 'Acercar',
          'Zoom out': 'Alejar',
          'Exit Fullscreen': 'Salir de pantalla completa',
        }}
      />
    </section>
  );
}
