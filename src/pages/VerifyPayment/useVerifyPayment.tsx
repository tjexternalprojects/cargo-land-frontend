import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TransactionServices } from '@/services';
import { AppContextType, AppContext } from '@/context';
import { toast } from 'react-toastify';
function useVerifyPayment() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const { verifyPayment } = TransactionServices();
	const [searchParams] = useSearchParams();
	const [paymentStatus, setPaymentStatus] = useState<Record<string, string>>({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const verify_payload = {
		status: searchParams.get('status') as string,
		txRef: searchParams.get('tx_ref') as string,
		transactionId: searchParams.get('transaction_id') as string,
		amount: state.initializePayment?.amount as string,
	};

	const resetShipment = (shipmentCurrentTab: string, form_level: number) => {
		const resetShipmentDetails = {
			shipment_title: '',
			shipment_description: '',
			shipment_weight: 0,
			images: [],
			shipment_type: '',
			start_location: {
				location_id: '',
				country: '',
				state: '',
				city: '',
				address: '',
				formattedAddress: '',
				longitude: null,
				latitude: null,
			},
			recipient_full_name: '',
			recipient_email: '',
			recipient_phone_number: '',
			final_destination: {
				location_id: '',
				country: '',
				state: '',
				city: '',
				address: '',
				formattedAddress: '',
				longitude: null,
				latitude: null,
			},
			shipment_current_location: {},
			shipment_heading_to: {},
			shipment_addresses: [],
		};

		setState({
			...state,
			shipmentDetails: resetShipmentDetails,
			shipmentCurrentTab,
			form_level,
			editShipment: false,
		});
	};

	useEffect(() => {
		setLoading(true);
		verifyPayment(verify_payload).then(
			(response) => {
				console.log('RESPONSE FROM VERIFY PAYMENT =====================================');
				console.log(response);
				if (!response.data.success) {
					toast.error('Error making payment', {
						progressClassName: 'bg-red-500 h-1',
						autoClose: 3000,
					});
					resetShipment('item1', 0);
					navigate('/dashboard/shipment');
				}
				setPaymentStatus(response.data);
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
