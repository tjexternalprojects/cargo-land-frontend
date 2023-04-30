import React, { useState } from 'react';
import { ShipmentSummaryInterface } from '@/interfaces/shipmentInterface';
function GeneralContext() {
	const shipmentDetails= {
		shipment_title: '',
		shipment_description: '',
		shipment_weight: 0,
		images: [],
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
	const trackingShipments: never[] = [];
	const shipmentCurrentTab = 'item1';
	const shipmentSummary: ShipmentSummaryInterface[] = [];
	const editShipment = false
	const form_level = 0;
	return {
		shipmentSummary,
		shipmentDetails,
		shipmentCurrentTab,
		editShipment,
		form_level,
		allShipments,
		trackingShipments,
	};
}

export default GeneralContext;
