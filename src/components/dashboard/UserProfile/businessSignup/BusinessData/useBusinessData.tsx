import { useState } from "react";

function useBusinessData(){
  const [businessData, setBusinessData] = useState({
    business_name:'',
    business_number:'',
    business_email:'',
    phone_number:'',
    office_address:''
  })
    const handleSubmitBusinessData = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

    };
    return { handleSubmitBusinessData, setBusinessData, businessData };
}

export default useBusinessData