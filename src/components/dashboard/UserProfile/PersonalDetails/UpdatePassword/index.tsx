import { BiHide, BiShow, Si1Password } from '@/assets';
import useUpdatePassword from './useUpdatePassword';
import { RingLoader } from '@/components';

const index = () => {
	const {
		showPassword,
		passwordData,
		showCurrentPassword,
		showLoader,
		setShowCurrentPassword,
		setPasswordData,
		handleChangePassword,
		setShowPassword,
	} = useUpdatePassword();
	return (
		<form
			className="animate__animated animate__fadeInUp   md:w-9/12 w-full mb-5 md:px-0 "
			onSubmit={handleChangePassword}
		>
			<div className="bg-white p-4 shadow-sm rounded-sm space-y-4 ">
				<div>
					<label className="text-sm text-gray-400">Current Password</label>
					<div className=" border-b-2 flex px-2 bg-white">
						<input
							className="w-full outline-none"
							type={!showCurrentPassword ? 'password' : 'text'}
							value={passwordData.currentPassword}
							onChange={(e) => {
								setPasswordData({ ...passwordData, currentPassword: e.target.value });
							}}
							required
						/>
						<div className="text-xl text-gray-500">
							{!showCurrentPassword ? (
								<BiHide
									className=" cursor-pointer"
									onClick={() => setShowCurrentPassword(!showCurrentPassword)}
								/>
							) : (
								<BiShow
									className=" cursor-pointer"
									onClick={() => setShowCurrentPassword(!showCurrentPassword)}
								/>
							)}
						</div>
					</div>
				</div>

				<div>
					<label className="text-sm text-gray-400">New Password</label>
					<div className=" border-b-2 flex px-2 bg-white">
						<input
							className="w-full outline-none"
							value={passwordData.newPassword}
                            minLength={6}
							onChange={(e) => {
								setPasswordData({ ...passwordData, newPassword: e.target.value });
							}}
							type={!showPassword ? 'password' : 'text'}
							required
						/>
						<div className="text-xl text-gray-500">
							{!showPassword ? (
								<BiHide
									className=" cursor-pointer"
									onClick={() => setShowPassword(!showPassword)}
								/>
							) : (
								<BiShow
									className=" cursor-pointer"
									onClick={() => setShowPassword(!showPassword)}
								/>
							)}
						</div>
					</div>
				</div>
			</div>

			<button
				type="submit"
				className="hover:shadow-md w shadow-gray-50 shadow-sm mt-8 w-full flex items-center justify-center rounded-sm  bg-red-700 font-bold text-white text-md"
			>
				{!showLoader ? (
					<span className="p-2">Update Password</span>
				) : (
					<RingLoader size={50} loaderColor="#fff" />
				)}
			</button>
		</form>
	);
};

export default index;
