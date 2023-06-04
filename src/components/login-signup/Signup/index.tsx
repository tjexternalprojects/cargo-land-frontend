import React, { lazy, Suspense } from 'react';
import { BiHide, BiShow, BsTelephoneForward, MdAttachEmail, BiUserPin, BsGoogle } from '@/assets';
import useSignUp from './useSignUp';
import { RingLoader } from '@/components';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import 'react-phone-number-input/style.css';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import { useForm } from 'react-hook-form';

const signup = () => {
	const {
		showPassword,
		GOOGLE_SIGNUP_CLIENT_ID,
		showLoading,
		signUpData,
		continueWithGoogle,
		setSignUpData,
		setShowPassword,
		handleSingupSubmit,
		googleSignUpSuccess,
		googleSignUpFailure,
	} = useSignUp();

	const { control, handleSubmit } = useForm();

	return (
		<div className=" space-y-5 w-full ">
			<form
				className=" text-gray-500 flex flex-col space-y-4"
				onSubmit={handleSubmit(handleSingupSubmit)}
			>
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
					<PhoneInputWithCountry
						name="phoneInputWithCountrySelect"
						control={control}
						rules={{ required: true }}
						placeholder="Enter phone number"
						className=" outline-none focus:outline-none border-none"
						value={signUpData.phoneNumber}
						onChange={(e: string) => setSignUpData({ ...signUpData, phoneNumber: e })}
					/>
					<BsTelephoneForward />
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
				<div className="text-red-600 w-full text-xs">* Minimum length should be 6 characters</div>
				<div className="bg-white  h-11 px-3 border-b border-blue-800  flex items-center shadow-md animate__animated animate__fadeInUp animate__faster ">
					<input
						onChange={(e) =>
							setSignUpData({
								...signUpData,
								password: e.target.value,
								confirmPassword: e.target.value,
							})
						}
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
			<div className=" animate__animated animate__fadeInUp animate__faster flex justify-center ">
				<button
					className="flex items-center justify-center w-full max-w-xs px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					onClick={continueWithGoogle}
				>
					<BsGoogle />
					<div> Continue with Google</div>
				</button>
				{/* <GoogleOAuthProvider clientId={GOOGLE_SIGNUP_CLIENT_ID}>
					<GoogleLogin
						theme="outline"
						text="signup_with"
						ux_mode="popup"
						onSuccess={(credentialResponse) => {
							const details = jwt_decode(credentialResponse.credential as string) as Record<
								string,
								string
							>;
							googleSignUpSuccess(details);
						}}
						onError={() => {
							googleSignUpFailure();
						}}
					/>
				</GoogleOAuthProvider> */}
			</div>
		</div>
	);
};

export default signup;
