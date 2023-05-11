import { AppContextType, AppContext } from '@/context';
import { useContext, useState } from 'react';

function useHome() {
	const { state, setState } = useContext<AppContextType>(AppContext);

	const [activeShipment, setActiveShipment] = useState([
		{
			shipment_id: 'KH921B',
			status: 'On Transit',
			shipment_title: 'Bag of Shoes',
			startLocation: { lng: 3.3119897, lat: 6.499183599999999 },
			endLocation: { lng: 3.3120209, lat: 6.5049772 },
			approval_date: '20-may-2023 11:45 am',
			delevery_date: '30-may-2023',
		},
		{
			shipment_id: 'KH921B',
			status: 'On Transit',
			shipment_title: 'Bag of Shoes',
			startLocation: { lng: 3.3119897, lat: 6.499183599999999 },
			endLocation: { lng: 3.3120209, lat: 6.5049772 },
			approval_date: '20-may-2023 11:45 am',
			delevery_date: '30-may-2023',
		},
		{
			shipment_id: 'KH921B',
			status: 'On Transit',
			shipment_title: 'Bag of Shoes',
			startLocation: { lng: 3.3119897, lat: 6.499183599999999 },
			endLocation: { lng: 3.3120209, lat: 6.5049772 },
			approval_date: '20-may-2023 11:45 am',
			delevery_date: '30-may-2023',
		},
	]);
	const [currency, setCurrency] = useState('\u20A6');
	const balance = state.single_user_data?.wallet;
	const [showBalance, setShowBalance] = useState(false);
	const toggleShowBalance = () => {
		setShowBalance(!showBalance);
	};
	// Items Delivered
	const labels = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const received_data = {
		labels,
		datasets: [
			{
				data: [2, 3, 3, 5, 6, 7, 8, 1, 3, 5, 3, 0],
				backgroundColor: [
					'red',
					'green',
					'yellow',
					'black',
					'pink',
					'blue',
					'purple',
					'violet',
					'lightbrown',
					'indigo',
					'silver',
					'gold',
					'peach',
				],
				borderWidth: 0,
			},
		],
	};

	const sent_data = {
		labels,
		datasets: [
			{
				data: [12, 13, 13, 15, 16, 17, 18, 11, 13, 15, 13, 10],
				backgroundColor: [
					'red',
					'green',
					'yellow',
					'black',
					'pink',
					'blue',
					'purpule',
					'violet',
					'lightbrown',
					'indigo',
					'silver',
					'gold',
					'peach',
				],
				borderWidth: 0,
			},
		],
	};

	const transaction_history = [
		{
			type: 'debit',
			title: 'Pay for shipment',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, placeat sit dolor velit quisquam aut eos reiciendis expedita natus vel, quo voluptates laboriosam eligendi et, labore maiores! Ad, eveniet quo?',
			amount: '5,000',
			date: '20, July, 2022',
			transaction_id: 'xxx222',
		},
		{
			type: 'credit',
			title: 'Credit Wallet',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, placeat sit dolor velit quisquam aut eos reiciendis expedita natus vel, quo voluptates laboriosam eligendi et, labore maiores! Ad, eveniet quo?',
			amount: '5,000',
			date: '20, July, 2022',
			transaction_id: 'xxx222',
		},
		{
			type: 'debit',
			title: 'Pay for shipment',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, placeat sit dolor velit quisquam aut eos reiciendis expedita natus vel, quo voluptates laboriosam eligendi et, labore maiores! Ad, eveniet quo?',
			amount: '5,000',
			date: '20, July, 2022',
			transaction_id: 'xxx222',
		},
		{
			type: 'credit',
			title: 'Credit Wallet',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, placeat sit dolor velit quisquam aut eos reiciendis expedita natus vel, quo voluptates laboriosam eligendi et, labore maiores! Ad, eveniet quo?',
			amount: '5,000',
			date: '20, July, 2022',
			transaction_id: 'xxx222',
		},
		{
			type: 'debit',
			title: 'Pay for shipment',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, placeat sit dolor velit quisquam aut eos reiciendis expedita natus vel, quo voluptates laboriosam eligendi et, labore maiores! Ad, eveniet quo?',
			amount: '5,000',
			date: '20, July, 2022',
			transaction_id: 'xxx222',
		},
		{
			type: 'credit',
			title: 'Credit Wallet',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, placeat sit dolor velit quisquam aut eos reiciendis expedita natus vel, quo voluptates laboriosam eligendi et, labore maiores! Ad, eveniet quo?',
			amount: '5,000',
			date: '20, July, 2022',
			transaction_id: 'xxx222',
		},
	];

	return {
		toggleShowBalance,
		currency,
		balance,
		state,
		activeShipment,
		transaction_history,
		showBalance,
		received_data,
		sent_data,
	};
}
export default useHome;
