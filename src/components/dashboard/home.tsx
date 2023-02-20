import React from 'react';
import { LineGraph } from '..';
import useDashboard from '../../customHooks/useDashboard';

const home = () => {
	const { received_data, sent_data } = useDashboard();
	return (
		<div className="mt-10">
			<div className="gap-4 flex justify-between  bg-white p-5 shadow-sm">
			<div className=" inline-flex rounded-md gap-3 p-4 min-w-min bg-green-50  flex-grow w-72 justify-between  shadow items-center">
					<div className=" w-20">
						<LineGraph data={received_data} />
					</div>
					<div className="flex flex-col items-end text-green-500">
						<div>Package Received</div>
						<div className=" text-5xl font-thin">200</div>
					</div>
				</div>

				<div className=" inline-flex rounded-md gap-3 p-4 min-w-min flex-grow  w-72 justify-between bg-slate-50 shadow items-center">
					<div className=" w-20">
						<LineGraph data={sent_data} />
					</div>
					<div className="flex flex-col items-end text-red-500">
						<div>Package Sent</div>
						<div className=" text-5xl font-thin ">200</div>
					</div>
				</div>

				<div className=" inline-flex rounded-md gap-3 p-4 min-w-min w-72 flex-grow  justify-between bg-slate-50 shadow items-center">
					<div className=" w-20">
						<LineGraph data={sent_data} />
					</div>
					<div className="flex flex-col items-end text-red-500">
						<div>Package Sent</div>
						<div className=" text-5xl font-thin ">200</div>
					</div>
				</div>

			</div>
		</div>
	);
};

export default home;
