import React, { FC } from 'react';
interface TitleLineProps {
	color?: string;
}
const TitleLine: FC<TitleLineProps> = ({ color = '#1E3A8A' }) => {
	return (
		<div>
			<svg
				width="208"
				height="16"
				viewBox="0 0 208 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M169.141 0C170.089 1.06582 170.729 1.78037 171.54 2.68874C173.847 0.544986 175.983 -1.71987 178.862 2.39807C179.467 3.2701 183.168 1.69556 185.258 1.29587C187.097 1.81667 189.096 2.78566 191.118 2.87044C196.715 3.10056 202.323 2.94311 207.931 2.94311C207.954 3.5608 207.977 4.19057 208 4.80826C205.51 5.01416 203.031 5.32905 200.53 5.40172C175.823 6.12841 151.094 6.47967 126.399 7.61816C100.459 8.80509 74.5419 10.6218 48.6247 12.3901C34.4839 13.3591 20.3659 14.8125 6.23653 15.9631C4.90012 16.0721 3.35817 15.963 2.22736 15.3211C1.21078 14.7519 0 13.3227 0 12.2811C0 11.3606 1.48492 9.76189 2.44439 9.64077C12.8273 8.32061 23.2101 6.9278 33.6387 6.17688C44.4784 5.40174 55.3524 5.32908 66.215 4.90518C76.2895 4.51761 86.3754 4.15425 96.4384 3.60923C104.628 3.17321 112.795 2.26481 120.985 1.98624C124.16 1.87724 127.347 3.20952 130.557 3.35486C132.133 3.42753 134.977 5.42596 135.308 1.40491C135.32 1.24746 136.131 0.932536 136.371 1.07787C139.306 2.78561 142.413 0.205885 145.075 1.19903C148.033 2.3133 150.523 1.82885 153.299 1.06583C154.212 0.811482 155.378 1.84091 156.417 1.84091C157.673 1.84091 158.907 1.22325 160.175 1.11424C161.249 1.01735 162.642 0.823567 163.362 1.41703C165.715 3.31855 167.405 2.80989 169.119 0H169.141Z"
					fill={color}
				/>
			</svg>
		</div>
	);
};

export default TitleLine;
