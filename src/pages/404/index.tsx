import React from 'react';
import { Link } from 'react-router-dom';

const index = () => {
	return (
		<div
			className="relative flex flex-col items-center justify-center h-screen animate__animated animate__fadeIn"
			style={{
				backgroundImage: `url('https://www.shiplilly.com/wp-content/uploads/2016/06/AdobeStock_109502859-846x565.jpeg')`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className="absolute inset-0 bg-black opacity-75"></div>
			<h1 className="text-5xl font-bold text-white relative z-10 mb-4">404</h1>
			<p className="text-2xl text-white relative z-10 mb-4">Oops! Page not found</p>
			<p className="text-lg text-white relative z-10 mb-8">
				The page you are looking for does not exist.
			</p>
			<a
				href="/"
				className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium relative z-10 transition-colors duration-300"
			>
				Go back to homepage
			</a>
		</div>
	);
};

export default index;
