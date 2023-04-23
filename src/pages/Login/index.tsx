
import { ForgotPassword, Header, LoginComponent, ResendToken, SingupComponent } from '@/components';
import useLogin from '@/pages/Login/useLogin';
import { MapImg2 } from '@/assets';
import { Navigate, useLocation } from "react-router-dom";
import { LocalStorageServices } from '@/services';


const Login = () => {
	const { toggleLoginType, state, handleToggleBtn } = useLogin();

	const user =LocalStorageServices.getUserInfo();
	if(user){
	if (user?.role && user?.role <= 2) {
		return <Navigate to={"/dashboard"} />;
	}else if(user?.role && user?.role >= 3){
		return <Navigate to={"/admin"} />;
	}}

	return (
		<>
			<Header />
			<div className=' bg-cover bg-center  bg-no-repeat'
				style={{ backgroundImage: `url(${MapImg2})` }}>
				<div className=" bg-gradient-to-b  from-white via-white/40 to-white  w-full">
					<div className='relative'>
						<div className='flex items-center justify-center  h-screen '>

							<div className='p-5 bg-gradient-to-b  from-white/50 via-white to-white/50 w-96 '>
								{state.showResendToken && <ResendToken />}
								{!state.showResendToken && <>{!state.showForgetPassword ?
									<div className='flex items-center flex-col justify-center '>
										<div className="mb-4 flex justify-around  w-full">
											<button
												onClick={() => {
													handleToggleBtn(false);
												}}
												className={` flex-grow  py-2 font-bold border-b-2   ${!toggleLoginType ? ' border-red-400' : 'border-b-gray-300'
													}`}
											>
												Login
											</button>
											<button
												onClick={() => {
													handleToggleBtn(true);
												}}
												className={`flex-grow font-bold  py-2  border-b-2  ${toggleLoginType ? ' border-b-2 border-red-400' : 'border-b-gray-300'
													}`}
											>
												Sign&nbsp;up
											</button>
										</div>

										{!toggleLoginType ? <div className="w-full flex justify-center">
											<LoginComponent />
										</div> :
											<div className="w-full flex justify-center md:block">
												<SingupComponent  />
											</div>}

									</div> :
									<ForgotPassword />}</>}
							</div>

						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
