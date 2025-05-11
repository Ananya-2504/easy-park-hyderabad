
import { useEffect, useRef } from "react";
import { useMap } from "@/contexts/MapContext";

interface GoogleMapProps {
  height?: string;
}

const GoogleMap = ({ height = "500px" }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const { userLocation, filteredSpots, selectParkingSpot } = useMap();

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBfnHbmj_hGtzMnWTV_WXOyR3FpDrxUocI&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      
      script.onload = initializeMap;
      
      return () => {
        document.head.removeChild(script);
      };
    };
    
    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initializeMap();
    }
    
    return () => {
      // Cleanup map resources when component unmounts
      if (googleMapRef.current) {
        // No direct cleanup needed for Google Maps, but would free resources if needed
      }
    };
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;
    
    // Default center at Hyderabad if user location not available
    const center = userLocation
      ? { lat: userLocation.lat, lng: userLocation.lng }
      : { lat: 17.385, lng: 78.4867 }; // Hyderabad coordinates
    
    const mapOptions: google.maps.MapOptions = {
      center,
      zoom: 13,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    };
    
    googleMapRef.current = new google.maps.Map(mapRef.current, mapOptions);
    
    // Add user location marker if available
    if (userLocation) {
      new google.maps.Marker({
        position: { lat: userLocation.lat, lng: userLocation.lng },
        map: googleMapRef.current,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#1E88E5",
          fillOpacity: 0.7,
          strokeWeight: 2,
          strokeColor: "#ffffff",
        },
        title: "Your Location",
      });
    }
    
    // Update markers when spots change
    updateMapMarkers();
  };

  useEffect(() => {
    updateMapMarkers();
  }, [filteredSpots, userLocation]);

  const updateMapMarkers = () => {
    if (!googleMapRef.current || !window.google) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    
    // Add parking spot markers
    filteredSpots.forEach(spot => {
      if (!googleMapRef.current) return;
      
      const marker = new google.maps.Marker({
        position: { lat: spot.location.lat, lng: spot.location.lng },
        map: googleMapRef.current,
        title: spot.name,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // Default marker icon
        },
        animation: google.maps.Animation.DROP,
      });
      
      // Add click listener to marker
      marker.addListener("click", () => {
        selectParkingSpot(spot.id);
        
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-bold">${spot.name}</h3>
              <p>${spot.address}</p>
              <p>Price: ₹${spot.price}/hr</p>
              <p>Available: ${spot.available}/${spot.total} spots</p>
              <p>Rating: ${spot.rating}/5</p>
            </div>
          `
        });
        
        infoWindow.open(googleMapRef.current, marker);
      });
      
      markersRef.current.push(marker);
    });
    
    // Fit map to show all markers if there are any
    if (markersRef.current.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      markersRef.current.forEach(marker => {
        bounds.extend(marker.getPosition()!);
      });
      
      // Also include user location in bounds if available
      if (userLocation) {
        bounds.extend(new google.maps.LatLng(userLocation.lat, userLocation.lng));
      }
      
      googleMapRef.current.fitBounds(bounds);
      
      // Don't zoom in too far
      const listener = google.maps.event.addListener(googleMapRef.current, 'idle', () => {
        if (googleMapRef.current!.getZoom()! > 16) {
          googleMapRef.current!.setZoom(16);
        }
        google.maps.event.removeListener(listener);
      });
    }
  };

  return (
    <div ref={mapRef} style={{ height, width: "100%" }} className="rounded-lg shadow-lg" />
  );
};

export default GoogleMap;
