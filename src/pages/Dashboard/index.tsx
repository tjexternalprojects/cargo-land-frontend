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
		<div className="flex bg-gradient-to-tr from-white via-white to-slate-50 min-h-screen">
			<div className={` w-72 z-20 ${toggleAdminSideBar ? 'flex' : 'md:flex hidden'}`}>
				<Sidebar />
			</div>
			<div className="bg-white flex items-center justify-center py-3 fixed z-10  w-full pl-72 pr-10  shadow-md ">
				<div>
					<GiHamburgerMenu
						className={`md:hidden text-4xl`}
						onClick={() =>
							setState((prevState) => ({
								...prevState,
								toggleAdminSideBar: true,
							}))
						}
					/>
				</div>
				<TopBar />
			</div>
			<div className="pt-16 w-4/5 ">
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
