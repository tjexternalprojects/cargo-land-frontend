import React, { useState, useContext, useEffect } from 'react';
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
	const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null);
	const location = useLocation();
	const [activeRoute, setActiveRoute] = useState(location.pathname);
	const [activeSubRoute, setActiveSubRoute] = useState('');

	const handleToggleSidebar = (activePage: string, sub_val: boolean = false) => {
		setActiveRoute(activePage);
		sub_val == true && setActiveSubRoute(activePage);
		setState((prevState) => ({
			...prevState,
			toggleAdminSideBar: !state.toggleAdminSideBar,
		}));
	};

	const handleToggleSubMenu = (index: number) => {
		setActiveSubMenu(index === activeSubMenu ? null : index);
	};
	const navigationLinks = [
		{
			route_to: '/admin',
			name: 'Dashboard',
			icon: TbLayoutDashboard,
		},
		{
			name: 'Shipment',
			icon: GoPackage,
			sub_menu: [
				{
					route_to: '/admin/shipment/' + useParams().current_page,
					name: 'All Shipment',
				},
				{
					route_to: '/admin/shipment/update/' + useParams().shipment_id,
					name: 'Update Shipment',
				},
			],
		},
		{
			route_to: '/admin/users/' + useParams().current_page,
			name: 'Users',
			icon: BiUserPin,
		},
		// {
		// 	route_to: '/admin/transactions',
		// 	name: 'Transactions',
		// 	icon: GrTransaction,
		// },
	];

	const isRouteActive = (route: string): boolean => {
		return useLocation().pathname.startsWith(route);
	};

	// useEffect(() => {
	// 	const matchedLink = navigationLinks.find((link) => link?.sub_menu?.route_to === activeRoute);
	// 	if (matchedLink) {
	// 		setNewRoute(matchedLink.route_to as string);
	// 	}
	// }, [newRoute]);

	return {
		userInfo,
		state,
		navigationLinks,
		location,
		activeSubMenu,
		activeSubRoute,
		activeRoute,
		isRouteActive,
		handleToggleSidebar,
		handleToggleSubMenu,
	};
}
export default useSidebar;
