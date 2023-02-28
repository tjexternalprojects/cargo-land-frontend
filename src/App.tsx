import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardHome, DeliveryPage, History } from '@/components';
import Dashboard from '@/pages/Dashboard';
import { BusinessSignup, Login } from '@/pages/index';
import ProtectedRoutes from '@/ProtectedRoutes';
import { AppProvider } from '@/context';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
	return (
		<AppProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<ProtectedRoutes />}>
						<Route path="/" element={<Dashboard />}>
							<Route path="" element={<DashboardHome />} />
							<Route path="/delivery" element={<DeliveryPage />} />
							<Route path="/price" element={<History />} />
						</Route>
					</Route>
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</AppProvider>
	);
}

export default App;
