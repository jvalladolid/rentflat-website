// src/components/MapSection.tsx

'use client';

import dynamic from 'next/dynamic';
import { NearbyService } from '@/data/flat-dto';
import { serviceIconMap, serviceColorMap } from '@/components/Service-Icons';

const LeafletMap = dynamic(() => import('@/components/LeafletMap'), { ssr: false });

type Props = {
  services: NearbyService[];
};

export function MapSection({ services }: Props) {
  const hasMap = services.some((s) => s.location?.lat && s.location?.lng);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">SERVICIOS EN LA ZONA</h2>
      {hasMap ? (
        <LeafletMap services={services} />
      ) : (
        <div className="rounded-lg bg-gray-100 p-6 text-center text-gray-600">
          Mapa no disponible para esta localización aún.
        </div>
      )}

      {/* services list (unchanged) */}
    </section>
  );
}
