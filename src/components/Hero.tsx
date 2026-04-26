// src/components/Hero.tsx
import * as React from 'react';
import { Flat } from '@/data/flat-dto';

// ---- Small Badge component (declared OUTSIDE of render to satisfy lint rule) ----
type BadgeColor = 'blue' | 'green' | 'amber';

const paletteByColor: Record<BadgeColor, string> = {
  blue: 'bg-blue-50 text-blue-700',
  green: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
};

const Badge: React.FC<React.PropsWithChildren<{ color?: BadgeColor }>> = ({
  color = 'blue',
  children,
}) => (
  <span
    className={`px-3 py-1 rounded-md text-sm font-medium ${paletteByColor[color]} ring-1 ring-black/5`}
  >
    {children}
  </span>
);

interface HeroProps {
  flat: Flat;
}

export function Hero({ flat }: HeroProps) {
  // ---- Price formatting: "1.200 €/mes" or "1.340,5 €/mes"
  // - es-ES locale gives thousands '.' and decimals ','
  // - Up to 2 decimals if present, no unnecessary trailing zeros
  const priceValue = flat.price as number | string;
  const formattedNumeric = (() => {
    if (typeof priceValue === 'number') {
      return priceValue.toLocaleString('es-ES', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        useGrouping: true,
      });
    }
    const n = Number(priceValue);
    if (!Number.isNaN(n)) {
      return n.toLocaleString('es-ES', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        useGrouping: true,
      });
    }
    // Non-numeric string → show as-is (keeps your own formatting if present)
    return String(priceValue);
  })();

  const floorDesc = flat.floorDesc ?? '';

  return (
    <header className="relative" aria-labelledby="listing-title">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Removed card styles: no bg, no blur, no ring, no shadow, no rounded */}
        <div className="py-6 md:py-8 lg:py-10 space-y-4">
          {/* Location (eyebrow) */}
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {flat.location?.area}, {flat.location?.city}
          </p>

          {/* Title */}
          <h1
            id="listing-title"
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white"
          >
            {flat.title}
          </h1>

          {/* Subtitle */}
          {flat.subtitle && (
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {flat.subtitle}
            </p>
          )}

          {/* Price: main number bold, €/mes smaller & softer */}
          <div className="pt-2 flex items-end gap-2">
            <span className="text-4xl lg:text-5xl font-semibold text-blue-700 dark:text-blue-400">
              {formattedNumeric}
            </span>
            <span className="text-base md:text-lg text-gray-500 dark:text-gray-400">
              €/mes (*)
            </span>
          </div>

          {/* Badges */}
          <ul className="flex flex-wrap gap-2 pt-2" role="list" aria-label="Property key details">
            <li>
              <Badge color="blue">{flat.numberOfRooms} hab</Badge>
            </li>
            <li>
              <Badge color="green">{flat.surfaceM2} m²</Badge>
            </li>
            <li>
              <Badge color="amber">{floorDesc}</Badge>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
