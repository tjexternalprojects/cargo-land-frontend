import React from 'react';
import {
	BiCurrentLocation,
	BsTelephoneForward,
	GoPackage,
	ImLocation,
	RiUserReceivedLine,
} from '@/assets';
import { LoadingPage, MapDirection3, RingLoader } from '@/components/';
import { useGeocode } from '@/components';
import useTrackShipment from './useTrackShipment';
import { Link } from 'react-router-dom';
const TrackShipment = () => {
	const {
		singleShipment,
		currentLocation,
		routeToLocation,
		loading,
		allTransitShipment,
		generateLocationLabel,
		getIndividualShipmentMtd,
	} = useTrackShipment();
	return (
		<>
			{loading ? (
				<LoadingPage />
			) : (
				<>
					{allTransitShipment?.length > 0 || Object.keys(singleShipment).length > 0 ? (
						<div className="flex mt-8 gap-5 flex-col md:flex-row bg-white p-10">
							<div className=" md:w-7/12">
								<div className=" tracking-widest text-sm text-gray-500  font-bold uppercase mb-5">
									Shipment Tracking
								</div>
								{allTransitShipment.map((shipment: any, index: number) => (
									<div
										key={index}
										onClick={() => getIndividualShipmentMtd(index)}
										className={`  cursor-pointer rounded-sm p-2 hover:shadow flex justify-between sm:items-center sm:flex-row flex-col sm:space-x-4  ${
											shipment?.id === singleShipment?.id
												? 'bg-blue-900 hover:text-black text-white'
												: ''
										} `}
									>
										<div>
											<small>Shipment ID</small>
											<div className="font-bold">{shipment.id}</div>
										</div>
										<label className="text-blue-700 bg-blue-100 rounded-md py-1 px-3 text-sm font-bold">
											{shipment.shipment_Status}
										</label>
									</div>
									// <div key={index}>
									// 	<div className="flex md:flex-row flex-col space-y-2 justify-between items-center">
									// 		<div>
									// 			<small>Shipment ID</small>
									// 			<div className="font-bold">{shipment?.id}</div>
									// 		</div>
									// 		<label className="text-blue-700 bg-blue-100 rounded-md py-1 px-3 text-sm font-bold">
									// 			{shipment?.shipment_Status}
									// 		</label>
									// 	</div>
									// </div>
								))}
								<hr className="my-5" />
								<div className="ml-8 md:ml-0">
									<div className="text-sm">
										<div className="space-x-3 flex items-center">
											<span className="pl-6">From</span>
											<span className="text-lg font-extrabold text-red-500">(A)</span>
											{singleShipment?.shipment_current_location ==
												singleShipment?.start_location?.location_id && (
												<RingLoader size={20} textColor="text-blue-900" />
											)}
										</div>

										<div className="text-black font-bold border-l-2 pl-6 pb-10 pt-2 border-slate-300  relative">
											<div className="bg-slate-300 rounded-full p-2 text-xl inline-flex items-center justify-center absolute -left-5 -top-7">
												<GoPackage />
											</div>
											{singleShipment?.start_location?.formattedAddress}
										</div>
									</div>
									{singleShipment?.shipment_Status === 'CHECKED' ||
									singleShipment?.shipment_Status === 'TRANSIT' ||
									singleShipment?.shipment_Status === 'SUCCESSFUL' ? (
										<>
											{singleShipment?.shipment_addresses.map((val: any, index: number) => (
												<div key={index} className="text-sm">
													<div className="space-x-3 flex items-center">
														<span className="pl-6">Through</span>
														<span className="text-lg font-extrabold text-red-500">
															({generateLocationLabel(index)})
														</span>
														{singleShipment?.shipment_current_location == val?.location_id && (
															<RingLoader size={20} textColor="text-blue-900" />
														)}
													</div>

													<div className="text-black font-bold border-l-2 pl-6 pb-10 pt-2 border-slate-300 relative">
														<div className="bg-green-800 rounded-full p-2 text-xl inline-flex items-center justify-center absolute -left-5 -top-7">
															<BiCurrentLocation className="text-white" />
														</div>
														{val?.formattedAddress}
													</div>
												</div>
											))}
										</>
									) : (
										<div className="text-red-500 text-lg font-bold border-l-2 pl-6 pb-10 pt-2 border-slate-300 relative">
											SHIPMENT HASN'T BEEN CHECKED
										</div>
									)}
									<div className="text-sm">
										<div className="space-x-3 flex items-center">
											<span className="pl-6">To</span>
											<span className="text-lg font-extrabold text-red-500">
												({generateLocationLabel(singleShipment?.shipment_addresses?.length)})
											</span>
											<div className="h-4 w-4 rounded-full bg-green-400"></div>
											{singleShipment?.shipment_current_location ==
												singleShipment?.final_destination?.location_id && (
												<RingLoader size={20} textColor="text-blue-900" />
											)}
										</div>
										<div className="text-black font-bold  pl-6 relative">
											<div className="bg-slate-300 rounded-full p-2 text-xl inline-flex items-center justify-center absolute -left-5 -top-7">
												<ImLocation />
											</div>
											{singleShipment?.final_destination?.formattedAddress}
										</div>
									</div>
								</div>
							</div>
							<div className=" w-full py-5">
								<div className="flex flex-col md:flex-row justify-between w-full gap-5">
									<div className="border-2 p-3 rounded-md flex-grow w-full">
										<div className="flex items-center text-sm space-x-2 text-slate-500">
											<RiUserReceivedLine />
											<span>Receiver</span>
										</div>
										<div>
											<h1 className="text-xl font-bold">{singleShipment?.recipient_full_name}</h1>
										</div>
									</div>

									<div className="border-2 p-3 rounded-md flex-grow w-full">
										<div className="flex items-center text-sm space-x-2 text-slate-500">
											<BsTelephoneForward />
											<span>Phone Number</span>
										</div>
										<div>
											<h1 className="text-xl font-bold">
												{singleShipment?.recipient_phone_number}
											</h1>
										</div>
									</div>

									<div className="border-2 p-3 rounded-md flex-grow w-full">
										<div className="flex items-center text-sm space-x-2 text-slate-500">
											<BiCurrentLocation />
											<span>Address</span>
										</div>
										<div>
											<h1 className="text-xl font-bold">
												{singleShipment?.final_destination?.formattedAddress}
											</h1>
										</div>
									</div>
								</div>
								<div className="mt-5 ">
									<MapDirection3
										height="80vh"
										startLocation={{
											lng: parseFloat(singleShipment?.start_location?.longitude),
											lat: parseFloat(singleShipment?.start_location?.latitude),
										}}
										locations={singleShipment?.shipment_addresses}
										endLocation={{
											lng: parseFloat(singleShipment?.final_destination?.longitude),
											lat: parseFloat(singleShipment?.final_destination?.latitude),
										}}
										currentLocation={currentLocation}
										routeToLocation={routeToLocation}
									/>
								</div>
							</div>
						</div>
					) : (
						<div className="flex-col w-full flex items-center justify-center space-y-2 h-full">
							<div className="text-2xl text-red-300">No active shipment</div>
							<p className="font-extrabold uppercase">
								(NOTE: Only Shipment on Transit Shows up here)
							</p>
							<Link to="/dashboard/shipment">
								<button className=" cursor-pointer hover:shadow-xl hover:shadow-blue-100 shadow-md w-full p-2 rounded-md   bg-blue-700 font-bold text-white text-md">
									Create Shipment
								</button>
							</Link>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default TrackShipment;
