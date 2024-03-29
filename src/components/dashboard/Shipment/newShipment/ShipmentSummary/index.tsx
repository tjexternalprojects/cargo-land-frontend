import { FC } from 'react';
import {
	AiOutlineClose,
	AiOutlineEdit,
	BsCartCheck,
	MdTrackChanges,
	MdViewInAr,
	package1,
	RiUserReceivedLine,
	userImg,
} from '@/assets';

import useShipmentSummary from './useShipmentSummary';
import { RingLoader, ShipmentModal } from '@/components';

const RecipientDetails = () => {
	const {
		image_slider_settings,
		showShipmentModal,
		unCheckedShipment,
		totalPrice,
		itemIndexToRemove,
		removeShipmentLoader,
		selectedShipment,
		shipmentLoader,
		totalShipmentToCheckout,
		handleCheck,
		handleAddShipment,
		handleRemoveItem,
		handleShowModal,
		handlePayment,
		handleSummary,
		setShowShipmentModal,
	} = useShipmentSummary();
	return (
		<>
			<div className="inline-flex flex-col  w-full  md:ml-40 ">
				<div className="flex gap-5 px-3">
					<div className="bg-white  rounded-sm shadow-md  box-border w-full">
						<div className=" h-screen-55 rounded-md overflow-auto w-full p-3 ">
							<table className=" w-full  bg-white rounded-sm">
								<thead className=" text-left  w-full bg-slate-100">
									<tr>
										<th>Select</th>
										<th className="p-3">Shipment&nbsp;Id</th>
										<th>Current Location</th>
										<th>Destination</th>
										<th>Shipment Type</th>
										<th>Price</th>
										<td></td>
									</tr>
								</thead>
								<tbody className=" overflow-y-auto">
									{unCheckedShipment?.map((val: any, index: number) => (
										<tr key={index} className=" border-b hover:bg-slate-300  text-sm">
											<td>
												<input
													className="cursor-pointer w-6"
													onChange={() => handleCheck(index)}
													type="checkbox"
													disabled={isNaN(val.delivery_price)}
													checked={!isNaN(val.delivery_price) && val.checked}
												/>{' '}
											</td>
											<td
												className="p-3 underline cursor-pointer text-blue-800"
												onClick={() => handleShowModal(val)}
											>
												{val.id}
											</td>
											<td className="p-3 w-1/4">{val.start_location?.formattedAddress}</td>
											<td className="p-3 w-1/4">{val.final_destination?.formattedAddress}</td>
											<td className="p-3 w-1/4 font-bold">
												{val.shipment_Type === 'AIRPORT_TO_AIRPORT'
													? 'Airport to Airport'
													: 'Door to Door'}
											</td>

											<td className="p-3">
												{val.delivery_price === 'await_admin'
													? 'Admin Determine Price'
													: Number(val.delivery_price).toLocaleString()}
											</td>
											<td>
												<button
													onClick={() => handleRemoveItem(val.id)}
													className="bg-red-500 rounded-full flex-grow md:flex-grow-0 w-full justify-between text-white flex space-x-2 items-center shadow-md"
												>
													<span className=" px-3 py-1">Delete</span>
													{removeShipmentLoader && itemIndexToRemove === val.id ? (
														<RingLoader loaderColor={'white'} size={30} textColor="text-blue-900" />
													) : (
														<div className="rounded-full h-8 w-8 object-contain flex items-center justify-center bg-red-700">
															<AiOutlineClose />
														</div>
													)}
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className=" bottom-5 w-full  ">
							<div className="bg-slate-100 p-5">
								<div>
									Total Package Selected:{' '}
									<span className="font-extrabold">{totalShipmentToCheckout}</span>
								</div>
								<div>
									Total Amount:{' '}
									<span className="font-extrabold">&#8358;{totalPrice.toLocaleString()}</span>
								</div>
							</div>
							<div className="flex justify-between p-5 gap-4 flex-wrap md:flex-nowrap">
								<button
									disabled={shipmentLoader || totalPrice === 0}
									onClick={handlePayment}
									className={`flex md:flex-grow-0 flex-grow items-center  justify-between  space-x-3 text-white  hover:transition-all duration-150 ease-in-out hover:shadow-md hover:shadow-blue-100  shadow-md shadow-slate-300 ${
										totalPrice === 0 ? 'bg-red-100' : 'bg-red-700'
									}`}
								>
									<div className="p-2">Checkout</div>
									<div
										className="bg-red-900 rounded-l-full h-full w-10  flex items-center justify-center
									"
									>
										{shipmentLoader ? <RingLoader size={30} loaderColor="#fff" /> : <BsCartCheck />}
									</div>
								</button>

								<button
									onClick={handleAddShipment}
									className="flex md:flex-grow-0 flex-grow items-center bg-blue-700 justify-between  space-x-3 text-white  hover:transition-all duration-150 ease-in-out hover:shadow-md hover:shadow-blue-100  shadow-md shadow-slate-300"
								>
									<div className="p-2">Add More Shipment</div>
									<div
										className="bg-blue-900 rounded-l-full h-full w-10  flex items-center justify-center
									"
									>
										+
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{showShipmentModal && (
				<ShipmentModal selectedShipment={selectedShipment} setShowModal={setShowShipmentModal} />
			)}
		</>
	);
};

export default RecipientDetails;
