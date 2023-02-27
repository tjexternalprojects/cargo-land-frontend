import React, { useState } from 'react';
import { ShipmentDetails } from '@/interfaces';

function GeneralContext() {
	const shipmentDetails = {
		shipment_title: '',
		shipment_description: '',
		shipment_weight: '',
		images: [],
		current_location: {
			country: '',
			state: '',
			city: '',
			address: '',
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
		delivery_price: 0,
	};

	return {
		shipmentDetails,
	};
}

export default GeneralContext;
