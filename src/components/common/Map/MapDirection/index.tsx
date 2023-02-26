import { useState } from "react";
import Geocode from "react-geocode";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { TravelMode } from "@react-google-maps/api";

Geocode.setApiKey("AIzaSyDh080FVx9-iAk78VVmaLVm3PMIHcaPeXA");

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapDirection=()=> {
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [fromLatitude, setFromLatitude] = useState(null);
  const [fromLongitude, setFromLongitude] = useState(null);
  const [toLatitude, setToLatitude] = useState(null);
  const [toLongitude, setToLongitude] = useState(null);
  const [response, setResponse] = useState(null);

  const handleFromSubmit = (event:any) => {
    event.preventDefault();

    Geocode.fromAddress(fromAddress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setFromLatitude(lat);
        setFromLongitude(lng);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const handleToSubmit = (event:any) => {
    event.preventDefault();

    Geocode.fromAddress(toAddress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setToLatitude(lat);
        setToLongitude(lng);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const directionsCallback = (res:any) => {
    if (res !== null) {
      setResponse(res);
    }
  };

  return (
    <>
      <form onSubmit={handleFromSubmit}>
        <label>
          From:
          <input
            type="text"
            value={fromAddress}
            onChange={(event) => setFromAddress(event.target.value)}
          />
        </label>
        <button type="submit">Get From Location</button>
      </form>
      <form onSubmit={handleToSubmit}>
        <label>
          To:
          <input
            type="text"
            value={toAddress}
            onChange={(event) => setToAddress(event.target.value)}
          />
        </label>
        <button type="submit">Get To Location</button>
      </form>
      {fromLatitude && fromLongitude && toLatitude && toLongitude && (
        <LoadScript googleMapsApiKey="AIzaSyDh080FVx9-iAk78VVmaLVm3PMIHcaPeXA">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: fromLatitude, lng: fromLongitude }}
            zoom={10}
          >
            {response !== null && (
              <DirectionsRenderer
                options={{
                  directions: response,
                  suppressMarkers: true,
                }}
              />
            )}
            <DirectionsService
              options={{
                origin: { lat: fromLatitude, lng: fromLongitude },
                destination: { lat: toLatitude, lng: toLongitude },
                travelMode: TravelMode.DRIVING,
              }}
              callback={directionsCallback}
            />
          </GoogleMap>
        </LoadScript>
      )}
    </>
  );
}

export default MapDirection