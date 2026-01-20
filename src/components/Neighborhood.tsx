// src/components/Neighborhood.tsx
import { NearbyService } from '@/data/flat-dto';
import { MapSection } from '@/components/MapSection';
import { serviceIconMap, serviceColorMap } from '@/components/Service-Icons';

interface NeighborhoodProps {
  services: NearbyService[];
}

export function Neighborhood({ services }: NeighborhoodProps) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-4">SERVICIOS EN LA ZONA</h2>

      {/* ===================== */}
      {/*   SERVICES LIST */}
      {/* ===================== */}

      <ul className="space-y-4">
        {services.map((service) => {
          const Icon = serviceIconMap[service.type];

          return (
            <li key={service.id} className="flex items-start gap-3">
              {/* ✅ THIS IS WHERE YOUR ICON LINE GOES */}
              <Icon className={`w-5 h-5 mt-1 ${serviceColorMap[service.type]} opacity-90`} />

              <div>
                <strong>{service.name}</strong>

                <div className="text-sm text-gray-600">
                  {service.travelTimes.map((t) => (
                    <span key={t.mode} className="mr-3">
                      {t.mode === 'walking' ? '🚶 Andando' : '🚇 En transporte público'} ·{' '}
                      {t.minutes} min
                    </span>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
