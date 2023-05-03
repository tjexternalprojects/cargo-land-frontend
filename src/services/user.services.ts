import { AppContextType, AppContext } from '@/context';
import { useContext } from 'react';
import api from './api.services';
import { LocalStorageServices } from '@/services';
import { toast } from 'react-toastify';

function UserServices() {
	const { state, setState } = useContext<AppContextType>(AppContext);

	const getSingleUser = async () => {
		await api.get('/user/single-user/').then(
			(res) => {
				setState((prevState) => ({
					...prevState,
					single_user_data: res.data.user,
				}));
			},
			(err) => {
				toast.error(err.response.data.message, {
					progressClassName: 'bg-red-500 h-1',
					autoClose: 3000,
				});
			}
		);
	};

	const updateUserAvatar = (user_image: FormData) => {
		return api.patch('/user/update', user_image);
	};

	const updateUser = (user_data: Record<string, string | number>) => {
		return api.patch('/user/update', user_data);
	};

	// SERVICES FOR ADMIN
	const getAllUsers = () => {
		return api.get('/user/all-users').then(
			(res) => {
				setState((prevState) => ({
					...prevState,
					all_users: res.data.users,
				}));
			},
			(err) => {
				toast.error(err.response.data.message, {
					progressClassName: 'bg-red-500 h-1',
					autoClose: 3000,
				});
			}
		);
	};
	return {
		getSingleUser,
		updateUser,
		updateUserAvatar,
		getAllUsers,
	};
}
export default UserServices;
