import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, TopBar } from '../components';

const Dashboard = () => {
	return (
		<div className="flex bg-gradient-to-tr from-white via-white to-blue-200 min-h-screen">
			<div className=' w-72'>
				<Sidebar />
			</div>

			<div className=' w-full py-5 px-10'>
        <TopBar/>
      	<Outlet />
			</div>
		</div>
	);
};

export default Dashboard;
