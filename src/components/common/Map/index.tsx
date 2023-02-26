import { useState } from "react";
import Geocode from "react-geocode";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

Geocode.setApiKey("AIzaSyDh080FVx9-iAk78VVmaLVm3PMIHcaPeXA");


const containerStyle = {
  width: "100%",
  height: "400px",
};

function MyMap() {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleSubmit = (event:any) => {
    event.preventDefault();

    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </label>
        <button type="submit">Get Location</button>
      </form>
      {latitude && longitude && (
        <LoadScript googleMapsApiKey="AIzaSyDh080FVx9-iAk78VVmaLVm3PMIHcaPeXA">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: latitude, lng: longitude }}
            zoom={15}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              clickableIcons: false,
			  mapTypeId: "hybrid",
			  streetViewControl: true,
              fullscreenControl: true,
              styles: [
                {
                  featureType: "poi",
                  elementType: "labels",
                  stylers: [{ visibility: "on" }],
                },
                {
                  featureType: "transit",
                  elementType: "labels",
                  stylers: [{ visibility: "on" }],
                },
              ],
            }}
          >
            <Marker
              position={{ lat: latitude, lng: longitude }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              }}
            />
          </GoogleMap>
        </LoadScript>
      )}
    </>
  );
}

export default MyMap;
