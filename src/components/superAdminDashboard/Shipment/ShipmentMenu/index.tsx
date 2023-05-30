import { BsThreeDotsVertical } from "@/assets";
import React, { useState } from "react";
import useShipmentMenu from "./useShipmentMenu";
import { LoadingPage } from "@/components";
interface ShipmentMenuProps {
	singleShipment: any;
	setSingleShipment:any;
	location_id: string;
}
const Dropdown = ({ singleShipment, setSingleShipment, location_id }: ShipmentMenuProps) => {
	const { toggleDropdown, setCurrentLocation, setNextCheckPoint, deleteRoute, loading, isOpen } =
		useShipmentMenu(location_id, setSingleShipment);
	console.log(singleShipment);
	return (
		<div>
			<button
				className="flex items-center justify-center p-2 font-medium text-white bg-blue-900 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
				onClick={() => toggleDropdown(location_id)}
			>
				<BsThreeDotsVertical />
			</button>
			<div className="relative z-20 ">
				<div
					className={`absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-sm transition-transform transform ${
						isOpen ? 'scale-100' : 'scale-0'
					}`}
				>
					<div
						className={`py-1 transition-opacity duration-300 ${
							isOpen ? 'opacity-100' : 'opacity-0'
						}`}
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="options-menu"
					>
						{location_id !== singleShipment?.shipment_current_location && (
							<div
								onClick={() => setCurrentLocation(singleShipment?.id, location_id)}
								className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
								role="menuitem"
							>
								Set as Current Location
							</div>
						)}
						{location_id !== singleShipment?.shipment_heading_to && (
							<div
								onClick={() => setNextCheckPoint(singleShipment?.id, location_id)}
								className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
								role="menuitem"
							>
								Set as Next Check Point
							</div>
						)}
						{location_id !== singleShipment?.final_destination?.location_id &&
							location_id !== singleShipment?.start_location?.location_id &&
							location_id !== singleShipment?.shipment_heading_to && (
								<div
									onClick={() => deleteRoute(singleShipment?.id, location_id)}
									className="block px-4 py-2 text-red-500 hover:bg-gray-200 cursor-pointer"
									role="menuitem"
								>
									Delete Route
								</div>
							)}
					</div>
				</div>
				{loading && <LoadingPage overlayColor="bg-white/50" />}
			</div>
		</div>
	);
};

export default Dropdown;
