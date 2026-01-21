// src/components/MapSection.tsx
'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { NearbyService } from '@/data/flat-dto';
import { useEffect, useMemo } from 'react';
import L, { DivIcon } from 'leaflet';
import { serviceColorMap } from '@/components/Service-Icons';

/** Helper: fit the map to all marker positions */
function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (!positions.length) return;
    if (positions.length === 1) {
      map.setView(positions[0], 15);
      return;
    }
    const bounds = L.latLngBounds(positions);
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [map, positions]);
  return null;
}

/** HTML for our colored dot marker */
function iconHtml(color: string) {
  return `
    <span
      style="
        display:inline-block;width:14px;height:14px;border-radius:50%;
        background:${color};border:2px solid white;
        box-shadow:0 0 0 1px rgba(0,0,0,0.15);
      "
    ></span>
  `;
}

type MapSectionProps = { services: NearbyService[] };

export function MapSection({ services }: MapSectionProps) {
  // 1) Compute filtered services (has coordinates)
  const servicesWithLocation = useMemo(
    () =>
      (services ?? []).filter(
        (s) => typeof s?.location?.lat === 'number' && typeof s?.location?.lng === 'number',
      ),
    [services],
  );

  // 2) Positions for bounds
  const positions = useMemo<[number, number][]>(() => {
    return servicesWithLocation.map((s) => [s.location!.lat, s.location!.lng]);
  }, [servicesWithLocation]);

  // 3) Memoized icon cache (SAFE during render)
  const iconsByColor = useMemo(() => {
    const map = new Map<string, DivIcon>();

    for (const service of servicesWithLocation) {
      const color = serviceColorMap[service.type] ?? '#2563eb';
      if (!map.has(color)) {
        map.set(
          color,
          L.divIcon({
            className: 'custom-div-icon',
            html: iconHtml(color),
            iconSize: [14, 14],
            iconAnchor: [7, 7],
            popupAnchor: [0, -8],
          }),
        );
      }
    }

    return map;
  }, [servicesWithLocation]);

  // 4) Now it's safe to early-return
  if (positions.length === 0) {
    return (
      <div className="rounded-lg border p-4 text-sm text-muted-foreground">
        Mapa no disponible para esta localización aún.
      </div>
    );
  }

  // 5) Initial center (FitBounds will adjust anyway)
  const initialCenter = positions[0];

  // 6) Map Render
  return (
    <div className="rounded-lg overflow-hidden border">
      <MapContainer
        center={initialCenter}
        zoom={14}
        style={{ height: 360, width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds positions={positions} />

        {servicesWithLocation.map((service) => {
          const { lat, lng } = service.location!;
          const color = serviceColorMap[service.type] ?? '#2563eb';
          const icon = iconsByColor.get(color)!;

          return (
            <Marker
              key={service.id ?? `${service.type}-${service.name}-${lat}-${lng}`}
              position={[lat, lng]}
              icon={icon}
            >
              <Popup>
                <div className="font-medium">{service.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Tipo: {service.type}
                  {service.travelTimes?.length
                    ? service.travelTimes.map((t, i) => (
                        <div key={i}>
                          {t.mode === 'walking' ? '🚶 Andando' : '🚇 Transporte público'} ·{' '}
                          {t.minutes} min
                        </div>
                      ))
                    : null}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
