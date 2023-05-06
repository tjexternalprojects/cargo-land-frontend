import { GrBusinessService, ImLocation, BsTelephoneForward, AiOutlineNumber, MdAttachEmail } from '@/assets';
import useBusinessData from './useBusinessData';
const BusinessData = () => {
	const { handleSubmitBusinessData, setBusinessData, businessData } = useBusinessData();
	return (
		<form className=" text-gray-500 flex flex-col space-y-4" onSubmit={handleSubmitBusinessData}>
			<div className="flex flex-col">
				<div className=" border-b-2 flex items-center  mt-2 px-5 border-white">
					<input
						value={businessData.business_name}
						onChange={(e) => setBusinessData({ ...businessData, business_name: e.target.value })}
						type="text"
						placeholder="Business Name"
						className="text-sm rounded-xl flex-grow h-11 outline-none bg-transparent"
						required
					/>
					<GrBusinessService />
				</div>
			</div>

			<div className="flex flex-col">
				<div className="border-white border-b-2  px-5  flex items-center">
					<input
						value={businessData.business_number}
						onChange={(e) => setBusinessData({ ...businessData, business_number: e.target.value })}
						type="tel"
						placeholder="Business Number"
						className="text-sm rounded-xl flex-grow h-11 outline-none bg-transparent"
						required
					/>
					<AiOutlineNumber />
				</div>
			</div>

			<div className="flex flex-col">
				<div className="border-white border-b-2  px-5  flex items-center">
					<input
						value={businessData.business_email}
						onChange={(e) => setBusinessData({ ...businessData, business_email: e.target.value })}
						type="email"
						placeholder="Email address"
						className="text-sm rounded-xl flex-grow h-11 outline-none bg-transparent"
						required
					/>
					<MdAttachEmail />
				</div>
			</div>

			<div className="flex flex-col">
				<div className="border-white border-b-2  px-5  flex items-center">
					<input
						value={businessData.phone_number}
						onChange={(e) => setBusinessData({ ...businessData, phone_number: e.target.value })}
						type="tel"
						placeholder="Phone Number"
						className="text-sm rounded-xl flex-grow h-11 outline-none bg-transparent"
						required
					/>
					<BsTelephoneForward />
				</div>
			</div>

			<div className="flex flex-col">
				<div className="border-white border-b-2  px-5  flex items-center">
					<textarea
						value={businessData.office_address}
						onChange={(e) => setBusinessData({ ...businessData, office_address: e.target.value })}
						placeholder="Office Address"
						className="text-sm rounded-xl flex-grow h-11 outline-none bg-transparent"
						required
					/>
					<ImLocation />
				</div>
			</div>

			<button
				className="hover:shadow-md  shadow-gray-50 shadow-sm w-full p-2 rounded-sm  bg-blue-900 font-bold text-white text-md"
				type="submit"
			>
				Proceed
			</button>
		</form>
	);
};

export default BusinessData;
