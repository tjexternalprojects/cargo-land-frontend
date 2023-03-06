import React from 'react';
import { BiCurrentLocation, GoPackage, ImLocation } from '@/assets';
const TrackShipment = () => {
	return (
		<div className="flex mt-8 gap-5">
			<div className=" w-6/12">
				<div className=" tracking-widest text-sm text-gray-500  font-bold uppercase mb-5">
					Shipment Tracking
				</div>
				<div className="flex justify-between items-center">
					<div>
						<small>Shipment ID</small>
						<div className="font-bold">KH92129</div>
					</div>
					<button className="text-blue-700 bg-blue-100 rounded-md py-1 px-3 text-sm font-bold">
						Pending
					</button>
				</div>
				<hr className="my-5" />
				<div>
					<div>
						<div className="inline-flex flex-col items-center">
							<div className="flex">
								<div className="bg-slate-300 rounded-full p-2 text-xl inline-flex items-center justify-center">
									<GoPackage />
								</div>
								<div className='text-sm'>
                  <span>From</span>
                  <div className='text-black font-bold'>Dr. Simeon Jnr Street, Lekki, Lagos, Nigeria</div>
                </div>
							</div>
							<div className=" h-5 w-0.5 bg-slate-300"></div>
						</div>
					</div>
					<div>
						<div className="bg-slate-300 rounded-full p-2 text-blue-500 text-xl inline-flex items-center justify-center">
							<BiCurrentLocation />
						</div>
						<div></div>
					</div>
					<div>
						<div className="bg-slate-300 rounded-full p-2 text-xl inline-flex items-center justify-center">
							<ImLocation />
						</div>
						<div></div>
					</div>
				</div>
			</div>
			<div>
				{' '}
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quia quibusdam dicta
				accusantium saepe expedita sint iure dolore quaerat fugiat architecto ab, ullam soluta
				mollitia autem ipsa officia vitae modi!
			</div>
		</div>
	);
};

export default TrackShipment;
