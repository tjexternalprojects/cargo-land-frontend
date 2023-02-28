import { FC } from 'react';
import {

	RiUserReceivedLine,
} from '@/assets';
import usePayment from './usePayment';
import { ToastContainer } from 'react-toastify';

interface RecipientDetailsProps {
	setAnimateTab: (value: string) => void;
}

const Payment: FC<RecipientDetailsProps> = ({ setAnimateTab }) => {
	const {
		handlePayment,
	} = usePayment(setAnimateTab);
	return (
		<>
			<div className="inline-flex flex-col items-center w-full">
				<div className="bg-blue-900 rounded-full text-white text-3xl p-2">
					<RiUserReceivedLine />
				</div>
				<p className="text-xl mt-4">Recipient Details</p>
				<form className=" w-9/12 my-5" onSubmit={handlePayment}>

				</form>
			<ToastContainer />
			</div>
		</>
	);
};

export default Payment;
