import { AppContextType, AppContext } from "@/context";
import { useContext, useState } from "react";

function useBusinessData(){
	const { state, setState } = useContext<AppContextType>(AppContext);

  const [businessData, setBusinessData] = useState({
    business_name:'',
    business_number:'',
    business_email:'',
    phone_number:'',
    office_address:''
  })
    const handleSubmitBusinessData = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
    setState({
      ...state,
      business_account:businessData
    })
  }
    return { handleSubmitBusinessData, setBusinessData, businessData };
}

export default useBusinessData