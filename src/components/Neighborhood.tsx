// src/components/Neighborhood.tsx
import { NearbyService } from '@/data/flat-dto';
import { MapSection } from '@/components/MapSection';

interface NeighborhoodProps {
  services: NearbyService[];
}

export function Neighborhood({ services }: NeighborhoodProps) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-4">SERVICIOS EN LA ZONA</h2>

      <MapSection services={services} />

      <ul className="space-y-4">
        {services.map((service) => (
          <li key={service.id}>
            <strong>{service.name}</strong>
            <ul className="ml-4 text-sm text-gray-600">
              {service.travelTimes.map((t) => (
                <li key={t.mode}>
                  {t.mode === 'walking' ? '🚶' : '🚇'} {t.minutes} min
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
