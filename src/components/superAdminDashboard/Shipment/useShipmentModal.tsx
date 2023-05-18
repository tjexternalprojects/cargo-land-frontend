import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function useShipmentModal(
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
	selectedShipment: any
) {
	const [shipmentImages, setShipmentImages] = useState<any>([]);
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
		navigate(`/admin/track_shipment/${shipment_id}`);
	};
	useEffect(() => {
		arrangeImage();
	}, [selectedShipment]);
	return { handleCloseModal, handleViewOnMap, shipmentImages };
}

export default useShipmentModal;
