import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardHome } from './components';
import Dashboard from './pages/Dashboard';
import { BusinessSignup, Login } from './pages/index';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Dashboard />}>
					<Route path="" element={<DashboardHome />} />
					<Route path="/delivery" element={<DashboardHome />} />
					<Route path="/price" element={<DashboardHome />} />
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/business_signup" element={<BusinessSignup />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
