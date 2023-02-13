import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BusinessSignup, Login } from './pages';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/business_signup" element={<BusinessSignup />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
