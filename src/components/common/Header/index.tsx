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
	const [isOpen, setIsOpen] = useState(false);
	const { toggleLoginType, handleToggleBtn } = useLogin();

	return (
		<div className=" text-xl z-20  md:pt-3 md:h-16 box-border w-full fixed ">
			<div className="flex items-center justify-between w-full px-5 md:px-10 pt-4 md:pt-0    md:w-auto z-10 ">
				<Link to="/">
					{' '}
					<img src={logo} className=" w-32" alt="" />
				</Link>
				<div className="z-20 hidden md:block">
					<ul className="flex gap-5  text-red-400 border-b border-b-red-100">
						<li>Price List</li>
						<li>Contact Us</li>
						<li>About Us</li>
					</ul>
				</div>
				<div className="z-20 ">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className={`flex items-center text-sm md:text-md  text-red-400 rounded-3xl px-4  md:px-8 py-2  hover:transition-all duration-150 ease-in-out hover:shadow-xl hover:shadow-blue-100  
						${
							!isOpen
								? '  bg-gradient-to-t from-white via-slate-100 to-slate-100 shadow-lg shadow-slate-300  '
								: ''
						}`}
					>
						Sign&nbsp;in
						<BiMenuAltRight className=" md:hidden text-3xl" />
					</button>
				</div>
				<motion.div
					animate={isOpen ? scaleBg('55%') : ''}
					className={`flex flex-col justify-center items-center  px-48 md:px-24 ${
						isOpen
							? 'shadow-xl shadow-blue-100 z-10 overflow-hidden   backdrop-blur-lg  absolute right-0 top-0 rounded-b-full rounded-l-full'
							: ' hidden'
					}`}
				>
					<motion.div
						animate={isOpen ? fadeIn : ''}
						className="md:w-full mt-16 md:px-28 flex mb-8 text-gray-500 "
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

					{isOpen && (
						<ReactSwipe
							className="carousel w-96 m-0"
							swipeOptions={{ continuous: false }}
							ref={(el) => (reactSwipeEl = el)}
						>
							<div className="w-full flex justify-center md:block">
								<LoginComponent showLogin={isOpen} />
							</div>
							<div className="w-full flex justify-center md:block">
								<SingupComponent showLogin={isOpen} />
							</div>
						</ReactSwipe>
					)}
					<div className="md:hidden flex flex-col items-center uppercase  gap-1   text-sm   text-red-400 ">
						<div>Price&nbsp;List</div>
						<div>Contact&nbsp;Us</div>
						<div>About&nbsp;Us</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default Header;
