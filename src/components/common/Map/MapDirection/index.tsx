
import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  DirectionsService
} from "react-google-maps";

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={8} defaultCenter={props.center}>
      <DirectionsRenderer directions={props.directions} />
    </GoogleMap>
  ))
);

class Directions extends React.Component {
  state = {
    directions: null
  };

  componentDidMount() {
    const directionsService = new window.google.maps.DirectionsService();

    const origin = { lat: 40.756795, lng: -73.954298 };
    const destination = { lat: 41.833903, lng: -87.872046 };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    return (
      <Map
        center={{ lat: 40.756795, lng: -73.954298 }}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        directions={this.state.directions}
      />
    );
  }
}

export default Directions;





























// import { useState } from "react";
// import Geocode from "react-geocode";
// import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
// // import { DirectionsRenderer, DirectionsServiceStatus, TravelMode } from "google.maps";

// Geocode.setApiKey("AIzaSyDh080FVx9-iAk78VVmaLVm3PMIHcaPeXA");

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const MapDirection=()=> {
//   const [fromAddress, setFromAddress] = useState("");
//   const [toAddress, setToAddress] = useState("");
//   const [fromLatitude, setFromLatitude] = useState(null);
//   const [fromLongitude, setFromLongitude] = useState(null);
//   const [toLatitude, setToLatitude] = useState(null);
//   const [toLongitude, setToLongitude] = useState(null);
//   const [response, setResponse] = useState(null);

//   const handleFromSubmit = (event:any) => {
//     event.preventDefault();

//     Geocode.fromAddress(fromAddress).then(
//       (response) => {
//         const { lat, lng } = response.results[0].geometry.location;
//         setFromLatitude(lat);
//         setFromLongitude(lng);
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   };

//   const handleToSubmit = (event:any) => {
//     event.preventDefault();

//     Geocode.fromAddress(toAddress).then(
//       (response) => {
//         const { lat, lng } = response.results[0].geometry.location;
//         setToLatitude(lat);
//         setToLongitude(lng);
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   };

//   const directionsCallback = (res:any) => {
//     if (res !== null) {
//       setResponse(res);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleFromSubmit}>
//         <label>
//           From:
//           <input
//             type="text"
//             value={fromAddress}
//             onChange={(event) => setFromAddress(event.target.value)}
//           />
//         </label>
//         <button type="submit">Get From Location</button>
//       </form>
//       <form onSubmit={handleToSubmit}>
//         <label>
//           To:
//           <input
//             type="text"
//             value={toAddress}
//             onChange={(event) => setToAddress(event.target.value)}
//           />
//         </label>
//         <button type="submit">Get To Location</button>
//       </form>
//       {fromLatitude && fromLongitude && toLatitude && toLongitude && (
//         <LoadScript googleMapsApiKey="AIzaSyDh080FVx9-iAk78VVmaLVm3PMIHcaPeXA">
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={{ lat: fromLatitude, lng: fromLongitude }}
//             zoom={10}
//           >
//             {response !== null && (
//               <DirectionsRenderer
//                 options={{
//                   directions: response,
//                   suppressMarkers: true,
//                 }}
//               />
//             )}
//             <DirectionsService
//               options={{
//                 origin: { lat: fromLatitude, lng: fromLongitude },
//                 destination: { lat: toLatitude, lng: toLongitude },
//                 travelMode: google.maps.TravelMode.DRIVING,
//               }}
//               callback={directionsCallback}
//             />
//           </GoogleMap>
//         </LoadScript>
//       )}
//     </>
//   );
// }

// export default MapDirection


