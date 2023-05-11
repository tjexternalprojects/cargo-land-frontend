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
import { Link, NavLink, useMatch } from 'react-router-dom';
import useLogin from '@/pages/Login/useLogin';
import useSidebar from './useSidebar';
const sidebar = () => {
	const dashboardMatch = useMatch('/dashboard');
	const shipmentMatch = useMatch('/dashboard/shipment');
	const trackMatch = useMatch('/dashboard/track_shipment');
	const historyMatch = useMatch('/dashboard/history');
	const { handleLogout } = useLogin();
	const { state, handleToggleSidebar } = useSidebar();
	return (
		<>
			<div
				className={` z-20 bg-white fixed h-screen w-60 flex flex-col shadow justify-between animate__animated ${
					state.toggleAdminSideBar ? 'flex animate__slideInLeft ' : 'md:flex hidden'
				} animate__faster`}
			>
				<div className="bg-white  flex items-center justify-center rounded-xs p-2 mt-2 ">
					<Link to="/">
						{' '}
						<img src={logo} className=" w-24 h-8" alt="" />
					</Link>
				</div>
				<div className="flex-grow mt-10 ">
					<ul className=" text-lg  font-bold ">
						<li>
							<NavLink
								to="/dashboard"
								onClick={handleToggleSidebar}
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
								onClick={handleToggleSidebar}
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
								onClick={handleToggleSidebar}
								className={`${
									trackMatch ? '  bg-blue-900/20 border-l-blue-900 ' : 'border-l-white bg-white'
								}  pl-8 py-3 flex border-l-8  items-center space-x-3 text-blue-900`}
							>
								<TbTruckDelivery /> <span>Track Shipment</span>
							</NavLink>
						</li>
						{/* <li>
						<NavLink
							to="/dashboard/history"
							onClick={handleToggleSidebar}
							className={`${
								historyMatch ? 'bg-blue-900/20 border-l-blue-900 ' : 'border-l-white bg-white'
							}  pl-8 py-3 flex border-l-8  items-center space-x-3 text-blue-900`}
						>
							<RiPriceTag2Line /> <span>History</span>
						</NavLink>
					</li> */}
					</ul>
				</div>
				<div className="text-blue-900 flex flex-col items-center p-8">
					<div className="flex flex-col gap-3 items-center mb-3">
						<div className="w-10 h-10 rounded-full shadow-md border border-slate-200">
							<img
								src={
									!state.single_user_data?.avatar
										? userImg
										: (state.single_user_data?.avatar as string)
								}
								className="w-full h-full object-cover object-top rounded-full"
							/>
						</div>
						<div className="text-center">
							<h3 className="font-bold text-md">{state.single_user_data?.name}</h3>
							<p className=" font-light text-sm">{state.single_user_data?.email}</p>
						</div>
					</div>
					<div className="flex gap-2 text-2xl">
						<Link to="/dashboard/user" onClick={handleToggleSidebar}>
							<div className=" transition-all duration-75 ease-linear rounded-full text-blue-900 p-2 shadow-md hover:shadow-red-200 border-blue-900 border hover:border-slate-50 cursor-pointer">
								<CiSettings />
							</div>
						</Link>
						<div
							onClick={handleLogout}
							className="transition-all duration-75 ease-linear rounded-full p-2 text-blue-900 shadow-md hover:shadow-red-200 border-blue-900 border hover:border-slate-50 cursor-pointer"
						>
							<TbLogout />
						</div>
					</div>
				</div>
			</div>
			<div
				className="w-screen h-screen fixed z-10 bg-blue-900 bg-opacity-50 block md:hidden"
				onClick={handleToggleSidebar}
			></div>
		</>
	);
};

export default sidebar;
