import React, { useState, useContext } from 'react';
import { AppContext, AppContextType } from '@/context';
function useSidebar() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const user_info = localStorage.getItem('user_info');
	const userInfo = user_info ? JSON.parse(user_info) : null;
	const handleToggleSidebar = () =>{
		setState((prevState) => ({
			...prevState,
			toggleAdminSideBar: !state.toggleAdminSideBar,
		}))
	}

	return { userInfo, state, handleToggleSidebar };
}
export default useSidebar;
