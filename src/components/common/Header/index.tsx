import React, { useState } from 'react';
import { BiMenuAltRight, logo } from '../../../assets';
import { motion } from 'framer-motion';
import { scaleBg, slideDown, reduceScaleBg, fadeIn } from '@/utils/animations';
import { LoginComponent, SingupComponent } from '../..';
import ReactSwipe from 'react-swipe';
import useLogin from '@/pages/Login/useLogin';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Header = () => {
	const { toggleLoginType, state, toggleShowLoin, handleToggleBtn } = useLogin();
	const location = useLocation();

	return (
		<div className="text-xl z-20 box-border w-full backdrop-blur-lg bg-white pb-3   pt-4 px-10 md:px-20 lg:px-44  fixed ">
			<div className='flex justify-between items-center z-40'>
				<a href="/">
					<img src={logo} className=" w-32" alt="" />
				</a>
				<div className="z-20 hidden md:block">
					<ul className="flex gap-5 text-md  text-red-400">
						<li className="cursor-pointer">
							<Link to="/">About Us</Link>
						</li>
						<li className="cursor-pointer">
							<a href="#Direction">Direction</a>
						</li>
						<li className="cursor-pointer">
							<a href="#Contact">Contact Us</a>
						</li>
					</ul>
				</div>
				<div className="  flex   items-center  justify-center space-x-5">
					<Link to="/login"><button

						className="text-md md:text-md  text-red-400 rounded-md p-2 hover:transition-all duration-150 ease-in-out hover:shadow-xl hover:shadow-blue-100"
					>
						<span>Sign&nbsp;in</span>
					</button></Link>
					{location.pathname !== '/login' && <BiMenuAltRight  className=" md:hidden text-3xl" onClick={toggleShowLoin} />}
				</div>
			</div>
			<div className='fixed top-0 left-0 right-0 w-full -z-10 bg-white'>
				<motion.div
					animate={state.openSignUpMenu ? slideDown : ''}
					className={`flex flex-col pb-10 w-full bg-white ${state.openSignUpMenu
							? ' overflow-hidden  '
							: ' hidden'
						}`}


				>

					<ul className="flex gap-2 items-center text-md flex-col text-red-400">
						<li className="cursor-pointer" onClick={toggleShowLoin}>
							<a href="/#AboutUs">About Us</a>
						</li>
						<li className="cursor-pointer" onClick={toggleShowLoin}>
							<a href="#Direction">Direction</a>
						</li>
						<li className="cursor-pointer" onClick={toggleShowLoin}>
							<a href="#Contact">Contact Us</a>
						</li>
					</ul>


				</motion.div>
			</div>
		</div>
	);
};

export default Header;
