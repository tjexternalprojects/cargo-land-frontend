import { AppContext, AppContextType } from "@/context";
import { useContext, useState } from "react"

function useResendVerification(){
    const [token, setToken] = useState("")
	const [showLoading, setShowLoading] = useState(false);
    const { state } = useContext<AppContextType>(AppContext);

    const resendToken=()=>{}
    return{resendToken, setToken, state, showLoading}
}

export default useResendVerification