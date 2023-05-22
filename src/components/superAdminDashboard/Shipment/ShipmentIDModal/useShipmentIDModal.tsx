import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { ShipmentServices } from "@/services";
import { toast } from "react-toastify";

function useShipmentIDModal(setShowTrackingIdInput: React.Dispatch<React.SetStateAction<boolean>>,){
	const {getSingleShipment} = ShipmentServices()

   const [shipmentId, setShipmentId] = useState('')
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate();

    const handleCloseModal =()=>{
        setShowTrackingIdInput(false)
        navigate("/admin/shipment/1");
    }

    const handleRouteShipment=async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        setLoading(true)
		await getSingleShipment(shipmentId as string).then(response=>{
            navigate("/admin/shipment/update/"+shipmentId)
            setShowTrackingIdInput(false)			
            setLoading(false)


		},error=>{
			console.log(error)
            toast.error("Shipment Can't be retrive, re-check ID", {
				progressClassName: 'bg-red-500 h-1',
				autoClose: 3000,
			});
			setShowTrackingIdInput(true)
		setLoading(false)

		})


    }
    return {shipmentId, loading, handleCloseModal, handleRouteShipment,   setShipmentId}
}
export default useShipmentIDModal