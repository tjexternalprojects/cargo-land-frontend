import { AppContextType, AppContext } from '@/context';
import { useContext } from 'react';
import api from './api.services';
import { LocalStorageServices } from '@/services';

const getSingleUser = () => {
	const user = LocalStorageServices.getUserInfo();
	return api.get('/user/single-user/' + user?.id);
};

const updateUserAvatar = (user_image: FormData) => {
	return api.patch('/user/update', user_image);
};

const updateUser = (user_data: Record<string, string | number>) => {
	return api.patch('/user/update', user_data);
};

const UserServices = {
	getSingleUser,
	updateUser,
	updateUserAvatar,
};

export default UserServices;
