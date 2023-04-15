import React, { useState } from 'react';

function GeneralContext() {
	const shipmentDetails = {
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

	const allShipments  = null
	const shipmentCurrentTab = 'item1';
	const form_level = 0;
	return {
		shipmentDetails,
		shipmentCurrentTab,
		form_level,
		allShipments,
	};
}

export default GeneralContext;
