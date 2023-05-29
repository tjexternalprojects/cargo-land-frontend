import { AppContextType, AppContext } from "@/context";
import { useContext, useEffect } from "react";

function useTransitions() {
	const { state, setState } = useContext<AppContextType>(AppContext);

	const setActivePage = ()=>{
		setState((prevState) => ({
		  ...prevState,
		  activePage: 'Transactions',
		})); 
	  }

	  useEffect(() => {
		setActivePage()
	}, []);
	return {};
}
export default useTransitions;
