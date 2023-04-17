import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  Point,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
);


const options = {
 responsive: true,
 scales: {
   y: {
     grid: {
       display: false,
     },
   },
 },
};

interface Props {
    labels: string[];
		datasets: {
			data: number[];
            borderColor:string;
			backgroundColor: string;
        }[];
}

const LineGraph =({ labels, datasets }: Props)=>{
    const data = {
        labels: labels,
        datasets: datasets,
      };
    return <Line options={options} data={data} />;
}




export default LineGraph