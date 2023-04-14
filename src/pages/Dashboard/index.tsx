import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Notification, Sidebar, TopBar } from '@/components';
import { AppContext, AppContextType } from '@/context';
import { motion } from 'framer-motion';
import { slideInFromRight } from '@/utils/animations';
import { UserServices } from '@/services';
const Dashboard = () => {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const { getSingleUser } = UserServices()
	useEffect(() => {
		// if (state.user_data) {
			getSingleUser()
			setState({
                ...state,
                user_data: {resp:'response'},
            });
	
		// }
	}, [])
	return (
		<div className="flex bg-gray-200 min-h-screen">
			<div
				className={`md:flex md:w-72 z-20 ${state.toggleAdminSideBar ? 'flex fixed md:relative' : 'hidden md:flex'
					}`}
			>
				<Sidebar />
			</div>
			<div className="bg-gray-200 flex items-center justify-center py-3 fixed z-10  w-full pl-3 md:pl-72 pr-3 md:pr-14  ">
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
