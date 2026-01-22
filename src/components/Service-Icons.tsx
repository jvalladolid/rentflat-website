import { Train, ShoppingBasket, Stethoscope, Coffee, Dumbbell } from 'lucide-react';
import { ServiceType } from '@/data/flat-dto';

export const serviceIconMap: Record<ServiceType, React.ComponentType<{ className?: string }>> = {
  transporte: Train,
  supermercado: ShoppingBasket,
  salud: Stethoscope,
  ocio: Coffee,
  sports: Dumbbell,
};

export const serviceColorMap: Record<ServiceType, string> = {
  transporte: 'text-blue-600',
  supermercado: 'text-green-600',
  salud: 'text-red-600',
  ocio: 'text-amber-600',
  sports: 'text-emerald-600',
};

// Tailwind v3 default palette approximations for *-600 shades:
export const serviceColorHexMap: Record<ServiceType, string> = {
  transporte: '#2563eb', // blue-600
  supermercado: '#16a34a', // green-600
  salud: '#dc2626', // red-600
  ocio: '#d97706', // amber-600
  sports: '#059669', // emerald-600
};
