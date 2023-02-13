import { signupGif } from '../assets';
import { Header } from '../components';

const businessSignup = () => {
	return (
		<div>
			<Header />
			<div className="flex h-screen items-center pt-10">
				<div>
					<div></div>
				</div>
				<div>
					<img src={signupGif} />
				</div>
			</div>
		</div>
	);
};

export default businessSignup;
