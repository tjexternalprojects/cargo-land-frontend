import { useContext, useEffect, useState } from "react";
import { AppContext, AppContextType } from "@/context";
import { ShipmentServices } from "@/services";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

function useShipmentSummary() {
  const {deleteShipment, getAllUserShipment, initiatePayment}=ShipmentServices()
  const { state, setState } = useContext<AppContextType>(AppContext);
  const [showShipmentModal, setShowShipmentModal] = useState(false);
  const [unCheckedShipment, setUnCheckedShipment] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState<any>([]);
  const [removeShipmentLoader, setRemoveShipmentLoader] = useState(false);
  const [itemIndexToRemove, setItemIndexToRemove] = useState<string>();
  const [selectedShipment, setSelectedShipment] = useState<Record<string, string | undefined> | undefined>()
  const [shipmentLoader, setShipmentLoader] = useState(false)

  const image_slider_settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const getCheckedShipment = () => {
    const unchecked = state.allShipments.filter(
      (obj: any) => obj.shipment_Status == "UNCHECK"
    );

    if(unchecked.length ===0){
      setState({
				...state,
				shipmentCurrentTab: 'item1',
				form_level: 0,
			});
    }

    setUnCheckedShipment(unchecked);
    const deliveryPriceTotal = state.allShipments.reduce(
      (total: any, obj: { delivery_price: any }) => total + obj.delivery_price,
      0
    );

    setTotalPrice(deliveryPriceTotal);
  };


  useEffect(() => {
    getCheckedShipment();
  }, [state.allShipments]);

  const handleShowModal = (selected_shipment: Record<string, string>) => {
    console.log(selected_shipment.images[0])
    setSelectedShipment(selected_shipment)
    setShowShipmentModal(true);
  };

  const removeShipment = async (shipment_id: string) => {
    setRemoveShipmentLoader(true);
    setItemIndexToRemove(shipment_id);
    await deleteShipment(shipment_id).then(
      (response) => {
        console.log(response);
        toast.success("Item Removed Successfully", {
          progressClassName: "bg-green-500 h-1",
          autoClose: 3000,
        });
        getAllUserShipment()
        setRemoveShipmentLoader(false);
      },
      (error) => {
        console.log(error);
        setRemoveShipmentLoader(false);
      }
    );
  };
  const handleRemoveItem = (shipment_id: string) => {
    confirmAlert({
      title: "Remove?",
      message: `Are you sure you want to remove Shipment  ${shipment_id}`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            removeShipment(shipment_id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  const handleAddShipment = () => {
    setState({
      ...state,
      shipmentCurrentTab: "item1",
    });
  };

  const handlePayment = () => {
    setShipmentLoader(true)
    const totalShipment = unCheckedShipment.map((obj:any)=>{
      return [
        {
        "shipmentId": obj.id,
        "amount": obj.delivery_price
        }
      ]
    })
    const payload = {
      shipments: totalShipment,
      amount: totalPrice,
      email:state.single_user_data?.email,
      phone_number:state.single_user_data?.phoneNumber
    }

    console.log(payload)
    initiatePayment(payload).then(response=>{
      console.log(response)
          setState({
      ...state,
      shipmentCurrentTab: "item4",
      form_level: 3,
    });
    setShipmentLoader(false)
    },error=>{
      console.log(error)

      toast.error(error.response.data.message, {
        progressClassName: 'bg-red-500 h-1',
        autoClose: 3000,
      });

    setShipmentLoader(false)

    })

  };
  const handleSummary = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setState({
      ...state,
      shipmentCurrentTab: "item4",
    });
  };

  return {
    handleSummary,
    setShowShipmentModal,
    handleShowModal,
    handleRemoveItem,
    handleAddShipment,
    handlePayment,
    shipmentLoader,
    selectedShipment,
    itemIndexToRemove,
    removeShipmentLoader,
    totalPrice,
    unCheckedShipment,
    showShipmentModal,
    state,
    image_slider_settings,
  };
}
export default useShipmentSummary;
