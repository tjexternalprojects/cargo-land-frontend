// src/hooks/geocode.ts

import { useState, useEffect } from "react";

interface Location {
  lat: number;
  lng: number;
}

interface GeocodingResponse {
  results: {
    geometry: {
      location: Location;
    };
  }[];
  status: string;
}

const GOOGLE_MAP_API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY;

const useGeocode = (address: string) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${GOOGLE_MAP_API_KEY}`
        );
        const data: GeocodingResponse = await response.json();
        console.log(data)
        if (data.status === "OK") {
          const { lat, lng } = data.results[0].geometry.location;
          setLocation({ lat, lng });
        } else {
          throw new Error(data.status);
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchLocation();
  }, [address]);

  return { location, error };
};

export default useGeocode;
