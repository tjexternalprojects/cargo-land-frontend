import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TransactionServices } from '@/services';
function useVerifyPayment() {
	const { verifyPayment } = TransactionServices();
	const [searchParams] = useSearchParams();
	const [paymentStatus, setPaymentStatus] = useState('');
	const [loading, setLoading] = useState(false);
	const params = {
		status: searchParams.get('status'),
		txRef: searchParams.get('tx_ref'),
		transactionId: searchParams.get('transaction_id'),
	};
	useEffect(() => {
		setLoading(true);
		verifyPayment(params).then(
			(response) => {
				setPaymentStatus(response.data.body);
				setLoading(false);
			},
			(error) => {
				console.log(error);
				setLoading(false);
			}
		);
	}, []);
	return { params, paymentStatus, loading };
}
export default useVerifyPayment;
