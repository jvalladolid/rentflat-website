// src/components/MapSection.tsx
import { Flat, NearbyService } from '@/data/flat-dto';

interface MapSectionProps {
  flat: Flat;
  services: NearbyService[];
}

export function MapSection({ flat, services }: MapSectionProps) {
  const coordinates = flat.location.coordinates;

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-4">Location</h2>

      {coordinates ? (
        <>
          {/* Map */}
          <div className="w-full h-100 mb-6 rounded overflow-hidden">
            <iframe
              src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Services */}
          <ul className="space-y-4">
            {services.map((service) => (
              <li key={service.id}>
                <strong>{service.name}</strong>
                <div className="text-sm text-gray-600">
                  {service.travelTimes.map((t) => (
                    <span key={t.mode} className="mr-3">
                      {t.mode === 'walking' ? '🚶' : '🚇'} {t.minutes} min
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        /* Fallback */
        <div className="text-gray-600">
          <p>
            Located in <strong>{flat.location.area}</strong>, <strong>{flat.location.city}</strong>.
          </p>

          {services.length > 0 && (
            <ul className="mt-4 space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <strong>{service.name}</strong>
                  <div className="text-sm">
                    {service.travelTimes.map((t) => (
                      <span key={t.mode} className="mr-3">
                        {t.mode === 'walking' ? '🚶' : '🚇'} {t.minutes} min
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
