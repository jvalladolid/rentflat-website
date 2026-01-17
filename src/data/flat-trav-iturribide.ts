import { Flat } from './flat-dto';

export const flat: Flat = {
  title: 'Apartamento de 2 habitaciones en Santutxu',
  subtitle: 'Ideal para residentes médicos y de enfermería',
  price: '1.200 € / mes',
  location: {
    area: 'Santutxu',
    city: 'Bilbao',
  },
  description:
    'Apartamento espacioso y luminoso en Santutxu, totalmente amueblado y con luz natural. Bien conectado por transporte público. Área tranquila con todos los servicios cercanos.',
  features: [
    '2 habitaciones con espacio para estudio',
    'Cocina totalmente equipada',
    'Salón amplio con espacio de comedor, que podría usarse como un tercer espacio para estudio',
    '1 baño completo con ducha',
    'Ascensor',
    'Totalmente mueblado',
    'Pequeña despensa',
    'Conexión a Internet de alta velocidad (600 Mbps) incluida',
  ],
  images: [
    {
      src: '/images/TravesiaIturribide/Salon_1.jpeg',
      alt: 'Salón con zona de estar y zona de comedor',
    },
    {
      src: '/images/TravesiaIturribide/Salon_2.jpeg',
      alt: 'Salón con zona de estar y zona de comedor',
    },
    {
      src: '/images/TravesiaIturribide/Salon_3.jpeg',
      alt: 'Salón con zona de estar y zona de comedor',
    },
    {
      src: '/images/TravesiaIturribide/Salon_4.jpeg',
      alt: 'Salón con zona de estar y zona de comedor',
    },
    {
      src: '/images/TravesiaIturribide/Salon_5.jpeg',
      alt: 'Salón con zona de estar y zona de comedor',
    },
    {
      src: '/images/TravesiaIturribide/Salon_6.jpeg',
      alt: 'Salón con zona de estar y zona de comedor',
    },
    {
      src: '/images/TravesiaIturribide/Cocina_1.jpeg',
      alt: 'Cocina totalmente equipada',
    },
    {
      src: '/images/TravesiaIturribide/Cocina_2.jpeg',
      alt: 'Cocina totalmente equipada',
    },
    {
      src: '/images/TravesiaIturribide/Cocina_3.jpeg',
      alt: 'Cocina totalmente equipada',
    },
    {
      src: '/images/TravesiaIturribide/Cocina_4.jpeg',
      alt: 'Cocina totalmente equipada',
    },
    {
      src: '/images/TravesiaIturribide/Hab_1_1.jpeg',
      alt: 'Habitación Número 1',
    },
    {
      src: '/images/TravesiaIturribide/Hab_1_2.jpeg',
      alt: 'Habitación Número 1',
    },
    {
      src: '/images/TravesiaIturribide/Hab_1_3.jpeg',
      alt: 'Habitación Número 1',
    },
    {
      src: '/images/TravesiaIturribide/Hab_2_1.jpeg',
      alt: 'Habitación Número 2',
    },
    {
      src: '/images/TravesiaIturribide/Hab_2_2.jpeg',
      alt: 'Habitación Número 2',
    },
    {
      src: '/images/TravesiaIturribide/Bano_1.jpeg',
      alt: 'Baño completo',
    },
    {
      src: '/images/TravesiaIturribide/Bano_2.jpeg',
      alt: 'Baño completo',
    },
    {
      src: '/images/TravesiaIturribide/Entrada_Pasillo.jpeg',
      alt: 'Entrada y pasillo',
    },
    {
      src: '/images/TravesiaIturribide/Pasillo.jpeg',
      alt: 'Entrada y pasillo',
    },
  ],
  nearbyServices: [
    {
      id: 'metro',
      name: 'Estación de Metro de Santutxu',
      type: 'transporte',
      travelTimes: [
        {
          mode: 'walking',
          minutes: 5,
        },
      ],
    },
    {
      id: 'supermercado',
      name: 'Eroski',
      type: 'supermercado',
      travelTimes: [
        {
          mode: 'walking',
          minutes: 7,
        },
      ],
    },
    {
      id: 'supermercado',
      name: 'BM Supermercado',
      type: 'supermercado',
      travelTimes: [
        {
          mode: 'walking',
          minutes: 7,
        },
      ],
    },
    {
      id: 'supermercado',
      name: 'Fruterías, Carnicerías y Tiendas Locales',
      type: 'supermercado',
      travelTimes: [
        {
          mode: 'walking',
          minutes: 2,
        },
      ],
    },
    {
      id: 'hospital',
      name: 'Hospital de Basurto',
      type: 'salud',
      travelTimes: [
        {
          mode: 'publicTransport',
          minutes: 20,
        },
      ],
    },
    {
      id: 'hospital',
      name: 'Hospital de Cruces',
      type: 'salud',
      travelTimes: [
        {
          mode: 'publicTransport',
          minutes: 25,
        },
      ],
    },
    {
      id: 'centro-salud',
      name: 'Centro de Salud de Santutxu',
      type: 'salud',
      travelTimes: [
        {
          mode: 'walking',
          minutes: 7,
        },
      ],
    },
    {
      id: 'farmacia',
      name: 'Farmacias 2-3',
      type: 'salud',
      travelTimes: [
        {
          mode: 'walking',
          minutes: 7,
        },
      ],
    },
  ],
  availability: {
    availableFrom: '2026-04-01',
    minimumStayMonths: 12,
  },
};
