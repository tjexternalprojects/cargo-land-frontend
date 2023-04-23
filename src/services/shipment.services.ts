import { AppContextType, AppContext } from "@/context";
import { useContext } from "react";
import { toast } from "react-toastify";
import api from "./api.services";

function ShipmentServices() {
  const { state, setState } = useContext<AppContextType>(AppContext);

  const createShipment = (shipmentData: FormData) => {
    return api.post("/shipment/create-shipment", shipmentData);
  };

  const getAllUserShipment = async () => {
    await api.get("/shipment/get-all-user-shipment").then(
      (res) => {
        setState((prevState) => ({
          ...prevState,
          allShipments: res.data.allUserShipment,
        }));
      },
      (err) => {
        toast.error(err.response.data.message, {
          progressClassName: "bg-red-500 h-1",
          autoClose: 3000,
        });
      }
    );
  };

  const getShipmentInRange = (duration: Record<string, string>) => {
    return api.get(
      `/shipment/get-user-month-shipment?startMonth=${duration.startMonth}&endMonth=${duration.endMonth}`
    );
  };
  const deleteShipment = (shipment_id: string) => {
    return api.delete(`/shipment/delete-shipment/${shipment_id}`);
  };

  return {
    createShipment,
    getAllUserShipment,
    getShipmentInRange,
    deleteShipment,
  };
}

export default ShipmentServices;
