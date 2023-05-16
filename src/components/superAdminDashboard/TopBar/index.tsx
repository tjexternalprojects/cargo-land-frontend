import React from 'react';
import { BiFilter, BiMenuAltRight, IoMdCart, MdNotificationsNone, RiSearch2Line } from '@/assets';
import useTopBar from './useTopBar';
import { SearchShipment } from '@/components';
const TopBar = () => {
	const { handleToggleNotification, showChartItems, handleToggleSidebar } = useTopBar();
	return (
		<div className="flex gap-10  justify-between items-stretch w-full ">
			<SearchShipment navigate_to={'admin/track_shipment'}/>

			<BiMenuAltRight className={`md:hidden text-4xl`} onClick={handleToggleSidebar} />
		</div>
	);
};

export default TopBar;
