import { AppContext, AppContextType } from "@/context";
import { useContext } from "react";

function useShipmentModal(setShowModal: (value: boolean) => void) {
	const {state, setState} = useContext<AppContextType>(AppContext)
	const image_slider_settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		initialSlide: 0,
	};
	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleEdit = () => {
		setState({
			...state,
			shipmentCurrentTab: 'item1',
		});
		setShowModal(false);
	};
	const handleRemoveItem = () => {
		setShowModal(false);
	};
	return { image_slider_settings, handleRemoveItem, handleEdit, handleCloseModal };
}
export default useShipmentModal;
