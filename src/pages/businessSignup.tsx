import { signupGif } from '../assets';
import { Header } from '../components';

const businessSignup = () => {
	return (
		<div>
			<Header />
			<div className="flex">
				<div></div>
				<div>
					<img src={signupGif} />
				</div>
			</div>
		</div>
	);
};

export default businessSignup;
