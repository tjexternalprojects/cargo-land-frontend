import React, { useEffect } from 'react';
import { LineGraph, MapDirection, RingLoader } from '@/components';
import { BsArrowDownRight, BsArrowUpRight, FaEye, FaEyeSlash, SlGraph } from '@/assets';
import useHome from './useHome';
import { Link } from 'react-router-dom';
import { useUAllShipment } from '@/customHooks';
import { LocalStorageServices } from '@/services';
const home = () => {
	
	const {
		successful_shipment_graph,
		successfulShipmentLoader,
		showBalance,
		currency,
		transaction_history,
		state,
		balance,
		toggleShowBalance,
	} = useHome();
	return (
		<div className="mt-10 space-y-10   w-full">
			{/* Top */}
			<div className="gap-4 flex justify-between flex-wrap md:flex-nowrap  w-full">
				<div className=" inline-flex rounded-md gap-3 p-4 min-w-min w-72 flex-grow   justify-between bg-slate-50 shadow-md items-center">
					<div className=" w-20">
						<SlGraph className="text-5xl text-blue-700" />
					</div>
					<div className="flex flex-col md:items-end text-blue-500">
						<div className="flex items-center justify-center space-x-2">
							<div>Wallet Balance</div>
							<div onClick={toggleShowBalance} className="cursor-pointer">
								{showBalance ? <FaEyeSlash /> : <FaEye />}
							</div>
						</div>
						<div className="text-md md:text-2xl font-bold flex">
							{currency}
							{!showBalance ? '*********' : balance}
						</div>
					</div>
				</div>
				<div className=" inline-flex rounded-md px-6 py-2 min-w-min bg-green-50  flex-grow w-72 justify-between  shadow-md items-center">
					<div className="w-full relative">
						<div className="text-green-500 mb-1">Shipment Delivered</div>
						<div className=" h-28 w-full">
							<LineGraph
								labels={successful_shipment_graph.labels}
								datasets={successful_shipment_graph.datasets}
							/>
						</div>
						{successfulShipmentLoader && (
							<div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
								<RingLoader size={50} textColor="text-blue-900" />
							</div>
						)}
					</div>
					<div className=" text-green-500">
						<div className=" text-5xl font-thin">0</div>
					</div>
				</div>

				<div className=" inline-flex rounded-md px-6 py-2 min-w-min flex-grow  w-72 justify-between bg-slate-50 shadow-md items-center">
					<div className="w-full relative">
						<div className="text-red-500  mb-1">Shipment Created</div>
						<div className=" h-28  w-full ">
							<LineGraph
								labels={successful_shipment_graph.labels}
								datasets={successful_shipment_graph.datasets}
							/>
						</div>
						{successfulShipmentLoader && (
							<div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
								<RingLoader size={50} textColor="text-blue-900" />
							</div>
						)}
					</div>
					<div className=" text-red-500">
						<div className=" text-5xl font-thin ">0</div>
					</div>
				</div>
			</div>

			{/* Bottom */}
			<div className=" flex  gap-16  justify-between  flex-wrap md:flex-nowrap">
				<div className=" flex-grow">
					<div className="flex justify-between items-center">
						<h4 className="text-xl mb-3">Latest Transaction</h4>
						{transaction_history.length == 0 && (
							<button className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-lg mb-3">
								View all ...
							</button>
						)}
					</div>
					<hr />
					{transaction_history.length == 0 ? (
						<>
							{' '}
							<div className=" space-y-3 mt-3">
								{transaction_history.map((val, index) => (
									<div
										key={index}
										className="flex items-center space-x-3 bg-slate-50 p-2 rounded-lg cursor-pointer hover:bg-blue-50 hover:shadow-sm transition-all duration-75 ease-in-out"
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
												{val.description.length > 40
													? val.description.slice(0, 40) + ' ...'
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
						</>
					) : (
						<div className="h-screen-40 text-2xl text-red-300 flex-col w-full flex items-center justify-center space-y-2">
							No Data found
						</div>
					)}
				</div>
				<div className=" flex-grow">
					<div className="flex justify-between px-3 pb-3">
						<h4 className="text-xl">Active Shipment</h4>
						<span>
							{state.allShipments.length > 0 && (
								<button className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-lg">
									View all ...
								</button>
							)}
						</span>{' '}
					</div>
					<hr />
					<div className="mt-3">
						<div className="w-full flex items-center">
							{state.allShipments.length > 0 ? (
								<div className="flex flex-col w-full space-y-8">
									{state.allShipments.slice(0, 1).map((val: any, index: number) => (
										<div key={index}>
											<div className="flex flex-col w-full p-3  bg-blue-50 rounded-lg shadow-md ">
												<div className="flex text-gray-500 text-sm">
													<h4>Shipment ID:</h4>
													<h4 className="font-bold ">{val.id}</h4>
												</div>
												<div className="flex justify-between items-center mt-2">
													<div className="felx flex-col">
														<div className="font-bold">Title: {val.shipment_title}</div>
														<div className="flex flex-col text-xs">
															<div>
																Order Date: <span>{new Date(val.createdAt).toLocaleString()}</span>
															</div>
															<div>
																Delevery Date:
																<span> In View</span>
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

											<MapDirection
												height="30vh"
												startLocation={{
													lng: parseFloat(val.current_location.longitude),
													lat: parseFloat(val.current_location.latitude),
												}}
												endLocation={{
													lng: parseFloat(val.shipment_destination.longitude),
													lat: parseFloat(val.shipment_destination.latitude),
												}}
											/>
										</div>
									))}
								</div>
							) : (
								<div className="h-screen-40 flex-col w-full flex items-center justify-center space-y-2">
									<div className="text-2xl text-red-300">No active shipment</div>
									<Link to="/dashboard/shipment">
										{' '}
										<button className=" cursor-pointer hover:shadow-xl hover:shadow-blue-100 shadow-md w-full p-2 rounded-md   bg-blue-700 font-bold text-white text-md">
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
