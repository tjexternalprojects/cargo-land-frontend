import { useContext, useEffect, useState } from 'react';
import { UserServices } from '@/services';
import { AppContextType, AppContext } from '@/context';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
function useUsers() {
	const { getAllUsers } = UserServices();
	const navigate = useNavigate();
	const params = useParams();
	const [currentPage, setCurrentPage] = useState(Number(params.current_page));

	const { state, setState } = useContext<AppContextType>(AppContext);
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(1);
	const [hasNextPage, setHasNextPage] = useState();
	const [hasPreviousPage, setHasPreviousPage] = useState();

	const [allUser, setAllUsers] = useState<Record<string, string | string[] | undefined>[]>([]);

	const allUsers = async () => {
		if (isNaN(currentPage)) {
			setCurrentPage(1);
		}
		setLoading(true);
		await getAllUsers(Number(currentPage), 7).then(
			(response) => {
				console.log(response);
				setHasNextPage(response.data.hasNextPage);
				setHasPreviousPage(response.data.hasPreviousPage);
				setAllUsers(response.data.users);
				navigate('/admin/users/' + currentPage);

				setLoading(false);
			},
			(error) => {
				console.log(error);
				setLoading(false);
				toast.error('Failed to load user', {
					progressClassName: 'bg-red-500 h-1',
					autoClose: 3000,
				});
			}
		);
	};

	useEffect(() => {
		allUsers();
	}, [currentPage]);
	return {
		allUser,
		state,
		currentPage,
		result,
		loading,
		hasNextPage,
		hasPreviousPage,
		setCurrentPage,
	};
}
export default useUsers;
