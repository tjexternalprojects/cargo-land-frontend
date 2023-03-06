import { AppContext, AppContextType } from '@/context';
import { useContext, useState } from 'react';

function useNotification() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const [showModal, setShowModal] = useState(false)
	const handleCloseModal  = ()=>{
		setShowModal(false)
	}

	const handleShowDetails = (index:number)=>{
		setShowModal(true)
	}
	const handleCloseNotification = () => {
		setState({
			...state,
			toggleNotification: false,
		});
	};

	const [notificationData, setNotificationData] = useState([
		{
			title: 'Order Booked',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci error laudantium,explicabo amet soluta necessitatibus',
			time: '1 min ago',
		},
		{
			title: 'Order Booked',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci error laudantium,explicabo amet soluta necessitatibus',
			time: '1 min ago',
		},
		{
			title: 'Order Booked',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci error laudantium,explicabo amet soluta necessitatibus',
			time: '1 min ago',
		},
	]);
	return { handleCloseNotification, handleCloseModal, setShowModal, handleShowDetails, showModal, notificationData };
}

export default useNotification;
