import React from 'react';
import {
	BiCurrentLocation,
	BsTelephoneForward,
	GoPackage,
	ImLocation,
	RiUserReceivedLine,
} from '@/assets';
import { MapDirection } from '@/components/';
import { useGeocode } from '@/components';
import useTrackShipment from './useTrackShipment';
import { Link } from 'react-router-dom';
const TrackShipment = () => {
	const { trackingShipments, singleShipment, getInidividualShipment } = useTrackShipment();
	return (
		<div className="mt-8 ">
			<div className=" tracking-widest text-sm text-gray-500  font-bold uppercase ">
				Shipment Tracking
			</div>
			{trackingShipments.length > 0 ? (
				<div className="flex gap-5 flex-col md:flex-row  mt-3">
					<div className="">
						<div className="flex space-y-2 flex-col max-h-50-screen overflow-y-auto p-2">
							{trackingShipments.map((val: any, index: number) => (
								<div
									key={index}
									onClick={() => getInidividualShipment(index)}
									className={`  cursor-pointer rounded-sm p-2 hover:shadow flex justify-between sm:items-center sm:flex-row flex-col sm:space-x-4  ${val?.id === singleShipment?.id ? 'bg-blue-900 hover:text-black text-white': ''} `}
								>
									<div>
										<small>Shipment ID</small>
										<div className="font-bold">{val.id}</div>
									</div>
									<label className="text-blue-700 bg-blue-100 rounded-md py-1 px-3 text-sm font-bold">
										{val.shipment_Status}
									</label>
								</div>
							))}
						</div>
						<hr className="my-5" />
						{singleShipment && <div>
							<div className="flex items-start space-x-2">
								<div className="flex items-center flex-col">
									<div className="bg-slate-300 rounded-full p-2 text-xl inline-flex items-center justify-center">
										<GoPackage />
									</div>
									<div className=" h-10 w-0.5 bg-slate-300"></div>
								</div>
								<div className="text-sm">
									<span>From</span>
									<div className="text-black font-bold">
										{singleShipment?.sendersAddress}
									</div>
								</div>
							</div>

							<div className="flex items-start space-x-2">
								<div className="flex items-center flex-col">
									<div className="bg-slate-300 rounded-full p-2 text-xl inline-flex items-center justify-center">
										<BiCurrentLocation />
									</div>
									<div className=" h-10 w-0.5 bg-slate-300"></div>
								</div>
								<div className="text-sm">
									<span>Current location</span>
									<div className="text-black font-bold">
										{singleShipment?.current_shipment_location}
									</div>
								</div>
							</div>

							<div className="flex items-start space-x-2">
								<div className="flex items-center flex-col">
									<div className="bg-slate-300 rounded-full p-2 text-xl inline-flex items-center justify-center">
										<ImLocation />
									</div>
								</div>
								<div className="text-sm">
									<span>To</span>
									<div className="text-black font-bold">
										{singleShipment?.recepientAddress}
									</div>
								</div>
							</div>
						</div>}
					</div>
					<div className=" w-full ">
						<div className="flex flex-col md:flex-row    justify-between w-full gap-5">
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
									<h1 className="text-xl font-bold">{singleShipment?.recipient_phone_number}</h1>
								</div>
							</div>

							<div className="border-2 p-3 rounded-md flex-grow w-full">
								<div className="flex items-center text-sm space-x-2 text-slate-500">
									<BiCurrentLocation />
									<span>Address</span>
								</div>
								<div>
									<h1 className="text-xl font-bold">{singleShipment?.recepientAddress}</h1>
								</div>
							</div>
						</div>
						{ singleShipment?.current_location?.longitude} nnnnn
						<div className="mt-5 ">
							{singleShipment ? <MapDirection height="80vh" startLocation={{ lng: parseFloat(singleShipment?.current_location?.longitude), lat: parseFloat(singleShipment?.current_location?.latitude) }}
								endLocation={{ lng: parseFloat(singleShipment?.shipment_destination?.longitude), lat: parseFloat(singleShipment?.shipment_destination?.latitude) }} /> :
								<div className='text-xl w-full h-full text-center uppercase font-extrabold'>Select a shipment to display details</div>
								}
						</div>
					
					</div>
				</div>
			) : (
				<div className="flex-col w-full flex items-center justify-center space-y-2">
					<div className="text-2xl text-red-300">No active shipment</div>
					<Link to="/dashboard/shipment">
						{' '}
						<button className=" cursor-pointer hover:shadow-xl hover:shadow-blue-100 shadow-md w-full p-2 rounded-md   bg-blue-700 font-bold text-white text-md">
							Create Shipment
						</button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default TrackShipment;
