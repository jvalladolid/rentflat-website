import Image from 'next/image';
import { flat } from '@/data/flat-trav-iturribide';

export const metadata = {
  title: `Póster A3 | ${flat.title}`,
  description: `Póster imprimible en A3 para ${flat.title}`,
};

function formatPrice(value: number | string) {
  const n = Number(value);
  if (Number.isNaN(n)) return String(value);
  return n.toLocaleString('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

function formatDate(dateISO?: string) {
  if (!dateISO) return 'Consultar';
  return new Date(dateISO).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function PosterA3Page() {
  const listingUrl = 'https://rentflat-website.vercel.app/';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=520x520&margin=16&data=${encodeURIComponent(
    listingUrl,
  )}`;
  const mainImage = flat.images[0];
  const gallery = flat.images.slice(1, 5);
  const highlights = [
    `${flat.numberOfRooms} habitaciones`,
    `${flat.surfaceM2} m²`,
    flat.floorDesc,
    `Desde ${formatDate(flat.availability?.availableFrom)}`,
    `Estancia mínima: ${flat.availability?.minimumStayMonths ?? 12} meses`,
    'Internet alta velocidad incluido',
  ];

  return (
    <main className="poster-page bg-slate-100 min-h-screen py-8 px-4">
      <div className="no-print max-w-5xl mx-auto mb-4 text-sm text-slate-600">
        Vista de impresión A3. Abre esta página y exporta como PDF en tamaño A3 (escala 100%).
      </div>

      <article
        className="a3-sheet mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
        style={{ width: '297mm', minHeight: '420mm' }}
      >
        <section className="p-12 pb-8 bg-linear-to-r from-sky-700 to-blue-900 text-white">
          <p className="uppercase tracking-[0.25em] text-xs font-semibold opacity-90">
            Alquiler en Bilbao
          </p>
          <h1 className="mt-3 text-5xl leading-tight font-extrabold text-white text-left">
            {flat.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-blue-50 text-left">{flat.subtitle}</p>

          <div className="mt-6 flex flex-wrap items-end gap-6">
            <div>
              <p className="text-sm uppercase tracking-wider text-blue-100">Precio mensual</p>
              <p className="text-5xl font-black leading-none">{formatPrice(flat.price)} €</p>
            </div>
            <div className="text-blue-50 text-sm">
              Zona {flat.location.area}, {flat.location.city}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-12 gap-8 p-10">
          <div className="col-span-7 space-y-5">
            <div className="relative h-[170mm] rounded-xl overflow-hidden border border-slate-200">
              <Image
                src={mainImage.src}
                alt={mainImage.alt}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 60vw"
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {gallery.map((img) => (
                <div
                  key={img.src}
                  className="relative h-[52mm] rounded-lg overflow-hidden border border-slate-200"
                >
                  <Image src={img.src} alt={img.alt} fill sizes="30vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-5 flex flex-col">
            <h2 className="text-2xl font-bold text-slate-900 text-left">Resumen</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">{flat.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100"
                >
                  {item}
                </span>
              ))}
            </div>

            <h3 className="mt-7 text-xl font-bold text-slate-900 text-left">
              Características destacadas
            </h3>
            <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-slate-700 list-disc pl-5">
              {flat.features.slice(0, 8).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <div className="mt-auto rounded-xl border-2 border-blue-700 bg-blue-50 p-5">
              <p className="text-sm uppercase tracking-wide text-blue-700 font-semibold">
                Más información
              </p>
              <p className="mt-2 text-base text-slate-900">Web: rentflat-website.vercel.app</p>
              <p className="mt-1 text-sm text-slate-700">WhatsApp: wa.me/message/T7MRHP2DZ2VJD1</p>

              <div className="mt-4 rounded-lg bg-white border-2 border-blue-700 p-3 flex flex-col items-center">
                <p className="text-center text-sm font-semibold text-blue-800">
                  Escanea para ver la web completa
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrUrl}
                  alt="Código QR de la web del anuncio"
                  width={520}
                  height={520}
                  className="mt-2 w-[46mm] h-[46mm] max-w-full"
                />
                <p className="mt-2 text-[11px] text-center leading-tight text-slate-600">
                  {listingUrl}
                </p>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Escanea el QR de la web o entra directamente para ver galería completa, mapa y
                condiciones.
              </p>
            </div>
          </div>
        </section>
      </article>

    </main>
  );
}
