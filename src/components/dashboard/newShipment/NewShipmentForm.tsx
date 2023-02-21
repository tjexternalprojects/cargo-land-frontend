import React from 'react';
import { GiWeight, GoPackage, MdDescription, MdOutlineSubtitles } from '../../../assets';

const NewShipmentForm = () => {
	return (
		<>
			<div className="inline-flex flex-col items-center w-full">
				<div className="bg-blue-900 rounded-full text-white text-3xl p-2">
					<GoPackage />
				</div>
				<p className="text-xl mt-4">Your shipment details</p>
				<form className=" w-9/12 mt-5">
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
						<div className="border flex rounded-lg mt-2 p-2">
							<div className="relative w-32 h-32 bg-red-400 flex items-center justify-center rounded-xl overflow-hidden">
								
								<label className=" w-8 h-8 bg-gray-500 rounded-xl flex items-center justify-center cursor-pointer">
									
									<input id="fileInput" type="file" className="hidden" />
								</label>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default NewShipmentForm;
