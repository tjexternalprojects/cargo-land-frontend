import React from 'react';
import { AiOutlineClose } from '@/assets';
import useShipmentModal from './useSingleShipmentModal';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import {RejectShipmentModal} from '@/components'
interface ShipmentModalProps {
	selectedShipment: any;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShipmentModal = ({ selectedShipment, setShowModal }: ShipmentModalProps) => {
	const { handleCloseModal, handleViewOnMap, handleRejectShipment, setShowRejectShipmentModal,setSelectedShipmentProps, selectedShipmentProps, showRejectShipmentModal, shipmentCreator, shipmentImages } = useShipmentModal(setShowModal, selectedShipment);
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
				<div className="px-3 flex gap-4 flex-col  md:flex-row max-h-70-screen">
					<div className="p-2 md:overflow-y-auto">
						{/* <div className=" md:w-96 h-96 border bg-red-500 "> */}
						<div className=" max-w-xl  ">
							<ImageGallery lazyLoad={true} items={shipmentImages} />
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
									<button className="px-2 py-1 bg-blue-800 text-white rounded">Add Price</button>
								)}
							</div>
							<div className='mt-3'>
								{selectedShipmentProps.shipment_Status === 'CHECKED' && <div className='gap-2 flex w-full justify-between'>
									<button onClick={() => handleViewOnMap(selectedShipmentProps.id)} className="px-2 py-1 bg-green-800 text-white rounded">Mark as Transit</button>
									<button onClick={()=>handleRejectShipment(selectedShipmentProps)} className="px-2 py-1 bg-red-500 text-white rounded">Reject Shipment</button>

								</div>}
								{selectedShipment.shipment_Status === 'TRANSIT' && <button className="px-2 py-1 bg-green-800 text-white rounded">Update Location</button>}
								{selectedShipment.shipment_Status === 'REJECTED' && <button className="px-2 py-1 bg-red-500 text-white rounded">REFUND MONEY</button>}
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
									<div className="w-full flex">
										<button
											onClick={() => handleViewOnMap(selectedShipmentProps.id)}
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
			{showRejectShipmentModal && <RejectShipmentModal selectedShipment={selectedShipmentProps} setShowRejectShipmentModal={setShowRejectShipmentModal} setShowModal={setShowModal}/>}
		</div>
	);
};

export default ShipmentModal;
