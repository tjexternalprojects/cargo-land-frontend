import React from 'react';
import {FaUserEdit, } from '@/assets';
import usePersonalDetails from './usePersonalDetails';
import { UpdatePassword, UserDetails, UserImage } from '@/components';
const index = () => {
	const { } = usePersonalDetails()
	return (
		<div className="inline-flex flex-col items-center w-full ">
			<div className="bg-blue-900 rounded-full text-white  text-3xl p-2">
				<FaUserEdit />
			</div>
			<p className="text-xl mt-4 mb-3 ">Update Personal details</p>
			<UserImage/>
			<UserDetails/>
			<UpdatePassword/>
		</div>
	);
};

export default index;
