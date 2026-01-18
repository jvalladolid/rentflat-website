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
