import { useState, useContext } from 'react';
import { AppContext, AppContextType } from '@/context';

function useShipment() {
	const { state } = useContext<AppContextType>(AppContext);
	const [animateTab, setAnimateTab] = useState('item1');
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

		setAnimateTab(item);
	};

	return { handleNewShipment, handleShowTab, setAnimateTab, state, animationDirection, animateTab };
}
export default useShipment;
