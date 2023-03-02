import { FC } from 'react';
import { AiOutlineClose, AiOutlineEdit, MdTrackChanges, MdViewInAr, package1, RiUserReceivedLine, userImg } from '@/assets';
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
			<div className="inline-flex flex-col  w-full ml-40">
				<div className="flex gap-5">
					<div className="bg-white h-screen-82 p-5 rounded-md shadow-md  w-full">
						<table className=" w-full">
							<thead className=" text-left bg-slate-100 ">
								<th className="p-3">Shipment Id</th>
								<th>Current Location</th>
								<th>Destination</th>
								<th>Price</th>
								<th></th>
								<th></th>
								<th></th>
							</thead>
							<tbody>
								<tr>
									<td className="p-3">XXX2DDDDDD</td>
									<td className="p-3">20, Adebayo Close, Okota, isolo, Lagos Nigeria</td>
									<td className="p-3">20, Adebayo Close, Okota, isolo, Lagos Nigeria</td>
									<td className="p-3">#50,000</td>
									<td>
										<button className="bg-blue-800 rounded-full text-white px-3 py-1 flex space-x-2 items-center shadow-md">

											<AiOutlineEdit />
											<span>Edit</span>
										</button>
									</td>
									<td>
										<button className="bg-green-800 rounded-full text-white px-3 py-1 flex space-x-2 items-center shadow-md">
											<MdViewInAr />
											<span>view</span>
										</button>
									</td>
									<td>
										<button className="bg-red-500 rounded-full text-white px-3 py-1 flex space-x-2 items-center shadow-md">
											<AiOutlineClose />
											<span>Remove</span>
										</button>
									</td>
								</tr>
							</tbody>
						</table>

						{/* <div className=' w-1/2 mx-auto'>
							<Slider {...image_slider_settings}>
									<img src={package1} className="w-full h-full object-contain" />
									<img src={userImg} className="w-full h-full object-contain" />
							</Slider>
						</div> */}
					</div>

					{/* <div className="w-1/2 bg-white h-screen-82 rounded-md shadow-sm p-5 overflow-y-auto">
						<div className="mx-1 my-4">
							<div className="w-40 h-40">
								<img src={package1} className="w-full h-full object-contain" />
							</div>
							<div>
								<h1 className="text-xl font-bold">Title ..</h1>
								<p>Lorem ipsum dolor sit amet consectetur adipi...</p>
							</div>
						</div>
						<hr />

						<div className="mx-1 my-4">
							<div className="w-40 h-40">
								<img src={package1} className="w-full h-full object-contain" />
							</div>
							<div>
								<h1 className="text-xl font-bold">Title ..</h1>
								<p>Lorem ipsum dolor sit amet consectetur adipi...</p>
							</div>
						</div>
						<hr />
						<div className="mx-1 my-4">
							<div className="w-40 h-40">
								<img src={package1} className="w-full h-full object-contain" />
							</div>
							<div>
								<h1 className="text-xl font-bold">Title ..</h1>
								<p>Lorem ipsum dolor sit amet consectetur adipi...</p>
							</div>
						</div>
						<hr />
						<div className="mx-1 my-4">
							<div className="w-40 h-40">
								<img src={package1} className="w-full h-full object-contain" />
							</div>
							<div>
								<h1 className="text-xl font-bold">Title ..</h1>
								<p>Lorem ipsum dolor sit amet consectetur adipi...</p>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</>
	);
};

export default RecipientDetails;

{
	/* 	<button className=" absolute bottom-10 right-10 h-20 w-20 flex flex-col items-center justify-center  text-blue-900 rounded-full hover:transition-all duration-150 ease-in-out hover:shadow-xl hover:shadow-blue-100 bg-gradient-to-t from-white via-slate-100 to-slate-100 shadow-lg shadow-slate-300">
					<span className="text-4xl">+</span>
				</button> */
}
