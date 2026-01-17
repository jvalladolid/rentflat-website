// src/data/flat-dto.ts

export type ServiceType = 'transporte' | 'supermercado' | 'salud' | 'ocio';

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
}

export interface FlatImage {
  src: string;
  alt: string;
}

export interface Flat {
  title: string;
  subtitle?: string;
  price: string;
  location: {
    area: string;
    city: string;
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
