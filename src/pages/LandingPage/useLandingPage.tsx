import React, { useState, useContext } from 'react';
import { AppContext, AppContextType } from '@/context';
import {  useNavigate } from 'react-router-dom';

function useLandingPage() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const navigate = useNavigate();
	const handleGetStarted = ()=>{
		if(state.user.loggedIn){
			navigate('/dashaboard')
		}else{
			navigate('/login')
		}
	}
	return {handleGetStarted};
}

export default useLandingPage;
