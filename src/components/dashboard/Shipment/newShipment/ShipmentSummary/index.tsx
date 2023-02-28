import { FC } from 'react';
import {
	MdTrackChanges,
	RiUserReceivedLine,
} from '@/assets';

import useShipmentSummary from './useShipmentSummary';
import { ToastContainer } from 'react-toastify';

interface RecipientDetailsProps {
	setAnimateTab: (value: string) => void;
}

const RecipientDetails: FC<RecipientDetailsProps> = ({ setAnimateTab }) => {
	const { handleSummary } = useShipmentSummary(setAnimateTab);
	return (
		<>
			<div className="inline-flex flex-col items-center w-full">
				<div className="bg-blue-900 rounded-full text-white text-3xl p-2">
					<MdTrackChanges />
				</div>
				<p className="text-xl mt-4">Shipment Summary</p>
				<form className=" w-9/12 my-5" onSubmit={handleSummary}></form>
			<ToastContainer />
			</div>
		</>
	);
};

export default RecipientDetails;
