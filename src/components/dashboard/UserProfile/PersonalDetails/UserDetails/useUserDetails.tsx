import { LocalStorageServices, UserServices } from "@/services";
import { useState } from "react";
import { toast } from "react-toastify";

function useUserDetails(){
	const userInfo = LocalStorageServices.getUserInfo();
    const [showLoader, setShowLoader]= useState(false)
    const [updateUserDetails, setUpdateUserDetails]= useState(userInfo)
    const [editInfo, setEditInfo]= useState(false)
    const handleUpdateUser= async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setShowLoader(true)
       const user_data ={
        name: updateUserDetails.name,
        address:updateUserDetails.address,
        phoneNumber:updateUserDetails.phoneNumber
       }
      await  UserServices.updateUser(user_data).then(response=>{
            console.log(response)
            setShowLoader(false)
        },

        error=>{
            setShowLoader(false)
            console.log(error)
            toast.error('An error occured, please try again', {
				progressClassName: 'bg-red-500 h-1',
				autoClose: 3000,
			});
        }
        )
    }

    return { editInfo, updateUserDetails, showLoader, setUpdateUserDetails, handleUpdateUser, setEditInfo}
}

export default useUserDetails