import React from 'react';
import useAllShipment from './useAllShipment';
import { Pagination, RingLoader } from '@/components';
import ShipmentModal from '../SingleShipmentModal';

const index = () => {
	const {
		allShipment,
		currentPage,
		loading,
		result,
		showModal,
		selectedShipment,
		setShowModal,
		setCurrentPage,
		handleSelectShipment,
	} = useAllShipment();
	return (
		<div className="overflow-auto">
			<div className="relative overflow-auto max-h-72-screen min-h-72-screen mt-5">
				{loading ? (
					<div className="w-full flex items-center justify-center">
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
									Recipient's Address
								</th>
								<th scope="col" className="px-6 py-3">
									Delivery Type
								</th>
								<th scope="col" className="px-6 py-3">
									Shipment Status
								</th>
							</tr>
						</thead>
						<tbody>
							{allShipment.map((shipment: any, index: number) => (
								<tr
									className="bg-white border-b cursor-pointer hover:bg-red-100"
									key={index}
									onClick={() => handleSelectShipment(shipment)}
								>
									<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
										{shipment.id}
									</th>
									<td className="px-6 py-4">{shipment.shipment_title}</td>
									<td className="px-6 py-4">{shipment?.start_location?.formattedAddress}</td>
									<td className="px-6 py-4">{shipment?.final_destination?.formattedAddress}</td>
									<td className="px-6 py-4">
										{shipment.shipment_Type === 'DOOR_TO_DOOR'
											? 'Door to Door'
											: 'Airport to Airport'}
									</td>
									<td
										className={`
								 ${shipment.shipment_Status === 'UNCHECK' ? 'text-blue-500' : ''} 
								 ${shipment.shipment_Status === 'CHECKED' ? 'text-yellow-600' : ''} 
								 ${shipment.shipment_Status === 'TRANSIT' ? 'text-green-500' : ''} 
								 ${shipment.shipment_Status === 'SUCCESSFUL' ? 'text-green-700' : ''} 
								 ${shipment.shipment_Status === 'REJECTED' ? 'text-red-500' : ''} 
								 font-extrabold px-6 py-4`}
									>
										{shipment.shipment_Status}
									</td>
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

			{showModal && (
				<ShipmentModal selectedShipment={selectedShipment} setShowModal={setShowModal} />
			)}
		</div>
	);
};

export default index;
