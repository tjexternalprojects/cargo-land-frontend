import { NewShipmentForm, RecipientDetails } from '..';
const Delivery = () => {
	return (
		<>
			<div className=" tracking-widest text-sm text-gray-500 p-10 font-bold">NEW SHIPMENT</div>
			<div className="px-10  flex gap-3 ">
				<div>
					<div className="mt-10 border-l-2 space-y-2">
						<div className=" border-l-4 border-l-blue-900 pl-4 text-blue-900 font-bold">
							Package&nbsp;Details
						</div>
						<div className="   pl-5">Recipient&nbsp;Details</div>
						<div className="   pl-5">Payment</div>
					</div>
				</div>
				<div className=" w-full ">
					<NewShipmentForm />
					<RecipientDetails />
				</div>
			</div>
		</>
	);
};

export default Delivery;
