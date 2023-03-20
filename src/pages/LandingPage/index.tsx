import { dottedImage } from '@/assets';
import { Header, Hero } from '@/components';
import Footer from '@/components/common/Footer';
import React from 'react';

const LandingPage = () => {
	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			{/*  Site header */}
			<Header />

			{/*  Page content */}
			<main className="flex-grow">
				{/*  Page sections */}
				<Hero />
			</main>

			<Footer />
		</div>
	);
};

export default LandingPage;
