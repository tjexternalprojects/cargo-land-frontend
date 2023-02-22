import { ReactNode, useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, TopBar } from '../components';
import { GiHamburgerMenu } from '../assets';
import { useApp, AppContext, AppContextType } from '../context/IndexContext';

const Dashboard = () => {
	const { toggleAdminSideBar } = useApp();
	const { setState } = useContext<AppContextType>(AppContext);

	return (
		<div className="flex bg-gradient-to-tr from-white via-white to-slate-50 min-h-screen ">
			<div className={`w-72  ${toggleAdminSideBar ? 'flex' : 'md:flex hidden'}`}>
			<Sidebar />
			</div>
			<div className=" fixed w-full bg-white flex items-center justify-center py-3 border-2 border-red-800 ">
				<div className=" h-10 w-full  px-10 ">
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
			</div>
			<div className='pt-16'>

			<Outlet />
			</div>
		</div>
	);
};

export default Dashboard;
