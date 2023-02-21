import React, { useState } from 'react';

function AuthContext() {
	const user = { loggedIn: true };

	return {
		user,
	};
}

export default AuthContext;
