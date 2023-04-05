import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardHome, ShipmentPage, History, TrackShipment, AdminHome, AUsers, ATrackShipment, ATransactions, AShipment } from '@/components';
import { BusinessSignup, LandingPage, Login, Dashboard, Admin } from '@/pages';
import ProtectedRoutes from '@/ProtectedRoutes';
import { AppProvider } from '@/context';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "animate.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
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
							<Route path="/dashboard/history" element={<History />} />
						</Route>
						<Route path="/admin" element={<Admin/>}>
							<Route path="" element={<AdminHome />} />
							<Route path="/admin/users" element={<AUsers />} />
							<Route path="/admin/track_shipment" element={<ATrackShipment />} />
							<Route path="/admin/transactions" element={<ATransactions />} />
							<Route path="/admin/shipment" element={<AShipment />} />
						</Route>
					</Route>
					<Route path="/" element={<LandingPage />} />
					<Route path="/business" element={<BusinessSignup />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</AppProvider>
	);
}

export default App;
