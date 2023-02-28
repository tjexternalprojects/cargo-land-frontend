export interface ShipmentDetails {
	shipment_title: string;
	shipment_description: string;
	shipment_weight: number;
	images: (string | ArrayBuffer | null)[];
	current_location: {
		country: string;
		state: string;
		city: string;
		address: string;
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
		longitude: number;
		latitude: number;
	};
	delivery_price: number;
}