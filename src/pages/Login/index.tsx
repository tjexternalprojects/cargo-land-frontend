import React, { useContext } from 'react';
import { ForgotPassword, Header, LoginComponent, SingupComponent } from '@/components';
import useLogin from '@/pages/Login/useLogin';
import ReactSwipe from 'react-swipe';
import { ToastContainer } from 'react-toastify';
import {  BiMenuAltRight, logo, MapImg2 } from '@/assets';
import { motion } from 'framer-motion';
import { scaleBg, reduceScaleBg, fadeIn } from '@/utils/animations';
 const Login = () => {
	let reactSwipeEl: any;
	const { toggleLoginType, state, handleToggleBtn } = useLogin();
	return (
		<>
		<Header />
		<div className=' bg-cover bg-center  bg-no-repeat'
		style={{ backgroundImage: `url(${MapImg2})` }}>
		<div className=" bg-gradient-to-b  from-white via-white/80 to-white  w-full">
			<div className='relative'>
				<div className='flex items-center justify-center  h-screen'>

						<div className='p-5 bg-gradient-to-b  from-white/50 via-white to-white/50 max-w-md '>
						{!state.showForgetPassword ? <div className='flex items-center flex-col justify-center'>
						<motion.div animate={fadeIn} className="mb-4">
							<button
								onClick={() => {
									handleToggleBtn(false);
								}}
								className={` flex-grow px-5 py-2 font-bold border-b-2   ${
									!toggleLoginType ? ' border-red-400' : 'border-b-gray-300'
								}`}
							>
								Login
							</button>
							<button
								onClick={() => {
									handleToggleBtn(true);
								}}
								className={`flex-grow font-bold  px-5 py-2  border-b-2  ${
									toggleLoginType ? ' border-b-2 border-red-400' : 'border-b-gray-300'
								}`}
							>
								Sign&nbsp;up
							</button>
						</motion.div>

							{!toggleLoginType?<div className="w-full flex justify-center">
								<LoginComponent showLogin={true} />
							</div>:
							<div className="w-full flex justify-center md:block">
								<SingupComponent showLogin={true} />
							</div>}
					
						</div>:
						<ForgotPassword/>}
						</div>
			
				</div>
			</div>
			</div>
	 </div>
	 </>
	);
};

export default Login;
