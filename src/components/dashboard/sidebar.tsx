import {
	CiSettings,
	logo,
	MdTrackChanges,
	RiPriceTag2Line,
	TbLayoutDashboard,
	TbLogout,
	TbTruckDelivery,
	userImg,
} from '../../assets';
import { NavLink, useMatch } from 'react-router-dom';
import useLogin from '../../customHooks/useLogin';
const sidebar = () => {
	const dashboardMatch = useMatch('/');
	const deliveryMatch = useMatch('/delivery');
	const trackMatch = useMatch('/track_shipment');
	const historyMatch = useMatch('/price');
	const { handleLogout } = useLogin();
	return (
		<div className=" bg-blue-900 fixed h-screen w-64 flex flex-col justify-between">
			<div className="bg-white shadow-md flex items-center justify-center rounded-md p-2 m-8">
				<img src={logo} className=" w-24 h-8" alt="" />
			</div>
			<div className="flex-grow mt-10 ml-8">
				<ul className=" text-lg  font-bold">
					<li>
						<NavLink className="flex flex-col" to="/">
							<div className={`${dashboardMatch ? 'bg-white' : 'bg-blue-900'}`}>
								<div className="h-4 bg-blue-900 rounded-br-3xl"></div>
							</div>
							<div
								className={`${
									dashboardMatch ? 'bg-white text-blue-900 rounded-l-3xl py-3' : 'text-white'
								} px-3 flex items-center space-x-3 `}
							>
								<TbLayoutDashboard /> <span>Dashboard</span>
							</div>

							<div className={`${dashboardMatch ? 'bg-white' : 'bg-blue-900'}`}>
								<div className="h-4 bg-blue-900 rounded-tr-3xl"></div>
							</div>
						</NavLink>
					</li>

					<li>
						<NavLink className="flex flex-col" to="/delivery">
							<div className={`${deliveryMatch ? 'bg-white' : 'bg-blue-900'}`}>
								<div className="h-4 bg-blue-900 rounded-br-3xl"></div>
							</div>
							<div
								className={`${
									deliveryMatch ? 'bg-white text-blue-900 rounded-l-3xl py-3' : 'text-white'
								} px-3 flex items-center space-x-3 `}
							>
								<MdTrackChanges /> <span>New Shipment</span>
							</div>

							<div className={`${deliveryMatch ? 'bg-white' : 'bg-blue-900'}`}>
								<div className="h-4 bg-blue-900 rounded-tr-3xl"></div>
							</div>
						</NavLink>
					</li>

					<li>
						<NavLink className="flex flex-col" to="/track_shipment">
							<div className={`${trackMatch ? 'bg-white' : 'bg-blue-900'}`}>
								<div className="h-4 bg-blue-900 rounded-br-3xl"></div>
							</div>
							<div
								className={`${
									trackMatch ? 'bg-white text-blue-900 rounded-l-3xl py-3' : 'text-white'
								} px-3 flex items-center space-x-3 `}
							>
								<TbTruckDelivery /> <span>Track Shipment</span>
							</div>

							<div className={`${trackMatch ? 'bg-white' : 'bg-blue-900'}`}>
								<div className="h-4 bg-blue-900 rounded-tr-3xl"></div>
							</div>
						</NavLink>
					</li>
					<li>
						<NavLink className="flex flex-col" to="/price">
							<div className={`${historyMatch ? 'bg-white' : 'bg-blue-900'}`}>
								<div className="h-4 bg-blue-900 rounded-br-3xl"></div>
							</div>
							<div
								className={`${
									historyMatch ? 'bg-white text-blue-900 rounded-l-3xl py-3' : 'text-white'
								} px-3 flex items-center space-x-3 `}
							>
								<RiPriceTag2Line /> <span>History</span>
							</div>

							<div className={`${historyMatch ? 'bg-white' : 'bg-blue-900'}`}>
								<div className="h-4 bg-blue-900 rounded-tr-3xl"></div>
							</div>
						</NavLink>
					</li>
				</ul>
			</div>
			<div className="text-white flex flex-col items-center p-8">
				<div className="flex flex-col gap-3 items-center">
					<div className="w-10 h-10 rounded-full shadow-md border border-slate-200">
						<img src={userImg} className="w-full h-full object-contain rounded-full" />
					</div>
					<div className="text-center">
						<h3 className="font-bold text-md">David Adeyinka</h3>
						<p className="text-gray-300 font-light text-sm">@davidadexx</p>
					</div>

					<button></button>
				</div>
				<div className="flex gap-2 text-2xl">
					<div className=" transition-all duration-75 ease-linear rounded-full p-2 shadow-md hover:shadow-red-200 border-blue-900 border hover:border-slate-50 cursor-pointer">
						<CiSettings />
					</div>
					<div
						onClick={handleLogout}
						className="transition-all duration-75 ease-linear rounded-full p-2 shadow-md hover:shadow-red-200 border-blue-900 border hover:border-slate-50 cursor-pointer"
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
