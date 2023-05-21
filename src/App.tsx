import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
	DashboardHome,
	ShipmentPage,
	History,
	TrackShipment,
	AdminHome,
	AUsers,
	ATrackShipment,
	ATransactions,
	AShipment,
	LoadingPage,
	UserProfile,
	AllShipment,
} from '@/components';
import {
	LandingPage,
	Login,
	Dashboard,
	Admin,
	ResetPassword,
	VerifyPayment,
	Page404,
} from '@/pages';
import ProtectedDashboardRoutes from './ProtectedDashboardRoutes';
import ProtectedAdminRoutes from './ProtectedAdminRoutes';
import { AppProvider } from '@/context';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'animate.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
function App() {
	useEffect(() => {
		AOS.init();
	}, []);
	return (
		<AppProvider>
			<BrowserRouter>
				<Suspense fallback={<LoadingPage />}>
					<Routes>
						<Route element={<ProtectedDashboardRoutes />}>
							<Route path="/dashboard" element={<Dashboard />}>
								<Route path="" element={<DashboardHome />} />
								<Route path="/dashboard/shipment" element={<ShipmentPage />} />
								<Route path="/dashboard/all_shipment/:current_page" element={<AllShipment />} />
								<Route path="/dashboard/track_shipment" element={<TrackShipment />} />
								<Route path="/dashboard/history" element={<History />} />
								<Route path="/dashboard/user" element={<UserProfile />} />
								<Route path="/dashboard/payment/verify" element={<VerifyPayment />} />
							</Route>
						</Route>
						<Route element={<ProtectedAdminRoutes />}>
							<Route path="/admin" element={<Admin />}>
								<Route path="" element={<AdminHome />} />
								<Route path="/admin/users/:current_page" element={<AUsers />} />
								<Route path="/admin/shipment/update/:shipment_id" element={<ATrackShipment />} />
								<Route path="/admin/transactions" element={<ATransactions />} />
								<Route path="/admin/shipment/:current_page" element={<AShipment />} />
							</Route>
						</Route>
						<Route path="/" element={<LandingPage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/resetpassword/:token" element={<ResetPassword />} />
						<Route path="*" element={<Page404 />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
			<ToastContainer />
		</AppProvider>
	);
}

export default App;
