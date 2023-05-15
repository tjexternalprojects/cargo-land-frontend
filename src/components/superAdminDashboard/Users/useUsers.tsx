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

	const [allUser, setAllUsers] = useState<Record<string, string | string[] | undefined>[]>([]);

	const allUsers = async () => {
		if (isNaN(currentPage)) {
			setCurrentPage(1);
		}
		setLoading(true);
		await getAllUsers(Number(currentPage), 7).then(
			(response) => {
				if (response.data.users.length > 0) {
					setAllUsers(response.data.users);
					navigate('/admin/users/' + currentPage);
				} else {
					setResult(0);
					setCurrentPage(1);
					navigate('/dashboard/all_shipment/' + currentPage);
				}
				setLoading(false);
			},
			(error) => {
				console.log(error);
				setLoading(false);
				toast.info('Please select an image file', {
					progressClassName: 'bg-blue-500 h-1',
					autoClose: 3000,
				});
			}
		);
	};

	useEffect(() => {
		allUsers();
	}, []);
	return { allUser, state, currentPage, result, loading, setCurrentPage };
}
export default useUsers;
