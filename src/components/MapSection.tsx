// src/components/MapSection.tsx

'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { NearbyService } from '@/data/flat-dto';
import { useEffect, useMemo } from 'react';
import L from 'leaflet';
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

/** Small colored dot as a DivIcon (SVG circle) */
function iconHtml(color: string) {
  const size = 14;
  const radius = 6;
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size / 2}" cy="${
    size / 2
  }" r="${radius}" fill="${color}" stroke="white" stroke-width="2"/>
    </svg>
  `;
}

type MapSectionProps = { services: NearbyService[] };

export function MapSection({ services }: MapSectionProps) {
  // 1) Filter services that have coordinates
  const servicesWithLocation = useMemo(
    () =>
      (services ?? []).filter(
        (s) => typeof s?.location?.lat === 'number' && typeof s?.location?.lng === 'number',
      ),
    [services],
  );

  // 2) Compute positions regardless of count (HOOKS MUST BE UNCONDITIONAL)
  const positions = useMemo<[number, number][]>(() => {
    return servicesWithLocation.map((s) => [s.location!.lat, s.location!.lng]);
  }, [servicesWithLocation]);

  // 3) Cache DivIcons by color (also unconditional)
  const iconsByColor = useMemo(() => {
    const map = new Map<string, L.DivIcon>();
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

  // 4) Initial center (safe because servicesWithLocation may be empty; we only use it if >0)
  const initialCenter = positions[0] ?? [43.263, -2.935]; // fallback center (Bilbao)

  // 5) Render: branch inside JSX, not before hooks
  return (
    <div style={{ height: 360, width: '100%' }}>
      {servicesWithLocation.length === 0 ? (
        <div>Mapa no disponible para esta localización aún.</div>
      ) : (
        <MapContainer
          center={initialCenter as [number, number]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Fit to markers */}
          <FitBounds positions={positions} />

          {/* Markers */}
          {servicesWithLocation.map((service) => {
            const { lat, lng } = service.location!;
            const color = serviceColorMap[service.type] ?? '#2563eb';
            const icon = iconsByColor.get(color)!;

            return (
              <Marker key={`${service.id}-${lat}-${lng}`} position={[lat, lng]} icon={icon}>
                <Popup>
                  <strong>{service.name}</strong>
                  <div>Tipo: {service.type}</div>
                  {service.travelTimes?.length ? (
                    <ul style={{ paddingLeft: 16, margin: '6px 0 0' }}>
                      {service.travelTimes.map((t, i) => (
                        <li key={i}>
                          {t.mode === 'walking' ? '🚶 Andando' : '🚇 Transporte público'} ·{' '}
                          {t.minutes} min
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      )}
    </div>
  );
}
