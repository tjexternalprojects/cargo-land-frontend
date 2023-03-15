import React, { useState } from 'react';

function AuthContext() {
	const user = { loggedIn: localStorage.getItem('login_token') };

	return {
		user,
	};
}

export default AuthContext;
