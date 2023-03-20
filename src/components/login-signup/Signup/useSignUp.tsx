import { useState, useEffect } from 'react';
const GOOGLE_SIGNUP_CLIENT_ID = import.meta.env.VITE_REACT_APP_GOOGLE_LOGIN_CLIENT_ID;
import { gapi } from 'gapi-script';
function useSignUp() {
	const [showPassword, setShowPassword] = useState(false);
	const handleSingupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const googleSignUpSuccess = (response: any) => {
		console.log('Successfully signed up with Google!', response);
		// Send the user's info to your backend for authentication and account creation
	};

	const googleSignUpFailure = (response: any) => {
		console.log('Failed to sign up with Google.', response);
	};

	// useEffect(() => {
	// 	function start() {
	// 		gapi.client.init({
	// 			client_id: GOOGLE_SIGNUP_CLIENT_ID,
	// 			scope: 'https://www.googleapis.com/auth/calendar',
	// 		});
	// 	}
	// 	gapi.load('client:auth2', start);
	// });
	return {
		showPassword,
		GOOGLE_SIGNUP_CLIENT_ID,
		setShowPassword,
		handleSingupSubmit,
		googleSignUpSuccess,
		googleSignUpFailure,
	};
}
export default useSignUp;
