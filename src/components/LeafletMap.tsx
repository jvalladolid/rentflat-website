'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@/lib/leaflet-icons';

import type { LatLngExpression } from 'leaflet';
import { NearbyService } from '@/data/flat-dto';

type Props = {
  services: NearbyService[];
};

function hasLocation(
  service: NearbyService,
): service is NearbyService & { location: { lat: number; lng: number } } {
  return typeof service.location?.lat === 'number' && typeof service.location?.lng === 'number';
}

export default function LeafletMap({ services }: Props) {
  const servicesWithLocation = services.filter(hasLocation);

  if (servicesWithLocation.length === 0) return null;

  const center: LatLngExpression = [
    servicesWithLocation[0].location.lat,
    servicesWithLocation[0].location.lng,
  ];

  return (
    <MapContainer
      center={center}
      zoom={15}
      scrollWheelZoom={false}
      className="h-80 w-full rounded-lg"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {servicesWithLocation.map((service) => (
        <Marker
          key={service.id}
          position={[service.location.lat, service.location.lng] as LatLngExpression}
        >
          <Popup>
            <strong>{service.name}</strong>
            <br />
            {service.type}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
