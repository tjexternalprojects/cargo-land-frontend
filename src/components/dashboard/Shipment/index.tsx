import { NewShipmentForm, Payment, RecipientDetails, ShipmentSummary } from '@/components';
import { motion } from 'framer-motion';
import { fadeSlide } from '@/utils/animations';
import useShipment from '@/components/dashboard/Shipment/useShipment';

const Shipment = () => {
	const { handleShowTab, handleCancelEdit, handleNewShipment, state, animationDirection } =
		useShipment();

	return (
		<div className="space-y-10  w-full ">
			<div className=" tracking-widest text-sm text-gray-500 mt-8 pb-3 md:pb-0 font-bold fixed  md:block hidden">
				NEW SHIPMENT
			</div>
			<div className=" flex gap-3 mb-32 mb:mb-0 w-full ">
				{/* SIDE NAVIGATION */}
				<div className=" z-10 fixed mt-16 pb-3 md:pb-0 md:bg-transparent bg-gray-200 bottom-0 md:top-20 w-full md:w-auto ">
					<div className="mt-3 md:mt-10 border-l-2 space-y-2 flex flex-col  ">
						<div
							onClick={() => handleShowTab('item1', 1)}
							className={`${
								state.shipmentCurrentTab == 'item1'
									? 'border-l-4 border-l-blue-900 pl-4 text-blue-900 font-bold'
									: 'pl-5'
							} cursor-pointer`}
						>
							Package&nbsp;Details
						</div>
						<div>
							{(state.form_level > 0 && state.shipmentDetails.shipment_title !== '') ||
							state.editShipment ? (
								<div
									onClick={() => handleShowTab('item2', 2)}
									className={`${
										state.shipmentCurrentTab == 'item2' &&
										state.shipmentDetails.shipment_title !== ''
											? 'border-l-4 border-l-blue-900 pl-4 text-blue-900 font-bold'
											: 'pl-5'
									} cursor-pointer`}
								>
									Recipient&nbsp;Details
								</div>
							) : (
								<div className="text-gray-400 pl-5">Recipient&nbsp;Details</div>
							)}
						</div>
						<div>
							{state.form_level > 1 ? (
								<div
									onClick={() => handleShowTab('item3', 3)}
									className={`${
										state.shipmentCurrentTab == 'item3'
											? 'border-l-4 border-l-blue-900 pl-4 text-blue-900 font-bold'
											: 'pl-5'
									} cursor-pointer`}
								>
									Shipment Summary
								</div>
							) : (
								<div className="text-gray-400 pl-5">Shipment Summary</div>
							)}
						</div>
						<div>
							{state.form_level > 2 ? (
								<div
									onClick={() => handleShowTab('item4', 4)}
									className={`${
										state.shipmentCurrentTab == 'item4'
											? 'border-l-4 border-l-blue-900 pl-4 text-blue-900 font-bold'
											: 'pl-5'
									} cursor-pointer`}
								>
									Payment
								</div>
							) : (
								<div className="text-gray-400 pl-5">Payment</div>
							)}
						</div>
						{state.editShipment && (
							<div className=" flex md:flex-col  gap-2">
								<button
									onClick={handleCancelEdit}
									className="flex  items-center bg-red-700 justify-between  space-x-3 text-white  hover:transition-all duration-150 ease-in-out hover:shadow-md hover:shadow-blue-100  shadow-md shadow-slate-300"
								>
									<div className="md:p-2 p-1 text-sm">Cancel Edit</div>
									<div className="bg-red-900 md:p-2 p-1 rounded-l-full h-full w-10  flex items-center justify-center">
										x
									</div>
								</button>

								<button
									onClick={handleNewShipment}
									className="flex  items-center bg-blue-700 justify-between  space-x-3 text-white  hover:transition-all duration-150 ease-in-out hover:shadow-md hover:shadow-blue-100  shadow-md shadow-slate-300"
								>
									<div className="md:p-2 text-sm p-1">Create Shipment</div>
									<div className="bg-blue-900 md:p-2 rounded-l-full h-full w-10  flex items-center justify-center">
										+
									</div>
								</button>
							</div>
						)}
					</div>
				</div>

				{/* PAGE */}
				<div className=" w-full md:pl-16 mb-36 md:mb-0  ">
					<motion.div
						className={`${
							state.shipmentCurrentTab == 'item1' ? 'inline-flex' : 'hidden'
						} w-full pt-10 `}
						variants={fadeSlide(animationDirection.direction)}
						animate={state.shipmentCurrentTab == 'item1' ? 'animate' : 'initial'}
					>
						<NewShipmentForm />
					</motion.div>

					<motion.div
						className={`${
							state.shipmentCurrentTab == 'item2' ? 'inline-flex' : 'hidden'
						} w-full pt-10 `}
						variants={fadeSlide(animationDirection.direction)}
						animate={state.shipmentCurrentTab == 'item2' ? 'animate' : 'initial'}
					>
						<RecipientDetails />
					</motion.div>

					<motion.div
						className={`${
							state.shipmentCurrentTab == 'item3' ? 'inline-flex' : 'hidden'
						} w-full pt-10 `}
						variants={fadeSlide(animationDirection.direction)}
						animate={state.shipmentCurrentTab == 'item3' ? 'animate' : 'initial'}
					>
						<ShipmentSummary />
					</motion.div>

					<motion.div
						className={`${
							state.shipmentCurrentTab == 'item4' ? 'inline-flex' : 'hidden'
						} w-full pt-10 `}
						variants={fadeSlide(animationDirection.direction)}
						animate={state.shipmentCurrentTab == 'item4' ? 'animate' : 'initial'}
					>
						<Payment />
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Shipment;
