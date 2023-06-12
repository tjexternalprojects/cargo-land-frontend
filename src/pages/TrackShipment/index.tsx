import { Contact, Footer, Header, ShipmentSearchBox, TrackResult } from '@/components';
import React from 'react';
import useTrackShipment from './useTrackShipment';
const index = () => {
	const { singleShipment, setSingleShipment } = useTrackShipment();
	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			<Header />
			<ShipmentSearchBox setSingleShipment={setSingleShipment} />
			{singleShipment && <TrackResult singleShipment={singleShipment} />}
			<Contact />
			<Footer />
		</div>
	);
};

export default index;
