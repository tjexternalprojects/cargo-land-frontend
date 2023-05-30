import { useContext, useEffect, useState } from 'react';
import { ShipmentServices } from '@/services';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { AppContextType, AppContext } from '@/context';
function useShipmentMenu(location_id: string, setSingleShipment: any) {
	const { state, setState } = useContext<AppContextType>(AppContext);

	const { updateCurrentLocation, updateHeadingTo, deleteLocation } = ShipmentServices();
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [selectedMenu, setSelectedMenu] = useState<string | null>('');

	const toggleDropdown = (active_location_id: string) => {
		setSelectedMenu(active_location_id);
		setIsOpen(!isOpen);
	};
	// activeShipmentMenu;
	const setCurrentLocation = (shipment_id: string, location_id: string) => {
		setIsOpen(false);
		setLoading(true);
		updateCurrentLocation(shipment_id, location_id).then(
			(response) => {
				setLoading(false);
				setSingleShipment(response.data.shipment);
				toast.success(response.data.message, {
					progressClassName: 'bg-green-500 h-1',
					autoClose: 3000,
				});
			},
			(error) => {
				setLoading(false);
				toast.error('An error ocurred, try again!', {
					progressClassName: 'bg-red-500 h-1',
					autoClose: 3000,
				});
			}
		);
	};

	const setNextCheckPoint = (shipment_id: string, location_id: string) => {
		setIsOpen(false);
		setLoading(true);
		updateHeadingTo(shipment_id, location_id).then(
			(response) => {
				setLoading(false);
				setSingleShipment(response.data.shipment);
				toast.success(response.data.message, {
					progressClassName: 'bg-green-500 h-1',
					autoClose: 3000,
				});
			},
			(error) => {
				setLoading(false);
				toast.error('An error ocurred, try again!', {
					progressClassName: 'bg-red-500 h-1',
					autoClose: 3000,
				});
			}
		);
	};


	const deleteRoute = (shipment_id: string, location_id: string) => {
		confirmAlert({
			title: 'Delete Location?',
			message: 'Are you sure you want to Delete this location',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						setIsOpen(false);
						setLoading(true);
						deleteLocation(shipment_id, location_id).then(
							(response) => {
								setLoading(false);
								setSingleShipment(response.data.shipment);
								toast.success(response.data.message, {
									progressClassName: 'bg-green-500 h-1',
									autoClose: 3000,
								});
							},
							(error) => {
								setLoading(false);
								toast.error('An error ocurred, try again!', {
									progressClassName: 'bg-red-500 h-1',
									autoClose: 3000,
								});
							}
						);
					},
				},
				{
					label: 'No',
					onClick: () => {},
				},
			],
		});
	};

	useEffect(() => {
		if (state.activeShipmentMenu === selectedMenu) {
			setState({
				...state,
				activeShipmentMenu: null,
			});
		} else {
			setState({
				...state,
				activeShipmentMenu: selectedMenu,
			});
		}
	}, [selectedMenu]);
	return { toggleDropdown, setCurrentLocation, setNextCheckPoint, deleteRoute, loading, isOpen };
}

export default useShipmentMenu;
