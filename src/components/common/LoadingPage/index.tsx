import { RingLoader } from '@/components';
interface LoadingPageProps {
	overlayColor?: string;
}
function App({ overlayColor }: LoadingPageProps) {
	return (
		<div
			className={`h-full fixed top-0 left-0 bottom-0 right-0 w-full ${
				overlayColor ? overlayColor : 'bg-white'
			} flex justify-center items-center`}
		>
			<RingLoader size={300} textColor="text-blue-900" />
		</div>
	);
}

export default App;
