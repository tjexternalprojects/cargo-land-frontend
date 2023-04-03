import { NewShipmentForm, Payment, RecipientDetails, ShipmentSummary } from '@/components';
import { Link } from 'react-scroll';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeSlide } from '@/utils/animations';
import useShipment from '@/components/dashboard/Shipment/useShipment';

const Shipment = () => {
	const { handleShowTab, state, animationDirection } = useShipment();

	return (
		<div className="space-y-10 md:p-5 w-full ">
			<div className="tracking-widest text-sm text-gray-500 p-10 font-bold fixed  md:block hidden">
				NEW SHIPMENT
			</div>
			<div className="md:px-10 flex gap-3 mb-32 mb:mb-0 w-full ">
				{/* SIDE NAVIGATION */}
				<div className="fixed mt-16 pb-3 md:pb-0 md:bg-transparent bg-gray-200 bottom-0 md:top-20 w-full md:w-auto ">

					<div className="mt-3 md:mt-10 border-l-2 space-y-2 ">
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
							{state.form_level > 0 ? (
								<div
									onClick={() => handleShowTab('item2', 2)}
									className={`${
										state.shipmentCurrentTab == 'item2'
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
					</div>
				</div>

				{/* PAGE */}
				<div className=" w-full md:pl-16 mb-36 md:mb-0 ">
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
