import React from 'react';
import { BiFilter, BiMenuAltRight, IoMdCart, MdNotificationsNone, RiSearch2Line } from '@/assets';
import useTopBar from './useTopBar';
const TopBar = () => {
	const { handleToggleNotification, showChartItems, handleToggleSidebar } = useTopBar();
	return (
		<div className="flex gap-10  justify-between items-stretch w-full ">
			<form className="w-full hidden md:block">
				<div className="flex px-3 items-center space-x-3 bg-white rounded-md border py-2 h-full">
					<RiSearch2Line />
					<input
						type="text"
						placeholder="Search parcel by Tracking Number"
						className="w-full outline-none h-full"
					/>
				</div>
			</form>
			<div className="text-blue-900  p-1 rounded-full text-3xl">
				<BiFilter />
			</div>
			<div className="flex items-center justify-center text-2xl gap-4">
				<div className="relative cursor-pointer" onClick={handleToggleNotification}>
					<div className="text-white bg-red-400 rounded-full absolute h-full w-full p-2 text-xs flex items-center justify-center -top-3 left-2">
						2
					</div>
					<MdNotificationsNone />
				</div>
				<div className="relative cursor-pointer" onClick={showChartItems}>
					<div className="text-white bg-red-400 rounded-full absolute h-full w-full p-2 text-xs flex items-center justify-center -top-3 left-2">
						4
					</div>

					<IoMdCart />
				</div>
			</div>
			<BiMenuAltRight className={`md:hidden text-4xl`} onClick={handleToggleSidebar} />
		</div>
	);
};

export default TopBar;
