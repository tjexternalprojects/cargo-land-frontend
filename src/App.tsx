import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardHome, DeliveryPage, History } from './components';
import Dashboard from './pages/Dashboard';
import { BusinessSignup, Login } from './pages/index';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Dashboard />}>
					<Route path="" element={<DashboardHome />} />
					<Route path="/delivery" element={<DeliveryPage />} />
					<Route path="/price" element={<History />} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/business_signup" element={<BusinessSignup />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
