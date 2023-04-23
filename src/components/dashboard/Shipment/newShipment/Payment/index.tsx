import { RiUserReceivedLine } from '@/assets';
import usePayment from './usePayment';
import { FlutterWaveButton } from 'flutterwave-react-v3';

const Payment = () => {
	const { handlePayment, fwConfig } = usePayment();
	return (
		<>
			<div className="inline-flex flex-col items-center w-full border-4 ">
				<div className="bg-blue-900 rounded-full text-white text-3xl p-2">
					<RiUserReceivedLine />
				</div>
				<p className="text-xl mt-4">Checkout Shipment</p>
				<form className=" w-9/12 my-5" onSubmit={handlePayment}></form>
				<FlutterWaveButton {...fwConfig} />
			</div>
		</>
	);
};

export default Payment;
