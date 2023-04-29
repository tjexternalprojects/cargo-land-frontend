export interface ShipmentDetailsInterface {
	state: string;
	country: string;
	shipment_title: string;
	shipment_description: string;
	shipment_weight: number;
	images: string[];
	current_location: {
		country: string;
		state: string;
		city: string;
		address: string;
		formattedAddress: string;
		longitude: number;
		latitude: number;
	};
	recipient_full_name: string;
	recipient_email: string;
	shipment_destination: {
		country: string;
		state: string;
		city: string;
		address: string;
		formattedAddress: string;
		longitude: number;
		latitude: number;
	};
	recepientAddress?:string;
	sendersAddress?: string;
}

export interface ShipmentSummaryInterface {
		id: number;
		month: string;
		totalValue: number;
 }