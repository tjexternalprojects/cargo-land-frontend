import React, { useMemo, useState } from 'react';

import useUsers from './useUsers';
import { AUserDetailsModal, Pagination, RingLoader } from '@/components';

const Users = () => {
	const { allUser, result, loading, currentPage, hasNextPage, hasPreviousPage, setCurrentPage } =
		useUsers();
	return (
		<div>
			<div className="relative overflow-auto mt-5  w-full">
				{loading ? (
					<div className="w-full flex items-center justify-center">
						<RingLoader size={200} textColor="text-blue-900" />
					</div>
				) : (
					<table className="w-full  text-sm text-left text-gray-500">
						<thead className="text-xs text-gray-700 uppercase bg-gray-100">
							<tr>
								<th scope="col" className="px-6 py-3">
									Avatar
								</th>
								<th scope="col" className="px-6 py-3">
									Full Name
								</th>
								<th scope="col" className="px-6 py-3">
									Email
								</th>
								<th scope="col" className="px-6 py-3">
									Phone Number
								</th>
								<th scope="col" className="px-6 py-3">
									Account Type
								</th>
								<th scope="col" className="px-6 py-3">
									Account Status
								</th>
							</tr>
						</thead>
						<tbody>
							{allUser.map((val, index) => (
								<tr
									key={index}
									className="bg-white border-b cursor-pointer w-full hover:bg-red-100"
								>
									<td className=" px-6  font-medium text-gray-900 whitespace-nowrap">
										<div className="rounded-full h-10 w-10">
											<img
												src={val.avatar as string}
												className=" object-cover h-full w-full rounded-full "
											/>
										</div>
									</td>
									<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
										{val.name}
									</td>
									<td className="px-6 py-4">{val.email}</td>
									<td className="px-6 py-4">{val.phoneNumber}</td>
									<td className="px-6 py-4">{val.account_type}</td>
									<td className="px-6 py-4">{val.isVerified ? 'Verified' : 'Not Verified'}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
			{!loading && (
				<Pagination
					setCurrentPage={setCurrentPage}
					currentPage={Number(currentPage)}
					hasNextPage={hasNextPage}
					hasPreviousPage={hasPreviousPage}
					loading={loading}
				/>
			)}

			{/* <AUserDetailsModal /> */}
		</div>
	);
};

export default Users;
