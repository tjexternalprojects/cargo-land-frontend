import { useState } from 'react';
import { AuthServices } from '@/services';
import { useParams } from 'react-router-dom';

function useResetPassword() {
	const {token} = useParams()
	const [errorMessage, setErrorMessage] = useState("")
	const [showLoading, setShowLoading] = useState(false);
	const [resetPassword, setResetPassword] = useState({
		new_password: '',
		confirm_password: '',
		token: token,
	});
	const handleRestPassword = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if(resetPassword.new_password !== resetPassword.confirm_password){
			setErrorMessage("password does not match")
			return
		}
		setShowLoading(true)
		AuthServices.resetPassword(resetPassword).then((response)=>{
			setShowLoading(false)
		},
		(error)=>{
			setShowLoading(false)

		}
		)
	};
	return { handleRestPassword, setResetPassword,  setErrorMessage, errorMessage, showLoading, resetPassword };
}
export default useResetPassword;
