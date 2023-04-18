import { AppContext, AppContextType } from '@/context';
import { ShipmentServices } from '@/services';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function useTopBar() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [itemInChart, setItemInCart] = useState(0);
	const [shipmentId, setShipmentId] = useState('');
	const [searchLoading, setSearchLoading] = useState(false);
	const [mobileSearch, setMobileSearch] = useState(false);
	const navigation = useNavigate();
	const handleToggleNotification = () => {
		setState({
			...state,
			toggleNotification: !state.toggleNotification,
		});
	};
	const handleToggleSidebar = () => {
		setState((prevState) => ({
			...prevState,
			toggleAdminSideBar: !state.toggleAdminSideBar,
		}));
	};

	const showChartItems = () => {
		if (itemInChart > 0) {
			setState({
				...state,
				shipmentCurrentTab: 'item3',
				form_level: 2,
			});
			navigation('/dashboard/shipment');
		}
	};

	const getTotalChart = async () => {
		const unchecked = state.allShipments.filter((obj: any) => obj.shipment_Status == 'UNCHECK');
		setItemInCart(unchecked.length);
	};
	useEffect(() => {
		getTotalChart();
	}, [state.allShipments]);

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
			navigation('/dashboard/track_shipment');
		}
		setSearchLoading(false);
	};

	return {
		handleToggleNotification,
		handleToggleSidebar,
		showChartItems,
		setState,
		handSearchShipment,
		setShipmentId,
		setMobileSearch,
		mobileSearch,
		searchLoading,
		shipmentId,
		itemInChart,
		state,
	};
}
export default useTopBar;
