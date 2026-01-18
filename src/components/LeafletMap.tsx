'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@/lib/leaflet-icons';

import { NearbyService } from '@/data/flat-dto';

type Props = {
  services: NearbyService[];
};

export default function LeafletMap({ services }: Props) {
  const servicesWithLocation = services.filter((s) => s.location?.lat && s.location?.lng);

  if (servicesWithLocation.length === 0) return null;

  const center: [number, number] = [
    servicesWithLocation[0].location!.lat,
    servicesWithLocation[0].location!.lng,
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
        <Marker key={service.id} position={[service.location!.lat, service.location!.lng]}>
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
