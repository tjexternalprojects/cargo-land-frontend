import { useState } from 'react';

function useBusinessDocument() {
	const [businessDocument, setBusinessDocument] = useState<any>([]);
	const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
		setBusinessDocument((prevData: any) => [...prevData, files]);
			
		}
		// console.log(businessDocument[0]);
	};
	return { handleDocumentUpload, businessDocument };
}
export default useBusinessDocument;
