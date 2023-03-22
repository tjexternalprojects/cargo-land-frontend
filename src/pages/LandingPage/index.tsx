import { dottedImage } from '@/assets';
import { Header, Hero, Services } from '@/components';
import Footer from '@/components/common/Footer';
import React from 'react';

const LandingPage = () => {
	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			{/*  Site header */}
			<Header />
			<Hero />
			<Services />
			<Footer />
		</div>
	);
};

export default LandingPage;
