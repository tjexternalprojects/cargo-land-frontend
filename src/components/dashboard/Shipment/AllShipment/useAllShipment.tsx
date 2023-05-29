import { AppContextType, AppContext } from '@/context';
import { useContext, useEffect, useState } from 'react';
import { ShipmentServices } from '@/services';
import { useParams, useNavigate } from 'react-router-dom';

function useAllShipment() {
	const navigate = useNavigate();
	const [allShipment, setAllShipments] = useState<any>([]);
	const params = useParams();
	const [currentPage, setCurrentPage] = useState(Number(params.current_page));
	const { getAllUserShipmentPaginated } = ShipmentServices();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(1);
	const [showModal, setShowModal] = useState(false)
	const [selectedShipment, setSelectedShipment]= useState({})

	const getAllShipment = async () => {
		if (isNaN(currentPage)) {
			setCurrentPage(1);
		}
		setLoading(true);
		await getAllUserShipmentPaginated(Number(currentPage), 6).then(
			(response) => {
				console.log(response);
				if (response.data.allUserShipment.length > 0) {
					setAllShipments(response.data.allUserShipment);
					navigate('/dashboard/all_shipment/' + currentPage);
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
		allShipment,
		currentPage,
		loading,
		result,
		showModal,
		selectedShipment,
		setShowModal,
		handleSelectShipment,
		setCurrentPage,
	};
}

export default useAllShipment;
