import React, { useState, useContext } from 'react';
import { AppContext, AppContextType } from '@/context';
import { AuthServices } from '@/services'
import { toast } from "react-toastify";

function useForgotPassword() {
	const {forgotPassword} = AuthServices()
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [email, setEmail] = useState('')
	const [showLoading, setShowLoading] = useState(false)
	const closeForgotPassword = () => {
		setState({
			...state,
			showForgetPassword: false,
		});
	}



	const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setShowLoading(true);
		forgotPassword(email).then(
			(response) => {
				setShowLoading(false);
				if (response.status === 200) {
					toast.success(response.data.message, {
						progressClassName: "bg-green-500 h-1",
						autoClose: 3000,
					});
					setState({
						...state,
						showForgetPassword: false,
					});
				} else {
					toast.error("Oops! an Error occured, please retry", {
						progressClassName: "bg-red-500 h-1",
						autoClose: 3000,
					});
				}
			},
			(error) => {
				setShowLoading(false);
				if (error.code == "ERR_NETWORK") {
					toast.error(error.message, {
						progressClassName: "bg-red-500 h-1",
						autoClose: 3000,
					});
				} else if (error.response.data.Error) {
					toast.error(error.response.data.Error, {
						progressClassName: "bg-red-500 h-1",
						autoClose: 3000,
					});

				} else {
					toast.error(error.response.data.message, {
						progressClassName: "bg-red-500 h-1",
						autoClose: 3000,
					});
				}
			}

		);
	};

	return { closeForgotPassword, handleForgotPassword, setEmail, showLoading, email }
}
export default useForgotPassword