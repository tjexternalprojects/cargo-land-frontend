function useShipmentModal(
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
	selectedShipment:any
) {
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
    const arrangeImage =()={
        
    }

	return { handleCloseModal };
}

export default useShipmentModal;
