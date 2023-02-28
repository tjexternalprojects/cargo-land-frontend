import React, { createContext, useContext, useState, ReactNode } from 'react';
import AuthContext from './AuthContext';
import SettingsContext from './SettingsContext';
import GeneralContext from './GeneralContext';
import { ShipmentDetails } from '@/interfaces';

const { user } = AuthContext();
const { notifications, theme, toggleAdminSideBar } = SettingsContext();
const { shipmentDetails } = GeneralContext();

// Define the global state object

type AppState = {
	user: Record<string, boolean>;
	shipmentDetails: Record<
		string,
		Array<unknown> | number | string | Record<string, string | number>
	>;
	settings: string;
	notifications: Notification[];
	toggleAdminSideBar: boolean;
};

const initialState: AppState = {
	user,
	shipmentDetails,
	settings: theme,
	notifications,
	toggleAdminSideBar,
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
