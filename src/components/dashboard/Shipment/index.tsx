import { NewShipmentForm, RecipientDetails } from '@/components';
import { Link } from 'react-scroll';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeSlide } from '@/animations';
import useShipment from '@/components/dashboard/Shipment/useShipment';

const Delivery = () => {
	const { handleShowTab, animationDirection, animateTab } = useShipment();

	return (
		<>
			<div className=" tracking-widest text-sm text-gray-500 p-10 font-bold fixed">
				NEW SHIPMENT
			</div>
			<div className="px-10  flex gap-3 ">
				{/* SIDE NAVIGATION */}
				<div className="fixed mt-16">
					<div className="mt-10 border-l-2 space-y-2">
						<div
							onClick={() => handleShowTab('item1', 1)}
							className={`${
								animateTab == 'item1'
									? 'border-l-4 border-l-blue-900 pl-4 text-blue-900 font-bold'
									: 'pl-5'
							} cursor-pointer`}
						>
							Package&nbsp;Details
						</div>
						<div>
							<div
								onClick={() => handleShowTab('item2', 2)}
								className={`${
									animateTab == 'item2'
										? 'border-l-4 border-l-blue-900 pl-4 text-blue-900 font-bold'
										: 'pl-5'
								} cursor-pointer`}
							>
								Recipient&nbsp;Details
							</div>
						</div>
						<div
							onClick={() => handleShowTab('item3', 3)}
							className={`${
								animateTab == 'item3'
									? 'border-l-4 border-l-blue-900 pl-4 text-blue-900 font-bold'
									: 'pl-5'
							} cursor-pointer`}
						>
							Payment
						</div>
					</div>
				</div>

				{/* PAGE */}
				<div className=" w-full pl-16">
					<motion.div
						className={`${animateTab == 'item1' ? 'inline-flex' : 'hidden'} w-full pt-20 `}
						variants={fadeSlide(animationDirection.direction)}
						animate={animateTab == 'item1' ? 'animate' : 'initial'}
					>
						<NewShipmentForm />
					</motion.div>
					<motion.div
						className={`${animateTab == 'item2' ? 'inline-flex' : 'hidden'} w-full pt-20 `}
						variants={fadeSlide(animationDirection.direction)}
						animate={animateTab == 'item2' ? 'animate' : 'initial'}
					>
						<RecipientDetails />
					</motion.div>

					<motion.div
						className={`${animateTab == 'item3' ? 'inline-flex' : 'hidden'} w-full pt-20 `}
						variants={fadeSlide(animationDirection.direction)}
						animate={animateTab == 'item3' ? 'animate' : 'initial'}
					>
						<RecipientDetails />
					</motion.div>
				</div>
			</div>
		</>
	);
};

export default Delivery;
