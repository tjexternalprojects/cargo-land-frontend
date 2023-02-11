import React, { useState } from 'react';
import { logo } from '../../assets';
import { motion } from 'framer-motion';
import { scaleBg, reduceScaleBg, fadeIn } from '../../animations';
import { LoginComponent, SingupComponent } from '..';
import ReactSwipe from 'react-swipe';
import useLogin from '../../customHooks/useLogin';

const Header = () => {
	let reactSwipeEl: any;
	const [isOpen, setIsOpen] = useState(true);
	const { toggleLoginType, handleToggleBtn } = useLogin();

	return (
		<div className="w-full text-xl px-10 pt-8 h-20">
			<div className="flex items-center justify-between  z-10">
				<img src={logo} className=" w-32" alt="" />
				<div className="z-20">
					<ul className="flex gap-5 font-semibold text-red-400 border-b border-b-red-100">
						<li>Price List</li>
						<li>Contact Us</li>
						<li>About Us</li>
					</ul>
				</div>
				<div className="z-20">
					<button
						onClick={() => setIsOpen((isOpen) => !isOpen)}
						className={`font-bold text-xl text-red-400 rounded-3xl   px-8 py-2  hover:transition-all duration-150 ease-in-outhover:shadow-red-100 hover:shadow-xl hover:shadow-blue-100  
						${
							!isOpen
								? '  bg-gradient-to-t from-white via-slate-100 to-slate-100 shadow-lg shadow-slate-300  '
								: ''
						}`}
					>
						Sing in
					</button>
				</div>

				<motion.div
					animate={isOpen ? scaleBg : reduceScaleBg}
					className={`flex flex-col items-center justify-center px-48 ${
						isOpen
							? 'shadow-xl shadow-blue-100 z-10  backdrop-blur-lg overflow-hidden absolute right-0 top-0 rounded-b-full rounded-l-full'
							: ' hidden'
					}`}
				>
					<motion.div animate={isOpen ? fadeIn : ''} className=" flex mb-8 text-gray-500 w-full">
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
							Sign-up
						</button>
					</motion.div>

					<ReactSwipe
						className=" w-96"
						childCount={0}
						swipeOptions={{ continuous: false, stopPropagation: true }}
						ref={(el) => (reactSwipeEl = el)}
					>
						<div>
							<LoginComponent showLogin={isOpen} />
						</div>
						<div>
							<SingupComponent showLogin={isOpen} />
						</div>
					</ReactSwipe>
				</motion.div>
			</div>
		</div>
	);
};

export default Header;
