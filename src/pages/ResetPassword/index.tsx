import { Header } from '@/components';

import { ToastContainer } from 'react-toastify';
import { BiUserPin, MapImg2, Si1Password } from '@/assets';
import RingLoader from '@/components/common/RingLoader';

import useResetPassword from './useResetPassword';

const Login = () => {
	const { handleRestPassword, setResetPassword, resetPassword, showLoading } = useResetPassword();
	return (
		<>
			<Header />
			<div
				className=" bg-cover bg-center  bg-no-repeat"
				style={{ backgroundImage: `url(${MapImg2})` }}
			>
				<div className=" bg-gradient-to-b  from-white via-white/40 to-white  w-full">
					<div className="relative">
						<div className="flex items-center justify-center  h-screen ">
							<div className="p-5 bg-gradient-to-b  from-white/50 via-white to-white/50 w-96 ">
								<form
									className=" text-gray-500 flex flex-col space-y-4"
									onSubmit={handleRestPassword}
								>
									<div className="flex flex-col">
										<div className="bg-white h-11 px-3 border-b border-blue-800 flex items-center shadow-md animate__animated animate__fadeInUp animate__faster">
											<input
												onChange={(e) =>
													setResetPassword({ ...resetPassword, new_password: e.target.value })
												}
												type="text"
												value={resetPassword.new_password}
												placeholder="Password"
												className="text-sm flex-grow h-10 outline-none bg-white"
												required
											/>
											<Si1Password />
										</div>
									</div>
									<div className="flex flex-col">
										<div className="bg-white h-11 px-3 border-b border-blue-800  flex items-center shadow-md animate__animated animate__fadeInUp animate__faster ">
											<input
												onChange={(e) =>
													setResetPassword({ ...resetPassword, confirm_password: e.target.value })
												}
												value={resetPassword.confirm_password}
												type="password"
												placeholder="password"
												className="text-sm flex-grow h-10 outline-none "
												required
											/>
											<Si1Password />
										</div>
									</div>
									<div className="space-y-3 w-full  animate__animated animate__fadeInUp animate__faster">
										<button
											disabled={showLoading}
											className="w-full  flex items-center justify-center hover:shadow-blue-100 hover:shadow-md  bg-gradient-to-br from-slate-50 via-white shadow-md to-slate-50 rounded-sm h-11 text-sm mb-2"
											type="submit"
										>
											{!showLoading ? (
												<span>Login</span>
											) : (
												<RingLoader size={50} textColor="text-blue-900" />
											)}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<ToastContainer />
			</div>
		</>
	);
};

export default Login;
