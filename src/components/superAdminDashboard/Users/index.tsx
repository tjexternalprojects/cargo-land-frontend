import React, { useMemo, useState } from 'react';

import useUsers from './useUsers';
import { AUserDetailsModal } from '@/components';

const Users = () => {
	const { users, state } = useUsers();
	return (
		<div>
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-500">
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
						{state.all_users.map((val, index) => (
							<tr className="bg-white border-b cursor-pointer hover:bg-red-100">
								<th scope="row" className=" px-6  font-medium text-gray-900 whitespace-nowrap">
									<div className="rounded-full h-10 w-10">
										<img src={val.avatar} className=" object-cover h-full w-full rounded-full " />
									</div>
								</th>
								<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
									{val.name}
								</th>
								<td className="px-6 py-4">{val.email}</td>
								<td className="px-6 py-4">{val.phoneNumber}</td>
								<td className="px-6 py-4">{val.account_type}</td>
								<td className="px-6 py-4">{val.account_status}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* PAGINATION */}

			<nav aria-label="Page navigation" className="flex justify-center items-center mt-10">
				<ul className="inline-flex items-center -space-x-px">
					<li>
						<a
							href="#"
							className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
						>
							<span className="sr-only">Previous</span>
							<svg
								aria-hidden="true"
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
									clip-rule="evenodd"
								></path>
							</svg>
						</a>
					</li>
					<li>
						<a
							href="#"
							className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
						>
							1
						</a>
					</li>
					<li>
						<a
							href="#"
							className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
						>
							2
						</a>
					</li>
					<li>
						<a
							href="#"
							aria-current="page"
							className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
						>
							3
						</a>
					</li>
					<li>
						<a
							href="#"
							className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							4
						</a>
					</li>
					<li>
						<a
							href="#"
							className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							5
						</a>
					</li>
					<li>
						<a
							href="#"
							className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
						>
							<span className="sr-only">Next</span>
							<svg
								aria-hidden="true"
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clip-rule="evenodd"
								></path>
							</svg>
						</a>
					</li>
				</ul>
			</nav>
			<AUserDetailsModal />
		</div>
	);
};

export default Users;
