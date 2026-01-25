import { Flat } from './flat-dto';

export const flat: Flat = {
  title: 'VIVIENDA DE 2 HABITACIONES EN SANTUTXU',
  subtitle: 'Ideal para residentes de medicina y de enfermería',
  price: '1.200 €/mes',
  numberOfRooms: 2,
  surfaceM2: 81,
  floorDesc: '4º exterior con ascensor',
  location: {
    area: 'Santutxu',
    city: 'Bilbao',
    approximateArea: {
      kind: 'circle',
      center: {
        lat: 43.255083930270054,
        lng: -2.9152648816069195,
      },
      radiusMeters: 200,
    },
  },
  description:
    'Apartamento en el barrio de Santutxu, espacioso, y todo exterior. Bien conectado por transporte público (metro). Área tranquila con todos los servicios cercanos.',
  features: [
    '2 habitaciones con espacio para estudio',
    'Cocina totalmente equipada: nevera, lavadora, lavavajillas, vitrocerámica, horno, microondas',
    'Salón amplio con espacio de comedor, que podría usarse como un tercer espacio para estudio',
    '1 baño completo con ducha',
    'Totalmente amueblado',
    'Ascensor',
    'Conexión a Internet de alta velocidad (600 Mbps) incluida',
    'A 5 minutos a pie de la estación de metro de Santutxu',
    'A 20 minutos en metro del Hospital de Basurto',
    'A 25 minutos en metro del Hospital de Cruces',
    'A 10 minutos a pie de la Plaza Nueva y el Casco Viejo de Bilbao',
    'Supermercados, tiendas locales, gimnasios y parques cercanos',
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
          mode: 'metro',
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
          mode: 'metro',
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
          minutes: 6,
        },
      ],
      location: {
        lat: 43.25538083213964,
        lng: -2.914036532857382,
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
        lat: 43.255597688433745,
        lng: -2.9205108802551076,
      },
    },
    {
      id: 'farmacia',
      name: 'Farmacias cercanas',
      type: 'pharmacy',
      travelTimes: [
        {
          mode: 'walking',
          minutes: 4,
        },
      ],
      location: {
        lat: 43.25521070268187,
        lng: -2.9175927514449174,
      },
    },
  ],
  availability: {
    availableFrom: '2026-04-01',
    minimumStayMonths: 12,
  },
};
