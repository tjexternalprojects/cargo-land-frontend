import { AppContext, AppContextType } from '@/context';
import { useContext } from 'react';
function useDashboard() {
	const { state, setState } = useContext<AppContextType>(AppContext);

	return {};
}

export default useDashboard;
