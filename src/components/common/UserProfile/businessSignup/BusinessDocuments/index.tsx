import React from 'react';
import { AiOutlineClose, HiDocumentText } from '@/assets';
import useBusinessDocument from './useBusinessDocuments';

interface MyComponentProps {
	setActiveTab: (tab: string) => void;
}
const BusinessDocuments = ({ setActiveTab }: MyComponentProps) => {
	const { handleDocumentUpload, handleRemoveDocument, handleSubmitForm, businessDocument } = useBusinessDocument(setActiveTab);
	return (
		<form className=" text-gray-500 ">
			<div className="flex flex-col mb-10">
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
				<div className='mt-3 md:mx-10'>

				{businessDocument.map((docs: any, index: number) => (
					<div className='flex items-center gap-3 border-l-2 border-l-blue-800 pl-2 justify-between'>
						<div key={index}>{docs.name.length >20?docs.name.split(0, 20)+'...': docs.name}</div>
						<AiOutlineClose className='text-red-500 cursor-pointer' onClick={()=>handleRemoveDocument(index)}/>
					</div>
					))}
					</div>
			</div>

				<button
				onClick={handleSubmitForm}
					className="hover:shadow-md  shadow-gray-50 shadow-sm  py-2 px-5 rounded-sm  bg-blue-900 font-bold text-white text-md"
					type="button"
				>
					Submit
				</button>
		</form>
	);
};

export default BusinessDocuments;
