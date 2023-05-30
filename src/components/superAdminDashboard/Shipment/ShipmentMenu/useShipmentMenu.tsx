import { useState } from "react";
import { ShipmentServices } from "@/services";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
function useShipmentMenu(location_id:string) {
    const {updateCurrentLocation, updateHeadingTo, deleteLocation}= ShipmentServices()
	const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading]= useState(false)
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

    const setCurrentLocation=(shipment_id:string, location_id:string)=>{
        setIsOpen(false)
        setLoading(true)
        updateCurrentLocation(shipment_id, location_id).then(response=>{
        setLoading(false)
            console.log(response)
        },error=>{
        setLoading(false)
            console.log(error)
        })
    }

    const setNextCheckPoint=(shipment_id:string, location_id:string)=>{
        setIsOpen(false)
        setLoading(true)
        updateHeadingTo(shipment_id, location_id).then(response=>{
        setLoading(false)
            console.log(response)
        },error=>{
        setLoading(false)
            console.log(error)
        })
    }

    // toast.success('Logged out successfully', {
    //     progressClassName: 'bg-green-500 h-1',
    //     autoClose: 3000,
    // });

    const deleteRoute=(shipment_id:string, location_id:string)=>{

		confirmAlert({
			title: 'Delete Location?',
			message: 'Are you sure you want to Delete this location',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {

                        setIsOpen(false)
                        setLoading(true)
                        deleteLocation(shipment_id, location_id).then(response=>{
                        setLoading(false)
                            console.log(response)
                        },error=>{
                        setLoading(false)
                            console.log(error)
                        })
					
					},
				},
				{
					label: 'No',
					onClick: () => {},
				},
			],
		});




      
    }

	return { toggleDropdown, setCurrentLocation, setNextCheckPoint, deleteRoute, loading, isOpen };
}

export default useShipmentMenu