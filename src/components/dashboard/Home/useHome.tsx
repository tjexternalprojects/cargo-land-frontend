import { AppContextType, AppContext } from '@/context';
import { useContext, useState } from 'react';

function useHome() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const user_data = state.user_data
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
	]);
	const [curency, setCurency] = useState('\u20A6');
	const balance = state.user_data?.wallet;
	const [showBalance, setShowBalance] = useState(true);
	const toggleShowBalance = () => {
	 setShowBalance(!showBalance)
	};


const graph_data = {
 labels:  ['January', 'February', 'March', 'April', 'May', 'June'],
 datasets: [
   {
     data: [0,0,0,0,0,0],
     borderColor: 'rgb(255, 99, 132)',
     backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
		graph_data,
		balance,
		user_data,
		activeShipment,
		transaction_history,
		curency,
		showBalance,
	};
}
export default useHome;
