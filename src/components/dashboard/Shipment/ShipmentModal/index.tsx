import { AiOutlineClose, AiOutlineEdit, package1 } from '@/assets';
import React, { Dispatch, SetStateAction, FC } from 'react';
import Slider from 'react-slick';
import useShipmentModal from './useShipmentModal';

interface shipmentModalProps {
	setShowModal: (value: boolean) => void;
}

const shipmentModal: FC<shipmentModalProps> = ({ setShowModal }) => {
	const { image_slider_settings, handleRemoveItem, handleEdit, handleCloseModal } =
		useShipmentModal(setShowModal);
	return (
		<div className=" fixed h-full  w-full top-0 left-0  z-30 bg-black bg-opacity-50 flex justify-center items-center">
			<div className=" w-11/12  fixed bg-white rounded-md shadow-lg pb-3 ">
				<div className="flex  w-full justify-between px-2 py-2  bg-blue-50 rounded-t-md ">
					<span>ship-xxxxxxxxxx</span>
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
							<div className="h-full w-full">
								<img src={package1} className="object-contain" />
							</div>

							<div className="h-full w-full">
								<img src={package1} className="object-contain" />
							</div>
							<div className="h-full w-full">
								<img src={package1} className="object-contain" />
							</div>
							<div className="h-full w-full">
								<img src={package1} className="object-contain" />
							</div>
							<div className="h-full w-full">
								<img src={package1} className="object-contain" />
							</div>
							<div className="h-full w-full">
								<img src={package1} className="object-contain" />
							</div>
						</Slider>
					</div>
					<div className="flex-grow p-5 relative">
						<h2 className=" font-extrabold text-2xl">Shipment Title</h2>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum at iure repellat!
							Quia, voluptas. Necessitatibus vel doloribus laboriosam, libero maiores animi! Quos
							reiciendis nisi ipsa commodi repudiandae omnis est sed.
						</p>
						<div className="flex flex-col md:flex-row p-5 rounded mt-2 bg-slate-200 gap-5">
							<div>
								<h2 className="text-xl font-bold">From:</h2>
								<p>20, Adebayo Close, Okota, isolo, Lagos Nigeria</p>
							</div>
							<div>
								<h2 className="text-xl font-bold">Destination</h2>
								<p>20, Adebayo Close, Okota, isolo, Lagos Nigeria</p>
							</div>
						</div>
						<div className="md:absolute bottom-0 flex flex-col md:flex-row items-center justify-between md:px-5 w-full right-0">
							<div className="font-bold text-xl my-3 md:my-0">Shipment Price: #5,000</div>
							<div className="flex flex-col md:flex-row w-full gap-3">
								<div className="md:p-3">
									<button
										onClick={handleEdit}
										className="bg-blue-700 rounded-full w-full flex-grow md:flex-grow-0 text-white flex space-x-2 items-center justify-between shadow-md">
										<span className=' px-3 py-1'>Edit</span>
										<div className='rounded-full h-8 w-8 object-contain flex items-center justify-center bg-blue-900'><AiOutlineEdit /></div>
									</button>

								</div>

								<div className="md:p-3">
									<button
										onClick={handleRemoveItem}
										className="bg-red-500 rounded-full flex-grow md:flex-grow-0 w-full justify-between text-white flex space-x-2 items-center shadow-md"
									>
										<span className=' px-3 py-1'>Remove</span>
										<div className='rounded-full h-8 w-8 object-contain flex items-center justify-center bg-red-700'><AiOutlineClose /></div>
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
