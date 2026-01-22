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

const iconCache = new Map<string, L.Icon>();

function iconForHex(hex: string): L.Icon {
  const cached = iconCache.get(hex);
  if (cached) return cached;

  // Map hex colors to file names
  const hexToFile: Record<string, string> = {
    '#2563eb': 'marker-icon-blue.png',
    '#16a34a': 'marker-icon-green.png',
    '#dc2626': 'marker-icon-red.png',
    '#d97706': 'marker-icon-amber.png',
    '#059669': 'marker-icon-emerald.png',
  };

  const base = hexToFile[hex] ?? 'marker-icon-blue.png';

  const icon = new L.Icon({
    iconRetinaUrl: `/leaflet/${base.replace('.png', '-2x.png')}`,
    iconUrl: `/leaflet/${base}`,
    shadowUrl: '/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  iconCache.set(hex, icon);
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
            const hex = serviceColorHexMap[service.type] ?? '#2563eb';
            const icon = iconForHex(hex);

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
