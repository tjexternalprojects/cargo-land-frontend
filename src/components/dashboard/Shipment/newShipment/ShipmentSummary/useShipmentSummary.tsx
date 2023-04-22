import { useContext, useEffect, useState } from 'react';
import { AppContext, AppContextType } from '@/context';

function useShipmentSummary() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [showShipmentModal, setShowShipmentModal] = useState(false);
	const [unCheckedShipment, setUnCheckedShipment] = useState<any>([])
	const [totalPrice, setTotalPrice] = useState<any>([]);
	const image_slider_settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		initialSlide: 0,
	};

	const getCheckedShipment = ()=>{
		const unchecked = state.allShipments.filter((obj: any) => obj.shipment_Status == 'UNCHECK');
		console.log(unchecked)
		setUnCheckedShipment(unchecked)
		const deliveryPriceTotal = state.allShipments.reduce((total: any, obj: { delivery_price: any; }) => total + obj.delivery_price, 0);
		setTotalPrice(unchecked);
	}

	const minusAmount =(amount:number)=>{
		setTotalPrice(totalPrice - amount)
	}

	useEffect(()=>{
		getCheckedShipment()
	}, [state.allShipments])


	const handleShowModal = () => {
		setShowShipmentModal(true);
	};

	const handleRemoveItem = () => {

		// HANDLE REMOVE SHIPMENT 
	};
	const handleAddShipment = () => {
		setState({
			...state,
			shipmentCurrentTab: 'item1',
		});
	};

	const handlePayment = () => {
		setState({
			...state,
			shipmentCurrentTab: 'item4',
			form_level: 3,
		});
	};
	const handleSummary = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setState({
			...state,
			shipmentCurrentTab: 'item4',
		});
	};

	const shipmentData = [
		{
			shipment_title: 'Yam',
			shipment_description: ' lorem lorem lorem loreml orelksdkflkd ',
			shipment_weight: 200,
			images: [],
			current_location: {
				country: 'Nigeria',
				state: 'Lagos',
				city: 'Ikeja',
				address: '40, James Street',
				longitude: 0.444455,
				latitude: 0.444434,
			},
			recipient_full_name: 'Kemi Lawal',
			recipient_email: 'kkmi@gmail.com',
			shipment_destination: {
				country: 'Ughada',
				state: 'Ugli',
				city: 'lluuu',
				address: '30, dddsd. damaturu',
				longitude: 0.4444,
				latitude: 0.444,
			},
		},
		{
			shipment_title: 'Yam',
			shipment_description: ' lorem lorem lorem loreml orelksdkflkd ',
			shipment_weight: 200,
			images: [],
			current_location: {
				country: 'Nigeria',
				state: 'Lagos',
				city: 'Ikeja',
				address: '40, James Street',
				longitude: 0.444455,
				latitude: 0.444434,
			},
			recipient_full_name: 'Kemi Lawal',
			recipient_email: 'kkmi@gmail.com',
			shipment_destination: {
				country: 'Ughada',
				state: 'Ugli',
				city: 'lluuu',
				address: '30, dddsd. damaturu',
				longitude: 0.4444,
				latitude: 0.444,
			},
		},
		{
			shipment_title: 'Yam',
			shipment_description: ' lorem lorem lorem loreml orelksdkflkd ',
			shipment_weight: 200,
			images: [],
			current_location: {
				country: 'Nigeria',
				state: 'Lagos',
				city: 'Ikeja',
				address: '40, James Street',
				longitude: 0.444455,
				latitude: 0.444434,
			},
			recipient_full_name: 'Kemi Lawal',
			recipient_email: 'kkmi@gmail.com',
			shipment_destination: {
				country: 'Ughada',
				state: 'Ugli',
				city: 'lluuu',
				address: '30, dddsd. damaturu',
				longitude: 0.4444,
				latitude: 0.444,
			},
		},
		{
			shipment_title: 'Yam',
			shipment_description: ' lorem lorem lorem loreml orelksdkflkd ',
			shipment_weight: 200,
			images: [],
			current_location: {
				country: 'Nigeria',
				state: 'Lagos',
				city: 'Ikeja',
				address: '40, James Street',
				longitude: 0.444455,
				latitude: 0.444434,
			},
			recipient_full_name: 'Kemi Lawal',
			recipient_email: 'kkmi@gmail.com',
			shipment_destination: {
				country: 'Ughada',
				state: 'Ugli',
				city: 'lluuu',
				address: '30, dddsd. damaturu',
				longitude: 0.4444,
				latitude: 0.444,
			},
		},
		{
			shipment_title: 'Yam',
			shipment_description: ' lorem lorem lorem loreml orelksdkflkd ',
			shipment_weight: 200,
			images: [],
			current_location: {
				country: 'Nigeria',
				state: 'Lagos',
				city: 'Ikeja',
				address: '40, James Street',
				longitude: 0.444455,
				latitude: 0.444434,
			},
			recipient_full_name: 'Kemi Lawal',
			recipient_email: 'kkmi@gmail.com',
			shipment_destination: {
				country: 'Ughada',
				state: 'Ugli',
				city: 'lluuu',
				address: '30, dddsd. damaturu',
				longitude: 0.4444,
				latitude: 0.444,
			},
		},
		{
			shipment_title: 'Yam',
			shipment_description: ' lorem lorem lorem loreml orelksdkflkd ',
			shipment_weight: 200,
			images: [],
			current_location: {
				country: 'Nigeria',
				state: 'Lagos',
				city: 'Ikeja',
				address: '40, James Street',
				longitude: 0.444455,
				latitude: 0.444434,
			},
			recipient_full_name: 'Kemi Lawal',
			recipient_email: 'kkmi@gmail.com',
			shipment_destination: {
				country: 'Ughada',
				state: 'Ugli',
				city: 'lluuu',
				address: '30, dddsd. damaturu',
				longitude: 0.4444,
				latitude: 0.444,
			},
		},
	];

	return {
		handleSummary,
		setShowShipmentModal,
		handleShowModal,
		handleRemoveItem,
		handleAddShipment,
		handlePayment,
		minusAmount,
		totalPrice,
		unCheckedShipment,
		showShipmentModal,
		shipmentData,
		state,
		image_slider_settings,
	};
}
export default useShipmentSummary;
