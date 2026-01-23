// src/components/MapSection.tsx

'use client';

import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
  Rectangle,
  Polygon,
} from 'react-leaflet';
import type { NearbyService, ApproxArea } from '@/data/flat-dto';
import { useEffect, useMemo, useRef } from 'react';
import L, { LeafletEvent } from 'leaflet';
import { serviceColorHexMap } from '@/components/Service-Icons';

/** ---- Configure Leaflet default icon paths (Next.js friendly) ---- */
const defaultIcon = new L.Icon.Default({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

L.Marker.prototype.options.icon = defaultIcon;

// SVG icon for marker
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
  if (divIconCache.has(color)) return divIconCache.get(color)!;

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

function FitToBounds({
  bounds,
  padding = [100, 100] as [number, number],
}: {
  bounds: L.LatLngBounds;
  padding?: [number, number];
}) {
  const map = useMap();

  useEffect(() => {
    if (!bounds || !bounds.isValid()) return;

    map.whenReady(() => {
      map.fitBounds(bounds, { padding });
    });
  }, [map, bounds, padding]);

  return null;
}

function SetMapRef({ onReady }: { onReady: (map: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    onReady(map);
  }, [map, onReady]);
  return null;
}

type MapSectionProps = {
  services: NearbyService[];
  approximateArea: ApproxArea;
  selectedServiceKey: string | null;
};

export function MapSection({ services, approximateArea, selectedServiceKey }: MapSectionProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRefs = useRef<Map<string, L.Marker>>(new Map());

  // 1) Filter services that have coordinates
  const servicesWithLocation = useMemo(
    () =>
      services.filter(
        (s) => typeof s?.location?.lat === 'number' && typeof s?.location?.lng === 'number',
      ),
    [services],
  );

  // 2) Positions for markers
  const positions = useMemo<[number, number][]>(() => {
    return servicesWithLocation.map((s) => [s.location!.lat, s.location!.lng]);
  }, [servicesWithLocation]);

  // Area bounds and combined bounds
  const areaBounds = useMemo(() => boundsOfApproxArea(approximateArea), [approximateArea]);
  const combinedBounds = useMemo(() => {
    if (areaBounds) {
      positions.forEach(([lat, lng]) => areaBounds.extend([lat, lng]));
      return areaBounds;
    }
    if (positions.length) {
      return L.latLngBounds(positions.map(([lat, lng]) => L.latLng(lat, lng)));
    }
    return null;
  }, [areaBounds, positions]);

  // 3) Initial center (fallback used only if empty)
  const initialCenter = positions[0] ?? [43.263, -2.935]; // Bilbao

  // 4) React to clicking a service
  useEffect(() => {
    if (!selectedServiceKey) return;
    const map = mapRef.current;
    const marker = markerRefs.current.get(selectedServiceKey);
    if (!map || !marker) return;

    const ll = marker.getLatLng();
    const targetZoom = Math.max(map.getZoom(), 16);
    map.closePopup();
    map.flyTo(ll, targetZoom, { duration: 0.6 });

    const onEnd = () => {
      marker.openPopup();
      map.off('moveend', onEnd);
    };
    map.on('moveend', onEnd);

    // ✅ Return a cleanup FUNCTION (void), not map.off(...) directly
    return () => {
      map.off('moveend', onEnd);
    };
  }, [selectedServiceKey]);

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
          <SetMapRef onReady={(map) => (mapRef.current = map)} />

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Auto-fit to area + markers only when nothing is selected */}
          {!selectedServiceKey && combinedBounds && combinedBounds.isValid() && (
            <FitToBounds bounds={combinedBounds} />
          )}

          {/* Approximate area */}
          {areaBounds && approximateArea && (
            <>
              {approximateArea.kind === 'circle' && (
                <Circle
                  center={[approximateArea.center.lat, approximateArea.center.lng]}
                  radius={approximateArea.radiusMeters}
                  pathOptions={{ color: '#2563eb', fillColor: '#60a5fa', fillOpacity: 0.25 }}
                />
              )}

              {approximateArea.kind === 'rectangle' && (
                <Rectangle
                  bounds={approximateArea.bounds}
                  pathOptions={{ color: '#2563eb', fillColor: '#60a5fa', fillOpacity: 0.2 }}
                />
              )}

              {approximateArea.kind === 'polygon' && (
                <Polygon
                  positions={approximateArea.coordinates}
                  pathOptions={{ color: '#2563eb', fillColor: '#60a5fa', fillOpacity: 0.2 }}
                />
              )}
            </>
          )}

          {/* Markers with typed refs keyed by id:lat,lng */}
          {servicesWithLocation.map((service) => {
            const { lat, lng } = service.location!;
            const color = serviceColorHexMap[service.type] ?? '#2563eb';
            const icon = divIconForColor(color);
            const key = `${service.id}:${lat},${lng}`;

            return (
              <Marker
                key={key}
                position={[lat, lng]}
                icon={icon}
                ref={(ref) => {
                  const map = markerRefs.current;
                  if (ref) map.set(key, ref);
                  else map.delete(key);
                }}
              >
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
