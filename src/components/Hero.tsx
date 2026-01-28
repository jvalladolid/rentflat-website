// src/components/Hero.tsx
import * as React from 'react';
import { Flat } from '@/data/flat-dto';

// ---- Small Badge component (declared OUTSIDE of render) ----
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
  const priceValue = flat.price;
  const formattedPrice = (() => {
    if (typeof priceValue === 'number') {
      return `${priceValue.toLocaleString('es-ES', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        useGrouping: true,
      })} €/mes`;
    }
    const n = Number(priceValue);
    if (!Number.isNaN(n)) {
      return `${n.toLocaleString('es-ES', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        useGrouping: true,
      })} €/mes`;
    }
    // Non-numeric string → show as-is with suffix
    return `${priceValue} €/mes`;
  })();

  return (
    <header className="relative" aria-labelledby="listing-title">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div
          className="
            grid items-center gap-8 lg:gap-12 md:grid-cols-2
            rounded-3xl p-4 md:p-6 lg:p-8
            bg-white/70 dark:bg-white/5
            backdrop-blur-xl
            ring-1 ring-black/10
            shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)]
          "
        >
          {/* LEFT COLUMN — Content */}
          <div className="order-2 md:order-1">
            {/* Location (eyebrow) */}
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {flat.location?.area}, {flat.location?.city}
            </p>

            {/* Title */}
            <h1
              id="listing-title"
              className="mt-2 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white"
            >
              {flat.title}
            </h1>

            {/* Subtitle */}
            {flat.subtitle && (
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {flat.subtitle}
              </p>
            )}

            {/* Price */}
            <div className="mt-6 flex items-end gap-3">
              <span className="text-4xl lg:text-5xl font-semibold text-blue-700 dark:text-blue-400">
                {formattedPrice}
              </span>
            </div>

            {/* Badges */}
            <ul className="mt-4 flex flex-wrap gap-2" role="list" aria-label="Property key details">
              <li>
                <Badge color="blue">{flat.numberOfRooms} rooms</Badge>
              </li>
              <li>
                <Badge color="green">{flat.surfaceM2} m²</Badge>
              </li>
              <li>
                <Badge color="amber">{flat.floorDesc}</Badge>
              </li>
            </ul>
          </div>

          {/* RIGHT COLUMN — Visual */}
          <div className="order-1 md:order-2 relative">
            <figure
              className="
                relative overflow-hidden rounded-2xl
                aspect-16/10 md:aspect-4/3
                ring-1 ring-black/10
                shadow-2xl
                group
              "
            >
              {/* Ambient gradient / pattern fallback */}
              <div
                className="
                  absolute inset-0
                  bg-linear-to-br from-indigo-100 via-white to-blue-100
                  dark:from-slate-800 dark:via-slate-900 dark:to-blue-950
                "
                aria-hidden
              />
              {/* Soft pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none"
                aria-hidden
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)',
                  backgroundSize: '14px 14px',
                }}
              />

              {/* Legibility gradient */}
              <div
                className="
                  absolute inset-x-0 bottom-0 h-1/3
                  bg-linear-to-t from-black/40 via-black/10 to-transparent
                "
                aria-hidden
              />

              {/* Floating chips on image (optional) */}
              <figcaption className="absolute left-4 bottom-4 flex gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/85 text-gray-800 ring-1 ring-black/10">
                  Verified listing
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/85 text-gray-800 ring-1 ring-black/10">
                  Great location
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </header>
  );
}
