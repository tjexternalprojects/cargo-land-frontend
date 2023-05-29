import { useState } from "react";

function useShipmentMenu(location_id:string) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return { toggleDropdown, isOpen };
}

export default useShipmentMenu