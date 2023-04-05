import React from 'react';
import { LineGraph, MapDirection } from '@/components';
import { BsArrowDownRight, BsArrowUpRight, FaEye, FaEyeSlash, SlGraph, userImg } from '@/assets';
import useHome from './useHome';
import { Link } from 'react-router-dom';
const home = () => {
	const {
		received_data,
		sent_data,
		showBalance,
		walletBalance,
		curency,
		transaction_history,
		activeShipment,
		toggleShowBalance,
	} = useHome();

	return (
		<div className="mt-10 space-y-10   w-full">
			{/* Top */}
			<div className="gap-4 flex justify-between flex-wrap md:flex-nowrap  w-full">
				<div className=" inline-flex rounded-md gap-3 p-4  flex-grow   justify-between bg-slate-50 shadow-md items-center">
					<div className=" w-20">
						<SlGraph className="text-5xl text-blue-700" />
					</div>
					<div className="flex flex-col md:items-end text-blue-500">
						<div className="flex items-center justify-center space-x-2">
							<div>Wallet Balance</div>
							<div onClick={toggleShowBalance}>{showBalance ? <FaEyeSlash /> : <FaEye />}</div>
						</div>
						<div className="text-md md:text-2xl font-bold flex">
							{curency}{walletBalance}
						</div>
					</div>
				</div>

				<div className=" inline-flex rounded-md gap-3 p-4  bg-green-50  flex-grow  justify-between  shadow-md items-center">
					<div className=" w-20">
						<LineGraph data={received_data} />
					</div>
					<div className="flex flex-col items-end text-green-500">
						<div>Total Users</div>
						<div className=" text-5xl font-thin">50</div>
					</div>
				</div>

				<div className=" inline-flex rounded-md gap-3 p-4  flex-grow  justify-between bg-slate-50 shadow-md items-center">
					<div className=" w-20">
						<LineGraph data={sent_data} />
					</div>
					<div className="flex flex-col items-end text-red-500">
						<div>Pending Shipment</div>
						<div className=" text-5xl font-thin ">0</div>
					</div>
				</div>
			</div>

			{/* Buttom */}
			<div className=" flex  gap-3  justify-between  flex-wrap md:flex-nowrap">
				<div className="">
					<h4 className="text-xl mb-3">Latest Transaction</h4>
					<hr />
					<div className=" space-y-3 mt-3">
						{transaction_history.map((val, index) => (
							<div
								key={index}
								className="flex items-center space-x-3 bg-slate-50 p-2 rounded-md cursor-pointer hover:bg-blue-50 hover:shadow-sm transition-all duration-75 ease-in-out"
							>
								{val.type === 'credit' && (
									<div className="p-2 rounded-md bg-green-100 inline-flex">
										<BsArrowDownRight />
									</div>
								)}

								{val.type === 'debit' && (
									<div className="p-2 rounded-md bg-red-100 inline-flex">
										<BsArrowUpRight />
									</div>
								)}

								<div>
									<div className=" font-bold text-slate-600">{val.title}</div>
									<div className="text-sm text-slate-400">
										{val.description.length > 16
											? val.description.slice(0, 16) + ' ...'
											: val.description}
									</div>
								</div>

								<div className="font-bold">
									<div>
										{val.type === 'credit' ? (
											<div className="text-green-500">+{val.amount}</div>
										) : (
											<div className="text-red-500">-{val.amount}</div>
										)}
									</div>
									<div className="text-xs font-light text-slate-500">{val.date}</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="">
					<h4 className="text-xl mb-3">Recent User</h4>
					<hr />
					<div className=" space-y-3 mt-3">
						<div
							className="flex items-center space-x-3 bg-slate-50 p-2 rounded-lg cursor-pointer hover:bg-blue-50 hover:shadow-sm transition-all duration-75 ease-in-out "
						>
							<div className="w-10 h-10 rounded-full shadow-md border border-slate-200">
								<img
									src={userImg}
									className="w-full h-full object-contain rounded-full"
								/>
							</div>
							<div className='flex flex-col'>
								<div className=" font-bold text-slate-600">
									<span>Kelvin Adeyinkaiiiiio ooo</span>
								</div>
								<div>

									<div className='text-xs text-gray-400'>20 April 2020</div> <div className=' italic text-xs text-gray-400'>Business Account</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className=" flex-grow">
					<div className="flex justify-between px-3 pb-3">
						<h4 className="text-xl">Active Shipment</h4>
						<span>
							{activeShipment.length > 1 && (
								<button className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-lg">
									View all ...
								</button>
							)}
						</span>{' '}
					</div>
					<hr />
					<div className="mt-3">
						<div className="w-full flex items-center">
							{activeShipment.length > 0 ? (
								<div className="flex flex-col w-full space-y-4">
									{activeShipment.slice(0, 5).map((val, index) => (
										<div
											key={index}
											className="flex flex-col w-full p-3  bg-blue-50 rounded-lg shadow-md "
										>
											<div className="flex text-gray-500 text-sm">
												<h4>Shipment ID:</h4>
												<h4 className="font-bold ">KH921B</h4>
											</div>
											<div className="flex justify-between items-center mt-2">
												<div className="felx flex-col">
													<div className="font-bold">Title: {val.shipment_title}</div>
													<div className="flex flex-col text-xs">
														<div>
															Order Date: <span>{val.approval_date}</span>
														</div>
														<div>
															Delevery Date: <span>{val.delevery_date}</span>
														</div>
													</div>
												</div>
												<div>
													<label className="text-blue-700 bg-blue-100 rounded-md py-1 px-3 text-sm font-bold">
														{val.status}
													</label>
												</div>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="h-screen-40 flex-col flex  space-y-2">
									<div className="text-2xl text-red-300">No active shipment</div>
									<Link to="/shipment">
										{' '}
										<button className="px-3 py-1 bg-slate-100 rounded-xl shadow-md text-slate-400">
											Create Shipment
										</button>
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default home;
