import React, { useState } from 'react';
import { ShipmentDetails } from '@/interfaces';

function GeneralContext() {
	const shipmentDetails = {
		shipment_id:'',
		shipment_title: '',
		shipment_description: '',
		shipment_weight: 0,
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
		form_level:0,
	};
	const shipmentCurrentTab = "item1"
	
	return {
		shipmentDetails,
		shipmentCurrentTab,
	};
}

export default GeneralContext;
