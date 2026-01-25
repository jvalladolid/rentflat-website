// src/components/MapSection.tsx

'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { NearbyService, ApproxArea } from '@/data/flat-dto';
import { useEffect, useMemo } from 'react';
import { Circle, Rectangle, Polygon } from 'react-leaflet';
import L, { LatLngBoundsExpression, LatLngTuple } from 'leaflet';
import { ServiceColorHexMap } from '@/components/Service-Icons';

/** ---- Configure Leaflet default icon paths (Next.js friendly) ---- */
const defaultIcon = new L.Icon.Default({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

L.Marker.prototype.options.icon = defaultIcon;

/** ---- Icons for the Popup ---- */
const WALKING_ICON_SRC = '/icons/Andando.png';
const METRO_ICON_SRC = '/icons/MetroBilbao.png';

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

function boundsOfApproxArea(area: ApproxArea): L.LatLngBounds {
  if (area.kind === 'circle') {
    const { center, radiusMeters } = area;
    // Build a temporary circle to read its bounds
    return L.latLng(center.lat, center.lng).toBounds(radiusMeters);
  }
  if (area.kind === 'rectangle') {
    return L.latLngBounds(area.bounds);
  }
  // polygon
  const ring = area.coordinates.map(([lat, lng]) => L.latLng(lat, lng));
  return L.latLngBounds(ring);
}

function FitToArea({ area }: { area: ApproxArea }) {
  const map = useMap();
  useEffect(() => {
    const b = boundsOfApproxArea(area);
    map.fitBounds(b, { padding: [140, 80] });
  }, [map, area]);
  return null;
}

type MapSectionProps = {
  services: NearbyService[];
  approximateArea: ApproxArea;
};

export function MapSection({ services, approximateArea }: MapSectionProps) {
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

          {/* Approximate area */}
          {approximateArea && (
            <>
              <FitToArea area={approximateArea} />

              {approximateArea.kind === 'circle' && (
                <Circle
                  center={[approximateArea.center.lat, approximateArea.center.lng] as LatLngTuple}
                  radius={approximateArea.radiusMeters}
                  pathOptions={{ color: '#2563eb', fillColor: '#60a5fa', fillOpacity: 0.25 }}
                />
              )}

              {approximateArea.kind === 'rectangle' && (
                <Rectangle
                  bounds={approximateArea.bounds as LatLngBoundsExpression}
                  pathOptions={{ color: '#2563eb', fillColor: '#60a5fa', fillOpacity: 0.2 }}
                />
              )}

              {approximateArea.kind === 'polygon' && (
                <Polygon
                  positions={approximateArea.coordinates as LatLngTuple[]}
                  pathOptions={{ color: '#2563eb', fillColor: '#60a5fa', fillOpacity: 0.2 }}
                />
              )}
            </>
          )}

          {/* Markers: use the default Leaflet pin (no custom icon prop) */}
          {servicesWithLocation.map((service) => {
            const { lat, lng } = service.location!;
            const color = ServiceColorHexMap[service.type] ?? '#2563eb';
            const icon = divIconForColor(color);

            return (
              <Marker key={`${service.id}-${lat}-${lng}`} position={[lat, lng]} icon={icon}>
                <Popup>
                  <strong>{service.name}</strong>
                  <div>Tipo: {service.type}</div>
                  {service.travelTimes?.length ? (
                    <ul style={{ paddingLeft: 16, margin: '6px 0 0' }}>
                      {service.travelTimes.map((t, i) => (
                        <li
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={t.mode === 'walking' ? WALKING_ICON_SRC : METRO_ICON_SRC}
                            alt={t.mode === 'walking' ? 'Andando' : 'Transporte público'}
                            width={14}
                            height={14}
                            style={{ opacity: 0.9 }}
                          />
                          <span>
                            {t.mode === 'walking' ? 'Andando' : 'Transporte público'} · {t.minutes}{' '}
                            min
                          </span>
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
