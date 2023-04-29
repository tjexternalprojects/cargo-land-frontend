import React, { useState } from 'react';
import { ShipmentSummaryInterface, ShipmentDetails } from '@/interfaces/shipmentInterface';
function GeneralContext() {
	const shipmentDetails: ShipmentDetails = {
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
			longitude: 0,
			latitude: 0,
		},
		recipient_full_name: '',
		recipient_email: '',
		shipment_destination: {
			country: '',
			state: '',
			city: '',
			address: '',
			longitude: 0,
			latitude: 0,
		},
	};

	const allShipments: never[] = [];
	const trackingShipments: never[] = [];
	const shipmentCurrentTab = 'item1';
	const shipmentSummary: ShipmentSummaryInterface[] = [];
	const form_level = 0;
	return {
		shipmentSummary,
		shipmentDetails,
		shipmentCurrentTab,
		form_level,
		allShipments,
		trackingShipments,
	};
}

export default GeneralContext;
