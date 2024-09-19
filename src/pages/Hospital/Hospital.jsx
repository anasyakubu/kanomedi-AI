import { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// Your Google Maps API key here
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const Map = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
          findHospitals(position.coords.latitude, position.coords.longitude);
        },
        () => {
          console.error("Error retrieving location");
          setLoading(false);
        }
      );
    }
  }, []);

  const findHospitals = (lat, lng) => {
    const map = new window.google.maps.Map(document.createElement("div"));
    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      location: { lat, lng },
      radius: "5000", // 5km radius
      type: ["hospital"],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setHospitals(results);
      }
    });
  };

  if (!isLoaded || loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-center text-xl font-semibold mb-4">
        Nearby Hospitals
      </h1>
      <GoogleMap
        center={location}
        zoom={13}
        mapContainerStyle={{ width: "100%", height: "400px" }}
      >
        {/* User's current location marker */}
        <Marker position={location} label="You" />

        {/* Markers for nearby hospitals */}
        {hospitals.map((hospital) => (
          <Marker
            key={hospital.place_id}
            position={{
              lat: hospital.geometry.location.lat(),
              lng: hospital.geometry.location.lng(),
            }}
            label={hospital.name}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
