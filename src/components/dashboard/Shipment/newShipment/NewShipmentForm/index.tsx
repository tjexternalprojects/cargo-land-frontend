import React from 'react';
import {
	BiCloudUpload,
	GiWeight,
	GoPackage,
	MdDescription,
	MdOutlineSubtitles,
	package1,
} from '@/assets';
import useShipment from '@/components/dashboard/Shipment/useShipment';
import { Country, State, City } from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city';
console.log(Country);
const NewShipmentForm = () => {
	return (
		<>
			<div className="inline-flex flex-col items-center w-full">
				<div className="bg-blue-900 rounded-full text-white text-3xl p-2">
					<GoPackage />
				</div>
				<p className="text-xl mt-4">Your shipment details</p>
				<form className=" w-9/12 my-5">
					<div className="mt-3">
						<label className="text-sm text-gray-400">Shipment title</label>
						<div className="border flex rounded-lg mt-2 p-2">
							<input className="w-full outline-none" type="text" />
							<div className="text-xl text-gray-500">
								<MdOutlineSubtitles />
							</div>
						</div>
					</div>

					<div className="mt-3">
						<label className="text-sm text-gray-400">Shipment Description</label>
						<div className="border flex rounded-lg mt-2 p-2">
							<textarea className="w-full outline-none"></textarea>
							<div className="text-xl text-gray-500">
								<MdDescription />
							</div>
						</div>
					</div>

					<div className="mt-3">
						<label className="text-sm text-gray-400">Shipment Weight (Kg)</label>
						<div className="border flex rounded-lg mt-2 p-2">
							<input className="w-full outline-none" type="text" />
							<div className="text-xl text-gray-500">
								<GiWeight />
							</div>
						</div>
					</div>

					<div className="mt-3">
						<label className="text-sm text-gray-400">Images</label>
						<div className="border gap-3 flex rounded-lg mt-2 p-2 overflow-x-auto w-full">
							<div className="w-32 h-32 border-2 bg-slate-200 shadow flex items-center justify-center rounded-xl">
								<img src={package1} className="object-cover w-full h-full rounded-xl" />
							</div>
							<div className="w-32 h-32 border-2 bg-slate-200 shadow flex items-center justify-center rounded-xl">
								<img src={package1} className="object-cover w-full h-full rounded-xl" />
							</div>
							<div className="w-32 h-32 border-2 bg-slate-200 shadow flex items-center justify-center rounded-xl">
								<img src={package1} className="object-cover w-full h-full rounded-xl" />
							</div>
							<div className="w-32 h-32 border-2 bg-slate-200 shadow flex items-center justify-center rounded-xl">
								<img src={package1} className="object-cover w-full h-full rounded-xl" />
							</div>
						</div>

						<div className="mt-5 w-1/2 h-10 border-2 bg-slate-200 shadow flex items-center justify-between pl-5 rounded-xl overflow-hidden">
							<label className=" w-full h-20 flex items-center justify-between cursor-pointer">
								<span>Upload shipment image</span>
								<div className="border-gray-500 border-dotted w-20 h-20 border-4 rounded-xl flex items-center justify-center">
									<BiCloudUpload className="text-3xl text-gray-500" />
									<input id="fileInput" type="file" className="hidden" />
								</div>
							</label>
						</div>
					</div>

					<div className="mt-3">
						<label className="text-sm text-gray-400">Shipment Current Location for pickup</label>
						<div className="flex flex-col space-y-5 mt-3">
							<div>
								<small className="text-gray-400 font-bold">Country</small>
								<div className="border flex rounded-lg mt-2 p-2">
									<select className="w-full outline-none">
										<option value="">Nigeria</option>
									</select>
									<div className="text-xl text-gray-500">
										<GiWeight />
									</div>
								</div>
							</div>

							<div>
								<small className="text-gray-400 font-bold">State</small>
								<div className="border flex rounded-lg mt-2 p-2">
									<select className="w-full outline-none">
										<option value="">Lagos</option>
									</select>
									<div className="text-xl text-gray-500">
										<GiWeight />
									</div>
								</div>
							</div>

							<div className="mt-3">
								<small className=" text-gray-400 font-bold">Full Address</small>
								<div className="border flex rounded-lg mt-2 p-2">
									<textarea className="w-full outline-none"></textarea>
									<div className="text-xl text-gray-500">
										<MdOutlineSubtitles />
									</div>
								</div>
							</div>
						</div>
					</div>

					<hr className="mt-5" />
					<div className="mt-5">
						<button
							type="submit"
							className="hover:shadow-xl hover:shadow-blue-100 shadow-md w-full p-2 rounded-md border border-slate-100 bg-blue-100 font-bold text-blue-900 text-md"
						>
							Next
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default NewShipmentForm;
