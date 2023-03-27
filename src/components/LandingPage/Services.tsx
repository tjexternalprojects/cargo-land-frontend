import { MapImg, TitleLine } from '@/assets';
import useLandingPage from '@/pages/LandingPage/useLandingPage';

const Services = () => {
const {handleGetStarted}= useLandingPage()
	return (
		<div className=" flex items-center">
			<div className="px-10  md:px-20 lg:px-44 flex flex-col xl:flex-row items-center py-20  gap-20">
				<div className="space-y-5 flex-grow">
					<div className="flex items-center space-x-2">
						<div className="w-10 h-1 bg-blue-900"></div>{' '}
						<span className="text-blue-900">Smart Delivery</span>
					</div>
					<div
						className="relative font-extrabold text-4xl  text-blue-900"
						data-aos="fade-up"
						data-aos-duration="1000"
					>
						Deliver more, worry less
					</div>
					<div className="mb-10  h-5">
						<TitleLine />
					</div>
					<div className="mt-20">
						<p className="text-gray-500 mb-2">Get updated as your goods travel</p>

						<p
							className="text-gray-500 mb-2 md:text-xl  "
							data-aos="fade-zoom-in"
							data-aos-easing="ease-in-back"
							data-aos-delay="300"
							data-aos-offset="0"
						>
							We are committed to providing our clients with the best transportation solutions. Our
							mapping software is just one of the many tools we use to make sure that your goods are
							transported efficiently and effectively. Contact us today to learn more about our
							transportation services and how we can help you optimize your supply chain
						</p>
					</div>

					<button
						onClick={handleGetStarted}
						className="flex items-center  bg-blue-900 border  text-white rounded-md px-8 py-2  hover:transition-all duration-150 ease-in-out hover:shadow-xl hover:shadow-blue-100 "
					>
						Get Started
					</button>
				</div>

				<div className="flex-grow flex gap-10">
					<div
						className="  h-80 md:w-44  rounded-full"
						data-aos="fade-up"
						data-aos-delay="200"
						data-aos-duration="1000"
					>
						<img className=" object-cover w-full h-full object-center rounded-full" src={MapImg} />
					</div>

					<div
						className=" border h-80 md:w-44 rounded-full"
						data-aos="fade-up"
						data-aos-delay="100"
						data-aos-duration="1000"
					>
						<img
							className=" object-cover w-full h-full object-right-bottom rounded-full"
							src={MapImg}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Services;
