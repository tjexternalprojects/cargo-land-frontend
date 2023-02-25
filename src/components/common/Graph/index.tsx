import { Line, PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip } from 'chart.js';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip);

import useGraph from './useGraph';

interface Props {
	data: {
		labels: string[];
		datasets: {
			label: string;
			data: number[];
			backgroundColor: string[];
			borderWidth: number;
		}[];
	};
}
const Graph = ({ data }: Props) => {
	const { options } = useGraph();
	return <PolarArea options={options} data={data} />;
};

export default Graph;
