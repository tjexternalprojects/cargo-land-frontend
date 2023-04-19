import { AboutUs, Business, Contact, Header, Hero, GetStarted, Services } from '@/components';
import Footer from '@/components/common/Footer';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const LandingPage = () => {
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
			<ToastContainer />

		</div>
	);
};

export default LandingPage;
