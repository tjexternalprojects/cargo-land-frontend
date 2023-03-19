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
import { ToastContainer } from 'react-toastify';
import Slider from 'react-slick';

import useShipmentSummary from './useShipmentSummary';
import { ShipmentModal } from '@/components';

const RecipientDetails = () => {
	const {
		image_slider_settings,
		shipmentData,
		showShipmentModal,
		handleAddShipment,
		handleRemoveItem,
		handleShowModal,
		handlePayment,
		handleSummary,
		setShowShipmentModal,
	} = useShipmentSummary();
	return (
		<>
			<div className="inline-flex flex-col  w-full ml-40">
				<div className="flex gap-5">
					<div className="bg-white h-screen-82 rounded-md shadow-md  relative box-border w-full">
						<div className=" h-screen-55 rounded-md overflow-auto w-full p-5 ">
							<table className=" w-full  bg-white rounded-lg shadow-sm">
								<thead className=" text-left bg-slate-100 ">
									<tr>
										<th className="p-3">Shipment Id</th>
										<th>Current Location</th>
										<th>Destination</th>
										<th>Price</th>
										<th></th>
										<th></th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{shipmentData.map((val, index) => (
										<tr
											key={index}
											className=" border-b hover:bg-slate-300 cursor-pointer"
											onClick={handleShowModal}
										>
											<td className="p-3">KH921B</td>
											<td className="p-3 w-1/4">20, Adebayo Close, Okota, isolo, Lagos Nigeria</td>
											<td className="p-3 w-1/4">20, Adebayo Close, Okota, isolo, Lagos Nigeria</td>
											<td className="p-3">#50,000</td>
											<td className="p-3">
												<button className="bg-blue-800 rounded-full text-white px-3 py-1 flex space-x-2 items-center shadow-md">
													<AiOutlineEdit />
													<span>Edit</span>
												</button>
											</td>

											<td className="p-3">
												<button
													onClick={handleRemoveItem}
													className="bg-red-500 rounded-full text-white px-3 py-1 flex space-x-2 items-center shadow-md"
												>
													<AiOutlineClose />
													<span>Remove</span>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="absolute bottom-5 w-full  ">
							<div className="bg-slate-100 p-5">
								<div>Total Packages: 10</div>
								<div>
									Total Amount: <span>#400,000</span>
								</div>
							</div>
							<div className="flex justify-between p-5 ">
								<button
									onClick={handlePayment}
									className="flex items-center justify-center px-5 py-2 space-x-3 text-blue-900 rounded-md hover:transition-all duration-150 ease-in-out hover:shadow-xl hover:shadow-blue-100 bg-gradient-to-t from-white via-slate-100 to-slate-100 shadow-lg shadow-slate-300"
								>
									<BsCartCheck /> <span>Checkout</span>
								</button>

								<button
									onClick={handleAddShipment}
									className="flex items-center justify-center px-5 py-2 space-x-3 text-blue-900 rounded-md hover:transition-all duration-150 ease-in-out hover:shadow-xl hover:shadow-blue-100 bg-gradient-to-t from-white via-slate-100 to-slate-100 shadow-lg shadow-slate-300"
								>
									+ Add More Shipment
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{showShipmentModal && <ShipmentModal setShowModal={setShowShipmentModal} />}
		</>
	);
};

export default RecipientDetails;
