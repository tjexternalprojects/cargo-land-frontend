import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserServices } from '@/services';
import { confirmAlert } from 'react-confirm-alert';
import { AppContextType, AppContext } from '@/context';
import { toast } from 'react-toastify';
function useShipmentModal(
	modalSelectedShipment: any,
) {
	const { adminGetSingleUser } = UserServices();
	const [shipmentImages, setShipmentImages] = useState<any>([]);
	const [shipmentCreator, setShipmentCreator] = useState<Record<string, string | string[]>>({});
	const [showRejectShipmentModal, setShowRejectShipmentModal] = useState(false);
	const [showUpdateShipmentPrice, setShowUpdateShipmentPrice] = useState(false);
	const [shipmentCurrentPrice, setShipmentCurrentPrice] = useState<number>(0);
	const { state, setState } = useContext<AppContextType>(AppContext);

	const navigate = useNavigate();


	const arrangeImage = () => {
		const shipment_images: Record<string, string>[] = [];
		for (let i = 0; i < modalSelectedShipment?.images?.length; i++) {
			let image_obj = {
				original: modalSelectedShipment.images[i],
				thumbnail: modalSelectedShipment.images[i],
			};
			shipment_images.push(image_obj);
		}

		setShipmentImages(shipment_images);
		console.log(shipmentImages);
	};

	const handleViewOnMap = (shipment_id: string) => {
		navigate(`/admin/shipment/update/${shipment_id}`);
	};

	const handleSetOnTransit = (shipment_id: string) => {
		navigate(`/admin/shipment/update/${shipment_id}`);
	};

	const getUserDetails = async () => {
		console.log(modalSelectedShipment, 'user IDDDDDDD');
		await adminGetSingleUser(modalSelectedShipment.userID).then(
			(response) => {
				setShipmentCreator(response.data.user);
				console.log(response);
			},
			(error) => {
				console.log(error);
			}
		);
	};

	const handleUpdatePrice = (currentPrice: number) => {
		setShipmentCurrentPrice(currentPrice);
		setShowUpdateShipmentPrice(true);
	};
	const handleRejectShipment = (modalSelectedShipment: any) => {
		confirmAlert({
			title: 'Reject Shipment?',
			message: `Are you sure you want to reject ${modalSelectedShipment.shipment_title} with ID: ${modalSelectedShipment.id}`,
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						setShowRejectShipmentModal(true);
					},
				},
				{
					label: 'No',
					onClick: () => {},
				},
			],
		});
	};

	useEffect(() => {
		arrangeImage();
		getUserDetails();
	}, [modalSelectedShipment]);
	return {
		handleViewOnMap,
		getUserDetails,
		handleRejectShipment,
		setShowRejectShipmentModal,
		setShowUpdateShipmentPrice,
		handleUpdatePrice,
		handleSetOnTransit,
		shipmentCurrentPrice,
		showUpdateShipmentPrice,
		showRejectShipmentModal,
		shipmentCreator,
		shipmentImages,
	};
}

export default useShipmentModal;
