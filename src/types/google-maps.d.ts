
// Type definitions for Google Maps JavaScript API
declare interface Window {
  google: typeof google;
  initMap: () => void;
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions);
      setCenter(latLng: LatLng | {lat: number, lng: number}): void;
      setZoom(zoom: number): void;
      panTo(latLng: LatLng | {lat: number, lng: number}): void;
      getBounds(): LatLngBounds;
      getZoom(): number;
      fitBounds(bounds: LatLngBounds): void;
    }

    class Marker {
      constructor(opts?: MarkerOptions);
      setMap(map: Map | null): void;
      setPosition(latLng: LatLng | {lat: number, lng: number}): void;
      addListener(event: string, handler: Function): void;
      getPosition(): LatLng;
    }

    class InfoWindow {
      constructor(opts?: InfoWindowOptions);
      setContent(content: string | Node): void;
      open(map?: Map, anchor?: Marker): void;
      close(): void;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }

    class LatLngBounds {
      extend(latLng: LatLng | {lat: number, lng: number}): void;
      contains(latLng: LatLng | {lat: number, lng: number}): boolean;
    }

    class Geocoder {
      geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: GeocoderStatus) => void): void;
    }

    interface MapOptions {
      center?: LatLng | {lat: number, lng: number};
      zoom?: number;
      mapTypeId?: string;
      disableDefaultUI?: boolean;
      zoomControl?: boolean;
      styles?: any[];
    }

    interface MarkerOptions {
      position?: LatLng | {lat: number, lng: number};
      map?: Map;
      title?: string;
      icon?: string | Icon | Symbol;
      animation?: any;
    }

    interface Icon {
      url: string;
      size?: Size;
      origin?: Point;
      anchor?: Point;
      scaledSize?: Size;
    }

    interface Symbol {
      path: any;
      fillColor?: string;
      fillOpacity?: number;
      scale?: number;
      strokeColor?: string;
      strokeOpacity?: number;
      strokeWeight?: number;
    }

    interface Size {
      width: number;
      height: number;
    }

    interface Point {
      x: number;
      y: number;
    }

    interface InfoWindowOptions {
      content?: string | Node;
      position?: LatLng | {lat: number, lng: number};
    }

    interface GeocoderRequest {
      address?: string;
      location?: LatLng | {lat: number, lng: number};
      placeId?: string;
    }

    interface GeocoderResult {
      geometry: {
        location: LatLng;
      };
      formatted_address: string;
      place_id: string;
    }

    type GeocoderStatus = 'OK' | 'ZERO_RESULTS' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST' | 'UNKNOWN_ERROR';

    const Animation: {
      DROP: number;
      BOUNCE: number;
    };

    const SymbolPath: {
      CIRCLE: number;
      BACKWARD_CLOSED_ARROW: number;
      FORWARD_CLOSED_ARROW: number;
    };

    const event: {
      addListener(instance: any, eventName: string, handler: Function): any;
      removeListener(listener: any): void;
    };
  }
}
