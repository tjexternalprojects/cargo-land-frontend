import { AppContext, AppContextType } from '@/context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
function useTopBar() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const navigation = useNavigate();
	const handleToggleNotification = () => {
		setState({
			...state,
			toggleNotification: !state.toggleNotification,
		});
	};
	const handleToggleSidebar = () => {
		setState((prevState) => ({
			...prevState,
			toggleAdminSideBar: !state.toggleAdminSideBar,
		}));
	};

	const showChartItems = () => {
		setState({
			...state,
			shipmentCurrentTab: 'item3',
			form_level: 2,
		});
		navigation('/dashboard/shipment');
	};

	return { handleToggleNotification, handleToggleSidebar, showChartItems, setState, state };
}
export default useTopBar;
