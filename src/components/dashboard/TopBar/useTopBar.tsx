import { AppContext, AppContextType } from '@/context';
import { ShipmentServices } from '@/services';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function useTopBar() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [itemInChart, setItemInCart] = useState(0);
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
				editShipment: false,
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



	return {
		handleToggleNotification,
		handleToggleSidebar,
		showChartItems,
		setState,
		itemInChart,
		state,
	};
}
export default useTopBar;
