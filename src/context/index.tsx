import React, { createContext, useContext, useState, ReactNode } from 'react';
import AuthContext from './auth.context';
import SettingsContext from './settings.context';
import ShipmentContext from './shipment.context';
import UserContext from './user.context';

const { user } = AuthContext();
const { single_user_data, userCurrentTab, updateUser, all_users, business_account } = UserContext();
const {
	toggleNotification,
	notifications,
	theme,
	toggleAdminSideBar,
	openSignUpMenu,
	showForgetPassword,
	showResendToken,
	resendTokenMessage,
} = SettingsContext();
const {
	shipmentDetails,
	shipmentSummary,
	shipmentCurrentTab,
	editShipment,
	form_level,
	trackingShipments,
	allShipments,
} = ShipmentContext();

// Define the global state object

type AppState = {
	// user
	user: Record<string, string | null>;
	single_user_data: Record<string, string | number> | null;
	userCurrentTab: String;
	updateUser: Boolean;
	all_users: Record<string, string>[];
	business_account: Record<string, string | string[]> | null;

	// Auth
	showForgetPassword: boolean;
	showResendToken: boolean;
	openSignUpMenu: boolean;
	resendTokenMessage: string;

	// shipment
	shipmentDetails: any;
	shipmentSummary: any;
	shipmentCurrentTab: string;
	allShipments: any;
	trackingShipments: never[];
	editShipment: boolean;
	form_level: number;

	// settings
	settings: string;
	notifications: Notification[];
	toggleAdminSideBar: boolean;
	toggleNotification: boolean;
};

const initialState: AppState = {
	// user
	user,
	single_user_data,
	userCurrentTab,
	updateUser,
	all_users,
	business_account,

	// Auth
	showForgetPassword,
	showResendToken,
	resendTokenMessage,

	// shipment
	shipmentDetails,
	shipmentSummary,
	allShipments,
	trackingShipments,
	editShipment,
	form_level,

	// settings
	settings: theme,
	notifications,
	toggleAdminSideBar,
	toggleNotification,
	openSignUpMenu,
	shipmentCurrentTab,
};

export type AppContextType = {
	state: AppState;
	setState: React.Dispatch<React.SetStateAction<AppState>>;
};

export const AppContext = createContext<AppContextType>({
	state: initialState,
	setState: () => {},
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
