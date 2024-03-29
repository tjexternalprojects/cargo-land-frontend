import { BusinessUser, TitleLine } from '@/assets';
import useLandingPage from '@/pages/LandingPage/useLandingPage';

const Business = () => {
	const { handleGetStarted } = useLandingPage();

	return (
		<div className="py-5  flex items-center bg-blue-900">
			<div className="  h-full  flex flex-col md:flex-row items-center lg:px-44 px-10 gap-20">
				<div className="relative w-full   h-full flex items-center justify-center flex-grow">
					<div
						className=" md:w-96 md:h-96  rounded-full bg-white"
						data-aos="fade-left"
						data-aos-delay="300"
						data-aos-duration="800"
						data-aos-anchor-placement="bottom-bottom"
					>
						<img
							className=" object-cover w-full object-top rounded-full h-full transform scale-x-[-1]"
							src={BusinessUser}
						/>
					</div>
					<div
						className="absolute right-0 w-10 h-10 rounded-full bg-red-400"
						data-aos="fade-left"
						data-aos-delay="300"
						data-aos-duration="800"
						data-aos-anchor-placement="bottom-bottom"
					></div>
					<div
						className="absolute right-8 w-5 h-5 rounded-full bg-red-100"
						data-aos="fade-left"
						data-aos-delay="200"
						data-aos-duration="800"
						data-aos-anchor-placement="bottom-bottom"
					></div>
				</div>
				<div className="text-white w-full ">
					<h2
						className="font-extrabold text-4xl "
						data-aos="flip-up"
						data-aos-delay="100"
						data-aos-duration="800"
						data-aos-anchor-placement="bottom-bottom"
					>
						Have a Business?
					</h2>
					<div className="mb-10  h-5">
						<TitleLine color="#fff" />
					</div>
					<p
						data-aos="zoom-out-left"
						data-aos-delay="100"
						data-aos-duration="800"
						data-aos-anchor-placement="bottom-bottom"
						className="text-xl"
					>
						"Say goodbye to shipping headaches with our top-notch courier services. We offer fast,
						reliable delivery options for businesses of all sizes. Contact us today to find out how
						we can help streamline your shipping process." Signup as a Business and get cheaper rate
						of transporting goods
					</p>
					<button
						onClick={handleGetStarted}
						className=" mt-10 flex items-center  bg-white   text-blue-900 rounded-md px-8 py-2  hover:transition-all duration-150 ease-in-out hover:shadow-sm hover:shadow-blue-100 "
					>
						Book a Delivery
					</button>
				</div>
			</div>
		</div>
	);
};

export default Business;
