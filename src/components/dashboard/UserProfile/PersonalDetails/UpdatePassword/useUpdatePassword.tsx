import { useState } from "react";

function useUpdatePassword(){
	const [showPassword, setShowPassword] = useState(false);
    
    return {showPassword, setShowPassword}
}

export default useUpdatePassword