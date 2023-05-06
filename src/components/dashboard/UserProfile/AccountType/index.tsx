import React, { useState } from 'react';
import { BusinessSignup } from '@/components';
import { MdOutlineBusiness } from '@/assets';
import useAccountType from './useAccountType';
const index = () => {
	const { handChangeAccountType, showBusinessForm } = useAccountType();
	return (
		<div className="inline-flex flex-col items-center w-full md:pl-24 md:mb-0 mb-20">
			<div className="bg-blue-900 rounded-full text-white  text-3xl p-2">
				<MdOutlineBusiness />
			</div>
			<p className="text-xl mt-4 mb-3 ">
				Account type | <span className="font-bold">Regular User</span>
			</p>
			<div className="relative w-full">
				{showBusinessForm && (
					<div className="bg-white bg-opacity-10 flex flex-col items-center backdrop-filter backdrop-blur-md absolute h-full w-full z-10">
						<div className="mb-20 text-center">
							You are currently on Regular account, upgrade to business account get massive discount
							on shipment cost
						</div>
						<button
							onClick={handChangeAccountType}
							className="p-2 text-white rounded-sm bg-blue-900  flex items-center justify-center"
						>
							Upgrade to Business Account
						</button>
					</div>
				)}
				<BusinessSignup />
			</div>
		</div>
	);
};

export default index;
