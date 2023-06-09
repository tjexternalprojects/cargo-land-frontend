import { AppContextType, AppContext } from '@/context';
import { ShipmentServices, TransactionServices } from '@/services';
import { useContext, useEffect, useState } from 'react';

function useHome() {
	const { getAllUserShipmentPaginated } = ShipmentServices();
	const { userPaymentHistory } = TransactionServices();
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [latestShipment, setLatestShipment] = useState<any>([]);
	const [latestShipmentLoader, setLatestShipmentLoader] = useState(false);
	const user_data = state.single_user_data;
	const [currency, setCurrency] = useState('\u20A6');
	const balance = state.single_user_data?.wallet;
	const [showBalance, setShowBalance] = useState(false);
	const [transactionHistory, setTransactionHistory] = useState<any>([]);
	const [transactionHistoryLoader, setTransactionHistoryLoader] = useState(false);
	// STATES FOR GRAPH
	// ***successful shipment graph
	const [successfulShipmentLabel, setSuccessfulShipmentLabel] = useState([]);
	const [successfulShipmentData, setSuccessfulShipmentData] = useState<any>([]);
	const [successfulShipmentLoader, setSuccessfulShipmentLoader] = useState(false);
	const [totalSuccessfulShipment, setTotalSuccessfulShipment] = useState(0);

	// ***total created graph
	const [shipmentCreatedLabel, setShipmentCreatedLabel] = useState([]);
	const [shipmentCreatedData, setShipmentCreatedData] = useState<any>([]);
	const [shipmentCreatedLoader, setShipmentCreatedLoader] = useState(false);
	const [totalShipmentCreated, setTotalShipmentCreated] = useState(0);

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
		setSuccessfulShipmentLoader(true);
		setSuccessfulShipmentLabel(state.shipmentSummary.map((obj: any) => obj.month));
		setSuccessfulShipmentData(
			state.shipmentSummary.map((obj: any) =>
				obj.shipmentDetails.some((sd: any) => sd.shipment_Status === 'SUCCESSFUL')
					? obj.shipmentDetails.length
					: 0
			)
		);


		let successfulShipmentsCount = state.shipmentSummary.reduce(function (
			count: number,
			shipment: { shipmentDetails: any }
		) {
			let shipmentDetails = shipment.shipmentDetails;

			for (let i = 0; i < shipmentDetails.length; i++) {
				let shipmentStatus = shipmentDetails[i].shipment_Status;

				if (shipmentStatus === 'SUCCESSFUL') {
					return count + 1;
				}
			}

			return count;
		},
		0);

		setTotalSuccessfulShipment(successfulShipmentsCount);

		setSuccessfulShipmentLoader(false);
	};

	const shipment_created_graph = {
		labels: shipmentCreatedLabel,
		datasets: [
			{
				data: shipmentCreatedData,
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	};

	const shipmentCreated = async () => {
		setShipmentCreatedLoader(true);
		await setShipmentCreatedLabel(state.shipmentSummary.map((obj: any) => obj.month));
		await setShipmentCreatedData(
			state.shipmentSummary.map((obj: any) => obj.shipmentDetails.length)
		);
		await setTotalShipmentCreated(
			shipmentCreatedData.reduce(
				(accumulator: number, currentValue: number) => accumulator + currentValue,
				0
			)
		);
		setShipmentCreatedLoader(false);
	};

	const getTransactionHistory = () => {
		setTransactionHistoryLoader(true);
		userPaymentHistory().then(
			(response) => {
				setTransactionHistory(response.data.data);
				setTransactionHistoryLoader(false);
			},
			(error) => {
				setTransactionHistoryLoader(false);
			}
		);
	};

	const getLatestShipment = () => {
		setLatestShipmentLoader(true);
		getAllUserShipmentPaginated(1, 1).then((response) => {
			setLatestShipment(response.data.allUserShipment);
			setLatestShipmentLoader(false);
		});
	};

	useEffect(() => {
		successfulShipment();
		shipmentCreated();
	}, [state.shipmentSummary]);

	useEffect(() => {
		getTransactionHistory();
		getLatestShipment();
	}, []);

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
		successfulShipment,
		successfulShipmentLoader,
		successful_shipment_graph,
		totalSuccessfulShipment,

		shipmentCreated,
		transactionHistoryLoader,
		transactionHistory,
		latestShipment,
		latestShipmentLoader,
		shipment_created_graph,
		shipmentCreatedLoader,
		totalShipmentCreated,
		balance,
		user_data,
		transaction_history,
		currency,
		showBalance,
		state,
	};
}
export default useHome;
