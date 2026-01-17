// src/components/Gallery.tsx
import { FlatImage } from '@/data/flat-dto';

interface GalleryProps {
  images: FlatImage[];
}

export function Gallery({ images }: GalleryProps) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-4">Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((img) => (
          <div key={img.src} className="bg-gray-200 h-64">
            {/* Image placeholder for now */}
            <span className="text-gray-500">{img.alt}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
