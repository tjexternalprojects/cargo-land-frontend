import { AiOutlineClose, AiOutlineEdit, package1 } from '@/assets';
import React, { Dispatch, SetStateAction, FC, useState } from 'react';
import Slider from 'react-slick';
import useShipmentModal from './useShipmentModal';
import { RingLoader } from '@/components';

interface shipmentModalProps {
	setShowModal: (value: boolean) => void;
	selectedShipment: Record<string, string | string[] | undefined> | undefined;
}

const shipmentModal: FC<shipmentModalProps> = ({ setShowModal, selectedShipment }) => {
	const {
		image_slider_settings,
		removeShipmentLoader,
		handleRemoveItem,
		handleEdit,
		handleCloseModal,
	} = useShipmentModal(setShowModal);
	const [images, setImages] = useState(selectedShipment?.images as string[]);
	return (
		<div className=" fixed h-full  w-full top-0 left-0  z-30 bg-black bg-opacity-50 flex justify-center items-center">
			<div className=" w-11/12  fixed bg-white rounded-md shadow-lg pb-3 ">
				<div className="flex  w-full justify-between px-2 py-2  bg-blue-50 rounded-t-md ">
					<span>{selectedShipment?.id}</span>
					<div
						className="rounded-full shadow-lg hover:shadow-blue-200 hover:bg-blue-400 hover:text-white transition-all duration-75 ease-in-out cursor-pointer p-2 "
						onClick={handleCloseModal}
					>
						<AiOutlineClose />
					</div>
				</div>
				<div className="flex md:flex-row flex-col overflow-y-auto h-screen-60  md:h-screen-80 ">
					<div className="flex-grow w-1/2 h-full m-10">
						<Slider {...image_slider_settings}>
							{images.map((images: string, index: number) => (
								<div key={index} className="h-full w-full">
									<img src={images} className="object-contain" />
								</div>
							))}
						</Slider>
					</div>
					<div className="flex-grow p-5 relative">
						<h2 className=" font-extrabold text-2xl">{selectedShipment?.shipment_title}</h2>
						<p>{selectedShipment?.shipment_description}</p>
						<div className="flex flex-col md:flex-row p-5 rounded mt-2 bg-slate-200 gap-5">
							<div>
								<h2 className="text-xl font-bold">From:</h2>
								<p>{selectedShipment?.sendersAddress}</p>
							</div>
							<div>
								<h2 className="text-xl font-bold">Destination</h2>
								<p>{selectedShipment?.recepientAddress}</p>
							</div>
						</div>
						<div className="md:absolute bottom-0 flex flex-col md:flex-row items-center justify-between md:px-5 w-full right-0">
							<div className="font-bold text-xl my-3 md:my-0">
								Delivery Price: &#8358;
								{selectedShipment?.delivery_price?.toLocaleString()}
							</div>
							<div className="flex flex-col md:flex-row w-full gap-3">
								<div className="md:p-3">
									<button
										onClick={() => handleEdit(selectedShipment)}
										className="bg-blue-700 rounded-full w-full flex-grow md:flex-grow-0 text-white flex space-x-2 items-center justify-between shadow-md"
									>
										<span className=" px-3 py-1">Edit</span>
										<div className="rounded-full h-8 w-8 object-contain flex items-center justify-center bg-blue-900">
											<AiOutlineEdit />
										</div>
									</button>
								</div>

								<div className="md:p-3">
									<button
										onClick={() => handleRemoveItem(selectedShipment?.id as string)}
										className="bg-red-500 rounded-full flex-grow md:flex-grow-0 w-full justify-between text-white flex space-x-2 items-center shadow-md"
									>
										<span className=" px-3 py-1">Remove</span>
										{removeShipmentLoader ? (
											<RingLoader loaderColor={'white'} size={30} textColor="text-blue-900" />
										) : (
											<div className="rounded-full h-8 w-8 object-contain flex items-center justify-center bg-red-700">
												<AiOutlineClose />
											</div>
										)}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default shipmentModal;
