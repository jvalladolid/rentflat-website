// src/components/Hero.tsx
import { Flat } from '@/data/flat-dto';

interface HeroProps {
  flat: Flat;
}

export function Hero({ flat }: HeroProps) {
  return (
    <header className="py-8 space-y-4 border-b border-gray-200">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{flat.title}</h1>

      {/* Subtitle + Location */}
      {flat.subtitle && (
        <p className="text-gray-600 text-lg">
          {flat.subtitle} - {flat.location.area}, {flat.location.city}
        </p>
      )}

      {/* Price */}
      <div className="flex items-end gap-2">
        <span className="text-3xl md:text-4xl font-semibold text-blue-700">{flat.price}</span>
        <span className="text-gray-500 text-base">€/mes</span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 pt-2">
        <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-sm font-medium">
          {flat.numberOfRooms} hab.
        </span>
        <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 text-sm font-medium">
          {flat.surfaceM2} m²
        </span>
        <span className="px-3 py-1 rounded-md bg-amber-50 text-amber-700 text-sm font-medium">
          {flat.floorDesc}
        </span>
      </div>
    </header>
  );
}
