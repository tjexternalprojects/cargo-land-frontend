import React, { useState } from 'react';
import { BiMenuAltRight, logo } from '../../../assets';
import { motion } from 'framer-motion';
import { scaleBg, reduceScaleBg, fadeIn } from '../../../utils/animations';
import { LoginComponent, SingupComponent } from '../..';
import ReactSwipe from 'react-swipe';
import useLogin from '@/pages/Login/useLogin';
import { Link } from 'react-router-dom';

const Header = () => {
	let reactSwipeEl: any;
	const { toggleLoginType, state, toggleShowLoin,  handleToggleBtn } = useLogin();
//  md:px-20 lg:px-44
	return (
		<div className="text-xl z-20 box-border w-full backdrop-blur-lg bg-white pb-3 flex justify-between items-center  pt-4 px-10 md:px-20 lg:px-44  fixed ">
			<a href="#Home">
				<img src={logo} className=" w-32" alt="" />
			</a>
			<div className="z-20 hidden md:block">
				<ul className="flex gap-5 text-md  text-red-400">
					<li className="cursor-pointer">
						<a href="#AboutUs">About Us</a>
					</li>
					<li className="cursor-pointer">
						<a href="#Direction">Direction</a>
					</li>
					<li className="cursor-pointer">
						<a href="#Contact">Contact Us</a>
					</li>
				</ul>
			</div>
			<div className="z-20  ">
				<button
					onClick={toggleShowLoin}
					className="flex   items-center text-md md:text-md  text-red-400 rounded-md p-2 hover:transition-all duration-150 ease-in-out hover:shadow-xl hover:shadow-blue-100"
				>
					<span>Sign&nbsp;in</span>
					<BiMenuAltRight className=" md:hidden text-3xl" />
				</button>
			</div>
			<motion.div
				animate={state.openSignUpMenu ? scaleBg('55%') : ''}
				className={`flex flex-col justify-center items-center rounded-b-full rounded-l-full  px-40  md:px-24 ${
					state.openSignUpMenu
						? 'z-10 overflow-hidden bg-white  backdrop-blur-lg  absolute right-0 top-0 h-screen'
						: ' hidden'
				}`}

				// rounded-b-full rounded-l-full
			>
				<motion.div
					animate={state.openSignUpMenu ? fadeIn : ''}
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

				{state.openSignUpMenu && (
					<ReactSwipe
						className="carousel w-96 m-0"
						swipeOptions={{ continuous: false }}
						ref={(el) => (reactSwipeEl = el)}
					>
						<div className="w-full flex justify-center md:block">
							<LoginComponent showLogin={state.openSignUpMenu} />
						</div>
						<div className="w-full flex justify-center md:block">
							<SingupComponent showLogin={state.openSignUpMenu} />
						</div>
					</ReactSwipe>
				)}
				<ul className="md:hidden flex flex-col items-center uppercase  gap-1   text-sm   text-red-400 ">
					<li className="cursor-pointer">
						<a href="#AboutUs">About Us</a>
					</li>
					<li className="cursor-pointer">
						<a href="#Direction">Direction</a>
					</li>
					<li className="cursor-pointer">
						<a href="#Contact">Contact&nbsp;Us</a>
					</li>
				</ul>
			</motion.div>
		</div>
	);
};

export default Header;
