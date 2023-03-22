import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardHome, ShipmentPage, History, TrackShipment } from '@/components';
import Dashboard from '@/pages/Dashboard';
import { BusinessSignup, LandingPage, Login } from '@/pages/index';
import ProtectedRoutes from '@/ProtectedRoutes';
import UnprotectedRoutes from '@/UnprotectedRoutes';
import { AppProvider } from '@/context';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
function App() {
		useEffect(() => {
			AOS.init();
		}, []);
	return (
		<AppProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<ProtectedRoutes />}>
						<Route path="/dashboard" element={<Dashboard />}>
							<Route path="" element={<DashboardHome />} />
							<Route path="/dashboard/shipment" element={<ShipmentPage />} />
							<Route path="/dashboard/track_shipment" element={<TrackShipment />} />
							<Route path="/dashboard/price" element={<History />} />
						</Route>
					</Route>
					<Route element={<UnprotectedRoutes />}>
						<Route path="/login" element={<Login />} />
						<Route path="/" element={<LandingPage />} />
						<Route path="/business" element={<BusinessSignup/>}/> 
					</Route>
				</Routes>
			</BrowserRouter>
		</AppProvider>
	);
}

export default App;
