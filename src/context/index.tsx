import React, { createContext, useContext, useState, ReactNode } from 'react';
import AuthContext from './auth.context';
import SettingsContext from './settings.context';
import ShipmentContext from './shipment.context';
import UserContext from './user.context';

const { user } = AuthContext();
const {user_data} = UserContext();
const { toggleNotification, notifications, theme, toggleAdminSideBar, openSignUpMenu, showForgetPassword, showResendToken, resendTokenMessage } = SettingsContext();
const { shipmentDetails, shipmentCurrentTab, form_level } = ShipmentContext();

// Define the global state object

type AppState = {
	user: Record<string, string | null>;
	user_data:Record<string, string | null | unknown[] | string[]| number[]> | null;
	shipmentDetails: Record<
		string,
		Array<unknown> | number | string | Record<string, string | number>
	>;
	settings: string;
	notifications: Notification[];
	toggleAdminSideBar: boolean;
	toggleNotification: boolean;
	openSignUpMenu: boolean;
	shipmentCurrentTab: string;
	form_level: number;
	showForgetPassword: boolean;
	showResendToken: boolean;
	resendTokenMessage: string;
};

const initialState: AppState = {
	user,
	user_data,
	shipmentDetails,
	settings: theme,
	notifications,
	toggleAdminSideBar,
	toggleNotification,
	openSignUpMenu,
	shipmentCurrentTab,
	form_level,
	showForgetPassword,
	showResendToken,
	resendTokenMessage
};

export type AppContextType = {
	state: AppState;
	setState: React.Dispatch<React.SetStateAction<AppState>>;
};

export const AppContext = createContext<AppContextType>({
	state: initialState,
	setState: () => { },
});

// Create a custom hook to get the global state from the context
export const useApp = () => {
	const { state } = useContext(AppContext);
	return state;
};

// Define the type for the children prop
type AppProviderProps = {
	children: ReactNode;
};

// Create a wrapper component that provides the global state to the component tree
export const AppProvider = ({ children }: AppProviderProps) => {
	const [state, setState] = useState(initialState); // Set the initial value of the global state
	return <AppContext.Provider value={{ state, setState }}>{children}</AppContext.Provider>;
};
