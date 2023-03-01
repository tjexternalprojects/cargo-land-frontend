import { useContext } from 'react';
import { AppContext, AppContextType } from '@/context';

function useShipmentSummary(setAnimateTab: (value: string) => void) {
	const { state, setState } = useContext<AppContextType>(AppContext);

	const image_slider_settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		initialSlide: 0,
	};


	const handleSummary = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setAnimateTab('item4');
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
		delivery_price: 0,
		form_level: 0,
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
		delivery_price: 0,
		form_level: 0,
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
		delivery_price: 0,
		form_level: 0,
	},
]

	return {
		handleSummary,
		shipmentData,
		state,
		image_slider_settings,
	};
}
export default useShipmentSummary;
