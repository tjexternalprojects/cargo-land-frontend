import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserServices, ShipmentServices } from '@/services';
import { confirmAlert } from 'react-confirm-alert';
import { AppContextType, AppContext } from '@/context';
import { toast } from 'react-toastify';
function useShipmentModal(
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
	selectedShipment: any
) {
	const { adminGetSingleUser } = UserServices()
	const [shipmentImages, setShipmentImages] = useState<any>([]);
	const [shipmentCreator, setShipmentCreator] = useState<Record<string, string | string[]>>({})
	const [showRejectShipmentModal, setShowRejectShipmentModal] = useState(false)
	const [selectedShipmentProps, setSelectedShipmentProps] = useState<any>(selectedShipment)
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [removeShipmentLoader, setRemoveShipmentLoader] = useState(false);
	const { deleteShipment, getAllUserShipment } = ShipmentServices();


	const navigate = useNavigate();
	const handleCloseModal = () => {
		setShowModal(false);
	};

	const arrangeImage = () => {
		const shipment_images: Record<string, string>[] = [];
		for (let i = 0; i < selectedShipment.images.length; i++) {
			let image_obj = {
				original: selectedShipment.images[i],
				thumbnail: selectedShipment.images[i],
			};
			shipment_images.push(image_obj);
		}

		setShipmentImages(shipment_images);
		console.log(shipmentImages);
	};



	const getUserDetails = async () => {
		await adminGetSingleUser(selectedShipment.userID).then(response => {
			setShipmentCreator(response.data.user)
			console.log(response)
		}, error => {
			console.log(error)
		})
	}


	const handleEdit = (shipment: Record<string, any> | undefined) => {
		console.log(shipment)
		shipmentToEdit(shipment);
	};

	const shipmentToEdit = (shipment: Record<string, any> | undefined) => {
		const shipmentDetails = {
			shipment_id: shipment?.id,
			shipment_title: shipment?.shipment_title,
			shipment_description: shipment?.shipment_description,
			shipment_weight: shipment?.shipment_weight,
			images: shipment?.images,
			shipment_type: shipment?.shipment_type,
			start_location: {
				location_id: shipment?.start_location?.location_id,
				country: shipment?.start_location?.country,
				state: shipment?.start_location?.state,
				city: shipment?.start_location?.city,
				address: shipment?.start_location?.address,
				formattedAddress: shipment?.start_location?.formattedAddress,
				longitude: shipment?.current_location?.longitude,
				latitude: shipment?.current_location?.latitude,
			},
			recipient_full_name: shipment?.recipient_full_name,
			recipient_email: shipment?.recipient_email,
			final_destination: {
				location_id: shipment?.final_destination?.location_id,
				country: shipment?.final_destination?.country,
				state: shipment?.final_destination?.state,
				city: shipment?.final_destination?.city,
				address: shipment?.final_destination?.address,
				formattedAddress: shipment?.final_destination?.formattedAddress,
				longitude: shipment?.final_destination?.longitude,
				latitude: shipment?.final_destination?.latitude,
			},
			shipment_current_location: {},
			shipment_heading_to: {},
			shipment_addresses: [],
		};
		setState({
			...state,
			shipmentDetails,
			shipmentCurrentTab: 'item1',
			editShipment: true,
		});

		setShowModal(false);
	};

	const removeShipment = async (shipment_id: string) => {
		setRemoveShipmentLoader(true);
		await deleteShipment(shipment_id).then(
			(response) => {
				toast.success('Item Removed Successfully', {
					progressClassName: 'bg-green-500 h-1',
					autoClose: 3000,
				});
				getAllUserShipment();
				setRemoveShipmentLoader(false);
			},
			(error) => {
				setRemoveShipmentLoader(false);
			}
		);
	};

	const handleDeleteItem = (shipment_id: string | undefined) => {
		confirmAlert({
			title: 'Remove?',
			message: `Are you sure you want to delete Shipment  ${shipment_id}`,
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
					onClick: () => { },
				},
			],
		});
	};


	useEffect(() => {
		arrangeImage();
		getUserDetails();
	}, [selectedShipment]);
	return { handleCloseModal, getUserDetails, setShowRejectShipmentModal, setSelectedShipmentProps, handleEdit, handleDeleteItem, removeShipmentLoader, selectedShipmentProps, showRejectShipmentModal, shipmentCreator, shipmentImages };
}

export default useShipmentModal;
