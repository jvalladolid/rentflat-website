// src/components/MapSection.tsx

'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { NearbyService } from '@/data/flat-dto';
import { serviceIconMap, serviceColorMap } from '@/components/Service-Icons';

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

      {/* ===================== */}
      {/* 6️⃣ SERVICES LIST */}
      {/* ===================== */}

      <ul className="space-y-4">
        {services.map((service) => {
          const Icon = serviceIconMap[service.type];

          return (
            <li key={service.id} className="flex items-start gap-3">
              {/* ✅ THIS IS WHERE YOUR ICON LINE GOES */}
              <Icon className={`w-5 h-5 mt-1 ${serviceColorMap[service.type]} opacity-90`} />

              <div>
                <strong>{service.name}</strong>

                <div className="text-sm text-gray-600">
                  {service.travelTimes.map((t) => (
                    <span key={t.mode} className="mr-3">
                      {t.mode === 'walking' ? 'Walking' : 'Public transport'} · {t.minutes} min
                    </span>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
