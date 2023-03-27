import React, { useContext } from 'react';
import { Header, LoginComponent, SingupComponent } from '@/components';
import useLogin from '@/pages/Login/useLogin';
import ReactSwipe from 'react-swipe';
import { ToastContainer } from 'react-toastify';
import { BiMenuAltRight, logo } from '@/assets';
import { motion } from 'framer-motion';
import { scaleBg, reduceScaleBg, fadeIn } from '@/utils/animations';


const Login = () => {
	let reactSwipeEl: any;
	const { toggleLoginType, handleToggleBtn } = useLogin();

	return (
		<>
			<Header />
			<div>
				<div></div>
				<div>
					<motion.div
						animate={fadeIn}
						className="md:w-full mt-16 md:px-28 flex mb-8 b text-gray-500"
					>
						<button
							onClick={() => {
								handleToggleBtn(false);
								reactSwipeEl.prev();
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
								reactSwipeEl.next();
							}}
							className={`flex-grow font-bold  px-5 py-2  border-b-2  ${
								toggleLoginType ? ' border-b-2 border-red-400' : 'border-b-gray-300'
							}`}
						>
							Sign&nbsp;up
						</button>
					</motion.div>
					
						<ReactSwipe
							className="carousel w-96 m-0"
							swipeOptions={{ continuous: false }}
							ref={(el) => (reactSwipeEl = el)}
						>
							<div className="w-full flex justify-center md:block">
								<LoginComponent showLogin={toggleLoginType} />
							</div>
							<div className="w-full flex justify-center md:block">
								<SingupComponent showLogin={toggleLoginType} />
							</div>
						</ReactSwipe>
				</div>
				<div></div>
			</div>
		</>
	);
};

export default Login;
