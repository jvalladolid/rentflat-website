// src/components/MapSection.tsx

'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { NearbyService } from '@/data/flat-dto';
import { useEffect, useMemo } from 'react';
import L from 'leaflet';
import { serviceColorHexMap } from '@/components/Service-Icons';

/** ---- Configure Leaflet default icon paths (Next.js friendly) ---- */

const defaultIcon = new L.Icon.Default({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

L.Marker.prototype.options.icon = defaultIcon;

// SVG pin template (Leaflet-like)
function svgPin(color: string) {
  return `
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 22 12.5 41 12.5 41C12.5 41 25 22 25 12.5C25 5.6 19.4 0 12.5 0Z"
            fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="12.5" cy="12" r="4.5" fill="white"/>
    </svg>
  `;
}

const divIconCache = new Map<string, L.DivIcon>();
function divIconForColor(color: string) {
  const cached = divIconCache.get(color);
  if (cached) return cached;

  const icon = L.divIcon({
    className: 'custom-pin',
    html: svgPin(color),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  divIconCache.set(color, icon);
  return icon;
}

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

  // 2) Positions for bounds (unconditional hooks)
  const positions = useMemo<[number, number][]>(() => {
    return servicesWithLocation.map((s) => [s.location!.lat, s.location!.lng]);
  }, [servicesWithLocation]);

  // 3) Initial center (fallback used only if empty)
  const initialCenter = positions[0] ?? [43.263, -2.935]; // Bilbao

  return (
    <div style={{ height: 360, width: '100%' }}>
      {servicesWithLocation.length === 0 ? (
        <div>Mapa no disponible para esta localización aún.</div>
      ) : (
        <MapContainer
          center={initialCenter as [number, number]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Fit to markers */}
          <FitBounds positions={positions} />

          {/* Markers: use the default Leaflet pin (no custom icon prop) */}
          {servicesWithLocation.map((service) => {
            const { lat, lng } = service.location!;
            const color = serviceColorHexMap[service.type] ?? '#2563eb';
            const icon = divIconForColor(color);

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
