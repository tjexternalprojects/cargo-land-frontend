import React from 'react';
import { AiFillInstagram, AiFillTwitterCircle, FaFacebook } from '@/assets';
const Footer = () => {
	return (
		<div className="mt-24">
			<div className="bg-gray-100 pt-2">
				<div
					className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col
      max-w-screen-lg items-center"
				>
					<div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
						<a href="/#" className="w-6 mx-1">
							<FaFacebook className="text-3xl" />
						</a>
						<a href="/#" className="w-6 mx-1">
							<AiFillTwitterCircle className="text-3xl" />
						</a>
						<a href="/#" className="w-6 mx-1">
							<AiFillInstagram className="text-3xl" />
						</a>
					</div>
					<div className="my-5">© Copyright 2020. All Rights Reserved.</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
