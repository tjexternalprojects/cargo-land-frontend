import React, { useCallback } from 'react';
import { BiHide, BiShow, MdOutlineBusiness, SiGmail, MdAttachEmail, BiUserPin } from '@/assets';

import useSignUp from './useSignUp';
import RingLoader from '@/components/common/RingLoader';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'


const signup = () => {
	const {
		showPassword,
		GOOGLE_SIGNUP_CLIENT_ID,
		showLoading,
		signUpData,
		setSignUpData,
		setShowPassword,
		handleSingupSubmit,
		googleSignUpSuccess,
		googleSignUpFailure,
	} = useSignUp();




	return (
		<div className=" space-y-5 w-full ">
			<form className=" text-gray-500 flex flex-col space-y-4" onSubmit={handleSingupSubmit}>
				<div className="bg-white h-11 px-3 border-b border-blue-800  flex items-center shadow-md animate__animated animate__fadeInUp animate__faster ">
					<input
						onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
						type="text"
						placeholder="Full Name"
						className="text-sm  flex-grow h-10 outline-none bg-transparent"
						required
					/>
					<BiUserPin />
				</div>
				<div className="bg-white h-11 px-3 border-b border-blue-800  flex items-center shadow-md animate__animated animate__fadeInUp animate__faster ">
					<input
						onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
						type="email"
						placeholder="Email address"
						className="text-sm  flex-grow h-10 outline-none bg-transparent"
						required
					/>
					<MdAttachEmail />
				</div>
				<div className='text-red-600 w-full text-xs'>
					* Minimum lenght should be 6 characters 
				</div>
				<div className="bg-white  h-11 px-3 border-b border-blue-800  flex items-center shadow-md animate__animated animate__fadeInUp animate__faster ">
					<input
						onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value, confirmPassword:e.target.value })}
						type={!showPassword ? 'password' : 'text'}
						placeholder="create password"
						minLength={6}
						className="text-sm  flex-grow h-10 outline-none"
						required
					/>
					{!showPassword ? (
						<BiHide className=" cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
					) : (
						<BiShow className=" cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
					)}
				</div>
				<button
					disabled={showLoading}
					className="hover:shadow-blue-100 hover:shadow-md  flex items-center justify-center bg-gradient-to-br from-slate-50 via-white  to-slate-50 h-11 text-sm shadow-md animate__animated animate__fadeInUp animate__faster "
					type="submit"
				>
					{!showLoading ? <span>Sign Up</span> : <RingLoader size={50} textColor="text-blue-900" />}
				</button>
			</form>
			<div className="text-sm text-gray-500 flex items-center gap-20">
				<div className="border border-gray-300 w-full"></div>
				<span>Or</span>
				<div className="border border-gray-300 w-full"></div>
			</div>
			<div
				className=" animate__animated animate__fadeInUp animate__faster flex justify-center "
			>

				<GoogleOAuthProvider clientId={GOOGLE_SIGNUP_CLIENT_ID} >

					<GoogleLogin
						theme="outline"
						text='signup_with'
						ux_mode="popup"
						onSuccess={credentialResponse => {
							console.log(credentialResponse)
							const details = jwt_decode(credentialResponse.credential as string) as Record<string,string>
							googleSignUpSuccess(details)
						}}
						onError={() => {
							googleSignUpFailure()
							console.log('Login Failed');
						}}
					/>
				</GoogleOAuthProvider>

			</div>
			<ToastContainer />

		</div>
	);
};

export default signup;
