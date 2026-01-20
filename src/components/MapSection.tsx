// src/components/MapSection.tsx

'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { NearbyService } from '@/data/flat-dto';

type MapSectionProps = {
  services: NearbyService[];
};

export function MapSection({ services }: MapSectionProps) {
  /**
   * 1️⃣ Filter only services that have coordinates
   *    (we do NOT care about the flat location at all)
   */
  const servicesWithLocation = services.filter((s) => s.location?.lat && s.location?.lng);

  /**
   * 2️⃣ Choose map center
   *    Simple + UX-safe: first service
   */
  const mapCenter =
    servicesWithLocation.length > 0
      ? [servicesWithLocation[0].location!.lat, servicesWithLocation[0].location!.lng]
      : null;

  return (
    <section className="space-y-6">
      {/* ===================== */}
      {/* 3️⃣ MAP (optional) */}
      {/* ===================== */}

      {mapCenter ? (
        <div></div>
      ) : (
        /**
         * 5️⃣ UX FALLBACK (no coordinates)
         */
        <div className="rounded-lg bg-gray-100 p-6 text-center text-gray-600">
          Mapa no disponible para esta localización aún.
        </div>
      )}
    </section>
  );
}
