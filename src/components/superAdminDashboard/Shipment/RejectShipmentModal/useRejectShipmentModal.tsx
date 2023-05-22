import { useState } from "react";
import { toast } from "react-toastify";
import { ShipmentServices } from "@/services";

function useRejectShipment(
    shipment_id:string, 
    setShowRejectShipmentModal:React.Dispatch<React.SetStateAction<boolean>>, 
    setShowModal:React.Dispatch<React.SetStateAction<boolean>>)
    {
    const {rejectShipment} = ShipmentServices()
    const [rejectionReason, setRejectionReason] = useState("")
    const [loading, setLoading] = useState(false)


    const handleRejectShipment= async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        const payload={
            shipment_id:shipment_id,
            reason:rejectionReason
        }
        await rejectShipment(payload).then(response=>{
        setLoading(false)
        toast.success('Shipment rejected successfully', {
            progressClassName: 'bg-green-500 h-1',
            autoClose: 3000,
        });
        setShowRejectShipmentModal(false)
        },error=>{
            console.log(error)
        setLoading(false)
            toast.error('Oops! Sorry an Error Occured, Try Again ', {
                progressClassName: 'bg-red-500 h-1',
                autoClose: 3000,
            });
        })
    }


    return {rejectionReason, loading, handleRejectShipment,  setRejectionReason}
}
export default useRejectShipment