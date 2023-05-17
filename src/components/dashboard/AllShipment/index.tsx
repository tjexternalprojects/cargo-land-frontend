import React from 'react';
import useAllShipment from './useAllShipment';
import { Pagination, RingLoader } from '@/components';
const index = () => {
	const { allShipment, currentPage, loading, result, setCurrentPage } = useAllShipment();
	return (
		<div className="overflow-auto">
			<div className="relative overflow-auto max-h-72-screen min-h-72-screen mt-5">
				{loading ? (
					<div className="w-full border flex items-center justify-center">
						<RingLoader size={200} textColor="text-blue-900" />
					</div>
				) : (
					<table className="w-full text-sm text-left text-gray-500">
						<thead className="text-xs text-gray-700 uppercase bg-gray-100">
							<tr>
								<th scope="col" className="px-6 py-3">
									Tracking Id
								</th>
								<th scope="col" className="px-6 py-3">
									Shipment Title
								</th>
								<th scope="col" className="px-6 py-3">
									Sender's Address
								</th>
								<th scope="col" className="px-6 py-3">
									Recepient's Address
								</th>
								<th scope="col" className="px-6 py-3">
									Deleivery Type
								</th>
								<th scope="col" className="px-6 py-3">
									Shipment Status
								</th>
							</tr>
						</thead>
						<tbody>
							{allShipment.map((shipment: any, index: number) => (
								<tr className="bg-white border-b cursor-pointer hover:bg-red-100" key={index}>
									<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
										{shipment.id}
									</th>
									<td className="px-6 py-4">{shipment.shipment_title}</td>
									<td className="px-6 py-4">{shipment.sendersAddress}</td>
									<td className="px-6 py-4">{shipment.recepientAddress}</td>
									<td className="px-6 py-4">
										{shipment.shipment_Type === 'DOOR_TO_DOOR'
											? 'Door to Door'
											: 'Airport to Airport'}
									</td>
									<td className="px-6 py-4">{shipment.shipment_Status}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>

			<Pagination
				setCurrentPage={setCurrentPage}
				currentPage={Number(currentPage)}
				result={result}
				loading={loading}
			/>
		</div>
	);
};

export default index;
