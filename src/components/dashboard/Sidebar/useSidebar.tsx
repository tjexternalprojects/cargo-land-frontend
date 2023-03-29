import React, { useState, useContext } from 'react';
import { AppContext, AppContextType } from '@/context';
function useSidebar() {
	const { state } = useContext<AppContextType>(AppContext);
	const user_info = localStorage.getItem('user_info');
	const userInfo = user_info ? JSON.parse(user_info) : null;
	return { userInfo, state };
}
export default useSidebar;
