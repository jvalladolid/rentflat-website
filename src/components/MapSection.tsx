// src/components/MapSection.tsx

'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { NearbyService, ApproxArea, ServiceType } from '@/data/flat-dto';
import { useEffect, useMemo } from 'react';
import { Circle, Rectangle, Polygon } from 'react-leaflet';
import L, { LatLngBoundsExpression, LatLngTuple } from 'leaflet';
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

/** ---- Icons for the Popup ---- */
const METRO_BILBAO_ICON_SRC = '/icons/MetroBilbao.png';
const OSAKIDETZA_ICON_SRC = '/icons/Osakidetza.png';
const PHARMACY_ICON_SRC = '/icons/Pharmacy.png';
const GYM_ICON_SRC = '/icons/Gym.png';

/** ---- Icons for the Popup ---- */
const WALKING_ICON_SRC = '/icons/Andando.png';
const METRO_ICON_SRC = METRO_BILBAO_ICON_SRC;

// ===== Service icon markers =====
// Cache by service type so we don’t re-create icons
const serviceDivIconCache = new Map<ServiceType, L.DivIcon>();

function divIconForServiceType(type: ServiceType): L.DivIcon {
  const cached = serviceDivIconCache.get(type);
  if (cached) return cached;

  const IconCmp = ServiceIconMap[type];
  const color = ServiceColorHexMap[type] ?? '#2563eb';

  // Build the inner icon markup WITHOUT using `any`
  let innerHtml = '';

  if (type === 'transporte') {
    innerHtml = `<img
        src="METRO_BILBAO_ICON_SRC"',
      ' alt=""',
      ' width="18"',
      ' height="p" />`;
    const Lucide = IconCmp as unknown as LucideIcon;
    const svgMarkup = ReactDOMServer.renderToStaticMarkup(
      React.createElement(Lucide, { size: 18, strokeWidth: 2 }),
    );
    innerHtml = [
      '<span style="color:',
      color,
      ';display:inline-flex;align-items:center;justify-content:center;">',
      svgMarkup,
      '</span>',
    ].join('');
  } else if (type === 'salud') {
    innerHtml = `<img
        src="OSAKIDETZA_ICON_SRC"',
      ' alt=""',
      ' width="18"',
      ' height="p" />`;
    const Lucide = IconCmp as unknown as LucideIcon;
    const svgMarkup = ReactDOMServer.renderToStaticMarkup(
      React.createElement(Lucide, { size: 18, strokeWidth: 2 }),
    );
    innerHtml = [
      '<span style="color:',
      color,
      ';display:inline-flex;align-items:center;justify-content:center;">',
      svgMarkup,
      '</span>',
    ].join('');
  } else if (type === 'pharmacy') {
    innerHtml = `<img
        src="PHARMACY_ICON_SRC"',
      ' alt=""',
      ' width="18"',
      ' height="p" />`;
    const Lucide = IconCmp as unknown as LucideIcon;
    const svgMarkup = ReactDOMServer.renderToStaticMarkup(
      React.createElement(Lucide, { size: 18, strokeWidth: 2 }),
    );
    innerHtml = [
      '<span style="color:',
      color,
      ';display:inline-flex;align-items:center;justify-content:center;">',
      svgMarkup,
      '</span>',
    ].join('');
  } else if (type === 'sports') {
    innerHtml = `<img
        src="GYM_ICON_SRC"',
      ' alt=""',
      ' width="18"',
      ' height="p" />`;
    const Lucide = IconCmp as unknown as LucideIcon;
    const svgMarkup = ReactDOMServer.renderToStaticMarkup(
      React.createElement(Lucide, { size: 18, strokeWidth: 2 }),
    );
    innerHtml = [
      '<span style="color:',
      color,
      ';display:inline-flex;align-items:center;justify-content:center;">',
      svgMarkup,
      '</span>',
    ].join('');
  } else {
    // Lucide icon: render SVG to string and apply color via currentColor
    const Lucide = IconCmp as unknown as LucideIcon;
    const svgMarkup = ReactDOMServer.renderToStaticMarkup(
      React.createElement(Lucide, { size: 18, strokeWidth: 2 }),
    );
    innerHtml =
      '<span style="color:' +
      color +
      ';display:inline-flex;align-items:center;justify-content:center;">' +
      svgMarkup +
      '</span>';
  }

  // Outer badge: small square, white, subtle border + shadow
  const outerStyle = [
    'width:28px;height:28px',
    'background:#ffffff',
    'border:1px solid #e5e7eb', // gray-200
    'border-radius:6px', // change to 0 for a perfect square
    'box-shadow:0 2px 6px rgba(0,0,0,.18)',
    'display:flex;align-items:center;justify-content:center',
  ].join(';');

  const html = '<div style="' + outerStyle + '">' + innerHtml + '</div>';

  const icon = L.divIcon({
    className: '', // avoid Leaflet defaults
    html,
    iconSize: [28, 28],
    iconAnchor: [14, 14], // center on point
    popupAnchor: [0, -14], // popup above badge
  });

  serviceDivIconCache.set(type, icon);
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

          {servicesWithLocation.map((service) => {
            const { lat, lng } = service.location!;
            const icon = divIconForServiceType(service.type);
            return (
              <Marker key={`${service.id}-${lat}-${lng}`} position={[lat, lng]} icon={icon}>
                <Popup>
                  <strong>{service.name}</strong>
                  <div>Tipo: {service.type}</div>
                  {service.travelTimes?.length ? (
                    <ul style={{ paddingLeft: 16, margin: '6px 0 0' }}>
                      {service.travelTimes.map((t, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
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
