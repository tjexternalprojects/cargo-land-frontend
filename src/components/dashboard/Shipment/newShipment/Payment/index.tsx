import { RiUserReceivedLine } from '@/assets';
import usePayment from './usePayment';

const Payment = () => {
	const { handlePayment } = usePayment();
	return (
		<>
			<div className="inline-flex flex-col items-center w-full border-4 ">
				<div className="bg-blue-900 rounded-full text-white text-3xl p-2">
					<RiUserReceivedLine />
				</div>
				<p className="text-xl mt-4">Checkout Shipment</p>
				<form className=" w-9/12 my-5" onSubmit={handlePayment}></form>
			</div>
		</>
	);
};

export default Payment;
