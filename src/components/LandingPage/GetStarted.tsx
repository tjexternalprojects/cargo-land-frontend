import React from 'react';
import {
	BiCloudUpload,
	GoPackage,
	MapImg2,
	MdOutlineVerified,
	MdTrackChanges,
	RiLoginCircleLine,
	TitleLine,
} from '@/assets';
import useLandingPage from '@/pages/LandingPage/useLandingPage';
const PriceList = () => {
	const {handleGetStarted}= useLandingPage()

	return (
		<div
			id="Direction"
			className=" my-24  bg-cover bg-center  bg-no-repeat bg-fixed"
			style={{ backgroundImage: `url(${MapImg2})` }}
		>
			<div className="relative bg-gradient-to-b  from-white via-white/10 to-white px-10 md:px-20 lg:px-44 py-10 w-full">
				<div className=" my-24 p-10 mb-32 rounded-lg shadow-lg bg-white  ">
					<div className=" mb-6">
						<h2
							className="text-3xl font-bold pb-2 text-blue-900"
							data-aos="flip-up"
							data-aos-delay="100"
							data-aos-duration="800"
							data-aos-anchor-placement="bottom-bottom"
						>
							Let's Start Sending your Package
						</h2>
						<TitleLine />
					</div>
					<div className="flex flex-col lg:flex-row items-center   justify-between mt-16">
						<span className="px-2 font-normal text-slate-400">Signup</span>
						<div className="flex flex-col lg:flex-row  items-center justify-center w-full">
							<div
								className="border-4 rounded-full text-blue-900 p-2 inline-flex border-blue-900 shadow-2xl"
								data-aos="zoom-in"
								data-aos-duration="800"
								data-aos-delay="100"
							>
								<RiLoginCircleLine className="text-3xl" />
							</div>
							<div
								className="flex flex-col lg:flex-row items-center flex-grow"
								data-aos="zoom-out-right"
								data-aos-duration="800"
								data-aos-delay="200"
							>
								<div className="border-blue-900 border-2 lg:h-0.5 lg:w-full h-10 w-0.5 border-dotted"></div>
								<span className="px-2 font-normal text-slate-400">Upload Shipment Details</span>
								<div className="border-blue-900 border-2 lg:h-0.5 lg:w-full h-10 w-0.5 border-dotted"></div>
							</div>
						</div>

						<div className="flex flex-col lg:flex-row  items-center justify-center w-full">
							<div
								className="border-4 rounded-full text-blue-900 p-2 inline-flex border-blue-900"
								data-aos="zoom-in"
								data-aos-duration="800"
								data-aos-delay="300"
							>
								<BiCloudUpload className="text-3xl" />
							</div>
							<div
								className="flex flex-col lg:flex-row items-center flex-grow"
								data-aos="zoom-out-right"
								data-aos-duration="800"
								data-aos-delay="400"
							>
								<div className="border-blue-900 border-2 lg:h-0.5 lg:w-full h-10 w-0.5 border-dotted"></div>
								<span className="px-2 font-normal text-slate-400">Get Verified</span>
								<div className="border-blue-900 border-2 lg:h-0.5 lg:w-full h-10 w-0.5 border-dotted"></div>
							</div>
						</div>

						<div className="flex flex-col lg:flex-row  items-center justify-center w-full">
							<div
								className="border-4 rounded-full text-blue-900 p-2 inline-flex border-blue-900"
								data-aos="zoom-in"
								data-aos-duration="800"
								data-aos-delay="500"
							>
								<MdOutlineVerified className="text-3xl" />
							</div>
							<div
								className="flex flex-col lg:flex-row  items-center flex-grow"
								data-aos="zoom-out-right"
								data-aos-duration="800"
								data-aos-delay="600"
							>
								<div className="border-blue-900 border-2 lg:h-0.5 lg:w-full h-10 w-0.5 border-dotted"></div>
								<span className="px-2 font-normal text-slate-400">Track Package</span>
								<div className="border-blue-900 border-2 lg:h-0.5 lg:w-full h-10 w-0.5 border-dotted"></div>
							</div>
						</div>

						<div className="flex flex-col lg:flex-row  items-center justify-center w-full">
							<div
								className="border-4 rounded-full text-blue-900 p-2 inline-flex border-blue-900"
								data-aos="zoom-in"
								data-aos-duration="800"
								data-aos-delay="700"
							>
								<MdTrackChanges className="text-3xl" />
							</div>
							<div
								className="flex flex-col lg:flex-row items-center flex-grow"
								data-aos="zoom-out-right"
								data-aos-duration="800"
								data-aos-delay="800"
							>
								<div className="border-blue-900 border-2 lg:h-0.5 lg:w-full h-10 w-0.5 border-dotted"></div>
								<span className="px-2 font-normal text-slate-400">Receive Package</span>
								<div className="border-blue-900 border-2 lg:h-0.5 lg:w-full h-10 w-0.5 border-dotted"></div>
							</div>
						</div>

						<div className="flex flex-col lg:flex-row  items-center justify-center">
							<div
								className="border-4 rounded-full text-blue-900 p-2 inline-flex border-blue-900"
								data-aos="zoom-in"
								data-aos-duration="800"
								data-aos-delay="900"
							>
								<GoPackage className="text-3xl" />
							</div>
						</div>
					</div>
						<button onClick={handleGetStarted}  className="flex items-center mx-auto lg:mt-20 mt-10 bg-blue-900 border  text-white rounded-md px-8 py-2  hover:transition-all duration-150 ease-in-out hover:shadow-xl hover:shadow-blue-100 ">
							Get Started
						</button>
				</div>
				<div id="Contact"></div>
			</div>
		</div>
	);
};

export default PriceList;
