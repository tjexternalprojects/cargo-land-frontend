import { useState } from 'react';

function useTrackShipment() {
	const [singleShipment, setSingleShipment] = useState<any>(null);
	return { singleShipment, setSingleShipment };
}
export default useTrackShipment;
