import React from 'react';
import { BusinessSignup } from '@/components';
import { MdOutlineBusiness } from '@/assets'
const index = () => {
	return (
		<div className="inline-flex flex-col items-center w-full md:pl-24 md:mb-0 mb-20">

			<div className="bg-blue-900 rounded-full text-white  text-3xl p-2">
				<MdOutlineBusiness />
			</div>
			<p className="text-xl mt-4 mb-3 ">Account type</p>
			<div className='relative w-full'>
				<div className='bg-white bg-opacity-10 flex items-center justify-center backdrop-filter backdrop-blur-md absolute h-full w-full z-10'>

					<button className="p-2 text-white rounded-sm bg-blue-900  flex items-center justify-center">
						Upgrade to Bussiness Account
					</button>
				</div>
				<BusinessSignup />
			</div>
		</div>);
};

export default index;
