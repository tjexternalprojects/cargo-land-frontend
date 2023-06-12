import { AppContextType, AppContext } from '@/context';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from './api.services';

function ShipmentServices() {
	const { state, setState } = useContext<AppContextType>(AppContext);

	const createShipment = (shipmentData: FormData) => {
		return api.post('/shipment/create-shipment', shipmentData);
	};

	const getAllUserShipmentPaginated = (page_number: number, page_limit: number) => {
		return api.get(`/shipment/get-all-user-shipment?page=${page_number}&limit=${page_limit}`);
	};
	const getAllUserShipment = async () => {
		await api.get('/shipment/get-all-user-shipment').then(
			(res) => {
				setState((prevState) => ({
					...prevState,
					allShipments: res.data.allUserShipment,
				}));
			},
			(err) => {
				toast.error(err.response.data.message, {
					progressClassName: 'bg-red-500 h-1',
					autoClose: 3000,
				});
			}
		);
	};

	const getShipmentInRange = (duration: Record<string, string>) => {
		return api.get(
			`/shipment/get-user-month-shipment?startMonth=${duration.startMonth}&endMonth=${duration.endMonth}`
		);
	};

	const getCountryCovered = () => {
		return api.get('/shipment/get-shipment-export-countries');
	};

	const deleteShipment = (shipment_id: string) => {
		return api.delete(`/shipment/delete-shipment/${shipment_id}`);
	};

	const updateShipment = (shipment_id: string, shipment_data: any) => {
		return api.patch(`/shipment/update-single-shipment/${shipment_id}`, shipment_data);
	};

	const trackShipment = (payload: Record<string, string>) => {
		return api.get(
			`/shipment/track-single-shipment?secretID=${payload.secreteID}&trackingID=${payload.trackingID}`
		);
	};

	const getAllShipmentsParams = (params?: string) => {
		return api.get('/shipment/get-all-user-shipment' + params);
	};
	//  localhost:4300/shipment/update-shipment-transit/:id
	// localhost:4300/shipment/update-shipment-delivered/:id
	// localhost:4300/shipment/update-shipment-rejected/:id

	// 	GET http://localhost:4300/shipment/get-all-shipment?shipment_Type=DOOR_TO_DOOR&shipment_status=pending
	// GET http://localhost:4300/shipment/get-all-shipment?shipment_Type=DOOR_TO_DOOR
	// GET http://localhost:4300/shipment/get-all-shipment?shipment_status=pending

	// ADMIN END-POINT  ========================================================================================================

	// localhost:4300/shipment/update-shipment-location/CGLDMZpR
	// ?operation=removeLocation&locationID=84758485
	// ?operation=updateHeading&locationID=84758485
	// ?operation=updateCurrentLocation&locationID=84758485
	// ?operation=deleteLocation&locationID=84758485

	const adminGetAllShipments = (params?: string) => {
		return api.get('/shipment/get-all-shipment' + params);
	};

	const rejectShipment = (payload: Record<string, string>) => {
		return api.patch(`/shipment/update-shipment-rejected/${payload.shipment_id}`, {
			reason: payload.reason,
		});
	};

	const getSingleShipment = (shipment_id: string) => {
		return api.get(`/shipment/get-single-shipment/${shipment_id}`);
	};

	const updateShipmentToTransit = (shipment_id: string) => {
		return api.patch(`/shipment/update-shipment-transit/${shipment_id}`);
	};

	const updateShipmentToSuccessful = (shipment_id: string, secreteID: string) => {
		return api.patch(`/shipment/update-shipment-delivered/${shipment_id}`, { secreteID });
	};

	const updateShipmentPrice = (shipment_id: string, delivery_price: number) => {
		return api.patch(`/shipment/update-single-shipment-price/${shipment_id}`, {
			delivery_price: delivery_price,
		});
	};

	// ENDPOINT FOR UPDATING SHIPMENT LOCATION
	const addNewLocation = (shipment_id: string, payload: any) => {
		return api.patch('/shipment/update-shipment-location/' + shipment_id, payload);
	};

	const removeLocation = (shipment_id: string, location_id: string) => {
		return api.patch(
			`/shipment/update-shipment-location/${shipment_id}?operation=removeLocation&locationID=${location_id}`
		);
	};

	const updateHeadingTo = (shipment_id: string, location_id: string) => {
		return api.patch(
			`/shipment/update-shipment-location/${shipment_id}?operation=updateHeading&locationID=${location_id}`
		);
	};

	const updateCurrentLocation = (shipment_id: string, location_id: string) => {
		return api.patch(
			`/shipment/update-shipment-location/${shipment_id}?operation=updateCurrentLocation&locationID=${location_id}`
		);
	};

	const deleteLocation = (shipment_id: string, location_id: string) => {
		return api.patch(
			`/shipment/update-shipment-location/${shipment_id}?operation=deleteLocation&locationID=${location_id}`
		);
	};

	return {
		// User Endpoint
		updateShipment,
		createShipment,
		deleteShipment,
		getAllUserShipment,
		getAllShipmentsParams,
		getCountryCovered,
		getShipmentInRange,

		// Admin Endpoint
		rejectShipment,
		adminGetAllShipments,
		getAllUserShipmentPaginated,
		getSingleShipment,
		updateShipmentPrice,
		addNewLocation,
		removeLocation,
		updateHeadingTo,
		updateCurrentLocation,
		deleteLocation,
		updateShipmentToTransit,
		updateShipmentToSuccessful,

		// General Endpoint
		trackShipment,
	};
}

export default ShipmentServices;
