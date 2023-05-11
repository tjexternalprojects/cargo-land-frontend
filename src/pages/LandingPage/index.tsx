import { AboutUs, Business, Contact, Header, Hero, GetStarted, Services } from '@/components';
import Footer from '@/components/common/Footer';
import { UserServices } from '@/services';
import React, { useEffect } from 'react';

const LandingPage = () => {
	const { getSingleUser } = UserServices();
	useEffect(() => {
		getSingleUser();
	});
	return (
		<div className="flex flex-col min-h-screen overflow-hidden">
			{/*  Site header */}
			<Header />
			<Hero />
			<Services />
			<Business />
			<AboutUs />
			<GetStarted />
			<Contact />
			<Footer />
		</div>
	);
};

export default LandingPage;
