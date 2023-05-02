import { AppContextType, AppContext } from '@/context';
import { LocalStorageServices, UserServices } from '@/services';
import { userInfo } from 'os';
import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function useUserDetails() {
	const { updateUser } = UserServices();
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [updateUserDetails, setUpdateUserDetails] = useState(
		state.single_user_data as Record<string, string>
	);
	useEffect(() => {
		setUpdateUserDetails(state.single_user_data as Record<string, string>);
	}, [state.single_user_data]);

	const [showLoader, setShowLoader] = useState(false);
	const [editInfo, setEditInfo] = useState(false);
	const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setShowLoader(true);
		const user_data = {
			name: updateUserDetails?.name,
			phoneNumber: updateUserDetails?.phoneNumber,
		};

		await updateUser(user_data).then(
			(response) => {
				console.log(response);
				setShowLoader(false);

				if (response.status == 202) {
					toast.success(response.data.message, {
						progressClassName: 'bg-blue-500 h-1',
						autoClose: 3000,
					});
					setEditInfo(false);
				}
			},

			(error) => {
				setShowLoader(false);
				console.log(error);
				toast.error('An error occurred, please try again', {
					progressClassName: 'bg-red-500 h-1',
					autoClose: 3000,
				});
			}
		);
	};

	return {
		editInfo,
		updateUserDetails,
		showLoader,
		setUpdateUserDetails,
		handleUpdateUser,
		setEditInfo,
	};
}

export default useUserDetails;
