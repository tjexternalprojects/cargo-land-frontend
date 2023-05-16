import React from 'react';
import {
	BiFilter,
	BiMenuAltRight,
	GrClose,
	IoMdCart,
	MdNotificationsNone,
	RiSearch2Line,
} from '@/assets';
import useTopBar from './useTopBar';
import { RingLoader, SearchShipment } from '@/components';
const TopBar = () => {
	const { handleToggleNotification, showChartItems, handleToggleSidebar, itemInChart } =
		useTopBar();
	return (
		<div className="flex gap-10  justify-between items-stretch w-full ">
			<SearchShipment navigate_to={'/dashboard/track_shipment'} />

			<div className="flex items-center justify-center text-2xl gap-4">
				{/* <div className="relative cursor-pointer" onClick={handleToggleNotification}>
					<div className="text-white bg-red-400 rounded-full absolute h-full w-full p-2 text-xs flex items-center justify-center -top-3 left-2">
						2
					</div>
					<MdNotificationsNone />
				</div> */}
				<div className={`relative ${itemInChart > 0 && 'cursor-pointer'}`} onClick={showChartItems}>
					{itemInChart > 0 && (
						<div className="text-white bg-red-400 rounded-full absolute h-full w-full p-2 text-xs flex items-center justify-center -top-3 left-2">
							{itemInChart}
						</div>
					)}

					<IoMdCart />
				</div>
			</div>
			<BiMenuAltRight
				className={`md:hidden text-4xl text-blue-900  cursor-pointer`}
				onClick={handleToggleSidebar}
			/>
		</div>
	);
};

export default TopBar;
