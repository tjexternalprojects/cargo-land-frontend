import React, { useState, useContext } from 'react';
import { AppContext, AppContextType } from '@/context';
import { LocalStorageServices } from '@/services';
function useSidebar() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const userInfo = LocalStorageServices.getUserInfo();
	const handleToggleSidebar = () => {
		setState((prevState) => ({
			...prevState,
			toggleAdminSideBar: !state.toggleAdminSideBar,
		}));
	};

	return { userInfo, state, handleToggleSidebar };
}
export default useSidebar;
