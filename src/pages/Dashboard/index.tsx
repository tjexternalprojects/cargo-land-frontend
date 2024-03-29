import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Notification, Sidebar, TopBar } from '@/components';
import { AppContext, AppContextType } from '@/context';
import { motion } from 'framer-motion';
import { slideInFromRight } from '@/utils/animations';
import { UserServices, ShipmentServices } from '@/services';

const Dashboard = () => {
	const { state } = useContext<AppContextType>(AppContext);
	const { getSingleUser } = UserServices();
	const { getAllUserShipment } = ShipmentServices();
	useEffect(() => {
		getSingleUser();
		getAllUserShipment();
	}, []);
	return (
		<div className="flex bg-gray-200 min-h-screen">
			<div
				className={`md:flex md:w-72 z-30 ${
					state.toggleAdminSideBar ? 'flex fixed md:relative' : 'hidden md:flex'
				}`}
			>
				<Sidebar />
			</div>
			<div className="bg-gray-200 flex items-center justify-center py-3 fixed z-20  w-full pl-3 md:pl-72 pr-3 md:pr-14  ">
				<TopBar />
			</div>
			<div className="pt-16 w-full pl-3 pr-3 md:pl-14 md:pr-14 ">
				<Outlet />
			</div>

			<motion.div
				{...slideInFromRight}
				animate={state.toggleNotification ? slideInFromRight.animate : slideInFromRight.initial}
				className="fixed w-full h-full"
			>
				<Notification />
			</motion.div>
		</div>
	);
};

export default Dashboard;
