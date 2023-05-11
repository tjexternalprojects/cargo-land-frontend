import { useContext, useEffect, useState } from 'react';
import { ShipmentServices } from '@/services';
import { AppContextType, AppContext } from '@/context';
import { toast } from 'react-toastify';
function HomeGraph() {
	interface ShipmentSummaryInterface {
		id: number;
		month: string;
		totalValue: number;
		shipmentDetails: Record<string, any>;
	}

	const [shipmentSummary, setShipmentSummary] = useState<ShipmentSummaryInterface[]>([]);
	const { state, setState } = useContext<AppContextType>(AppContext);

	const getGraphData = (duration: Record<string, string | number>) => {
		let newData: ShipmentSummaryInterface;
		ShipmentServices()
			.getShipmentInRange(duration as Record<string, string>)
			.then(
				(response) => {
					newData = {
						id: duration.id as number,
						month: `${duration.month}, ${duration.year}`,
						totalValue: response.data.allSHipment.length,
						shipmentDetails: response.data.allSHipment,
					};
					setShipmentSummary((prevState) => [...prevState, newData]);
				},
				(error) => {
					toast.error(error.response.data.message, {
						progressClassName: 'bg-red-500 h-1',
						autoClose: 3000,
					});
				}
			);
	};

	const getShipmentDateRange = async (month_to_show: number) => {
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

		for (let i = month_to_show - 1; i >= 0; i--) {
			const start_time = new Date(Date.UTC(current_year, current_month, 1)).toISOString();
			const end_time = new Date(Date.UTC(current_year, current_month + 1, 0)).toISOString();

			const payload_obj = {
				id: i,
				year: current_year.toString().slice(-2),
				month: month[current_month],
				startMonth: start_time,
				endMonth: end_time,
			};
			payload_array.unshift(payload_obj);

			if (current_month == 0) {
				current_year = current_year - 1;
				current_month = 12;
			}
			current_month = current_month - 1;
		}
		for (let index = 0; index < payload_array.length; index++) {
			await getGraphData(payload_array[index]);
		}
	};

	useEffect(() => {
		const uniqueData = Object.values(
			shipmentSummary.reduce<Record<string, any>>(
				(acc, cur) => Object.assign(acc, { [cur.id]: cur }),
				{}
			)
		);
		uniqueData.sort((a, b) => a.id - b.id);
		setState((prevState) => ({
			...prevState,
			shipmentSummary: uniqueData,
		}));
	}, [shipmentSummary]);

	return { getShipmentDateRange };
}
export default HomeGraph;
