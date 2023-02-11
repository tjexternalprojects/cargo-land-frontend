import React from 'react';
import { loginGif } from '../assets';
import { Header } from '../components';
import useLogin from '../customHooks/useLogin';
import ReactSwipe from 'react-swipe';

const Login = () => {
	let reactSwipeEl: any;
	const { toggleLoginType, handleToggleBtn } = useLogin();

	return (
		<div className=" h-screen bg-gradient-to-r from-white via-white to-slate-300 px-10">
			<Header />
			<div className="flex items-center h-auto">
				<div className="flex-grow">
					<img src={loginGif} />
				</div>

				<div className="flex-grow w-96 space-y-10 px-10">
					<div className="bg-slate-200 rounded-3xl inline-flex shadow-md ">
						<button
							onClick={() => {
								handleToggleBtn(false);
								reactSwipeEl.prev();
							}}
							className={`px-5 py-2 font-bold  ${
								!toggleLoginType &&
								'text-white bg-gradient-to-b from-slate-200 via-red-400 to-red-900  rounded-3xl shadow-lg border border-slate-100'
							}`}
						>
							Business
						</button>
						<button
							onClick={() => {
								handleToggleBtn(true);
								reactSwipeEl.next();
							}}
							className={`font-bold  px-5 py-2 ${
								toggleLoginType &&
								'text-white bg-gradient-to-b from-slate-200 via-red-400 to-red-900  rounded-3xl shadow-lg border border-slate-100'
							}`}
						>
							Individual
						</button>
					</div>

					<ReactSwipe
						className="carousel"
						swipeOptions={{ continuous: false }}
						ref={(el) => (reactSwipeEl = el)}
					>
						<div className="space-y-5">
							<h1 className=" font-extrabold text-4xl text-gray-500">Deliver more, worry less</h1>
							<p className="text-gray-400">
								Signup as a Business and get cheaper rate of transporting goods
							</p>

							{/* <p className="text-gray-400">
							Do you need last minute deleivery? we are here to resuce you, by using our shipping
							service, your goods will arive in less than 90 minutes
						</p> */}
							<p className="text-gray-400">
								"Say goodbye to shipping headaches with our top-notch courier services. We offer
								fast, reliable delivery options for businesses of all sizes. Contact us today to
								find out how we can help streamline your shipping process."
							</p>
						</div>
						<div className="space-y-5">
							<h1 className=" font-extrabold text-4xl text-gray-500">Deliver more, worry less</h1>
							<p className="text-gray-400">
								Signup as a Business and get cheaper rate of transporting goods
							</p>

							{/* <p className="text-gray-400">
							Do you need last minute deleivery? we are here to resuce you, by using our shipping
							service, your goods will arive in less than 90 minutes
						</p> */}
							<p className="text-gray-400">
								"Say goodbye to shipping headaches with our top-notch courier services. We offer
								fast, reliable delivery options for businesses of all sizes. Contact us today to
								find out how we can help streamline your shipping process."
							</p>
						</div>
					</ReactSwipe>
					<div className="flex gap-8 mt-10 justify-center md:justify-start lg:absolute top-1/2 -mr-14 right-1/2"></div>
					<button className=" font-bold text-xl bg-gradient-to-t from-white via-slate-100 to-slate-100 shadow-lg shadow-slate-300  text-red-400 rounded-3xl  px-8 py-2 hover:transition-all hover:shadow-red-100 duration-150 ease-in-out">
						Book a Delivery
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
