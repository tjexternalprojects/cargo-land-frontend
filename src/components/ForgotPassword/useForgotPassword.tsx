import React, { useState, useContext } from 'react';
import { AppContext, AppContextType } from '@/context';
function useForgotPassword(){
    const { state, setState } = useContext<AppContextType>(AppContext);
    const closeForgotPassword = () =>{
		setState({
			...state,
			showForgetPassword: false,
		});
	}
    return {closeForgotPassword}
}
export default useForgotPassword