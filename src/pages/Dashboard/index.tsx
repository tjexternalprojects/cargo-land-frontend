import { ReactNode, useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Notification, Sidebar, TopBar } from '@/components';
import { GiHamburgerMenu } from '@/assets';
import { useApp, AppContext, AppContextType } from '@/context';
import { motion } from 'framer-motion';
import { slideInFromRight } from '@/utils/animations';
const Dashboard = () => {
	const { toggleAdminSideBar } = useApp();
	const { state, setState } = useContext<AppContextType>(AppContext);
	return (
		<div className="flex bg-gray-200 min-h-screen">
			<div className={`  z-20 ${toggleAdminSideBar ? 'flex ' : 'md:flex md:w-72 hidden'}`}>
				<Sidebar />
			</div>
			<div className="bg-gray-200 flex items-center justify-center py-3 fixed z-10  w-full pl-10 md:pl-72 pr-10  ">
			<TopBar />
				
			</div>
			<div className="pt-16 w-full  ">
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
