import React from 'react';
import { logo } from '../../assets';

const Header = () => {
	return (
		<div className="w-full text-xl px-10 pt-8 h-20 ">
			<div className="flex items-center justify-between">
				<img src={logo} className=" w-32" alt="" />
				<div>
					<ul className="flex gap-5 font-semibold text-red-400 border-b border-b-red-100">
						<li>Price List</li>
						<li>Contact Us</li>
						<li>About Us</li>
					</ul>
				</div>
				<div>
					<button className=" font-bold text-xl bg-gradient-to-t from-white via-slate-100 to-slate-100 shadow-lg shadow-slate-300  text-red-400 rounded-3xl  px-8 py-2 hover:transition-all hover:shadow-red-100 duration-150 ease-in-out ">
						Sing in
					</button>
				</div>
			</div>
		</div>
	);
};

export default Header;
