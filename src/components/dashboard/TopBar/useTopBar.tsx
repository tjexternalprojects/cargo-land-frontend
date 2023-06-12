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
			const resetShipmentDetails = {
				shipment_title: '',
				shipment_description: '',
				shipment_weight: 0,
				previewImage: [],
				images: [],
				shipment_type: '',
				start_location: {
					location_id: '',
					country: '',
					state: '',
					city: '',
					address: '',
					formattedAddress: '',
					longitude: null,
					latitude: null,
				},
				recipient_full_name: '',
				recipient_email: '',
				recipient_phone_number: '',
				final_destination: {
					location_id: '',
					country: '',
					state: '',
					city: '',
					address: '',
					formattedAddress: '',
					longitude: null,
					latitude: null,
				},
				shipment_current_location: {},
				shipment_heading_to: {},
				shipment_addresses: [],
			};

			setState({
				...state,
				shipmentDetails: resetShipmentDetails,
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
