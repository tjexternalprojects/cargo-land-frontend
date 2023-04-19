import React from 'react';
import { AiOutlineEdit, FaUserEdit } from '@/assets';
import { ToastContainer } from 'react-toastify';
const index = () => {
	return (
		<div className="inline-flex flex-col items-center w-full ">
			<div className="bg-blue-900 rounded-full text-white  text-3xl p-2">
				<FaUserEdit />
			</div>
			<p className="text-xl mt-4">Update Personal details</p>
			<form className=" md:w-9/12 my-5  md:px-0 ">
				<div className="bg-white p-4 shadow-sm rounded-sm space-y-4 ">
					<div>
						<label className="text-sm text-gray-400">
							Full Name <span className="text-red-500"> * </span>
						</label>
						<div className=" border-b-2 flex px-2 bg-white">
							<input className="w-full outline-none" type="text" required />
							<div className="text-xl text-gray-500">
								<AiOutlineEdit />
							</div>
						</div>
					</div>

					<div>
						<label className="text-sm text-gray-400">Phone Number</label>
						<div className=" border-b-2 flex px-2 bg-white">
							<input className="w-full outline-none" type="text" required />
							<div className="text-xl text-gray-500">
								<AiOutlineEdit />
							</div>
						</div>
					</div>

					<div>
						<label className="text-sm text-gray-400">Address</label>
						<div className=" border-b-2 flex px-2 bg-white">
							<input className="w-full outline-none" type="text" required />
							<div className="text-xl text-gray-500">
								<AiOutlineEdit />
							</div>
						</div>
					</div>
				</div>
				<hr className="mt-5" />
			</form>
			<ToastContainer />
		</div>
	);
};

export default index;
