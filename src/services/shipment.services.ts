import api from './api.services'

const createShipment=(shipmentData:FormData)=>{
    return api.post('/shipment/create-shipment', shipmentData)
}

const getAllUserShipment = ()=>{
    return api.get('/shipment/get-all-user-shipment')
}

const getShipmentInRange = (duration:Record<string, string>)=>{
    return api.get(
			`/shipment/get-user-month-shipment?startMonth=${duration.startMonth}&endMonth=${duration.endMonth}`
		);
}
const removeShipment = (shipment_id:string)=>{
	return api.delete(
		`/shipment/delete-shipment/${shipment_id}`
	)
}

const ShipmentServices = {
	createShipment,
	getAllUserShipment,
	getShipmentInRange,
	removeShipment,
};
export default ShipmentServices