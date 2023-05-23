import React from 'react';
import { BsCheckLg } from '@/assets';
import useVerifyPayment from './useVerifyPayment';
import { RingLoader } from '@/components';
import { Link } from 'react-router-dom';
const index = () => {
	const { verify_payload, paymentStatus, loading } = useVerifyPayment();
	return (
		<>
			<div className=" min-h-screen flex items-center justify-center">
				<div className="bg-white rounded-md  p-8 max-w-md w-full flex flex-col items-center justify-center animate__animated animate__bounceIn ">
					{loading ? (
						<RingLoader size={300} textColor="text-blue-900" />
					) : (
						<>
							<div className="flex items-center justify-center mb-8">
								<BsCheckLg className="text-green-700 text-7xl" />
							</div>
							<h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
								Payment Successful
							</h1>
							<p className="text-lg text-gray-700 text-center mb-8">
								Thank you for your payment! Your transaction has been processed successfully. <hr />
								<br />
								<span className="font-bold text-red-500 uppercase">{paymentStatus}</span>
							</p>
							<div className="bg-gray-200 rounded-md p-4 mb-8">
								<h3 className="text-lg font-medium text-gray-800 mb-4">Transaction details:</h3>
								<ul className="text-base text-gray-700">
									<li className="mb-2">
										<span className="font-medium">Status:</span> {verify_payload.status}
									</li>
									<li className="mb-2">
										<span className="font-medium">Transaction Reference:</span>{' '}
										{verify_payload.txRef}
									</li>
									<li className="mb-2">
										<span className="font-medium">Transaction ID:</span>{' '}
										{verify_payload.transactionId}
									</li>
								</ul>
							</div>
							<Link
								to="/dashboard/shipment"
								className="hover:shadow-md  shadow-gray-50 shadow-sm w-full p-2 rounded-sm text-center  bg-blue-700 font-bold text-white text-md"
							>
								Continue
							</Link>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default index;
