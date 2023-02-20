import React from 'react';
import { HiDocumentText } from '../../assets';
const BusinessDocuments = () => {
	return (
		<form className=" text-gray-500 flex flex-col space-y-4">
			<div className="flex flex-col">
				<small>
					<i className="text-red-400">Upload your business CAC or TIN Document</i>
				</small>
				<div className="mt-3 bg-white rounded-xl px-5  flex items-center shadow-md">
					<input
						type="file"
						placeholder="CAC Document"
						className="text-sm rounded-xl flex-grow h-11 outline-none bg-transparent"
						required
					/>
					<HiDocumentText />
				</div>
			</div>
		</form>
	);
};

export default BusinessDocuments;
