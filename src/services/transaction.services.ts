import api from './api.services';

function transactionServices() {
	const initiatePayment = (payload: any) => {
		return api.post('/payment/initiate', payload);
	};
	const verifyPayment = (params: Record<string, string | null>) => {
		return api.get(
			`/payment/verify?status=${params.status}&tx_ref=${params.txRef}&transaction_id=${params.transactionId}`
		);
	};

	const allWithdrawal = () => {
		return api.get('/withdraw/withdraw');
	};

	// { amount, accountNumber, bank, password, accountName }
	const makeWithdrawal = (payload: Record<string, string | number>) => {};

	const userPaymentHistory = () => {
		return api.get('/payment/getall-user-payment');
	};

	// ADMIN END POINTS
	const paymentHistory = () => {
		return api.get('/payment/getall-payment-history');
	};

	return { verifyPayment, initiatePayment, userPaymentHistory, paymentHistory };
}

export default transactionServices;
