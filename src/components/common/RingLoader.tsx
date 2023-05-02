import React, { FC } from 'react';
import { Rings } from 'react-loader-spinner';

interface RingLoaderProps {
	text?: string;
	textColor?: string;
	loaderColor?: string;
	size?: number;
}
const RingLoader: FC<RingLoaderProps> = ({
	text,
	textColor,
	size = 200,
	loaderColor = '#1a365d',
}) => {
	return (
		<div className="flex flex-col justify-center">
			<Rings
				height={size}
				width={size}
				color={loaderColor}
				radius="6"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
				ariaLabel="rings-loading"
			/>
			<div className={`w-full text-center ${textColor}`}>{text}</div>
		</div>
	);
};

export default RingLoader;
