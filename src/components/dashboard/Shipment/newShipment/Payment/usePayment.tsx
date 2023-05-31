import { AppContextType, AppContext } from '@/context';
import { closePaymentModal } from 'flutterwave-react-v3';
import { useContext } from 'react';
function usePayment() {
	const { state, setState } = useContext<AppContextType>(AppContext);


	const config = {
		public_key: import.meta.env.VITE_REACT_APP_FLUTTERWAVE_TEST_KEY,
		tx_ref: state.initializePayment?.id as string,
		amount: Number(state.initializePayment?.amount),
		currency: 'NGN',
		payment_options: 'card,mobilemoney,ussd',
		redirect_url: import.meta.env.VITE_REACT_APP_FRONT_END_URL + '/dashboard/payment/verify',
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
		text: 'Pay with Flutterwave!',
		callback: async (response: any) => {
			closePaymentModal(); // this will close the modal programmatically
		},
		onClose: async () => {
		
		},
	};

	const handlePayment = () => {};
	return {
		handlePayment,
		fwConfig,
	};
}
export default usePayment;
