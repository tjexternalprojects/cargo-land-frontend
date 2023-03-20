import { BiHide, BiShow, BiUserPin, MdAttachEmail, Si1Password } from '@/assets';
import useBusinessSignup from '@/pages/BusinessSignup/useBusinessSignup';

const BasicInfo = () => {
	const { showPassword, setShowPassword } = useBusinessSignup();
	return (
		<form className=" text-gray-500 flex flex-col space-y-4">
			<div className="flex flex-col">
				<div className="bg-white rounded-xl px-5  flex items-center shadow-md">
					<input
						type="email"
						placeholder="Email address"
						className="text-sm rounded-xl flex-grow h-11 outline-none bg-transparent"
						required
					/>
					<MdAttachEmail />
				</div>
			</div>
			<div className="flex flex-col">
				<div className="bg-white rounded-xl h-11 px-5  flex items-center shadow-md">
					<input
						type={!showPassword ? 'password' : 'text'}
						placeholder="create password"
						className="text-sm rounded-xl flex-grow h-11 outline-none"
						min={6}
						required
					/>
					{!showPassword ? (
						<BiHide className=" cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
					) : (
						<BiShow className=" cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
					)}
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

export default BasicInfo;
