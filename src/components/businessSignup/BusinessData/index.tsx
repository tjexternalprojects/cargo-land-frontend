import { GrBusinessService, ImLocation, BsTelephoneForward, AiOutlineNumber } from '@/assets';
const BusinessData = () => {
	return (
		<form className=" text-gray-500 flex flex-col space-y-4">
			<div className="flex flex-col">
				<div className="bg-white rounded-xl px-5  flex items-center shadow-md">
					<input
						type="text"
						placeholder="Business Name"
						className="text-sm rounded-xl flex-grow h-11 outline-none bg-transparent"
						required
					/>
					<GrBusinessService />
				</div>
			</div>

			<div className="flex flex-col">
				<div className="bg-white rounded-xl px-5  flex items-center shadow-md">
					<input
						type="tel"
						placeholder="Business Number"
						className="text-sm rounded-xl flex-grow h-11 outline-none bg-transparent"
						required
					/>
					<AiOutlineNumber />
				</div>
			</div>

			<div className="flex flex-col">
				<div className="bg-white rounded-xl px-5  flex items-center shadow-md">
					<input
						type="tel"
						placeholder="Phone Number"
						className="text-sm rounded-xl flex-grow h-11 outline-none bg-transparent"
						required
					/>
					<BsTelephoneForward />
				</div>
			</div>

			<div className="flex flex-col">
				<div className="bg-white rounded-xl px-5  flex items-center shadow-md">
					<textarea
						placeholder="Office Address"
						className="text-sm rounded-xl flex-grow h-11 outline-none bg-transparent"
						required
					/>
					<ImLocation />
				</div>
			</div>

			<button
				className="hover:shadow-blue-100 hover:shadow-md  bg-gradient-to-br from-slate-50 via-white  to-slate-50 rounded-xl h-11 text-sm shadow-md"
				type="submit"
			>
				Proceed
			</button>
		</form>
	);
};

export default BusinessData;
