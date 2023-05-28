import React from 'react';
import { AiOutlineClose, AiOutlineEdit, shipmentDefaultImg } from '@/assets';
import useShipmentModal from './useSingleShipmentModal';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { RejectShipmentModal, RingLoader } from '@/components';
interface ShipmentModalProps {
	selectedShipment: any;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShipmentModal = ({ selectedShipment, setShowModal }: ShipmentModalProps) => {
	const {
		handleCloseModal,
		setShowRejectShipmentModal,
		setSelectedShipmentProps,
		handleEdit,
		handleDeleteItem,
		removeShipmentLoader,
		selectedShipmentProps,
		showRejectShipmentModal,
		shipmentCreator,
		shipmentImages,
	} = useShipmentModal(setShowModal, selectedShipment);
	return (
		<div className=" fixed h-full  w-full top-0 left-0  z-30 bg-black bg-opacity-50 flex justify-center items-center">
			<div className=" md:w-9/12 w-11/12  fixed bg-white shadow-lg pb-3 ">
				<div className="flex  w-full justify-between px-3 py-2 text-white  bg-blue-900  ">
					<div>
						<span className="font-bold">Tracking ID: </span>
						<span className=" font-light">{selectedShipmentProps?.id}</span>
					</div>
					<div
						className="rounded-full shadow-lg hover:shadow-blue-200 hover:bg-white hover:text-blue-900 transition-all duration-75 ease-in-out cursor-pointer p-2 "
						onClick={handleCloseModal}
					>
						<AiOutlineClose />
					</div>
				</div>
				<div className="px-3 flex gap-4 flex-col overflow-y-auto  md:flex-row max-h-70-screen">
					<div className="p-2 md:overflow-y-auto w-1/2 flex-grow">
						{/* <div className=" md:w-96 h-96 border bg-red-500 "> */}
						<div className=" max-w-xl  ">
							{shipmentImages.length > 0 ? (
								<ImageGallery lazyLoad={true} items={shipmentImages} />
							) : (
								<div>
									<img src={shipmentDefaultImg} />
								</div>
							)}
						</div>
						{/* </div> */}
						<div className="w-full text-center">
							<div className="p-2 uppercase font-extrabold">{selectedShipment?.shipment_title}</div>
							<div>
								Shipment Status:
								<span
									className={`
								 ${selectedShipmentProps.shipment_Status === 'UNCHECK' ? 'text-blue-500' : ''} 
								 ${selectedShipmentProps.shipment_Status === 'CHECKED' ? 'text-green-700' : ''} 
								 ${selectedShipmentProps.shipment_Status === 'TRANSIT' ? 'text-green-500' : ''} 
								 ${selectedShipmentProps.shipment_Status === 'REJECTED' ? 'text-red-500' : ''} 
								 font-bold`}
								>
									{selectedShipmentProps.shipment_Status}
								</span>
							</div>
							<div className="p-2 uppercase ">
								Delivery Price:
								{selectedShipmentProps?.delivery_price !== 'await_admin' ? (
									<span className="font-extrabold">
										&#8358;
										{Number(selectedShipmentProps?.delivery_price).toLocaleString()}
									</span>
								) : (
									<span className="font-extrabold">Await Admin</span>
								)}
							</div>
						</div>

						{selectedShipmentProps?.shipment_Status === 'UNCHECK' && (
							<div className="flex  justify-center flex-col md:flex-row w-full gap-3">
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
										onClick={() => handleDeleteItem(selectedShipment?.id as string)}
										className="bg-red-500 rounded-full flex-grow md:flex-grow-0 w-full justify-between text-white flex space-x-2 items-center shadow-md"
									>
										<span className=" px-3 py-1">Delete</span>
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
						)}
					</div>
					<div className="w-full md:overflow-y-auto  ">
						<div className=" md:pt-0 pt-3 space-y-4 ">
							<div className="border relative p-3 rounded text-slate-500">
								<span className="absolute -top-3 bg-white px-2 left-2 font-bold">
									Shipment Details
								</span>
								<div className="flex flex-col ">
									<div className=" border-l-2 w-full bg-slate-100 p-2">Tracking ID:</div>
									<div className="p-2 font-bold">{selectedShipment.id}</div>
								</div>
								<div className="flex flex-col ">
									<div className=" border-l-2 w-full bg-slate-100 p-2">Title:</div>
									<div className="p-2">{selectedShipmentProps.shipment_title}</div>
								</div>

								<div className="flex flex-col ">
									<div className=" border-l-2 w-full bg-slate-100 p-2">Description:</div>
									<div className="p-2 overflow-y-auto max-h-50-screen">
										{selectedShipmentProps.shipment_description}
									</div>
								</div>

								<div className="flex flex-col ">
									<div className=" border-l-2 w-full bg-slate-100 p-2">Weight:</div>
									<div className="p-2">{selectedShipmentProps?.shipment_weight}kg</div>
								</div>

								<div className="flex flex-col ">
									<div className=" border-l-2 w-full bg-slate-100 p-2">Delivery Mode</div>
									<div className="p-2 uppercase font-extrabold">
										{selectedShipmentProps?.shipment_Type === 'AIRPORT_TO_AIRPORT'
											? 'Airport to Airport'
											: 'Door to Door'}
									</div>
								</div>
								<div className="border relative p-3 rounded mt-3 shadow ">
									<span className="absolute -top-3 bg-white px-2 left-1 font-bold">
										Shipment Location
									</span>
									<div className="flex flex-col ">
										<div className=" border-l-2 w-full bg-slate-100 p-2">
											Shipment Start Location:
										</div>
										<div className="p-2">{selectedShipmentProps?.sendersAddress}</div>
									</div>

									<div className="flex flex-col ">
										<div className=" border-l-2 w-full bg-slate-100 p-2">
											Shipment Current Location:
										</div>
										<div className="p-2 font-bold">{selectedShipmentProps?.currentLocation}</div>
									</div>

									<div className="flex flex-col ">
										<div className=" border-l-2 w-full bg-slate-100 p-2">Shipment Destination:</div>
										<div className="p-2 ">{selectedShipmentProps?.recepientAddress}</div>
									</div>
								</div>
							</div>

							<div className="border relative p-3 rounded text-slate-500">
								<span className="absolute -top-3 bg-white px-2 left-1 font-bold">
									Shipment Creator Details
								</span>
								<div className="flex flex-col ">
									<div className=" border-l-2 w-full bg-slate-100 p-1">Full Name</div>
									<div className="p-2">{shipmentCreator?.name}</div>
								</div>

								<div className="flex flex-col ">
									<div className=" border-l-2 w-full bg-slate-100 p-1">Email Address</div>
									<div className="p-2">{shipmentCreator?.email}</div>
								</div>

								<div className="flex flex-col ">
									<div className=" border-l-2 w-full bg-slate-100 p-1">Phone Number</div>
									<div className="p-2">{shipmentCreator?.phoneNumber}</div>
								</div>
							</div>

							<div className="border relative p-3 rounded text-slate-500">
								<span className="absolute -top-3 bg-white px-2 left-2 font-bold">
									Recipient Details
								</span>
								<div className="flex flex-col ">
									<div className=" border-l-2 w-full bg-slate-100 p-2">Recipient Full Name</div>
									<div className="p-2">{selectedShipmentProps.recipient_full_name}</div>
								</div>

								<div className="flex flex-col ">
									<div className=" border-l-2 w-full bg-slate-100 p-2">Recipient Email Address</div>
									<div className="p-2">{selectedShipmentProps.recipient_email}</div>
								</div>

								<div className="flex flex-col ">
									<div className=" border-l-2 w-full bg-slate-100 p-2">Recipient Phone Number</div>
									<div className="p-2">{selectedShipmentProps?.recipient_phone_number}</div>
								</div>
							</div>
						</div>
						<div></div>
					</div>
				</div>
			</div>
			{showRejectShipmentModal && (
				<RejectShipmentModal
					selectedShipment={selectedShipmentProps}
					setShowRejectShipmentModal={setShowRejectShipmentModal}
					setShowModal={setShowModal}
				/>
			)}
		</div>
	);
};

export default ShipmentModal;
