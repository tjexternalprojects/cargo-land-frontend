import React, { useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { AppContext, AppContextType } from '@/context';
import {
	CiSettings,
	logo,
	MdTrackChanges,
	RiPriceTag2Line,
	TbLayoutDashboard,
	BiUserPin,
	TbLogout,
	TbTruckDelivery,
	userImg,
	GoPackage,
	GrTransaction,
} from '@/assets';

function useSidebar() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const user_info = localStorage.getItem('user_info');
	const userInfo = user_info ? JSON.parse(user_info) : null;
	const handleToggleSidebar = () => {
		setState((prevState) => ({
			...prevState,
			toggleAdminSideBar: !state.toggleAdminSideBar,
		}));
	};
	const location = useLocation();
	const navigationLinks = [
		{
			route_to: '/admin',
			name: 'Dashboard',
			icon: TbLayoutDashboard,
		},
		{
			route_to: '/admin/shipment/' + useParams().current_page,
			name: 'Shipment',
			icon: GoPackage,
		},
		{
			route_to: '/admin/users/' + useParams().current_page,
			name: 'Users',
			icon: BiUserPin,
		},
		{
			route_to: '/admin/track_shipment/' + useParams().shipment_id,
			name: 'Track Shipment',
			icon: TbTruckDelivery,
		},
		{
			route_to: '/admin/transactions',
			name: 'Transactions',
			icon: GrTransaction,
		}
	];
	return { userInfo, state, navigationLinks, location, handleToggleSidebar };
}
export default useSidebar;
