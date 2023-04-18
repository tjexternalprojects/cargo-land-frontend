import React from 'react';
import { BiFilter, BiMenuAltRight, GrClose, IoMdCart, MdNotificationsNone, RiSearch2Line } from '@/assets';
import useTopBar from './useTopBar';
import { RingLoader } from '@/components';
const TopBar = () => {
	const { handleToggleNotification, showChartItems, handleToggleSidebar, handSearchShipment, setShipmentId, mobileSearch, setMobileSearch, searchLoading, shipmentId, itemInChart } = useTopBar();
	return (
		<div className="flex gap-10  justify-between items-stretch w-full ">
			<form className="w-full hidden md:block" onSubmit={handSearchShipment}>
				<div className="flex px-3 items-center space-x-3 bg-white rounded-md border py-2 h-full">
					<input
						type="text"
						value={shipmentId}
						required
						onChange={(e) => setShipmentId(e.target.value)}
						placeholder="Search parcel by Shipment ID"
						className="w-full outline-none h-full"
					/>
					{searchLoading ? <RingLoader size={50} textColor="text-blue-900" /> : <button type='submit'>
						<RiSearch2Line />
					</button>}
				</div>
			</form>

			<div className="text-blue-900 md:hidden  p-1 rounded-full text-2xl cursor-pointer" onClick={()=>setMobileSearch(true)}>
				<RiSearch2Line />
			</div>

			{mobileSearch && <div className='animate__animated animate__fadeInUp animate__faster  fixed z-50 h-screen bg-blue-900 bg-opacity-50 top-0 bottom-0 left-0 right-0 px-5'>
						<button className='bg-white rounded-md p-2 top-3 absolute right-6 cursor-pointer' onClick={()=>setMobileSearch(false)}><GrClose/></button>
						<div className='flex items-center justify-center  h-full'>
				<form className="w-full" onSubmit={handSearchShipment}>
					<div className="flex px-3 items-center space-x-3 bg-white rounded-md border py-2 h-full">
						<input
							type="text"
							value={shipmentId}
							required
							onChange={(e) => setShipmentId(e.target.value)}
							placeholder="Search parcel by Shipment ID"
							className="w-full outline-none h-full"
						/>
						{searchLoading ? <RingLoader size={50} textColor="text-blue-900" /> : <button type='submit'>
							<RiSearch2Line />
						</button>}
					</div>
				</form>
				</div>
			</div>}

			{/* <div className="text-blue-900  p-1 rounded-full text-3xl">
				<BiFilter />
			</div> */}

			<div className="flex items-center justify-center text-2xl gap-4">
				<div className="relative cursor-pointer" onClick={handleToggleNotification}>
					{/* <div className="text-white bg-red-400 rounded-full absolute h-full w-full p-2 text-xs flex items-center justify-center -top-3 left-2">
						2
					</div> */}
					<MdNotificationsNone />
				</div>
				<div className={`relative ${itemInChart > 0 && 'cursor-pointer'}`} onClick={showChartItems}>
					{itemInChart > 0 && <div className="text-white bg-red-400 rounded-full absolute h-full w-full p-2 text-xs flex items-center justify-center -top-3 left-2">
						{itemInChart}
					</div>}

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
