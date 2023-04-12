import { useState } from "react"

function useResetPassword(){
    const [resetPassword, setResetPassword] = useState({
        new_password:'',
        confirm_password:'',
        token:''
    })
    const handleRestPassword=()=>{}
    return {handleRestPassword, setResetPassword, resetPassword}
}
export default useResetPassword