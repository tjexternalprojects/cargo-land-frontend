import { BiUserPin, BsGoogle, Si1Password, SiGmail } from '@/assets';
import useLogin from './useLogin';
import { RingLoader } from '@/components';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

const login = () => {
	const {
		loginData,
		showLoading,
		GOOGLE_LOGIN_CLIENT_ID,
		verifyEmail,
		loginWithGoogle,
		googleLoginSuccess,
		googleLoginFailure,
		handleVerifyEmail,
		handleLogin,
		setLoginData,
		showForgotPassword,
	} = useLogin();

	return (
		<div className=" space-y-5 w-full">
			<form className=" text-gray-500 flex flex-col space-y-4" onSubmit={handleLogin}>
				<div className="flex flex-col">
					<div className="bg-white h-11 px-3 border-b border-blue-800 flex items-center shadow-md animate__animated animate__fadeInUp animate__faster">
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
					<div className="bg-white h-11 px-3 border-b border-blue-800  flex items-center shadow-md animate__animated animate__fadeInUp animate__faster ">
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
				<div className="space-y-3 w-full  animate__animated animate__fadeInUp animate__faster">
					<button
						disabled={showLoading}
						className="w-full  flex items-center justify-center hover:shadow-blue-100 hover:shadow-md  bg-gradient-to-br from-slate-50 via-white shadow-md to-slate-50 rounded-sm h-11 text-sm mb-2"
						type="submit"
					>
						{!showLoading ? <span>Login</span> : <RingLoader size={50} textColor="text-blue-900" />}
					</button>
					<div className="space-x-3 flex items-center justify-between">
						<span className="text-blue-800 text-sm cursor-pointer" onClick={showForgotPassword}>
							Forgotten Password?
						</span>
						{verifyEmail && (
							<span className="text-red-800 text-sm cursor-pointer" onClick={handleVerifyEmail}>
								Verify Email
							</span>
						)}
					</div>
				</div>
			</form>
			<div className="text-sm text-gray-500 flex items-center ">
				<div className="border border-gray-300 w-full"></div>
				<span>Or</span>
				<div className="border border-gray-300 w-full"></div>
			</div>
			<div className=" animate__animated animate__fadeInUp animate__faster flex justify-center ">
				<button className="flex items-center justify-center w-full max-w-xs px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={loginWithGoogle}>
					
					<BsGoogle/>
					<div> Login with Google</div>
				</button>
				{/* <GoogleOAuthProvider clientId={GOOGLE_LOGIN_CLIENT_ID}>
					<GoogleLogin
						theme="outline"
						text="signup_with"
						ux_mode="popup"
						onSuccess={(credentialResponse) => {
							const details = jwt_decode(credentialResponse.credential as string) as Record<
								string,
								string
							>;
							googleLoginSuccess(details);
						}}
						onError={() => {
							googleLoginFailure();
						}}
					/>
				</GoogleOAuthProvider> */}
			</div>
		</div>
	);
};

export default login;
