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
import { Map, MapDirection } from '@/components';

const RecipientDetails = () => {
	return (
		<>
			<div className="inline-flex flex-col items-center w-full">
				<div className="bg-blue-900 rounded-full text-white text-3xl p-2">
					<GoPackage />
				</div>
				<p className="text-xl mt-4">Your shipment details</p>
				<Map />
				<MapDirection/>

				{/* <form className=" w-9/12 mt-5">
					<div className="mt-3">
						<label className="text-sm text-gray-400">
							Shipment Current location |{' '}
							<small className="text-red-400 font-bold">
								<i>
									This is the location of the shipment <span className=" font-extrabold">NOT</span>{' '}
									the destination
								</i>
							</small>
						</label>
					</div>
				</form> */}
			</div>
		</>
	);
};

export default RecipientDetails;
