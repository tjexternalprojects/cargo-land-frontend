import React, { useState } from 'react';

function SettingsContext() {
	const notifications = [] as any;
	const toggleNotification = false
	const theme = 'light';
	const toggleAdminSideBar = false;
	return {
		notifications,
		toggleNotification,
		theme,
		toggleAdminSideBar,
	};
}

export default SettingsContext;
