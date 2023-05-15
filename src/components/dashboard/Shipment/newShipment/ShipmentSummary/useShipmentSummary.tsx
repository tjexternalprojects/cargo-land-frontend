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

	const getCheckedShipment = () => {
		const unchecked = state.allShipments.filter((obj: any) => obj.shipment_Status == 'UNCHECK');

		if (unchecked.length === 0) {
			setState({
				...state,
				shipmentCurrentTab: 'item1',
				form_level: 0,
			});
		}

		setUnCheckedShipment(unchecked);
		const deliveryPriceTotal = unchecked.reduce(
			(total: any, obj: { delivery_price: any }) => total + Number(obj.delivery_price),
			0
		);
		setTotalPrice(Number(deliveryPriceTotal));
	};

	useEffect(() => {
		getCheckedShipment();
	}, [state.allShipments]);

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
		setState({
			...state,
			shipmentCurrentTab: 'item1',
		});
	};

	const handlePayment = () => {
		setShipmentLoader(true);
		const totalShipment: Record<string, string>[] = [];

		unCheckedShipment.forEach((obj: any) => {
			totalShipment.push({
				shipmentId: obj.id,
				amount: obj.delivery_price,
			});
		});

		const payload = {
			shipments: totalShipment,
			amount: totalPrice,
			email: state.single_user_data?.email,
			phone_number: state.single_user_data?.phoneNumber,
		};

		initiatePayment(payload).then(
			(response) => {
				// console.log(response)
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

	return {
		handleSummary,
		setShowShipmentModal,
		handleShowModal,
		handleRemoveItem,
		handleAddShipment,
		handlePayment,
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
