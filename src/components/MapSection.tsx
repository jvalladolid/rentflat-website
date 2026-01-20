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
        <MapContainer
          center={mapCenter as [number, number]}
          zoom={15}
          scrollWheelZoom={true}
          className="h-80 w-full rounded-lg"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* 4️⃣ SERVICE MARKERS ONLY */}
          {servicesWithLocation.map((service) => (
            <Marker key={service.id} position={[service.location!.lat, service.location!.lng]}>
              <Popup>
                <strong>{service.name}</strong>
                <br />
                {service.type}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
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
