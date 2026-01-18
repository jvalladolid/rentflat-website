// src/components/MapSection.tsx

'use client';

import dynamic from 'next/dynamic';
import { NearbyService } from '@/data/flat-dto';
import { serviceIconMap, serviceColorMap } from '@/components/Service-Icons';

const LeafletMap = dynamic(() => import('@/components/LeafletMap'), { ssr: false });

type Props = {
  services: NearbyService[];
};

export default function MapSection({ services }: Props) {
  const hasMap = services.some((s) => s.location?.lat && s.location?.lng);

  return (
    <section className="space-y-6">
      {hasMap ? (
        <LeafletMap services={services} />
      ) : (
        <div className="rounded-lg bg-gray-100 p-6 text-center text-gray-600">
          Map not available for this location yet.
        </div>
      )}

      {/* services list (unchanged) */}
    </section>
  );
}
