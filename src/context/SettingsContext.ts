import React, { useState } from 'react';

function SettingsContext() {
	const notifications = [] as any;
	const theme = 'light';
	const toggleAdminSideBar = false;
	return {
		notifications,
		theme,
		toggleAdminSideBar,
	};
}

export default SettingsContext;
