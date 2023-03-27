import React, { useState } from 'react';

function SettingsContext() {
	const notifications = [] as any;
	const toggleNotification = false;
	const theme = 'light';
	const toggleAdminSideBar = false;
	const openSignUpMenu = false
	return {
		notifications,
		toggleNotification,
		theme,
		toggleAdminSideBar,
		openSignUpMenu,
	};
}

export default SettingsContext;
