import { Pagination, RingLoader } from '@/components';
import useShipment from './useAllShipment';
import ShipmentModal from '../SingleShipmentModal';
const Shipment = () => {
	const {
		loading,
		allShipment,
		currentPage,
		hasNextPage,
		hasPreviousPage,
		showModal,
		selectedShipment,
		setShowModal,
		handleSelectShipment,
		getAllShipment,
		setCurrentPage,
	} = useShipment();
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
									Shipment Creator
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
						<tbody className="group">
							{allShipment.map((shipment: any, index: number) => (
								<tr
									onClick={() => handleSelectShipment(shipment)}
									className=" border-b cursor-pointer hover:border-red-500  bg-white"
									key={index}
								>
									<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
										{shipment.id}
									</th>
									<td className="px-6 py-4">{shipment.shipment_title}</td>
									<td className="px-6 py-4">{shipment.shipment_title}</td>
									<td className="px-6 py-4">{shipment.sendersAddress}</td>
									<td className="px-6 py-4">{shipment.recepientAddress}</td>
									<td className="px-6 py-4">
										{shipment.shipment_Type === 'DOOR_TO_DOOR'
											? 'Door to Door'
											: 'Airport to Airport'}
									</td>
									<td 
									
									
									className={`
								 ${shipment.shipment_Status === 'UNCHECK' ? 'text-blue-500' : ''} 
								 ${shipment.shipment_Status === 'CHECKED' ? 'text-green-700' : ''} 
								 ${shipment.shipment_Status === 'TRANSIT' ? 'text-green-500' : ''} 
								 ${shipment.shipment_Status === 'REJECTED' ? 'text-red-500' : ''} 
								 font-extrabold px-6 py-4`}
									>{shipment.shipment_Status}</td>
									
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>

			{!loading && (
				<Pagination
					setCurrentPage={setCurrentPage}
					currentPage={Number(currentPage)}
					hasNextPage={hasNextPage}
					hasPreviousPage={hasPreviousPage}
					loading={loading}
				/>
			)}

			{showModal && (
				<ShipmentModal selectedShipment={selectedShipment} setShowModal={setShowModal} />
			)}
		</div>
	);
};

export default Shipment;
