import React from 'react'

const index = () => {
      const data = [
				{ id: 1, name: 'John Doe', email: 'john@example.com' },
				{ id: 2, name: 'Jane Smith', email: 'jane@example.com' },
				// Add more data objects as needed
			];
  return (
		<div className="overflow-x-auto">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						{Object.keys(data[0]).map((key) => (
							<th
								key={key}
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								{key}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{data.map((item, index) => (
						<tr key={index}>
							{Object.values(item).map((value, index) => (
								<td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{value}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default index