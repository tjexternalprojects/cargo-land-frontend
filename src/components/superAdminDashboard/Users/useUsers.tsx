import { useContext, useEffect } from 'react';
import { UserServices } from '@/services';
import { AppContextType, AppContext } from '@/context';
function useUsers() {
	const { getAllUsers } = UserServices();
	const { state, setState } = useContext<AppContextType>(AppContext);

	const users = [
		{
			uid: 'xxx2222',
			full_name: 'David Adegbetan',
			email: 'da@gmail.com',
			phone_number: '08144324546',
			account_type: 'Regular',
			account_status: 'Active',
		},
	];

	useEffect(() => {
		getAllUsers;
		console.log(state.all_users);
	}, []);
	return { users, state };
}
export default useUsers;
