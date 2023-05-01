import { AppContext, AppContextType } from '@/context';
import { ShipmentServices } from '@/services';
import { useContext, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

function useShipmentModal(setShowModal: (value: boolean) => void) {
	const { deleteShipment, getAllUserShipment } = ShipmentServices();
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [removeShipmentLoader, setRemoveShipmentLoader] = useState(false);
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

	const handleEdit = (shipment: Record<string, any> | undefined) => {
		shipmentToEdit(shipment);
	};

	const shipmentToEdit = (shipment: Record<string, any> | undefined) => {
		console.log('shipmentdetails')
		console.log(shipment)
		const shipmentDetails = {
			shipment_title: shipment?.shipment_title,
			shipment_description: shipment?.shipment_description,
			shipment_weight: shipment?.shipment_weight,
			images: shipment?.images,
			current_location: {
				country: shipment?.current_location?.country,
				state: shipment?.current_location.state,
				city: shipment?.current_location.city,
				address: shipment?.current_location.address,
				formattedAddress: shipment?.sendersAddress,
				longitude: shipment?.current_location.longitude,
				latitude: shipment?.current_location.latitude,
			},
			recipient_full_name: shipment?.recipient_full_name,
			recipient_email: shipment?.recipient_email,
			shipment_destination: {
				country: shipment?.shipment_destination.country,
				state: shipment?.shipment_destination.state,
				city: shipment?.shipment_destination.city,
				address: shipment?.shipment_destination.address,
				formattedAddress: shipment?.recepientAddress,
				longitude: shipment?.shipment_destination.longitude,
				latitude: shipment?.shipment_destination.latitude,
			},
		};
		setState({
			...state,
			shipmentDetails,
			shipmentCurrentTab: 'item1',
			editShipment: !state.editShipment
		});
		setShowModal(false);
		console.log(state.shipmentDetails);
	};

	const removeShipment = async (shipment_id: string) => {
		setRemoveShipmentLoader(true);
		await deleteShipment(shipment_id).then(
			(response) => {
				console.log(response);
				toast.success('Item Removed Successfully', {
					progressClassName: 'bg-green-500 h-1',
					autoClose: 3000,
				});
				getAllUserShipment();
				setRemoveShipmentLoader(false);
			},
			(error) => {
				console.log(error);
				setRemoveShipmentLoader(false);
			}
		);
	};

	const handleRemoveItem = (shipment_id: string | undefined) => {
		confirmAlert({
			title: 'Remove?',
			message: `Are you sure you want to remove Shipment  ${shipment_id}`,
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						removeShipment(shipment_id as string);
						setShowModal(false);
					},
				},
				{
					label: 'No',
					onClick: () => {},
				},
			],
		});
	};
	return {
		image_slider_settings,
		removeShipmentLoader,
		handleRemoveItem,
		handleEdit,
		handleCloseModal,
	};
}
export default useShipmentModal;
