import React from 'react';
import { AiOutlineEdit, BsTelephoneForward, FaUserEdit, MdAttachEmail } from '@/assets';
import { ToastContainer } from 'react-toastify';
const index = () => {
	return (
		<div className="inline-flex flex-col items-center w-full ">
			<div className="bg-blue-900 rounded-full text-white  text-3xl p-2">
				<FaUserEdit />
			</div>
			<p className="text-xl mt-4">Update Personal details</p>
			<form className=" md:w-9/12 my-5 md:px-0 ">
				<div className="bg-white p-4 shadow-sm rounded-sm space-y-4 ">
					<div>
						<label className="text-sm text-gray-400">
							Full Name <span className="text-red-500"> * </span>
						</label>
						<div className=" border-b-2 flex px-2 bg-white">
							<input className="w-full outline-none" type="text" required />
							<div className="text-xl text-gray-500">
								<FaUserEdit />
							</div>
						</div>
					</div>

					<div>
						<label className="text-sm text-gray-400">Email</label>
						<div className=" border-b-2 flex px-2 bg-white">
							<input className="w-full outline-none" type="text" required />
							<div className="text-xl text-gray-500">
								<MdAttachEmail />
							</div>
						</div>
					</div>

					<div>
						<label className="text-sm text-gray-400">Phone Number</label>
						<div className=" border-b-2 flex px-2 bg-white">
							<input className="w-full outline-none" type="text" required />
							<div className="text-xl text-gray-500">
								<BsTelephoneForward />
							</div>
						</div>
					</div>

					<div>
						<label className="text-sm text-gray-400">Address</label>
						<div className=" border-b-2 flex px-2 bg-white">
							<textarea className="w-full outline-none"></textarea>
							<div className="text-xl text-gray-500">
								<AiOutlineEdit />
							</div>
						</div>
					</div>
				</div>
				<button
					type="submit"
					className="hover:shadow-md  shadow-gray-50 shadow-sm w-full p-2 rounded-sm  bg-blue-700 font-bold text-white text-md"
				>
					Save
				</button>
			</form>
			<hr className="mt-5" />
			<form className=" md:w-9/12 my-5 md:px-0 ">
				<p className="text-xl mt-4">Security</p>
				<button
					type="button"
					className="hover:shadow-md  shadow-gray-50 shadow-sm w-full p-2 rounded-sm  bg-blue-700 font-bold text-white text-md"
				>
					Update Password
				</button>
				{/* <div className="bg-white p-4 shadow-sm rounded-sm space-y-4 ">
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
				</div> */}
			</form>
			<ToastContainer />
		</div>
	);
};

export default index;
