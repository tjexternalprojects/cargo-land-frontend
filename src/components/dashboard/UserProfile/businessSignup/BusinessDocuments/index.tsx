import React from 'react';
import { HiDocumentText } from '@/assets';
import useBusinessDocument from './useBusinessDocuments';
const BusinessDocuments = () => {
	const { handleDocumentUpload, businessDocument } = useBusinessDocument();
	return (
		<form className=" text-gray-500 ">
			<div className="flex flex-col">
				<small>
					<i className="text-red-400">Upload your business CAC or TIN Document</i>
				</small>

				<div className="mt-3  h-10  bg-blue-700 text-white shadow inline-flex items-center pl-5 overflow-hidden">
					<label className="  h-20 flex items-center justify-between space-x-3 w-full cursor-pointer">
						<span className="text-sm md:text-md">Upload business document</span>
						<div className="w-20 h-20  rounded-l-full bg-blue-900  flex items-center justify-center">
							<HiDocumentText className="text-3xl text-white" />
							<input
								id="fileInput"
								type="file"
								className="hidden"
								accept="application/pdf image/*"
								onChange={handleDocumentUpload}
							/>
						</div>
					</label>
				</div>

				{businessDocument.map((docs: any, index: number) => (
					<div key={index}>{docs.name}</div>
				))}
			</div>
		</form>
	);
};

export default BusinessDocuments;
