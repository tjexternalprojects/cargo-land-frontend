import React, { useContext } from 'react';
import { BiUserPin, Si1Password, SiGmail } from '@/assets';
import { motion } from 'framer-motion';
import { slideUp } from '@/utils/animations';
import useLogin from './useLogin';
import RingLoader from '@/components/common/RingLoader';
import GoogleLogin from 'react-google-login';

interface Props {
	showLogin: boolean;
}
const login = ({ showLogin }: Props) => {
	const {
		handleLogin,
		setLoginData,
		loginData,
		showLoading,
		GOOGLE_SIGNUP_CLIENT_ID,
		showForgotPassword,
		googleSignUpSuccess,
		googleSignUpFailure,
	} = useLogin();

	return (
		<div className=" space-y-5 w-full">
			<form className=" text-gray-500 flex flex-col space-y-4" onSubmit={handleLogin}>
				<div className="flex flex-col">
					<div
						className="bg-white h-11 px-3 border-b border-blue-800 flex items-center shadow-md animate__animated animate__fadeInUp animate__faster"
					>
						<input
							onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
							type="text"
							placeholder="Username/email address"
							className="text-sm flex-grow h-10 outline-none bg-white"
							required
						/>
						<BiUserPin />
					</div>
				</div>
				<div className="flex flex-col">
					<div
						className="bg-white h-11 px-3 border-b border-blue-800  flex items-center shadow-md animate__animated animate__fadeInUp animate__faster "
					>
						<input
							onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
							type="password"
							placeholder="password"
							className="text-sm flex-grow h-10 outline-none "
							required
						/>
						<Si1Password />
					</div>
				</div>
				<div
					className="space-y-3 w-full  animate__animated animate__fadeInUp animate__faster"
				>

				<button
					disabled={showLoading}
					className="w-full  flex items-center justify-center hover:shadow-blue-100 hover:shadow-md  bg-gradient-to-br from-slate-50 via-white shadow-md to-slate-50 rounded-sm h-11 te	xt-sm"
					type="submit"
				>
					{!showLoading ? <span>Login</span> : <RingLoader size={50} textColor="text-blue-900" />}
				</button>
				<div className='text-blue-800 w-full text-sm cursor-pointer' onClick={showForgotPassword}>
					Forgotten Password?
				</div>

					</div>
			</form>
			<div className="text-sm text-gray-500 flex items-center ">
				<div className="border border-gray-300 w-full"></div>
				<span>Or</span>
				<div className="border border-gray-300 w-full"></div>
			</div>
			<div
				className=" transition-all duration-75 ease-in-out bg-red-400 w-full text-white rounded-xl h-11 text-sm border-slate-200 border hover:shadow-blue-100 hover:shadow-xl flex items-center justify-center gap-5 shadow-md animate__animated animate__fadeInUp animate__faster"
			>
				<GoogleLogin
					className=" bg-transparent text-white border-none shadow-none"
					clientId={GOOGLE_SIGNUP_CLIENT_ID}
					buttonText="Login with Google"
					onSuccess={googleSignUpSuccess}
					onFailure={googleSignUpFailure}
					cookiePolicy={'single_host_origin'}
				/>
			</div>
		</div>
	);
};

export default login;
