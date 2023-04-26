import { AppContextType, AppContext } from '@/context';
import { ShipmentServices } from '@/services';
import { useContext, useEffect, useState } from 'react';

function useHome() {
	const { getShipmentInRange } = ShipmentServices();
	const { state, setState } = useContext<AppContextType>(AppContext);
	const user_data = state.single_user_data;
	const [currency, setCurrency] = useState('\u20A6');
	const balance = state.single_user_data?.wallet;
	const [showBalance, setShowBalance] = useState(false);

	const [successfulShipmentLabel, setSuccessfulShipmentLabel] = useState([]);
	const [successfulShipmentData, setSuccessfulShipmentData] = useState([]);
	const [successfulShipmentLoader, setSuccessfulShipmentLoader] = useState(false);
	const toggleShowBalance = () => {
		setShowBalance(!showBalance);
	};

	const successful_shipment_graph = {
		labels: successfulShipmentLabel,
		datasets: [
			{
				data: successfulShipmentData,
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	};

	const successfulShipment = () => {
		const successfulShipments = state.shipmentSummary.filter(
			(shipment: { shipmentDetails: any[] }) => {
				return shipment.shipmentDetails.some((detail) => detail.shipment_Status === 'UNCHECK');
			}
		);

		const unchecked = state.shipmentSummary.map((obj: any, index: number) => {
			return obj.shipmentDetails.map((details: any) => {
				return details.shipment_status === 'UNCHECK' ? details : 0;
			});
		});

		setSuccessfulShipmentLabel(state.shipmentSummary.map((obj: any) => obj.month));
		// setSuccessfulShipmentData();
		const months = successfulShipments.map((obj: any) => obj.month);
		console.log(unchecked);
	};

	useEffect(() => {
		successfulShipment();
	}, [state.shipmentSummary]);
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
		successfulShipmentLoader,
		successful_shipment_graph,
		balance,
		user_data,
		transaction_history,
		currency,
		showBalance,
		state,
	};
}
export default useHome;
