import React, { useCallback } from 'react';
import { BiHide, BiShow, MdOutlineBusiness, SiGmail, MdAttachEmail } from '@/assets';
import { motion } from 'framer-motion';
import { slideUp } from '@/utils/animations';
import useSignUp from './useSignUp';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';

import { IResolveParams, LoginSocialGoogle } from 'reactjs-social-login';
import { GoogleLoginButton } from 'react-social-login-buttons';

interface Props {
	showLogin: boolean;
}
const signup = ({ showLogin }: Props) => {
	const {
		showPassword,
		GOOGLE_SIGNUP_CLIENT_ID,
		setShowPassword,
		handleSingupSubmit,
		googleSignUpSuccess,
		googleSignUpFailure,
	} = useSignUp();
	const onLoginStart = useCallback(() => {
		alert('login start');
	}, []);



	return (
		<div className=" space-y-5 w-full ">

			<form className=" text-gray-500 flex flex-col space-y-4" onSubmit={handleSingupSubmit}>
				<div className="flex flex-col">
					<div
						className="bg-white h-11 px-3 border-b border-blue-800  flex items-center shadow-md"
						data-aos="fade-up"
					>
						<input
							type="email"
							placeholder="Email address"
							className="text-sm  flex-grow h-10 outline-none bg-transparent"
							required
						/>
						<MdAttachEmail />
					</div>
				</div>
				<div className="flex flex-col">
					<div
						className="bg-white  h-11 px-3 border-b border-blue-800  flex items-center shadow-md"
						data-aos="fade-up"
						data-aos-delay="100"
					>
						<input
							type={!showPassword ? 'password' : 'text'}
							placeholder="create password"
							className="text-sm  flex-grow h-10 outline-none"
							min={6}
							required
						/>
						{!showPassword ? (
							<BiHide className=" cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
						) : (
							<BiShow className=" cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
						)}
					</div>
				</div>
				<button
					className="hover:shadow-blue-100 hover:shadow-md  bg-gradient-to-br from-slate-50 via-white  to-slate-50 h-11 text-sm shadow-md"
					type="submit"
					data-aos="fade-up"
					data-aos-delay="200"
				>
					Verify Email
				</button>
			</form>
			<div className="text-sm text-gray-500 flex items-center gap-20">
				<div className="border border-gray-300 w-full"></div>
				<span>Or</span>
				<div className="border border-gray-300 w-full"></div>
			</div>
			<div
				className=" transition-all duration-75 ease-in-out bg-red-400 w-full text-white rounded-xl h-11 text-sm border-slate-200 border hover:shadow-blue-100 hover:shadow-xl flex items-center justify-center gap-5 shadow-md"
				data-aos="fade-up"
				data-aos-delay="300"
			>
				<GoogleLogin
					className=" bg-transparent text-white border-none shadow-none"
					clientId={GOOGLE_SIGNUP_CLIENT_ID}
					buttonText="Sign up with Google"
					onSuccess={googleSignUpSuccess}
					onFailure={googleSignUpFailure}
					cookiePolicy={'single_host_origin'}
				/>
			</div>

		</div>
	);
};

export default signup;
