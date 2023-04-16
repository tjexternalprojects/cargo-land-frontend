import React from 'react';
import { motion } from 'framer-motion';

import useNotification from './useNotification';
import NotificationModal from './NotificationModal';
const Notification = () => {
	const { notificationData, showModal, setShowModal, handleShowDetails } = useNotification();
	return (
		<div className=" absolute bottom-0 w-full h-full top-0 left-0 right-0    flex justify-end">
			<div className="bg-white h-full md:w-1/4 pt-20 px-5 pb-5 space-y-4 relative overflow-y-auto shadow-2xl  ">
				{notificationData.length==0?<>{notificationData.map((data, index) => (
					<div
						key={index}
						onClick={() => handleShowDetails(index)}
						className=" cursor-pointer hover:border-t hover:border-b py-2 hover:text-gray-500 transition-all duration-75 ease-in"
					>
						<h2 className="text-md font-bold">{data.title}</h2>
						{data.description.length > 80
							? data.description.slice(0, 80) + '...'
							: data.description}
					</div>
				))}</>:
				<div className="text-md text-center font-bold  h-full  flex items-center justify-center text-red-300 ">
				No notification at the moment

			</div>
				}
				{showModal && <NotificationModal setShowModal={setShowModal} />}
			</div>
		</div>
	);
};

export default Notification;
