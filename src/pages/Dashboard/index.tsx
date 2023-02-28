import { ReactNode, useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, TopBar } from '@/components';
import { GiHamburgerMenu } from '@/assets';
import { useApp, AppContext, AppContextType } from '@/context';

const Dashboard = () => {
	const { toggleAdminSideBar } = useApp();
	const { setState } = useContext<AppContextType>(AppContext);
	return (
		<div className="flex bg-gradient-to-tr from-white via-white to-slate-50 min-h-screen">
			<div className={` w-72 z-20 ${toggleAdminSideBar ? 'flex' : 'md:flex hidden'}`}>
				<Sidebar />
			</div>
			<div className="bg-white flex items-center justify-center py-3 fixed z-10  w-full pl-72 pr-10 ">
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
			<div className="pt-16 w-4/5">
				<Outlet />
			</div>
		</div>
	);
};

export default Dashboard;
