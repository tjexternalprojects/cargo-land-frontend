import api from './api.services'

const createShipment=(shipmentData:FormData)=>{
    return api.post('/shipment/create-shipment', shipmentData)
}

const getAllUserShipment = ()=>{
    return api.get('/shipment/get-all-user-shipment')
}

const ShipmentServices = {
    createShipment,
    getAllUserShipment
}
export default ShipmentServices