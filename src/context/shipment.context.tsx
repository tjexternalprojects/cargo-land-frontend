import React, { useState } from 'react';
import { ShipmentSummaryInterface } from '@/interfaces/shipmentInterface';
function GeneralContext() {

	const shipmentDetails = {
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
		shipment_current_location: "",
		shipment_heading_to: "",
		shipment_addresses: [],
	};

	
	const allShipments: never[] = [];
	const trackingShipments: any = [];
	const shipmentCurrentTab = 'item1';
	const shipmentSummary: ShipmentSummaryInterface[] = [];
	const editShipment = false;
	const form_level = 0;
	const initializePayment = {};
	const activeShipmentMenu = null;

	return {
		shipmentSummary,
		shipmentDetails,
		shipmentCurrentTab,
		editShipment,
		form_level,
		allShipments,
		trackingShipments,
		initializePayment,
		activeShipmentMenu,
	};
}

export default GeneralContext;
