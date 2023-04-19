import { motion } from 'framer-motion';
import { slideDown } from '@/utils/animations';
import useLogin from '@/pages/Login/useLogin';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { LocalStorageServices } from '@/services';
import { userImg, BiMenuAltRight, logo, TbLogout } from '@/assets'
import useHeader from './useHeader';
const Header = () => {
	const { state, handleNavigate, toggleShowLoin } = useLogin();
	const userInfo = LocalStorageServices.getUserInfo()
	const location = useLocation();
	const {handleLogout} = useHeader()

	return (
		<div className="text-xl z-20 box-border w-full backdrop-blur-lg bg-white pb-3   pt-4 px-10 md:px-20 lg:px-44  fixed ">
			<div className='flex justify-between items-center  z-40'>
				<Link to="/">
					<img src={logo} className=" w-32" alt="" />
				</Link>
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
					{LocalStorageServices.getAccessToken() ? <>

						<button
							onClick={() => handleNavigate('/login')}
							className="flex items-center text-md md:text-md   rounded-md p-2 hover:transition-all duration-150 ease-in-out hover:shadow-xl hover:shadow-blue-100"
						>
							<div className="w-10 h-10 rounded-full shadow-md border border-slate-200">
								<img
									src={!userInfo?.avatar ? userImg : userInfo?.avatar}
									className="w-full h-full object-contain rounded-full"
								/>
							</div>
							<h3 className="text-sm mx-2 hidden md:block">Hi!  {userInfo?.name.slice(0,5)}</h3>
						</button>
							<TbLogout className='text-red-400 ml-5 hidden md:block cursor-pointer' 	onClick={handleLogout}/>
						{location.pathname !== '/login' && <BiMenuAltRight className=" md:hidden text-3xl" onClick={toggleShowLoin} />}</>

						:
						<>
							<button
								onClick={() => handleNavigate('/login')}
								className="text-md md:text-md  text-red-400 rounded-md p-2 hover:transition-all duration-150 ease-in-out hover:shadow-xl hover:shadow-blue-100"
							>
								<span>Sign&nbsp;in</span>
							</button>

							{location.pathname !== '/login' && <BiMenuAltRight className=" md:hidden text-3xl" onClick={toggleShowLoin} />}</>
					}
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
						<hr />
						<li className='flex items-center cursor-pointer' 	onClick={handleLogout}>
						<span className='text-sm font-bold'>Logout</span> <TbLogout className='text-red-400 ml-5  md:hidden'/>
						</li>
					</ul>


				</motion.div>
			</div>
		</div>
	);
};

export default Header;
