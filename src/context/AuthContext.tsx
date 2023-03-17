import React, { useState } from 'react';

function AuthContext() {
	const user = { loggedIn: localStorage.getItem('login_token'), user_info:  localStorage.getItem('user_info') || ''};
	// const userInfo = JSON.parse(localStorage.getItem('user_info'));
	return {
		user,
	};
}

export default AuthContext;
