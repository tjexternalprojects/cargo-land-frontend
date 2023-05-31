import React from 'react';
import useRejectShipment from './useRejectShipmentModal';
import { AiOutlineClose, MdDescription } from '@/assets';
import { RingLoader } from '@/components';
interface RejectShipmentProps {
	selectedShipment: any;
	setShowRejectShipmentModal: React.Dispatch<React.SetStateAction<boolean>>;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const index = ({
	selectedShipment,
	setShowRejectShipmentModal,
	setShowModal,
}: RejectShipmentProps) => {
	const { rejectionReason, loading, setRejectionReason, handleRejectShipment } = useRejectShipment(
		selectedShipment.id,
		setShowRejectShipmentModal,
		setShowModal
	);
	return (
		<div className=" fixed h-full  w-full top-0 left-0  z-30 bg-black bg-opacity-50 flex justify-center items-center">
			<div className="  w-1/2  fixed bg-white shadow-lg pb-3 ">
				<div className="flex  w-full justify-between px-3 py-2 text-white  bg-blue-900  ">
					<div>
						<span className="font-bold">Reason for Rejection </span>
					</div>
					<div
						onClick={() => setShowRejectShipmentModal(false)}
						className="rounded-full shadow-lg hover:shadow-blue-200 hover:bg-white hover:text-blue-900 transition-all duration-75 ease-in-out cursor-pointer p-2 "
					>
						<AiOutlineClose />
					</div>
				</div>
				<div className="px-3 gap-4 flex-col  min-h-50-screen max-h-50-screen">
					<form onSubmit={handleRejectShipment} className="w-full ">
						<div className="flex  border-b-2 mt-2 p-2 bg-white w-full h-full">
							<textarea
								value={rejectionReason}
								placeholder="Reason for rejection"
								onChange={(e) => setRejectionReason(e.target.value)}
								className="p-2 bg-slate-100 w-full h-60 outline-none"
								required
							></textarea>

							<div className="text-xl text-gray-500">
								<MdDescription />
							</div>
						</div>

						<button
							disabled={loading}
							type="submit"
							className="bg-red-600 text-white fontt-bold p-2 rounded-md mt-5 md:shadow"
						>
							{!loading ? (
								<span>REJECT SHIPMENT</span>
							) : (
								<span className="w-28">
									{' '}
									<RingLoader size={30} loaderColor="#fff" />
								</span>
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default index;
