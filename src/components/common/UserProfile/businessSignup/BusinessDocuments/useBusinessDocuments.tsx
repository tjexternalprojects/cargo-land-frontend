import { AppContextType, AppContext } from '@/context';
import { useContext, useEffect, useState } from 'react';

function useBusinessDocument(setActiveTab: (tab: string) => void) {
	const [businessDocument, setBusinessDocument] = useState<any>([]);
	const { state, setState } = useContext<AppContextType>(AppContext);


	const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
		  setBusinessDocument((prevData: any) => [...prevData, ...files]);
		}
	  
		console.log(businessDocument);
	  
		setState((prevData: any) => {
		  const updatedDocuments = prevData.business_account?.documents
			? [...prevData.business_account.documents, ...businessDocument]
			: [...businessDocument];
	  
		  return {
			...state,
			business_account: {
			  ...state.business_account,
			  documents: updatedDocuments,
			},
		  };
		});
	  };

	  const handleRemoveDocument=(index:number)=>{
		const updatedBusinessDocument = [...businessDocument];
		updatedBusinessDocument.splice(index, 1);
		setBusinessDocument(updatedBusinessDocument);
	  }

	  const handleSubmitForm=()=>{
		
	  }
	  
	return { handleDocumentUpload, handleSubmitForm,handleRemoveDocument, state, businessDocument };
}
export default useBusinessDocument;
