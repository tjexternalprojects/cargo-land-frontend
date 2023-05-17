import React from 'react';
import {AiOutlineClose} from '@/assets'
import useShipmentModal from './useShipmentModal';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

interface ShipmentModalProps {
	selectedShipment: any;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const images = [
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


const ShipmentModal = ({ selectedShipment, setShowModal }: ShipmentModalProps) => {



	const { handleCloseModal } = useShipmentModal(setShowModal, selectedShipment);
	console.log(selectedShipment);
	return (
		<div className=" fixed h-full  w-full top-0 left-0  z-30 bg-black bg-opacity-50 flex justify-center items-center">
			<div className=" w-11/12  fixed bg-white shadow-lg pb-3 ">
				<div className="flex  w-full justify-between px-3 py-2 text-white  bg-blue-900  ">
					<div>
						<span className="font-bold">Tracking ID: </span>
						<span className=" font-light">{selectedShipment?.id}</span>
					</div>
					<div
						className="rounded-full shadow-lg hover:shadow-blue-200 hover:bg-white hover:text-blue-900 transition-all duration-75 ease-in-out cursor-pointer p-2 "
						onClick={handleCloseModal}
					>
						<AiOutlineClose />
					</div>
				</div>
				<div className="px-3 flex">
					<div>
						<ImageGallery items={images} />
					</div>
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default ShipmentModal;
