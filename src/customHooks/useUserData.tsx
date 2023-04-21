import { useState, useEffect, useContext } from 'react';
import { LocalStorageServices, UserServices } from '@/services';
import { AppContextType, AppContext } from '@/context';
import { toast } from 'react-toastify';

function useUserData() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const userData = async () => {
			setLoading(true);
			await UserServices.getSingleUser().then(
				(res) => {
					setLoading(false);
					console.log(res.data.user);
					setState((prevState) => ({
						...prevState,
						single_user_data: res.data.user,
					}));
				},
				(err) => {
					setLoading(false);
					toast.error(err.response.data.message, {
						progressClassName: 'bg-red-500 h-1',
						autoClose: 3000,
					});
					setError(err);
				}
			);
		};
		userData();
	}, []);

	return [loading, error];
}
export default useUserData;
