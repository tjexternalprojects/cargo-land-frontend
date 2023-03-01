import { FC } from 'react';
import { MdTrackChanges, package1, RiUserReceivedLine } from '@/assets';
import { ToastContainer } from 'react-toastify';
import Slider from 'react-slick';

import useShipmentSummary from './useShipmentSummary';
interface RecipientDetailsProps {
	setAnimateTab: (value: string) => void;
}

const RecipientDetails: FC<RecipientDetailsProps> = ({ setAnimateTab }) => {
	const { handleSummary, image_slider_settings, shipmentData } = useShipmentSummary(setAnimateTab);
	return (
		<>
			<div className="inline-flex flex-col mx-auto w-full ml-40">
		
				<div className='flex gap-5'>
					<div className='bg-white h-screen rounded-md shadow-sm p-5'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus tenetur vitae molestiae laborum voluptatem deserunt, commodi odit animi nisi quaerat maxime corporis, voluptatibus iusto dolorum quae. Est minus corrupti adipisci!
					</div>
					<div className='w-1/2 bg-white h-screen rounded-md shadow-sm p-5'>
						<div className='mx-1 my-4'>
							<div className='w-40 h-40'>
								<img src={package1} className="w-full h-full object-contain"/>
							</div>
							<div>
								<h1 className='text-xl font-bold'>Title ..</h1>
								<p>Lorem ipsum dolor sit amet consectetur adipi...</p>
							</div>
						</div>
						<hr />

						<div className='mx-1 my-4'>
							<div className='w-40 h-40'>
								<img src={package1} className="w-full h-full object-contain"/>
							</div>
							<div>
								<h1 className='text-xl font-bold'>Title ..</h1>
								<p>Lorem ipsum dolor sit amet consectetur adipi...</p>
							</div>
						</div>
<hr />
						<div className='mx-1 my-4'>
							<div className='w-40 h-40'>
								<img src={package1} className="w-full h-full object-contain"/>
							</div>
							<div>
								<h1 className='text-xl font-bold'>Title ..</h1>
								<p>Lorem ipsum dolor sit amet consectetur adipi...</p>
							</div>
						</div>
<hr />
						<div className='mx-1 my-4'>
							<div className='w-40 h-40'>
								<img src={package1} className="w-full h-full object-contain"/>
							</div>
							<div>
								<h1 className='text-xl font-bold'>Title ..</h1>
								<p>Lorem ipsum dolor sit amet consectetur adipi...</p>
							</div>
						</div>
					</div>
				</div>

			</div>
		</>
	);
};


export default RecipientDetails;













			{/* 	<button className=" absolute bottom-10 right-10 h-20 w-20 flex flex-col items-center justify-center  text-blue-900 rounded-full hover:transition-all duration-150 ease-in-out hover:shadow-xl hover:shadow-blue-100 bg-gradient-to-t from-white via-slate-100 to-slate-100 shadow-lg shadow-slate-300">
					<span className="text-4xl">+</span>
				</button> */}