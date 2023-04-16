import { AppContextType, AppContext } from '@/context';
import { useContext, useState } from 'react';

function useHome() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const user_data = state.single_user_data
	const [curency, setCurency] = useState('\u20A6');
	const balance = state.single_user_data?.wallet;
	const [showBalance, setShowBalance] = useState(false);
	const toggleShowBalance = () => {
		setShowBalance(!showBalance)
	};


	const graph_data = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June'],
		datasets: [
			{
				data: [0, 0, 0, 0, 0, 0],
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
		transaction_history,
		curency,
		showBalance,
		state
	};
}
export default useHome;
