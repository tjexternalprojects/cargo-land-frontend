import { useState } from 'react';
function useShipment() {
	const [newShipment, setNewShipment] = useState([]);
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

	return { handleNewShipment, handleShowTab, setAnimateTab, animationDirection, animateTab };
}
export default useShipment;
