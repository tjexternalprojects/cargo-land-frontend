import { AppContextType, AppContext } from '@/context';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useContext, useState } from 'react';
function usePayment() {
	const { state, setState } = useContext<AppContextType>(AppContext);

	const config = {
		public_key: 'FLWPUBK_TEST-ab9110a6e892c4d8003972c67262c709-X',
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
			console.log(response);
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
