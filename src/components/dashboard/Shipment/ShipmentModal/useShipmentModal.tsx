import { AppContext, AppContextType } from '@/context';
import { ShipmentServices } from '@/services';
import { useContext, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

function useShipmentModal(setShowModal: (value: boolean) => void) {
	const {deleteShipment, getAllUserShipment}=ShipmentServices()

	const { state, setState } = useContext<AppContextType>(AppContext);
	const [removeShipmentLoader, setRemoveShipmentLoader] = useState(false)
	const image_slider_settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		initialSlide: 0,
	};
	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleEdit = () => {
		setState({
			...state,
			shipmentCurrentTab: 'item1',
		});
		setShowModal(false);
	};

	const removeShipment = async (shipment_id: string) => {
		setRemoveShipmentLoader(true);
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

	const handleRemoveItem = (shipment_id: string| undefined) => {
		
  confirmAlert({
      title: "Remove?",
      message: `Are you sure you want to remove Shipment  ${shipment_id}`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            removeShipment(shipment_id as string);
		setShowModal(false);

          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
	};
	return { image_slider_settings, removeShipmentLoader, handleRemoveItem, handleEdit, handleCloseModal };
}
export default useShipmentModal;
