import { AppContext, AppContextType } from '@/context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
function useTopBar() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const navigation = useNavigate()
	const handleToggleNotification = () => {
		setState({
			...state,
			toggleNotification: !state.toggleNotification,
		});
      
	};

	const showChartItems =() =>{
		setState({
			...state, shipmentCurrentTab:"item3"
		})
		setState((prevState) => ({
			...prevState,
			shipmentDetails: { ...prevState.shipmentDetails, form_level: 2 },
		}));
		console.log(state.shipmentDetails)
		navigation('/shipment');
	};

	return { handleToggleNotification, showChartItems };
}
export default useTopBar;
