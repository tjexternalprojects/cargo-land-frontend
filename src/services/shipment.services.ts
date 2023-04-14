import api from './api.services'

const createShipment=(shipmentData:FormData)=>{
    return api.post('/shipment/create-shipment', shipmentData)
}

const ShipmentServices = {
    createShipment
}
export default ShipmentServices