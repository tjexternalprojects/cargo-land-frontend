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
		shipment_current_location: '',
		shipment_heading_to: '',
		shipment_addresses: [],
	};

	const allShipments: never[] = [];
	const shipmentCurrentTab = 'item1';
	const shipmentSummary: ShipmentSummaryInterface[] = [];
	const editShipment = false;
	const form_level = 0;
	const initializePayment = {};
	const activeShipmentMenu = null;
	const singleShipment = {}

	return {
		shipmentSummary,
		shipmentDetails,
		shipmentCurrentTab,
		singleShipment,
		editShipment,
		form_level,
		allShipments,
		initializePayment,
		activeShipmentMenu,
	};
}

export default GeneralContext;
