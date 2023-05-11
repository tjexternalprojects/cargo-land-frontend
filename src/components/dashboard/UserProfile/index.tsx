import React from 'react';
import { motion } from 'framer-motion';
import { fadeSlide } from '@/utils/animations';
import useUserProfile from './useUserProfile';
import { AccountType, PersonalDetails } from '@/components';
const index = () => {
	const { state, animationDirection, handleShowTab } = useUserProfile();
	return (
		<div className="space-y-10  w-full ">
			<div className=" tracking-widest text-sm text-gray-500 mt-8 pb-3 md:pb-0 font-bold fixed  md:block hidden">
				USER PROFILE
			</div>
			<div className=" flex gap-3 mb-32 mb:mb-0 w-full ">
				{/* SIDE NAVIGATION */}
				<div className="fixed mt-16 pb-3 md:pb-0 md:bg-transparent z-20 bg-gray-200 bottom-0 md:top-20 w-full md:w-auto ">
					<div className="mt-3 md:mt-10 border-l-2 space-y-2 ">
						<div
							onClick={() => handleShowTab('item1', 1)}
							className={`${
								state.userCurrentTab == 'item1'
									? 'border-l-4 border-l-blue-900 pl-4 text-blue-900 font-bold'
									: 'text-gray-400 pl-5'
							} cursor-pointer`}
						>
							Personal&nbsp;Details
						</div>
						<div>
							<div
								onClick={() => handleShowTab('item2', 2)}
								className={`${
									state.userCurrentTab == 'item2'
										? 'border-l-4 border-l-blue-900 pl-4 text-blue-900 font-bold'
										: 'text-gray-400 pl-5'
								} cursor-pointer`}
							>
								Account&nbsp;Type
							</div>
						</div>
					</div>
				</div>

				{/* PAGE */}
				<div className=" w-full md:pl-16 mb-14 md:mb-0  ">
					<motion.div
						className={`${
							state.userCurrentTab == 'item1' ? 'inline-flex' : 'hidden'
						} w-full md:pt-10  `}
						variants={fadeSlide(animationDirection.direction)}
						animate={state.userCurrentTab == 'item1' ? 'animate' : 'initial'}
					>
						<PersonalDetails />
					</motion.div>

					<motion.div
						className={`${
							state.userCurrentTab == 'item2' ? 'inline-flex' : 'hidden'
						} w-full pt-10 `}
						variants={fadeSlide(animationDirection.direction)}
						animate={state.userCurrentTab == 'item2' ? 'animate' : 'initial'}
					>
						<AccountType />
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default index;
