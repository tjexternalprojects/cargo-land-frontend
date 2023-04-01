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
const TrackShipment = () => {
	const address1 = 'No. 56, Felly Akurunwa Street, Ago Palace Way, Okota, Nigeria, Lagos';
	const address2 =
		'Blenco Bustop, 4 Gani Adedayo Close, Idowu Dabiri Street, Lekki - Epe Expy, Aja, Lagos';
	return (
		<div className="flex mt-8 gap-5 flex-col md:flex-row ">
			<div className=" w-6/12">
				<div className=" tracking-widest text-sm text-gray-500  font-bold uppercase mb-5">
					Shipment Tracking
				</div>
				<div className="flex justify-between items-center">
					<div>
						<small>Shipment ID</small>
						<div className="font-bold">KH92129</div>
					</div>
					<label className="text-blue-700 bg-blue-100 rounded-md py-1 px-3 text-sm font-bold">
						On transit
					</label>
				</div>
				<hr className="my-5" />
				<div>
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
								Dr. Simeon Jnr Street, Lekki, Lagos, Nigeria
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
								Dr. Simeon Jnr Street, Lekki, Lagos, Nigeria
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
								Dr. Simeon Jnr Street, Lekki, Lagos, Nigeria
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className=" w-full p-5">
				<div className="flex flex-col md:flex-row items-center  justify-between w-full gap-5">
					<div className="border-2 p-3 rounded-md flex-grow">
						<div className="flex items-center text-sm space-x-2 text-slate-500">
							<RiUserReceivedLine />
							<span>Receiver</span>
						</div>
						<div>
							<h1 className="text-xl font-bold">Jame Miller</h1>
						</div>
					</div>

					<div className="border-2 p-3 rounded-md flex-grow">
						<div className="flex items-center text-sm space-x-2 text-slate-500">
							<BsTelephoneForward />
							<span>Phone Number</span>
						</div>
						<div>
							<h1 className="text-xl font-bold">+234 8144139845</h1>
						</div>
					</div>

					<div className="border-2 p-3 rounded-md flex-grow">
						<div className="flex items-center text-sm space-x-2 text-slate-500">
							<BiCurrentLocation />
							<span>Address</span>
						</div>
						<div>
							<h1 className="text-xl font-bold">20, Sijuwola Street, Okota</h1>
						</div>
					</div>
				</div>
				<div className="mt-5 ">
					<MapDirection height="80vh" />
				</div>
				{/* <div className="mt-5">
					<h3>Item List</h3>
					<table className=" w-full">
						<thead>
							<tr>
								<td>Item Id</td>
								<td>Item Name</td>
								<td>Item Category</td>
								<td>Item Weight</td>
								<td>Item Quantity</td>
								<td>Actions</td>
							</tr>
						</thead>
						<tbody>
							<tr></tr>
						</tbody>
					</table>
				</div> */}
			</div>
		</div>
	);
};

export default TrackShipment;
