import { AppContextType, AppContext } from '@/context';
import { ShipmentServices } from '@/services';
import { useContext, useEffect, useState } from 'react';

function useHome() {
	const {getShipmentInRange} = ShipmentServices()
	const { state, setState } = useContext<AppContextType>(AppContext);
	const user_data = state.single_user_data;
	const [currency, setCurrency] = useState('\u20A6');
	const balance = state.single_user_data?.wallet;
	const [showBalance, setShowBalance] = useState(false);
	const [gPackageLabel, setGPackageLabel] = useState<string[]>([]);
	const [gPackageData, setGPackageData] = useState<number[]>([]);
	const [gPackageLoader, setGPackageLoader] = useState(false);

	const toggleShowBalance = () => {
		setShowBalance(!showBalance);
	};

	const graph_data = {
		labels: gPackageLabel,
		datasets: [
			{
				data: gPackageData,
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	};

	const getGraphData = (duration: Record<string, string | number>) => {
		getShipmentInRange(duration as Record<string, string>).then(
			(response) => {
				setGPackageData((prevState) => [...prevState, response.data.allSHipment.length]);
		setGPackageLoader(false);

			},
			(error) => {
				console.log(error);
			}
		);
	};

	const getPackageReceived = async (month_to_show: number) => {
		setGPackageLoader(true);
		const month = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];
		const payload_array = [];

		let current_year = new Date().getFullYear();
		let current_month = new Date().getMonth();

		for (let i = month_to_show; i >= 0; i--) {
			const start_time = new Date(Date.UTC(current_year, current_month, 1)).toISOString();
			const end_time = new Date(Date.UTC(current_year, current_month + 1, 0)).toISOString();

			const payload_obj = {
				year: current_year.toString().slice(-2),
				month: month[current_month],
				startMonth: start_time,
				endMonth: end_time,
			};
			payload_array.unshift(payload_obj);

			if (current_month == 0) {
				current_year = current_year - 1;
				current_month = 11;
			}
			current_month = current_month - 1;
		}
		setGPackageData([]);
		const formatted_array = payload_array.map((payload) => `${payload.month}, ${payload.year}`);
		setGPackageLabel(formatted_array);
		await payload_array.map((obj, index) => getGraphData(obj));
	};
	
	useEffect(()=>{
		getPackageReceived(6);

	},[])
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
		getPackageReceived,
		getGraphData,
		gPackageLoader,
		graph_data,
		balance,
		user_data,
		transaction_history,
		currency,
		showBalance,
		state,
	};
}
export default useHome;
