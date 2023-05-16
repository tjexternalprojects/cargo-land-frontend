import { AppContext, AppContextType } from '@/context';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function useSearchShipment(navigate_to: string) {
	const [searchLoading, setSearchLoading] = useState(false);
	const [mobileSearch, setMobileSearch] = useState(false);
	const [shipmentId, setShipmentId] = useState('');
	const { state, setState } = useContext<AppContextType>(AppContext);
	const navigation = useNavigate();

	const handSearchShipment = (e: React.FormEvent<HTMLFormElement>) => {
		setSearchLoading(true);
		e.preventDefault();
		const filtered_shipment = state.allShipments.filter((obj: any) => obj.id === shipmentId);
		if (filtered_shipment.length === 0) {
			toast.error('Item Not found, you can re confirm the shipment Id', {
				progressClassName: 'bg-red-500 h-1',
				autoClose: 3000,
			});
		} else {
			setMobileSearch(false);
			setShipmentId('');
			setState((prevState) => ({
				...prevState,
				trackingShipments: filtered_shipment,
			}));
			navigation(navigate_to);
		}
		setSearchLoading(false);
	};
	return {
		handSearchShipment,
		setShipmentId,
		setMobileSearch,
		mobileSearch,
		shipmentId,
		searchLoading,
	};
}

export default useSearchShipment;
