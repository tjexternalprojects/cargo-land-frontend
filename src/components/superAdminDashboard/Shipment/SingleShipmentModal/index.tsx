import React from 'react';
import { AiOutlineClose, shipmentDefaultImg } from '@/assets';
import useShipmentModal from './useSingleShipmentModal';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { UpdateShipmentPrice, RejectShipmentModal } from '@/components';
interface ShipmentModalProps {
	modalSelectedShipment: any;
	setSelectedShipment: any;
	setShowSingleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShipmentModal = ({
	modalSelectedShipment,
	setSelectedShipment,
	setShowSingleModal,
}: ShipmentModalProps) => {
	const {
		handleViewOnMap,
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
	} = useShipmentModal(modalSelectedShipment, setSelectedShipment);
	return (
		<div className=" fixed h-full  w-full top-0 left-0  z-30 bg-black bg-opacity-50 flex justify-center items-center">
			<div className=" md:w-9/12 w-11/12  fixed bg-white shadow-lg pb-3 ">
				<div className="flex  w-full justify-between px-3 py-2 text-white  bg-blue-900  ">
					<div>
						<span className="font-bold">Tracking ID: </span>
						<span className=" font-light">{modalSelectedShipment?.id}</span>
					</div>
					<div
						className="rounded-full shadow-lg hover:shadow-blue-200 hover:bg-white hover:text-blue-900 transition-all duration-75 ease-in-out cursor-pointer p-2 "
						onClick={() => setShowSingleModal(false)}
					>
						<AiOutlineClose />
					</div>
				</div>
				<div className="px-3 flex gap-4 flex-col overflow-y-auto  md:flex-row max-h-70-screen pt-4">
					<div className="p-2 md:overflow-y-auto md:w-1/2  flex-grow">
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
							<div className="p-2 uppercase font-extrabold">
								{modalSelectedShipment?.shipment_title}
							</div>
							<div>
								Shipment Status:
								<span
									className={`
								 ${modalSelectedShipment.shipment_Status === 'UNCHECK' ? 'text-blue-500' : ''} 
								 ${modalSelectedShipment.shipment_Status === 'CHECKED' ? 'text-green-700' : ''} 
								 ${modalSelectedShipment.shipment_Status === 'TRANSIT' ? 'text-green-500' : ''} 
								 ${modalSelectedShipment.shipment_Status === 'REJECTED' ? 'text-red-500' : ''} 
								 font-bold`}
								>
									{modalSelectedShipment.shipment_Status}
								</span>
							</div>
							<div className="p-2 uppercase ">
								Delivery Price:
								{modalSelectedShipment?.delivery_price !== 'await_admin' ? (
									<span className="font-extrabold">
										&#8358;
										{Number(modalSelectedShipment?.delivery_price).toLocaleString()}
									</span>
								) : (
									<button
										onClick={() => setShowUpdateShipmentPrice(true)}
										className="px-2 py-1 bg-blue-800 text-white rounded"
									>
										Add Price
									</button>
								)}
							</div>
							{modalSelectedShipment.shipment_Status === 'UNCHECK' &&
								modalSelectedShipment?.shipment_Type === 'AIRPORT_TO_AIRPORT' &&
								modalSelectedShipment?.delivery_price !== 'await_admin' && (
									<div>
										<button
											onClick={() =>
												handleUpdatePrice(Number(modalSelectedShipment?.delivery_price))
											}
											className="px-2 py-1 bg-blue-800 text-white rounded"
										>
											Update Price
										</button>
									</div>
								)}
							<div className="mt-3">
								{modalSelectedShipment.shipment_Status === 'CHECKED' && (
									<div className="gap-2 flex w-full justify-between">
										<button
											onClick={() => handleSetOnTransit(modalSelectedShipment.id)}
											className="px-2 py-1 bg-green-800 text-white rounded"
										>
											Mark as Transit
										</button>
										<button
											onClick={() => handleRejectShipment(modalSelectedShipment)}
											className="px-2 py-1 bg-red-500 text-white rounded"
										>
											Reject Shipment
										</button>
									</div>
								)}
								{modalSelectedShipment.shipment_Status === 'TRANSIT' && (
									<button
										onClick={() => handleViewOnMap(modalSelectedShipment.id)}
										className="px-2 py-1 bg-green-800 text-white rounded"
									>
										Update Location
									</button>
								)}
								{modalSelectedShipment.shipment_Status === 'REJECTED' && (
									<button className="px-2 py-1 bg-red-500 text-white rounded">REFUND MONEY</button>
								)}
							</div>
						</div>
					</div>
					<div className="w-full md:overflow-y-auto  ">
						<div className=" md:pt-0 pt-3 space-y-4 ">
							<div className="border relative p-3 rounded text-slate-500">
								<span className="absolute -top-3 bg-white px-2 left-2 font-bold">
									Shipment Details
								</span>
								<div className="flex flex-col ">
									<div className=" border-l-2 w-full bg-slate-100 p-2">Tracking ID:</div>
									<div className="p-2 font-bold">{modalSelectedShipment.id}</div>
								</div>
								<div className="flex flex-col ">
									<div className=" border-l-2 w-full bg-slate-100 p-2">Title:</div>
									<div className="p-2">{modalSelectedShipment.shipment_title}</div>
								</div>

								<div className="flex flex-col ">
									<div className=" border-l-2 w-full bg-slate-100 p-2">Description:</div>
									<div className="p-2 overflow-y-auto max-h-50-screen">
										{modalSelectedShipment.shipment_description}
									</div>
								</div>

								<div className="flex flex-col ">
									<div className=" border-l-2 w-full bg-slate-100 p-2">Weight:</div>
									<div className="p-2">{modalSelectedShipment?.shipment_weight}kg</div>
								</div>

								<div className="flex flex-col ">
									<div className=" border-l-2 w-full bg-slate-100 p-2">Delivery Mode</div>
									<div className="p-2 uppercase font-extrabold">
										{modalSelectedShipment?.shipment_Type === 'AIRPORT_TO_AIRPORT'
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
										<div className="p-2">{modalSelectedShipment?.sendersAddress}</div>
									</div>

									<div className="flex flex-col ">
										<div className=" border-l-2 w-full bg-slate-100 p-2">
											Shipment Current Location:
										</div>
										<div className="p-2 font-bold">{modalSelectedShipment?.currentLocation}</div>
									</div>

									<div className="flex flex-col ">
										<div className=" border-l-2 w-full bg-slate-100 p-2">Shipment Destination:</div>
										<div className="p-2 ">{modalSelectedShipment?.recepientAddress}</div>
									</div>
									<div className="w-full flex">
										<button
											onClick={() => handleViewOnMap(modalSelectedShipment.id)}
											className="bg-blue-900 text-white px-2 py-1 rounded ml-auto"
										>
											View On Map
										</button>
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
									<div className="p-2">{modalSelectedShipment.recipient_full_name}</div>
								</div>

								<div className="flex flex-col ">
									<div className=" border-l-2 w-full bg-slate-100 p-2">Recipient Email Address</div>
									<div className="p-2">{modalSelectedShipment.recipient_email}</div>
								</div>

								<div className="flex flex-col ">
									<div className=" border-l-2 w-full bg-slate-100 p-2">Recipient Phone Number</div>
									<div className="p-2">{modalSelectedShipment?.recipient_phone_number}</div>
								</div>
							</div>
						</div>
						<div></div>
					</div>
				</div>
			</div>
			{showRejectShipmentModal && (
				<RejectShipmentModal
					selectedShipment={modalSelectedShipment}
					setShowRejectShipmentModal={setShowRejectShipmentModal}
					setShowModal={setShowSingleModal}
				/>
			)}
			{showUpdateShipmentPrice && (
				<UpdateShipmentPrice
					setShowUpdateShipmentPrice={setShowUpdateShipmentPrice}
					setSelectedShipment={setSelectedShipment}
					selectedShipment={modalSelectedShipment}
					shipmentCurrentPrice={shipmentCurrentPrice}
				/>
			)}
		</div>
	);
};

export default ShipmentModal;
