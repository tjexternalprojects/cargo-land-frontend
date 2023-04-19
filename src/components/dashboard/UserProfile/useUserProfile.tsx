import { AppContextType, AppContext } from "@/context";
import { useContext, useState } from "react";

function useUserProfile(){
	const { state, setState } = useContext<AppContextType>(AppContext);

    const [animationDirection, setAnimationDirection] = useState({
		prev_direction: 1,
		direction: -50,
	});
    
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
			userCurrentTab: item,
		});
	};
    return{handleShowTab, animationDirection, state}
}
export default useUserProfile