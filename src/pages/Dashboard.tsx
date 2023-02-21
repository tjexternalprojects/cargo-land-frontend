import { ReactNode, useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, TopBar } from '../components';
import { GiHamburgerMenu } from '../assets';
import { useApp, AppContext, AppContextType } from '../context/IndexContext';

const Dashboard = () => {
	const { toggleAdminSideBar } = useApp();
	const { setState } = useContext<AppContextType>(AppContext);

	return (
		<div className="flex bg-gradient-to-tr from-white via-white to-slate-50 min-h-screen">
			<div className={`w-72  ${toggleAdminSideBar ? 'block' : 'md:block hidden'}`}>
				<Sidebar />
			</div>

			<div className=" w-full py-5 px-10">
				<div className="flex">
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
				<Outlet />
			</div>
		</div>
	);
};

export default Dashboard;
