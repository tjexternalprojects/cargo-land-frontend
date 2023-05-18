import { useEffect, useState } from "react";

function useShipmentModal(
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
	selectedShipment:any
) {
	const [shipmentImages, setShipmentImages] = useState<any>([])
	const handleCloseModal = () => {
		setShowModal(false);
	};

    const shipment_images = [
			{
				original: 'https://picsum.photos/id/1018/1000/600/',
				thumbnail: 'https://picsum.photos/id/1018/250/150/',
			},
			{
				original: 'https://picsum.photos/id/1015/1000/600/',
				thumbnail: 'https://picsum.photos/id/1015/250/150/',
			},
			{
				original: 'https://picsum.photos/id/1019/1000/600/',
				thumbnail: 'https://picsum.photos/id/1019/250/150/',
			},
		];
    const arrangeImage =()=>{
		const shipment_images:Record<string,string>[] =[]
		for (let i = 0; i < selectedShipment.images.length; i++) {
			let image_obj = {
				original:selectedShipment.images[i],
				thumbail:selectedShipment.images[i]
			}
			shipment_images.push(image_obj)
		}
	
		setShipmentImages(shipment_images)
		console.log(shipmentImages)
    }
	useEffect(()=>{
		arrangeImage()
	},[selectedShipment])
	return { handleCloseModal , shipmentImages};
}

export default useShipmentModal;
