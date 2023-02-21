import React, { useContext } from 'react';
import { BiUserPin, Si1Password, SiGmail } from '../../assets/index';
import { motion } from 'framer-motion';
import { slideUp } from '../../animations';
import useLogin from '../../customHooks/useLogin';
interface Props {
	showLogin: boolean;
}
const login = ({ showLogin }: Props) => {
	const { handleLogin } = useLogin();

	return (
		<div className=" space-y-5 w-full px-10 md:ml-0 md:px-0">
			<form className=" text-gray-500 flex flex-col space-y-4" onSubmit={handleLogin}>
				<div className="flex flex-col">
					<motion.div
						animate={showLogin ? slideUp(0.3, 0.3) : ''}
						className="bg-white rounded-xl h-11 px-5  flex items-center shadow-md"
					>
						<input
							type="text"
							placeholder="Username/email address"
							className="text-sm rounded-xl flex-grow h-11 outline-none bg-white"
							required
						/>
						<BiUserPin />
					</motion.div>
				</div>
				<div className="flex flex-col">
					<motion.div
						animate={showLogin ? slideUp(0.5, 0.3) : ''}
						className="bg-white rounded-xl h-11 px-5  flex items-center shadow-md"
					>
						<input
							type="password"
							placeholder="password"
							className="text-sm rounded-xl flex-grow h-11 outline-none "
							required
						/>
						<Si1Password />
					</motion.div>
				</div>
				<motion.button
					animate={showLogin ? slideUp(0.7, 0.3) : ''}
					className="hover:shadow-blue-100 hover:shadow-md  bg-gradient-to-br from-slate-50 via-white shadow-md to-slate-50 rounded-xl h-11 te	xt-sm"
					type="submit"
				>
					Login
				</motion.button>
			</form>
			<div className="text-sm text-gray-500 flex items-center gap-4">
				<div className="border border-gray-300 w-full"></div>
				<span>Or</span>
				<div className="border border-gray-300 w-full"></div>
			</div>
			<motion.button
				animate={showLogin ? slideUp(0.9, 0.3) : ''}
				className=" transition-all duration-75 ease-in-out bg-red-400 w-full text-white rounded-xl h-11 text-sm border-slate-200 border hover:shadow-blue-100 hover:shadow-xl flex items-center justify-center gap-5"
				type="submit"
			>
				<SiGmail />
				<span>Gmail</span>
			</motion.button>
		</div>
	);
};

export default login;
