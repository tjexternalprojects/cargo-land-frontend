import api from './api.services'
// import TokenServices from "./token.services";

const createShipment=(shipmentData:FormData)=>{
    // return fetch(
    //     "http://localhost:4300/shipment/create-shipment",{
    //         method:"POST",
    //         body:shipmentData,
    //         headers:{
    //             "Content-Type": "application/json",
    //             "authorization":`Bearer ${TokenServices.getAccessToken()}`
    //         }
    //     }
    // )
    return api.post('/shipment/create-shipment', shipmentData)
}

const ShipmentServices = {
    createShipment
}
export default ShipmentServices