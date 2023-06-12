import { RiSearch2Line, shipmentOverview } from '@/assets';
import { RingLoader } from '@/components';
import useShipmentSearchBox from './useShipmentSearchBox';

interface ShipmentSearchProp {
	setSingleShipment: any;
}
const index = ({ setSingleShipment }: ShipmentSearchProp) => {
	const { loading, trackingID, secreteID, handleTrackShipment, setTrackingID, setSecreteID } =
		useShipmentSearchBox(setSingleShipment);
	return (
		<div className="relative">
			<div
				className="bg-cover bg-center h-64 md:h-96"
				style={{
					backgroundImage: `url(${shipmentOverview})`,
				}}
			>
				<div className="absolute inset-0 bg-black opacity-50"></div>
				<div className="absolute inset-0 flex items-center justify-center px-10 pt-20  md:px-20 lg:px-44 flex-col xl:flex-row ">
					<form className="flex w-full flex-col gap-3" onSubmit={handleTrackShipment}>
						<input
							value={trackingID}
							onChange={(e) => setTrackingID(e.target.value)}
							type="text"
							className="animate__animated animate__fadeInUp   w-full outline-none p-2 bg-white"
							placeholder="Enter Shipment Tracking ID"
							required
						/>
						<input
							value={secreteID}
							onChange={(e) => setSecreteID(e.target.value)}
							type="text"
							className="animate__animated animate__fadeInUp w-full outline-none p-2 bg-white"
							placeholder="Enter Shipment Secrete ID"
							required
						/>
						<button
							type="submit"
							className="animate__animated animate__fadeInUp hover:shadow-md w-2/12 shadow-gray-50 shadow-sm  p-2 rounded-sm bg-blue-700 font-bold text-white text-md flex items-center justify-center"
						>
							{!loading ? (
								<div className="flex items-center justify-center gap-2">
									<RiSearch2Line />
									<span>Search</span>
								</div>
							) : (
								<RingLoader size={30} loaderColor="#fff" />
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default index;
