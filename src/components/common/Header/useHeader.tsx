import { AppContextType, AppContext } from '@/context';
import { useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function useHeader() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		confirmAlert({
			title: 'Logout?',
			message: 'Are you sure you want to logout',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						localStorage.clear();
						setState({
							...state,
							user: { loggedIn: null },
						});

						navigate('/');
						toast.success('Logged out successfully', {
							progressClassName: 'bg-green-500 h-1',
							autoClose: 3000,
						});
					},
				},
				{
					label: 'No',
					onClick: () => {},
				},
			],
		});
	};
	return { handleLogout };
}

export default useHeader;
