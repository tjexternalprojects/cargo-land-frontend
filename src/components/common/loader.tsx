import React from 'react';

import { Rings } from 'react-loader-spinner';
const loader = () => {
	return (
		<div className="fixed top-0 left-0 bottom-0 right-0 z-30  bg-black/50 h-screen w-screen flex items-center justify-center">
			<div className=" ">
				<Rings
					height="200"
					width="200"
					color="#1a365d"
					radius="6"
					wrapperStyle={{}}
					wrapperClass=""
					visible={true}
					ariaLabel="rings-loading"
				/>
			</div>
		</div>
	);
};

export default loader;
