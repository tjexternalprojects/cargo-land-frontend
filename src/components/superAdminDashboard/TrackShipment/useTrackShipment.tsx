import { ShipmentServices } from "@/services";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function useTrackShipment() {
	const {getSingleShipment} = ShipmentServices()
	const params = useParams();
	const [singleShipment, setSingleShipment]= useState<any>({})
	const [showTrackingIdInput, setShowTrackingIdInput] = useState(false)

	const SingleShipment=()=>{
		getSingleShipment(params.shipment_id as string).then(response=>{
			console.log(response.data)
			setSingleShipment(response.data)
		},error=>{
			console.log(error)
			setShowTrackingIdInput(true)
		})
	}
	useEffect(()=>{
		SingleShipment()
	},[])
	return {singleShipment, showTrackingIdInput};
}

export default useTrackShipment;
