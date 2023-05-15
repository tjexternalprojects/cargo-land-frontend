import { AppContextType, AppContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import { ShipmentServices } from "@/services";
import { useParams, useNavigate } from "react-router-dom";

function useAllShipment() {
    const navigate = useNavigate();
    const [allShipment, setAllShipments] = useState<any>([])
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(Number(params.current_page))
    const { getAllUserShipmentPaginated } = ShipmentServices()
    const [laoading, setLoading] = useState(false)
    const [result, setResult] = useState(1)
    const getAllShipment = async () => {
        if(isNaN(currentPage)){
            setCurrentPage(1)
        }
        setLoading(true)
        await getAllUserShipmentPaginated(Number(currentPage), 6).then(response => {
        
        if(response.data.allUserShipment.length > 0){
            setAllShipments(response.data.allUserShipment)
            navigate('/dashboard/all_shipment/' + currentPage);
        }else{
            setResult(0)
            setCurrentPage(1)
            navigate('/dashboard/all_shipment/' + currentPage);
        }
        setLoading(false)

        }, error => {
            console.log(error)
            setLoading(false)

        })

    }
    useEffect(() => {
        getAllShipment()
    }, [currentPage])
    return {
        allShipment,
        currentPage,
        laoading,
        result,
        setCurrentPage
    }
}

export default useAllShipment