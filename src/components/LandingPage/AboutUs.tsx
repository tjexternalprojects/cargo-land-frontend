import { TitleLine } from '@/assets';
import React from 'react';

const AboutUs = () => {
	return (
		<div className="flex px-44 py-40" id="AboutUs">
			<div className="relative">
				<div
					className="absolute w-96 h-96 top-0 -z-10 rounded-full bg-slate-100"
					data-aos="fade-left"
					data-aos-delay="300"
					data-aos-duration="800"
					data-aos-anchor-placement="bottom-bottom"
				></div>
				<div
					className="absolute right-0 w-10 h-10 rounded-full bg-red-400"
					data-aos="fade-left"
					data-aos-delay="300"
					data-aos-duration="800"
					data-aos-anchor-placement="bottom-bottom"
				></div>
				<div
					className="absolute right-8 w-5 h-5 rounded-full bg-red-100"
					data-aos="fade-left"
					data-aos-delay="200"
					data-aos-duration="800"
					data-aos-anchor-placement="bottom-bottom"
				></div>

				<div
					className="absolute left-0 w-10 h-10 rounded-full bg-red-400"
					data-aos="fade-left"
					data-aos-delay="300"
					data-aos-duration="800"
					data-aos-anchor-placement="bottom-bottom"
				></div>
				<div
					className="absolute left-8 w-5 h-5 rounded-full bg-red-100"
					data-aos="fade-left"
					data-aos-delay="200"
					data-aos-duration="800"
					data-aos-anchor-placement="bottom-bottom"
				></div>

				<div className="mb-10">
					<h2
						className="font-extrabold text-4xl text-blue-900 "
						data-aos="flip-up"
						data-aos-delay="100"
						data-aos-duration="800"
						data-aos-anchor-placement="bottom-bottom"
					>
						About us
					</h2>
					<TitleLine />
				</div>
				<p className="text-xl text-blue-900 ">
					Our company focuses on cultivating long-term relationships with clients to ensure they
					take full advantage of the diverse services offered by us in Africa and other areas across
					the globe. Our services include marine chartering, marine transportation, ship management,
					towages, offshore support, and vessel telecommunications amongs others. We manage and
					operate a wide variety of vessels including FOSV, AHT(S), Multicat work boats, tugs and
					barges, as well as numerous other vessels. Through our team’s commitment, expertise, and
					professionalism we pride ourselves in providing reliable solutions to all of our clients.
					We also seek to provide supply/utility vessels, crewing and maintenance of vessels and
					other related services that will facilitate onshore/offshore operations within Africa and
					other territories under its jurisdiction.
				</p>
			</div>
			<div></div>
		</div>
	);
};

export default AboutUs;
