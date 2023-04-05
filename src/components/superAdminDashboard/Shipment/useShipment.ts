import { useState, useContext, useEffect } from 'react';
import { AppContext, AppContextType } from '@/context';

function useShipment() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [animationDirection, setAnimationDirection] = useState({
		prev_direction: 1,
		direction: -50,
	});

	const handleNewShipment = () => {};

	const handleShowTab = (item: string, item_number: number) => {
		if (animationDirection.prev_direction < item_number) {
			setAnimationDirection(() => ({
				...animationDirection,
				direction: -50,
				prev_direction: item_number,
			}));
		} else if (animationDirection.prev_direction > item_number) {
			setAnimationDirection(() => ({
				...animationDirection,
				direction: 50,
				prev_direction: item_number,
			}));
		}

		setState({
			...state,
			shipmentCurrentTab: item,
		});
	};

	return { handleNewShipment, handleShowTab, state, animationDirection };
}
export default useShipment;
