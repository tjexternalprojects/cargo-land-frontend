import { useContext, useEffect, useState } from 'react';
import { AppContext, AppContextType } from '@/context';
import { ShipmentServices, TransactionServices } from '@/services';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

function useShipmentSummary() {
	const { deleteShipment, getAllUserShipment } = ShipmentServices();
	const { initiatePayment } = TransactionServices();
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [showShipmentModal, setShowShipmentModal] = useState(false);
	const [unCheckedShipment, setUnCheckedShipment] = useState<any>([]);
	const [totalPrice, setTotalPrice] = useState<any>([]);
	const [totalShipmentToCheckout, setTotalShipmentToCheckout] = useState(0);
	const [removeShipmentLoader, setRemoveShipmentLoader] = useState(false);
	const [itemIndexToRemove, setItemIndexToRemove] = useState<string>();
	const [selectedShipment, setSelectedShipment] = useState<
		Record<string, string | undefined> | undefined
	>();
	const [shipmentLoader, setShipmentLoader] = useState(false);

	const image_slider_settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		initialSlide: 0,
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

	const getCheckedShipment = () => {
		const unchecked = state.allShipments.filter((obj: any) => obj.shipment_Status == 'UNCHECK');

		if (unchecked.length === 0) {
			setState({
				...state,
				shipmentCurrentTab: 'item1',
				form_level: 0,
			});
			return;
		}

		const updatedUnchecked = unchecked.map((obj: any) => {
			return {
				...obj,
				checked: obj.delivery_price !== 'await_admin' ? true : false,
			};
		});

		setUnCheckedShipment(updatedUnchecked);
		calculateTotalPrice(updatedUnchecked);
	};

	const calculateTotalPrice = (items_array: any) => {
		setTotalShipmentToCheckout(0);
		const deliveryPriceTotal = items_array.reduce(
			(total: number, obj: { checked: boolean; delivery_price: string }) => {
				if (obj.checked === true) {
					setTotalShipmentToCheckout((prevTotal) => prevTotal + 1);
					const deliveryPrice =
						typeof obj.delivery_price === 'number'
							? obj.delivery_price
							: Number(obj.delivery_price);
					return total + deliveryPrice;
				}
				return total;
			},
			0
		);

		setTotalPrice(Number(deliveryPriceTotal));
	};

	const handleCheck = (index: number) => {
		const updatedArray = [...unCheckedShipment];
		updatedArray[index].checked = !updatedArray[index].checked;
		setUnCheckedShipment(updatedArray);
		calculateTotalPrice(updatedArray);
	};

	const handleShowModal = (selected_shipment: Record<string, string>) => {
		setSelectedShipment(selected_shipment);
		setShowShipmentModal(true);
	};

	const removeShipment = async (shipment_id: string) => {
		setRemoveShipmentLoader(true);
		setItemIndexToRemove(shipment_id);
		await deleteShipment(shipment_id).then(
			(response) => {
				toast.success('Item Removed Successfully', {
					progressClassName: 'bg-green-500 h-1',
					autoClose: 3000,
				});
				getAllUserShipment();
				setRemoveShipmentLoader(false);
			},
			(error) => {
				setRemoveShipmentLoader(false);
			}
		);
	};

	const handleRemoveItem = (shipment_id: string) => {
		confirmAlert({
			title: 'Remove?',
			message: `Are you sure you want to remove Shipment  ${shipment_id}`,
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						removeShipment(shipment_id);
					},
				},
				{
					label: 'No',
					onClick: () => {},
				},
			],
		});
	};
	const handleAddShipment = () => {
		resetShipment('item1', 0);
	};

	const handlePayment = () => {
		setShipmentLoader(true);
		const totalShipment: Record<string, string>[] = [];

		unCheckedShipment.forEach((obj: any) => {
			if (obj.checked) {
				totalShipment.push({
					shipmentId: obj.id,
					amount: obj.delivery_price,
				});
			}
		});

		const payload = {
			shipments: totalShipment,
			amount: totalPrice,
			email: state.single_user_data?.email,
			phone_number: state.single_user_data?.phoneNumber,
		};

		initiatePayment(payload).then(
			(response) => {
				toast.success(response.data.message, {
					progressClassName: 'bg-green-500 h-1',
					autoClose: 3000,
				});

				setState({
					...state,
					initializePayment: response.data.data,
					shipmentCurrentTab: 'item4',
					form_level: 3,
				});
				setShipmentLoader(false);
			},
			(error) => {
				toast.error(error.response.data.message, {
					progressClassName: 'bg-red-500 h-1',
					autoClose: 3000,
				});

				setShipmentLoader(false);
			}
		);
	};

	const handleSummary = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setState({
			...state,
			shipmentCurrentTab: 'item4',
		});
	};

	useEffect(() => {
		getCheckedShipment();
	}, [state.allShipments]);
	return {
		handleSummary,
		setShowShipmentModal,
		handleShowModal,
		handleRemoveItem,
		handleAddShipment,
		handlePayment,
		handleCheck,
		totalShipmentToCheckout,
		shipmentLoader,
		selectedShipment,
		itemIndexToRemove,
		removeShipmentLoader,
		totalPrice,
		unCheckedShipment,
		showShipmentModal,
		state,
		image_slider_settings,
	};
}
export default useShipmentSummary;
