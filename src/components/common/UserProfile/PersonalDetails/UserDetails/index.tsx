import {
	AiOutlineClose,
	AiOutlineEdit,
	BsTelephoneForward,
	FaUserEdit,
	MdAttachEmail,
} from '@/assets';
import useUserDetails from './useUserDetails';
import { RingLoader } from '@/components';

const index = () => {
	const {
		editInfo,
		updateUserDetails,
		showLoader,
		setUpdateUserDetails,
		handleUpdateUser,
		setEditInfo,
	} = useUserDetails();
	return (
		<form
			className="animate__animated animate__fadeInUp   md:w-9/12 w-full mb-5 md:px-0 "
			onSubmit={handleUpdateUser}
		>
			<button
				onClick={() => setEditInfo(!editInfo)}
				type="button"
				className="flex mb-3 mt-2 md:flex-grow-0 flex-grow items-center bg-red-700 justify-between  space-x-3 text-white  hover:transition-all duration-150 ease-in-out hover:shadow-md hover:shadow-blue-100  shadow-md shadow-slate-300"
			>
				<div className="p-2">Edit User Details</div>
				<div className="bg-red-900 rounded-l-full h-10 w-10  flex items-center justify-center ">
					{!editInfo ? (
						<AiOutlineEdit className="text-3xl text-white" />
					) : (
						<AiOutlineClose className="text-3xl text-white" />
					)}
				</div>
			</button>
			<div
				className={`p-4  rounded-sm space-y-4  ${
					!editInfo ? 'bg-gray-200  transition-all duration-75 ease-in-out ' : 'bg-white shadow-sm'
				}`}
			>
				<div>
					<label className="text-sm text-gray-400">
						Full Name <span className="text-red-500"> * </span>
					</label>
					<div className=" border-b-2 flex px-2">
						<input
							disabled={!editInfo}
							className="w-full outline-none"
							type="text"
							value={updateUserDetails?.name}
							onChange={(e) =>
								setUpdateUserDetails({
									...updateUserDetails,
									name: e.target.value,
								})
							}
							required
						/>
						<div className="text-xl text-gray-500">
							<FaUserEdit />
						</div>
					</div>
				</div>

				<div>
					<label className="text-sm text-gray-400">Email</label>
					<div className=" border-b-2 flex px-2">
						<input
							className="w-full outline-none"
							type="text"
							disabled
							value={updateUserDetails?.email}
							onChange={(e) =>
								setUpdateUserDetails({
									...updateUserDetails,
									email: e.target.value,
								})
							}
							required
						/>
						<div className="text-xl text-gray-500">
							<MdAttachEmail />
						</div>
					</div>
				</div>

				<div>
					<label className="text-sm text-gray-400">Phone Number</label>
					<div className=" border-b-2 flex px-2">
						<input
							className="w-full outline-none"
							type="text"
							disabled={!editInfo}
							value={updateUserDetails?.phoneNumber ? updateUserDetails?.phoneNumber : ''}
							onChange={(e) =>
								setUpdateUserDetails({ ...updateUserDetails, phoneNumber: e.target.value })
							}
							required
						/>
						<div className="text-xl text-gray-500">
							<BsTelephoneForward />
						</div>
					</div>
				</div>

				{/* <div>
					<label className="text-sm text-gray-400">Address</label>
					<div className=" border-b-2 flex px-2 ">
						<textarea
							disabled={!editInfo}
							value={updateUserDetails?.address}
							onChange={(e) =>
								setUpdateUserDetails({ ...updateUserDetails, address: e.target.value })
							}
							className="w-full outline-none"
						></textarea>
						<div className="text-xl text-gray-500">
							<AiOutlineEdit />
						</div>
					</div>
				</div> */}
			</div>
			<button
				disabled={!editInfo}
				type="submit"
				className={`hover:shadow-md mt-8 flex items-center justify-center  shadow-gray-50 shadow-sm w-full  rounded-sm ${
					!editInfo ? 'bg-gray-200' : 'bg-blue-700'
				} font-bold text-white text-md`}
			>
				{!showLoader ? (
					<span className="p-2">Save</span>
				) : (
					<RingLoader size={50} loaderColor="#fff" />
				)}
			</button>
		</form>
	);
};

export default index;
