import { AppContextType, AppContext } from "@/context";
import { useContext, useState } from "react";

function useAllShipment(){
	const { state, setState } = useContext<AppContextType>(AppContext);
    const [start_range, set_start_range] = useState(0)
    const [end_range, set_end_range]= useState(1)
    const currentItems = state.allShipments.slice(start_range, end_range);
    return {
        state,
        currentItems,
        start_range,
        end_range,
        set_start_range,
        set_end_range,

    }
}

export default useAllShipment