import React, { useCallback } from 'react';
import { BiHide, BiShow, MdOutlineBusiness, SiGmail, MdAttachEmail } from '@/assets';
import { motion } from 'framer-motion';
import { slideUp } from '@/animations';
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

	const REDIRECT_URI = 'http://localhost:9000/login';

	return (
		<div className=" space-y-5 w-full px-10  md:ml-0 md:px-0 ">
			{/* <Link to="/business_signup">
				<motion.button
					animate={showLogin ? slideUp(0.9, 0.3) : ''}
					className="px-2 transition-all duration-75 ease-in-out bg-blue-900 w-full text-white rounded-xl h-11 text-sm md:text-lg border-slate-200 border hover:shadow-blue-100 hover:shadow-xl flex items-center justify-center gap-5"
					type="submit"
				>
					<MdOutlineBusiness />
					<span>Signup as a Business</span>
				</motion.button>
			</Link> */}
			{/* <div className="text-sm text-gray-500 flex items-center gap-4">
				<div className="border border-gray-300 w-full"></div>
				<span className="w-full">Or an Individual</span>
				<div className="border border-gray-300 w-full"></div>
			</div> */}
			<form className=" text-gray-500 flex flex-col space-y-4" onSubmit={handleSingupSubmit}>
				<div className="flex flex-col">
					<motion.div
						animate={showLogin ? slideUp(0.3, 0.3) : ''}
						className="bg-white rounded-xl h-11 px-5  flex items-center shadow-md"
					>
						<input
							type="email"
							placeholder="Email address"
							className="text-sm rounded-xl flex-grow h-11 outline-none bg-transparent"
							required
						/>
						<MdAttachEmail />
					</motion.div>
				</div>
				<div className="flex flex-col">
					<motion.div
						animate={showLogin ? slideUp(0.5, 0.3) : ''}
						className="bg-white rounded-xl h-11 px-5  flex items-center shadow-md"
					>
						<input
							type={!showPassword ? 'password' : 'text'}
							placeholder="create password"
							className="text-sm rounded-xl flex-grow h-11 outline-none"
							min={6}
							required
						/>
						{!showPassword ? (
							<BiHide className=" cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
						) : (
							<BiShow className=" cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
						)}
					</motion.div>
				</div>
				<motion.button
					animate={showLogin ? slideUp(0.7, 0.3) : ''}
					className="hover:shadow-blue-100 hover:shadow-md  bg-gradient-to-br from-slate-50 via-white  to-slate-50 rounded-xl h-11 text-sm shadow-md"
					type="submit"
				>
					Verify Email
				</motion.button>
			</form>
			<div className="text-sm text-gray-500 flex items-center gap-4">
				<div className="border border-gray-300 w-full"></div>
				<span>Or</span>
				<div className="border border-gray-300 w-full"></div>
			</div>
			<motion.div
				animate={showLogin ? slideUp(0.9, 0.3) : ''}
				className=" transition-all duration-75 ease-in-out bg-red-400 w-full text-white rounded-xl h-11 text-sm border-slate-200 border hover:shadow-blue-100 hover:shadow-xl flex items-center justify-center gap-5 shadow-md"
			>
				<GoogleLogin
					className=" bg-transparent text-white border-none shadow-none"
					clientId={import.meta.env.VITE_REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
					buttonText="Sign up with Google"
					onSuccess={googleSignUpSuccess}
					onFailure={googleSignUpFailure}
					cookiePolicy={'single_host_origin'}
				/>
			</motion.div>

			<LoginSocialGoogle
				client_id={import.meta.env.VITE_REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
				onLoginStart={onLoginStart}
				redirect_uri={REDIRECT_URI}
				scope="openid profile email"
				discoveryDocs="claims_supported"
				access_type="offline"
				onResolve={({ provider, data }: IResolveParams) => {
					console.log(provider);
					console.log(data);
					// setProvider(provider);
					// setProfile(data);
				}}
				onReject={(err) => {
					console.log(err);
				}}
			>
				<GoogleLoginButton />
			</LoginSocialGoogle>
		</div>
	);
};

export default signup;
