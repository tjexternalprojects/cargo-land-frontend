import { LineImg, MapImg } from '@/assets';

const Services = () => {
	return (
		<div className="px-20 pt-20 flex">
			<div className="space-y-5 flex-grow">
				<div className="flex items-center space-x-2">
					<div className="w-10 h-1 bg-blue-900"></div> <span>We Deliver</span>
				</div>
				<div
					className="relative font-extrabold text-4xl text-blue-900"
					data-aos="fade-up"
					data-aos-duration="1000"
				>
					Deliver more, worry less
					<img src={LineImg} className="absolute" />
				</div>
				<p className="text-gray-400">
					Signup as a Business and get cheaper rate of transporting goods
				</p>

				<p>
					"Say goodbye to shipping headaches with our top-notch courier services. We offer fast,
					reliable delivery options for businesses of all sizes. Contact us today to find out how we
					can help streamline your shipping process."
				</p>
			</div>

			<div className="flex-grow flex gap-10">
				{/* <div className=" border h-72 w-36 rounded-full">
					<img className=" object-cover w-full h-full object-center rounded-full" src={MapImg} />
				</div> */}
				<div className="w-80 h-80 overflow-hidden inline-block">
					<div className="h-67.5 w-67.5 -rotate-45 transform origin-top-left rounded-md border-t-0 border-l-0 border-r-28.5 border-b-28.5">
						<img className="object-cover w-full h-full object-right-bottom" src={MapImg} />
					</div>
				</div>
				<div className="w-80 h-80 overflow-hidden inline-block">
					<div className="h-0 w-0 border-b-40 border-r-40 border-transparent inline-block transform rotate-45">
						<img className="object-cover w-full h-full object-right-bottom" src={MapImg} />
					</div>
				</div>
				https://www.youtube.com/watch?v=xWggTb45brM&list=RDCTFtOOh47oo&index=27
				{/* <div className=" border h-72 w-36 rounded-full">
					<img
						className=" object-cover w-full h-full object-right-bottom rounded-full"
						src={MapImg}
					/>
				</div> */}
			</div>
		</div>
	);
};

export default Services;
