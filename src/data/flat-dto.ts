// src/data/flat-dto.ts

export type ServiceType = 'transporte' | 'supermercado' | 'salud' | 'ocio' | 'sports';

export type TravelMode = 'walking' | 'metro';

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

export type ApproxArea =
  | { kind: 'circle'; center: { lat: number; lng: number }; radiusMeters: number }
  | { kind: 'rectangle'; bounds: [[number, number], [number, number]] } // [[southWestLat, southWestLng], [northEastLat, northEastLng]]
  | { kind: 'polygon'; coordinates: [number, number][] }; // [lat, lng] ring (no need to close)

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
    approximateArea: ApproxArea;
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
