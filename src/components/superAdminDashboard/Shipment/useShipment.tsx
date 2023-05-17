import { useState, useEffect } from 'react';
import { ShipmentServices } from '@/services';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
function useShipment() {
	const params = useParams();
	const navigate = useNavigate();

	const { adminGetAllShipments } = ShipmentServices();
	const [loading, setLoading] = useState(false);
	const [allShipment, setAllShipment] = useState([]);
	const [selectedShipment, setSelectedShipment]= useState({})
	const [currentPage, setCurrentPage] = useState(Number(params.current_page));
	const [hasNextPage, setHasNextPage] = useState();
	const [hasPreviousPage, setHasPreviousPage] = useState();
	const [showModal, setShowModal] = useState(false)

	const getAllShipment = () => {
		if (isNaN(currentPage)) {
			setCurrentPage(1);
		}
		setLoading(true);
		adminGetAllShipments(`?page=${currentPage}&limit=7`).then(
			(response) => {
				console.log(response);
				setHasNextPage(response.data.hasNextPage);
				setHasPreviousPage(response.data.hasPreviousPage);
				setAllShipment(response.data.allUserShipment);
				navigate('/admin/shipment/' + currentPage);

				setLoading(false);
			},
			(error) => {
				console.log(error);
				setLoading(false);
				toast.error(error.data.message, {
					progressClassName: 'bg-red-500 h-1',
					autoClose: 3000,
				});
			}
		);
	};

	const handleSelectShipment =(val:any)=>{
		setSelectedShipment(val)
		setShowModal(true)
	}
	useEffect(() => {
		getAllShipment();
	}, [currentPage]);

	return {
		loading,
		allShipment,
		currentPage,
		hasNextPage,
		hasPreviousPage,
		showModal,
		selectedShipment,
		setShowModal,
		handleSelectShipment,
		getAllShipment,
		setCurrentPage,
	};
}
export default useShipment;
