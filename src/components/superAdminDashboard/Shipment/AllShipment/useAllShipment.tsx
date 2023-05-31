import { useState, useEffect, useContext } from 'react';
import { ShipmentServices } from '@/services';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContextType, AppContext } from '@/context';
function useShipment() {
	const params = useParams();
	const navigate = useNavigate();
	const { state, setState } = useContext<AppContextType>(AppContext);

	const { adminGetAllShipments } = ShipmentServices();
	const [loading, setLoading] = useState(false);
	const [allShipment, setAllShipment] = useState([]);
	const [selectedShipment, setSelectedShipment]= useState({})
	const [currentPage, setCurrentPage] = useState(Number(params.current_page));
	const [hasNextPage, setHasNextPage] = useState();
	const [hasPreviousPage, setHasPreviousPage] = useState();
	const [showModal, setShowModal] = useState<boolean>(false)

	const getAllShipment = () => {
		if (isNaN(currentPage)) {
			setCurrentPage(1);
		}
		setLoading(true);
		adminGetAllShipments(`?page=${currentPage}&limit=7`).then(
			(response) => {
				setHasNextPage(response.data.hasNextPage);
				setHasPreviousPage(response.data.hasPreviousPage);
				setAllShipment(response.data.allUserShipment);
				navigate('/admin/shipment/' + currentPage);

				setLoading(false);
			},
			(error) => {
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
	const setActivePage = ()=>{
		setState((prevState) => ({
		  ...prevState,
		  activePage: 'Shipment',
		})); 
	  }

	useEffect(() => {
		setActivePage()
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
		setSelectedShipment,
		setShowModal,
		handleSelectShipment,
		getAllShipment,
		setCurrentPage,
	};
}
export default useShipment;
