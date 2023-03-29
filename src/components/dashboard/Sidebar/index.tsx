import {
	CiSettings,
	logo,
	MdTrackChanges,
	RiPriceTag2Line,
	TbLayoutDashboard,
	TbLogout,
	TbTruckDelivery,
	userImg,
} from '@/assets';
import { NavLink, useMatch } from 'react-router-dom';
import useLogin from '@/pages/Login/useLogin';
import useSidebar from './useSidebar';
const sidebar = () => {
	const dashboardMatch = useMatch('/dashboard');
	const shipmentMatch = useMatch('/dashboard/shipment');
	const trackMatch = useMatch('/dashboard/track_shipment');
	const historyMatch = useMatch('/dashboard/history');
	const { handleLogout } = useLogin();
	const { userInfo } = useSidebar();
	return (
		<div className=" bg-white  fixed h-screen w-60 flex flex-col shadow justify-between">
			<div className="bg-white  flex items-center justify-center rounded-xs p-2 m-8">
				<img src={logo} className=" w-24 h-8" alt="" />
			</div>
			<div className="flex-grow mt-10 ">
				<ul className=" text-lg  font-bold ">
					<li>
						<NavLink
							to="/dashboard"
							className={`${
								dashboardMatch ? 'border-l-blue-900 bg-blue-900/20' : 'border-l-white bg-white'
							}  pl-8 py-3 flex border-l-8 items-center space-x-3 text-blue-900`}
						>
							<TbLayoutDashboard /> <span>Dashboard</span>
						</NavLink>
					</li>

					<li>
						<NavLink
							to="/dashboard/shipment"
							className={`${
								shipmentMatch ? 'border-l-blue-900 bg-blue-900/20' : 'border-l-white bg-white'
							} pl-8 py-3 flex border-l-8  items-center space-x-3 text-blue-900`}
						>
							<MdTrackChanges /> <span>New Shipment</span>
						</NavLink>
					</li>

					<li>
						<NavLink
							to="/dashboard/track_shipment"
							className={`${
								trackMatch ? '  bg-blue-900/20 border-l-blue-900 ' : 'border-l-white bg-white'
							}  pl-8 py-3 flex border-l-8  items-center space-x-3 text-blue-900`}
						>
							<TbTruckDelivery /> <span>Track Shipment</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/dashboard/history"
							className={`${
								historyMatch ? 'bg-blue-900/20 border-l-blue-900 ' : 'border-l-white bg-white'
							}  pl-8 py-3 flex border-l-8  items-center space-x-3 text-blue-900`}
						>
							<RiPriceTag2Line /> <span>History</span>
						</NavLink>
					</li>
				</ul>
			</div>
			<div className="text-blue-900 flex flex-col items-center p-8">
				<div className="flex flex-col gap-3 items-center">
					<div className="w-10 h-10 rounded-full shadow-md border border-slate-200">
						<img
							src={!userInfo?.avatar ? userImg : userInfo?.avatar}
							className="w-full h-full object-contain rounded-full"
						/>
					</div>
					<div className="text-center">
						<h3 className="font-bold text-md">{userInfo?.name}</h3>
						<p className=" font-light text-sm">{userInfo?.email}</p>
					</div>

				</div>
				<div className="flex gap-2 text-2xl">
					<div className=" transition-all duration-75 ease-linear rounded-full text-blue-900 p-2 shadow-md hover:shadow-red-200 border-blue-900 border hover:border-slate-50 cursor-pointer">
						<CiSettings />
					</div>
					<div
						onClick={handleLogout}
						className="transition-all duration-75 ease-linear rounded-full p-2 text-blue-900 shadow-md hover:shadow-red-200 border-blue-900 border hover:border-slate-50 cursor-pointer"
					>
						{' '}
						<TbLogout />
					</div>
				</div>
			</div>
		</div>
	);
};

export default sidebar;
