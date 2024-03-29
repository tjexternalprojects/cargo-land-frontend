import React, { useState } from 'react';

function SettingsContext() {
	const notifications = [] as any;
	const toggleNotification = false;
	const theme = 'light';
	const toggleAdminSideBar = false;
	const openSignUpMenu = false;
	const showForgetPassword = false;
	const showResendToken = false;
	const resendTokenMessage = '';
	const activePage = '';
	return {
		notifications,
		toggleNotification,
		theme,
		toggleAdminSideBar,
		openSignUpMenu,
		showForgetPassword,
		showResendToken,
		resendTokenMessage,
		activePage,
	};
}

export default SettingsContext;
