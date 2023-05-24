import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TransactionServices } from '@/services';
import { AppContextType, AppContext } from '@/context';
function useVerifyPayment() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const { verifyPayment } = TransactionServices();
	const [searchParams] = useSearchParams();
	const [paymentStatus, setPaymentStatus] = useState('');
	const [loading, setLoading] = useState(false);

	const verify_payload = {
		status: searchParams.get('status') as string,
		txRef: searchParams.get('tx_ref') as string,
		transactionId: searchParams.get('transaction_id') as string,
		amount: state.initializePayment?.amount as string,
	};
	useEffect(() => {
		setLoading(true);
		verifyPayment(verify_payload).then(
			(response) => {
				console.log('RESPONSE FROM VERIFY PAYMENT =====================================')
				console.log(response)
				setPaymentStatus(response.data.body);
				setLoading(false);
			},
			(error) => {
				console.log(error);
				setLoading(false);
			}
		);
	}, []);
	return { verify_payload, paymentStatus, loading };
}
export default useVerifyPayment;
