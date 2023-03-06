import React, { FC } from 'react'
import {AiOutlineClose} from  '@/assets'

interface NotificationModalProps {
	setShowModal: (value: boolean) => void;
}
const NotificationModal: FC<NotificationModalProps> = ({ setShowModal }) => {
	return (
		<div className="absolute h-full w-full top-0 bottom-0 left-0 right-0">
			<div className="bg-black bg-opacity-25 fixed h-full  flex justify-center items-center">
				<div className="m-10 ">
					<div className="flex justify-end py-2 px-5  bg-blue-50 rounded-t-xl ">
						<div
							className="rounded-full shadow-lg hover:shadow-blue-200 hover:bg-blue-400 hover:text-white transition-all duration-75 ease-in-out cursor-pointer p-2 "
							onClick={()=>setShowModal(false)}
						>
							<AiOutlineClose />
						</div>
					</div>
					<div className="bg-white p-5 overflow-y-auto max-h-60-screen">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, perspiciatis odit ipsum
						est quibusdam consectetur libero voluptas quam corrupti possimus nemo deserunt totam eum
						eaque porro laboriosam laudantium aliquid suscipit? Lorem ipsum, dolor sit amet
						consectetur adipisicing elit. Amet ad libero sit recusandae. Iste veniam accusantium
						corporis molestiae optio impedit, aliquam voluptas, ipsam, fuga beatae debitis ut
						laborum labore a! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
						quidem, nobis autem voluptatem unde molestias voluptatum iusto laboriosam earum!
						Placeat, voluptate? Voluptas quisquam error minima natus consectetur, rerum assumenda
						perspiciatis! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut cupiditate,
						quas soluta fugiat ea incidunt! Dolorem possimus fugit obcaecati nam distinctio itaque
						placeat minima atque labore, omnis et commodi pariatur. Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Unde ducimus placeat dolores iste reprehenderit corrupti,
						repellendus esse neque tempora quam quidem distinctio? Nam sunt nisi ex vel mollitia
						asperiores! Voluptatibus.
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotificationModal