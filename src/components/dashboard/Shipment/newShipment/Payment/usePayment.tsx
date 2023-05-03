import { AppContextType, AppContext } from '@/context';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useContext, useState } from 'react';
function usePayment() {
	const { state, setState } = useContext<AppContextType>(AppContext);

	const config = {
		public_key: import.meta.env.VITE_REACT_APP_FLUTTERWAVE_TEST_KEY,
		amount: 200,
		currency: 'NGN',
		payment_options: 'card,mobilemoney,ussd',
		redirect_url: 'http://localhost:4300/payment/verify',

		customer: {
			email: state.single_user_data?.email as string,
			phone_number: state.single_user_data?.phone as string,
			name: state.single_user_data?.name as string,
		},
		customizations: {
			title: 'CargoLand',
			description: 'CargoLand Payment',
			logo: 'https://cargoland.netlify.app/assets/logo-197784e7.png',
		},
	};

	const fwConfig = {
		...config,
		tx_ref: 'my-unique-transaction-id',
		text: 'Pay with Flutterwave!',
		callback: async (response: any) => {
			closePaymentModal(); // this will close the modal programmatically
		},
		onClose: async () => {
			// setTimeout(async () => {
			// await axios.post("http://localhost:4300/payment/flutterwave", data);
			// }, 7000);
		},
	};

	const handlePayment = () => {};
	return {
		handlePayment,
		fwConfig,
	};
}
export default usePayment;
