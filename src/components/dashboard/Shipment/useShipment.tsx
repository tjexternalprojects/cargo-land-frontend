import { useState, useContext, useEffect } from 'react';
import { AppContext, AppContextType } from '@/context';
import { useLocation } from 'react-router-dom';
function useShipment() {
	 const location = useLocation();
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [animationDirection, setAnimationDirection] = useState({
		prev_direction: 1,
		direction: -50,
	});

	const resetShipment = (shipmentCurrentTab: string, form_level: number) => {
	

		const resetShipmentDetails = {
			shipment_title: '',
			shipment_description: '',
			shipment_weight: 0,
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
			shipmentCurrentTab,
			form_level,
			editShipment: false,
		});
	};
	const handleCancelEdit = () => {
		resetShipment('item3', 2);
	};
	const handleNewShipment = () => {
		resetShipment('item1', 0);
	};

	const handleShowTab = (item: string, item_number: number) => {
		if (animationDirection.prev_direction < item_number) {
			setAnimationDirection(() => ({
				...animationDirection,
				direction: -50,
				prev_direction: item_number,
			}));
		} else if (animationDirection.prev_direction > item_number) {
			setAnimationDirection(() => ({
				...animationDirection,
				direction: 50,
				prev_direction: item_number,
			}));
		}

		setState({
			...state,
			shipmentCurrentTab: item,
		});
	};


	return { handleNewShipment, handleShowTab, handleCancelEdit, state, animationDirection };
}
export default useShipment;
