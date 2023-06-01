import React from 'react';
import { LineGraph, MapDirection, RingLoader } from '@/components';
import { BsArrowDownRight, BsArrowUpRight, FaEye, FaEyeSlash, SlGraph, userImg } from '@/assets';
import useHome from './useHome';
import { Link } from 'react-router-dom';
const home = () => {
	const {
		received_data,
		sent_data,
		balance,
		currency,
		shipmentLoading,
		userLoading,
		allUsers,
		totalUsers,
		allShipmentLoading,
		transactionHistory,
		allShipment,
		handleViewOnMap,
		toggleShowBalance,
		state,
		showBalance,
		transaction_history,
		transitShipment,
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
							{currency}
							{!showBalance ? '*********' : balance}
						</div>
					</div>
				</div>

				<div className=" inline-flex rounded-md gap-3 p-4  bg-green-50  flex-grow  justify-between  shadow-md items-center">
					<div className=" w-20">{/* <LineGraph data={received_data} /> */}</div>
					<div className="flex flex-col items-end text-green-500">
						<div>Total Users</div>
						{userLoading ? (
							<RingLoader size={50} textColor="text-blue-900" />
						) : (
							<div className=" text-5xl font-thin">{totalUsers}</div>
						)}
					</div>
				</div>
						<Link to="/admin/shipment/1">
				<div className=" inline-flex rounded-md gap-3 p-4  flex-grow  justify-between bg-slate-50 shadow-md items-center">
					<div className=" w-20">{/* <LineGraph data={sent_data} /> */}</div>
					<div className="flex flex-col items-end text-red-500">
						<div>All Shipment</div>
						{allShipmentLoading ? (
							<RingLoader size={50} textColor="text-blue-900" />
						) : (
							<div className=" text-5xl font-thin ">{allShipment.length}</div>
						)}
					</div>
				</div>
				</Link>
			</div>

			{/* Bottom */}
			<div className=" flex  gap-3  justify-between  flex-wrap md:flex-nowrap">
				{/* <div className="">
					<h4 className="text-xl mb-3">Latest Transaction</h4>
					<hr />
					<div className=" space-y-3 mt-3">
						{transactionHistory.slice(0,15).map((val:Record<string, string|number>, index:number) => (
							<div
								key={index}
								className="flex items-center space-x-3 bg-slate-50 p-2 rounded-md cursor-pointer hover:bg-blue-50 hover:shadow-sm transition-all duration-75 ease-in-out"
							>
								

								<div>
									<div className=" font-bold text-slate-600">{val.title}</div>
									<div className="text-sm text-slate-400">
										{val.shipmentID
											? 'Payment for shipment '
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
				</div> */}
				<div className="">
					<h4 className="text-xl mb-3">Recent User</h4>
					<hr />
					{userLoading ? (
						<div className="w-full flex items-center justify-center">
							<RingLoader size={50} textColor="text-blue-900" />
						</div>
					) : (
						<>
							{allUsers.length > 0 ? (
								<div className=" space-y-3 mt-3">
									{allUsers.map((val, index) => (
										<div
											key={index}
											className="flex items-center space-x-3 bg-slate-50 p-2 rounded-lg cursor-pointer hover:bg-blue-50 hover:shadow-sm transition-all duration-75 ease-in-out "
										>
											<div className="w-10 h-10 rounded-full shadow-md border border-slate-200">
												<img
													src={val.avatar as string}
													className="w-full h-full object-contain rounded-full"
												/>
											</div>
											<div className="flex flex-col">
												<div className=" font-bold text-slate-600">
													<span>{val.name as string}</span>
												</div>
												<div>
													<div className="text-xs text-gray-400">
														<span className="font-bold">Time Joined:</span>{' '}
														{new Date(val.date as Date).toLocaleString()}
													</div>{' '}
													<div className=" italic text-xs text-gray-400">
														<span className="font-bold">Account Status</span>{' '}
														{val.isVerified ? 'Verified' : 'Not Verfied'}
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="h-screen-40 text-2xl text-red-300 flex-col w-full flex items-center justify-center space-y-2">
									No User Found
								</div>
							)}
						</>
					)}
				</div>

				<div className=" flex-grow">
					<div className="flex justify-between px-3 pb-3">
						<h4 className="text-xl">Shipment on Transit</h4>
						<span>
							{transitShipment.length > 1 && (
								<Link to="/admin/shipment/1">
									<button className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-lg">
										View all ...
									</button>
								</Link>
							)}
						</span>
					</div>
					<hr />
					<div className="mt-3">
						<div className="w-full flex items-center">
							{shipmentLoading ? (
								<div className="w-full  flex items-center justify-center">
									<RingLoader size={50} textColor="text-blue-900" />
								</div>
							) : (
								<>
									{transitShipment.length > 0 ? (
										<div className="flex flex-col w-full space-y-4">
											{transitShipment.slice(0, 5).map((val: any, index: number) => (
												<div
													key={index}
													className="flex cursor-pointer flex-col w-full p-3  bg-blue-50 rounded-lg shadow-md "
													onClick={() => handleViewOnMap(val.id)}
												>
													<div className="flex text-gray-500 text-sm">
														<h4>Shipment ID:</h4>
														<h4 className="font-bold ">{val.id}</h4>
													</div>
													<div className="flex justify-between items-center mt-2">
														<div className="flex flex-col">
															<div className="font-bold">Title: {val.shipment_title}</div>
															<div className="flex flex-col text-xs">
																<div>
																	Date Created:{' '}
																	<span>{new Date(val.createdAt).toLocaleString()}</span>
																</div>
																<div>
																	Delivery Date: <span>In View</span>
																</div>
															</div>
														</div>
														<div>
															<label className="text-blue-700 bg-blue-100 rounded-md py-1 px-3 text-sm font-bold">
																{val.shipment_Status}
															</label>
														</div>
													</div>
												</div>
											))}
										</div>
									) : (
										<div className="h-screen-40 flex-col flex  space-y-2">
											<div className="text-2xl text-red-300">No shipment on Transit</div>
										</div>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default home;
