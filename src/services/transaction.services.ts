import api from './api.services';

function transactionServices() {
	const initiatePayment = (payload: any) => {
		return api.post('/payment/initiate', payload);
	};
	const verifyPayment = (payload: Record<string, string | null>) => {
		return api.post('/payment/verify-webhook-4-cargoland', payload);
	};

	const allWithdrawal = () => {
		return api.get('/withdraw/withdraw');
	};

	// { amount, accountNumber, bank, password, accountName }
	const makeWithdrawal = (payload: Record<string, string | number>) => {
		return api.get('/withdraw/withdraw', payload);

	};

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


// localhost:4300/shipment/update-single-shipment-price/:id with *{
//     "delivery_price":23400
// }* req.body