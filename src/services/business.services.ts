import api from './api.services';

function UserServices() {
	const registerBusiness = (payload: Record<string, string>) => {
		return api.post('/business/register', payload);
	};
	return {
		registerBusiness,
	};
}
export default UserServices;
