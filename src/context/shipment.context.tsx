import React, { useState } from 'react';
import { ShipmentSummaryInterface } from '@/interfaces/shipmentInterface';
function GeneralContext() {
	const shipmentDetails = {
		shipment_title: '',
		shipment_description: '',
		shipment_weight: 0,
		images: [],
		shipment_type: '',
		current_location: {
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
		recipient_phone_number:'',
		shipment_destination: {
			country: '',
			state: '',
			city: '',
			address: '',
			formattedAddress: '',
			longitude: null,
			latitude: null,
		},
	};

	const allShipments: never[] = [];
	const trackingShipments: any = [];
	const shipmentCurrentTab = 'item1';
	const shipmentSummary: ShipmentSummaryInterface[] = [];
	const editShipment = false;
	const form_level = 0;
	const initializePayment = {};

	return {
		shipmentSummary,
		shipmentDetails,
		shipmentCurrentTab,
		editShipment,
		form_level,
		allShipments,
		trackingShipments,
		initializePayment,
	};
}

export default GeneralContext;
