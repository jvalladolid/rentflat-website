// src/data/flat-dto.ts

export type ServiceType = 'transporte' | 'supermercado' | 'salud' | 'ocio' | 'sports';

export type TravelMode = 'walking' | 'publicTransport';

export interface TravelTime {
  mode: TravelMode;
  minutes: number;
}

export interface NearbyService {
  id: string;
  name: string;
  type: ServiceType;
  travelTimes: TravelTime[];
  location?: {
    lat: number;
    lng: number;
  };
}

export interface FlatImage {
  src: string;
  alt: string;
}

export interface Flat {
  title: string;
  subtitle?: string;
  numberOfRooms: number;
  surfaceM2: number;
  floorDesc: string;
  price: string;
  location: {
    area: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  description: string;
  features: string[];
  images: FlatImage[];
  nearbyServices: NearbyService[];
  availability: {
    availableFrom: string;
    minimumStayMonths?: number;
  };
}
