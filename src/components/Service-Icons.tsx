// src/components/Service-Icons.tsx

import type { ComponentType } from 'react';
import Image from 'next/image';
import { ShoppingCart, Coffee } from 'lucide-react';
import { ServiceType } from '@/data/flat-dto';
import clsx from 'clsx';

/**
 * Custom icons PNG-based "icon". We keep the same API as Lucide icons:
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

export const OsakidetzaIcon = ({ className }: { className?: string }) => {
  return (
    <span className={clsx('relative inline-block h-5 w-5 align-middle', className)}>
      <Image
        src="/icons/Osakidetza.png"
        alt="Osakidetza"
        fill
        sizes="20px"
        className="object-contain"
      />
    </span>
  );
};

export const PharmacyIcon = ({ className }: { className?: string }) => {
  return (
    <span className={clsx('relative inline-block h-5 w-5 align-middle', className)}>
      <Image
        src="/icons/Pharmacy.png"
        alt="Pharmacy"
        fill
        sizes="20px"
        className="object-contain"
      />
    </span>
  );
};

export const GymIcon = ({ className }: { className?: string }) => {
  return (
    <span className={clsx('relative inline-block h-5 w-5 align-middle', className)}>
      <Image src="/icons/Gym.png" alt="Gym" fill sizes="20px" className="object-contain" />
    </span>
  );
};

export const ServiceIconMap: Record<ServiceType, ComponentType<{ className?: string }>> = {
  transporte: MetroBilbaoIcon,
  supermercado: ShoppingCart,
  salud: OsakidetzaIcon,
  pharmacy: PharmacyIcon,
  ocio: Coffee,
  sports: GymIcon,
};

export const ServiceColorMap: Record<ServiceType, string> = {
  transporte: 'text-red-600',
  supermercado: 'text-green-600',
  salud: 'text-blue-600',
  pharmacy: 'text-darkgreen-600',
  ocio: 'text-amber-600',
  sports: 'text-red-600',
};

// Tailwind v3 default palette approximations for *-600 shades:
export const ServiceColorHexMap: Record<ServiceType, string> = {
  transporte: '#dc2626', // red-600
  supermercado: '#16a34a', // green-600
  salud: '#2563eb', // blue-600
  pharmacy: '#006400', // darkgreen-600
  ocio: '#d97706', // amber-600
  sports: '#dc2626', // red-600
};
