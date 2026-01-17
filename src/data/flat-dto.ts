// src/data/flat-dto.ts

export type ServiceType = 'transporte' | 'supermercado' | 'salud' | 'ocio';

export interface NearbyService {
  id: string;
  name: string;
  type: ServiceType;
  walkingMinutes: number;
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
