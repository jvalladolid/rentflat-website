// src/components/MapSection.tsx
'use client';

import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle as LeafletCircle,
  Rectangle as LeafletRectangle,
  Polygon as LeafletPolygon,
} from 'react-leaflet';
import type { NearbyService, ApproxArea, ServiceType } from '@/data/flat-dto';
import { useEffect, useMemo } from 'react';
import L from 'leaflet';
import { ServiceIconMap, ServiceColorHexMap } from '@/components/Service-Icons';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import type { LucideIcon } from 'lucide-react';

/** ---- Configure Leaflet default icon paths (Next.js friendly) ---- */
const defaultIcon = new L.Icon.Default({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});
L.Marker.prototype.options.icon = defaultIcon;

/** ---- Travel mode icons (used in popups) ---- */
const METRO_BILBAO_ICON_SRC = '/icons/MetroBilbao.png';
const OSAKIDETZA_ICON_SRC = '/icons/Osakidetza.png';
const PHARMACY_ICON_SRC = '/icons/Pharmacy.png';
const GYM_ICON_SRC = '/icons/Gym.png';
const WALKING_ICON_SRC = '/icons/Andando.png';
const METRO_ICON_SRC = METRO_BILBAO_ICON_SRC;

// ===== Service icon markers =====
const serviceDivIconCache = new Map<ServiceType, L.DivIcon>();
function divIconForServiceType(type: ServiceType): L.DivIcon {
  const cached = serviceDivIconCache.get(type);
  if (cached) return cached;

  const IconCmp = ServiceIconMap[type];
  const color = ServiceColorHexMap[type] ?? '#2563eb';

  const Lucide = IconCmp as unknown as LucideIcon;
  const svgMarkup = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Lucide, { size: 18, strokeWidth: 2 }),
  );

  const innerHtml = [
    `<div style="width:18px;height:18px;color:${color};display:flex;align-items:center;justify-content:center">`,
    svgMarkup,
    `</div>`,
  ].join('');

  // Outer badge: small square, white, subtle border + shadow
  const outerStyle = [
    'width:28px;height:28px',
    'background:#ffffff',
    'border:1px solid #e5e7eb',
    'border-radius:6px',
    'box-shadow:0 2px 6px rgba(0,0,0,.18)',
    'display:flex;align-items:center;justify-content:center',
  ].join(';');

  const html = `<div style="${outerStyle}">${innerHtml}</div>`;

  const icon = L.divIcon({
    className: '',
    html,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });

  serviceDivIconCache.set(type, icon);
  return icon;
}

/** Compute bounds of your ApproxArea */
function boundsOfApproxArea(area: ApproxArea): L.LatLngBounds {
  if (area.kind === 'circle') {
    // Use a Leaflet circle to compute precise bounds
    const circle = L.circle([area.center.lat, area.center.lng], {
      radius: area.radiusMeters,
    });
    return circle.getBounds();
  }
  if (area.kind === 'rectangle') {
    return L.latLngBounds(area.bounds);
  }
  // polygon
  const ring = area.coordinates.map(([lat, lng]) => L.latLng(lat, lng));
  return L.latLngBounds(ring);
}

/** Ensures full area is visible: wait until map is ready, invalidate size, then fit with padding */
function FitAreaOnReady({ area }: { area: ApproxArea }) {
  const map = useMap();

  useEffect(() => {
    const fit = () => {
      requestAnimationFrame(() => {
        map.invalidateSize();
        const b = boundsOfApproxArea(area);
        const size = map.getSize();
        const padX = Math.min(240, Math.max(32, Math.round(size.x * 0.1)));
        const padY = Math.min(180, Math.max(32, Math.round(size.y * 0.12)));
        map.fitBounds(b, { padding: [padY, padX] });
      });
    };

    map.whenReady(fit);

    // Refit on container resize
    const container = map.getContainer();
    const ro = new ResizeObserver(() => fit());
    ro.observe(container);

    // Refit on orientation change (mobile)
    const onOrientation = () => fit();
    window.addEventListener('orientationchange', onOrientation);

    return () => {
      ro.disconnect();
      window.removeEventListener('orientationchange', onOrientation);
    };
  }, [map, area]);

  return null;
}

type MapSectionProps = {
  services: NearbyService[];
  approximateArea: ApproxArea;
};

export function MapSection({ services, approximateArea }: MapSectionProps) {
  const servicesWithLocation = useMemo(
    () =>
      (services ?? []).filter(
        (s) => typeof s?.location?.lat === 'number' && typeof s?.location?.lng === 'number',
      ),
    [services],
  );

  const positions = useMemo<[number, number][]>(() => {
    return servicesWithLocation.map((s) => [s.location!.lat, s.location!.lng]);
  }, [servicesWithLocation]);

  const initialCenter = positions[0] ?? [43.263, -2.935]; // Bilbao

  return (
    <div className="map-wrapper">
      {servicesWithLocation.length === 0 ? (
        <div className="map-empty">Mapa no disponible para esta localización aún.</div>
      ) : (
        <MapContainer
          center={initialCenter as [number, number]}
          zoom={14}
          className="map-canvas"
          scrollWheelZoom={false}
        >
          {/* Ensure the entire approximate area is visible on first paint */}
          {approximateArea && <FitAreaOnReady area={approximateArea} />}

          {/* Base tiles */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {/* Draw the approximate area */}
          {approximateArea && approximateArea.kind === 'circle' && (
            <LeafletCircle
              center={[approximateArea.center.lat, approximateArea.center.lng]}
              radius={approximateArea.radiusMeters}
            />
          )}
          {approximateArea && approximateArea.kind === 'rectangle' && (
            <LeafletRectangle bounds={approximateArea.bounds} />
          )}
          {approximateArea && approximateArea.kind === 'polygon' && (
            <LeafletPolygon positions={approximateArea.coordinates} />
          )}

          {/* Service markers */}
          {servicesWithLocation.map((service, idx) => {
            const { lat, lng } = service.location!;
            const icon = divIconForServiceType(service.type);
            return (
              <Marker key={`${service.name}-${idx}`} position={[lat, lng]} icon={icon}>
                <Popup>
                  <strong>{service.name}</strong>
                  {service.travelTimes?.length ? (
                    <ul style={{ margin: '6px 0 0 0', padding: 0, listStyle: 'none' }}>
                      {service.travelTimes.map((t, i) => (
                        <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={
                              t.mode === 'walking' ? '/icons/Andando.png' : '/icons/MetroBilbao.png'
                            }
                            alt=""
                            width={16}
                            height={16}
                          />
                          {t.mode === 'walking' ? 'Andando' : 'En Metro'} · {t.minutes} min
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
