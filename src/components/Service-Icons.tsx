// src/components/Service-Icons.tsx

import type { ComponentType } from 'react';
import Image from 'next/image';
import { ShoppingBasket, Stethoscope, Coffee, Dumbbell } from 'lucide-react';
import { ServiceType } from '@/data/flat-dto';
import clsx from 'clsx';

/**
 * Custom Metro Bilbao PNG-based "icon". We keep the same API as Lucide icons:
 * accepts an optional `className` so the caller can pass Tailwind sizes (e.g., h-5 w-5).
 * Note: PNGs won't respond to text color classes; size classes still work.
 */
export const MetroBilbaoIcon = ({ className }: { className?: string }) => {
  return (
    <span className={clsx('relative inline-block h-5 w-5 align-middle', className)}>
      <Image
        src="/icons/MetroBilbao.png"
        alt="Metro Bilbao"
        fill
        sizes="20px"
        className="object-contain"
      />
    </span>
  );
};

export const ServiceIconMap: Record<ServiceType, ComponentType<{ className?: string }>> = {
  transporte: MetroBilbaoIcon,
  supermercado: ShoppingBasket,
  salud: Stethoscope,
  ocio: Coffee,
  sports: Dumbbell,
};

export const ServiceColorMap: Record<ServiceType, string> = {
  transporte: 'text-blue-600',
  supermercado: 'text-green-600',
  salud: 'text-red-600',
  ocio: 'text-amber-600',
  sports: 'text-emerald-600',
};

// Tailwind v3 default palette approximations for *-600 shades:
export const ServiceColorHexMap: Record<ServiceType, string> = {
  transporte: '#2563eb', // blue-600
  supermercado: '#16a34a', // green-600
  salud: '#dc2626', // red-600
  ocio: '#d97706', // amber-600
  sports: '#059669', // emerald-600
};
