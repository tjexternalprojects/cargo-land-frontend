import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserServices, ShipmentServices } from '@/services';
import { confirmAlert } from 'react-confirm-alert';
import { AppContextType, AppContext } from '@/context';
import { toast } from 'react-toastify';
function useShipmentModal(modalSelectedShipment: any, setSelectedShipment: any) {
	const { adminGetSingleUser } = UserServices();
	const { updateShipmentToTransit } = ShipmentServices();
	const [shipmentImages, setShipmentImages] = useState<any>([]);
	const [shipmentCreator, setShipmentCreator] = useState<Record<string, string | string[]>>({});
	const [showRejectShipmentModal, setShowRejectShipmentModal] = useState(false);
	const [showUpdateShipmentPrice, setShowUpdateShipmentPrice] = useState(false);
	const [shipmentCurrentPrice, setShipmentCurrentPrice] = useState<number>(0);
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [transitLoader, setTransitLoader] = useState(false);
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
	};

	const handleViewOnMap = (shipment_id: string) => {
		navigate(`/admin/shipment/update/${shipment_id}`);
	};

	const handleSetOnTransit = (shipment_id: string) => {
		confirmAlert({
			title: 'Set Shipment on Transit?',
			message: 'Are you sure you want to set this shipment on transit',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						setTransitLoader(true);
						updateShipmentToTransit(shipment_id).then(
							(response) => {
								setSelectedShipment(response.data);
								setTransitLoader(false);
							},
							(error) => {
								setTransitLoader(false);
							}
						);
					},
				},
				{
					label: 'No',
					onClick: () => {},
				},
			],
		});
	};

	const getUserDetails = async () => {
		await adminGetSingleUser(modalSelectedShipment.userID).then(
			(response) => {
				setShipmentCreator(response.data.user);
			},
			(error) => {}
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
		transitLoader,
		shipmentCurrentPrice,
		showUpdateShipmentPrice,
		showRejectShipmentModal,
		shipmentCreator,
		shipmentImages,
	};
}

export default useShipmentModal;
