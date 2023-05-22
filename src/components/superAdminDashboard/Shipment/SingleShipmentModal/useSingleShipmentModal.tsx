import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserServices } from '@/services';
import { confirmAlert } from 'react-confirm-alert';
import { AppContextType, AppContext } from '@/context';
import { toast } from 'react-toastify';
function useShipmentModal(
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
	selectedShipment: any
) {
	const {adminGetSingleUser} = UserServices()
	const [shipmentImages, setShipmentImages] = useState<any>([]);
	const [shipmentCreator, setShipmentCreator] = useState<Record<string, string| string[]>>({})
	const [showRejectShipmentModal, setShowRejectShipmentModal] = useState(false)
	const [selectedShipmentProps, setSelectedShipmentProps]= useState<any>(selectedShipment)
	const { state, setState } = useContext<AppContextType>(AppContext);

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

	const handleViewOnMap = (shipment_id: string) => {
		navigate(`/admin/shipment/update/${shipment_id}`);
	};

	const getUserDetails = async()=>{
		await adminGetSingleUser(selectedShipment.userID).then(response=>{
			setShipmentCreator(response.data.user)
			console.log(response)
		}, error=>{
			console.log(error)
		})
	}

const handleRejectShipment =(selectedShipment: any)=>{
	confirmAlert({
		title: 'Reject Shipment?',
		message: `Are you sure you want to reject ${selectedShipment.shipment_title} with ID: ${selectedShipment.id}`,
		buttons: [
			{
				label: 'Yes',
				onClick: () => {
					setShowRejectShipmentModal(true)
				},
			},
			{
				label: 'No',
				onClick: () => {},
			},
		],
	});
}

	useEffect(() => {
		arrangeImage();
		getUserDetails();
	}, [selectedShipment]);
	return { handleCloseModal, handleViewOnMap, getUserDetails, handleRejectShipment, setShowRejectShipmentModal,setSelectedShipmentProps, selectedShipmentProps,  showRejectShipmentModal,  shipmentCreator, shipmentImages };
}

export default useShipmentModal;
