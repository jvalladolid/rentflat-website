import { Flat } from './flat-dto';

export const flat: Flat = {
  title: 'VIVIENDA DE 2 HABITACIONES EN SANTUTXU',
  subtitle: 'Ideal para residentes médicos y de enfermería',
  price: '1.200 €/mes',
  numberOfRooms: 2,
  surfaceM2: 81,
  floorDesc: '4º exterior con ascensor',
  location: {
    area: 'Santutxu',
    city: 'Bilbao',
  },
  description:
    'Apartamento espacioso y luminoso en Santutxu, totalmente amueblado y con luz natural. Bien conectado por transporte público. Área tranquila con todos los servicios cercanos.',
  features: [
    '2 habitaciones con espacio para estudio',
    'Cocina totalmente equipada: nevera, lavadora, vitrocerámica, horno, microondas',
    'Salón amplio con espacio de comedor, que podría usarse como un tercer espacio para estudio',
    '1 baño completo con ducha',
    'Totalmente amueblado',
    'Conexión a Internet de alta velocidad (600 Mbps) incluida',
    'Ascensor',
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
      location: {
        lat: 43.25416021985116,
        lng: -2.9146234718575315,
      },
    },
    {
      id: 'hospital-basurto',
      name: 'Hospital de Basurto',
      type: 'salud',
      travelTimes: [
        {
          mode: 'publicTransport',
          minutes: 20,
        },
      ],
      location: {
        lat: 43.26173249035343,
        lng: -2.954017196137396,
      },
    },
    {
      id: 'hospital-cruces',
      name: 'Hospital de Cruces',
      type: 'salud',
      travelTimes: [
        {
          mode: 'publicTransport',
          minutes: 25,
        },
      ],
      location: {
        lat: 43.28363068809311,
        lng: -2.9869162247711833,
      },
    },
    {
      id: 'supermercados',
      name: 'Supermercados cercanos: Eroski, BM, Lidl, Dia,...',
      type: 'supermercado',
      travelTimes: [
        {
          mode: 'walking',
          minutes: 7,
        },
      ],
      location: {
        lat: 43.25527825294954,
        lng: -2.9132292544629084,
      },
    },
    {
      id: 'tiendas',
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
      id: 'gimnasio',
      name: 'Gimnasios cercanos: Nivel 3, Curves, Metropolitan,...',
      type: 'sports',
      travelTimes: [
        {
          mode: 'walking',
          minutes: 8,
        },
      ],
      location: {
        lat: 43.25549337303322,
        lng: -2.9134142184785063,
      },
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
      location: {
        lat: 43.2556029688754,
        lng: -2.9132292544629084,
      },
    },
    {
      id: 'farmacia',
      name: 'Farmacias cercanas',
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
