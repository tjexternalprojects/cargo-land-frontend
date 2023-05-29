import { AiOutlineClose } from '@/assets';
import React from 'react';
import useUpdateShipmentPrice from './useUpdateShipmentPrice';
import { GiPriceTag } from 'react-icons/gi';
import { RingLoader } from '@/components';

interface ShipmentPriceProps {
	selectedShipment: any;
	setSelectedShipment: any;
	shipmentCurrentPrice:number;
	setShowUpdateShipmentPrice: React.Dispatch<React.SetStateAction<boolean>>;
}
const index = ({
	selectedShipment,
	setSelectedShipment,
	shipmentCurrentPrice,
	setShowUpdateShipmentPrice,
}: ShipmentPriceProps) => {
	const { updateShipmentPriceMtd, setPrice, loading, price } = useUpdateShipmentPrice(
		selectedShipment,
		setSelectedShipment,
		shipmentCurrentPrice,
		setShowUpdateShipmentPrice
	);
	return (
		<div className=" fixed h-full  w-full top-0 left-0  z-30 bg-black bg-opacity-50 flex justify-center items-center">
			<div className="w-1/2  fixed bg-white shadow-lg pb-3 ">
				<div className="flex items-center  w-full justify-between px-3 py-2 text-white  bg-blue-900  ">
					<div className="font-bold">Update Shipment Price:</div>
					<div
						className="rounded-full shadow-lg hover:shadow-blue-200 hover:bg-white hover:text-blue-900 transition-all duration-75 ease-in-out cursor-pointer p-2 "
						onClick={() => setShowUpdateShipmentPrice(false)}
					>
						<AiOutlineClose />
					</div>
				</div>
				<div className="px-10">
					<form onSubmit={updateShipmentPriceMtd}>
						<div className=" border-b-2 flex  mt-2 p-2 space-x-2 mb-2 items-center bg-white">
							<input
								className="w-full outline-none"
								type="number"
								value={price}
								min={0}
								onChange={(e) => setPrice(Number(e.target.value))}
								required
							/>
							<div className=" text-gray-500">
								<GiPriceTag />
							</div>
						</div>
						<div className="font-bold text-gray-500 mb-2">
							&#8358;{Number(price).toLocaleString()}
						</div>
						<button
							type="submit"
							className="hover:shadow-xl hover:shadow-blue-100 shadow-md p-2 rounded-sm  bg-blue-700 text-white text-md"
						>
							{loading ? (
								<div className="w-full flex items-center justify-center">
									<RingLoader size={20} loaderColor="#fff" />
								</div>
							) : (
								<span>Update Price +</span>
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default index;
