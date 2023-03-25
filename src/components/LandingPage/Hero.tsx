import { motion } from 'framer-motion';
import HeroSlider, { Overlay, Slide, MenuNav, SideNav } from 'hero-slider';
import { GoodsImg, cargoBG, Background7, Background2 } from '@/assets';

const slides = [
	{
		label: 'welcome',
		backgroundImageSrc: GoodsImg,
		title: 'Efficient and Reliable Cargo Exchange Services',
		subtitle:
			'Welcome to our cargo exchange company, where we offer efficient and reliable services for all your shipping needs.'
	},
	{
		label: 'cargo land',
		backgroundImageSrc: cargoBG,
		title: 'Cargo Land – Your Gateway to Seamless Shipping',
		subtitle:
			'Our cargo land services are designed to provide you with a seamless shipping experience.  We offer a range of cargo land services, including transportation, storage, and handling, to ensure that your goods reach their destination safely and efficiently.',
	},
	{
		label: 'Exports',
		backgroundImageSrc: Background7,
		title: 'Export Services – Taking Your Business to New Heights',
		subtitle:
			'If you are looking to expand your business overseas, our export services can help you achieve your goals. Our team of experts will work with you to develop a customized export plan that meets your specific needs.',
	},
	{
		label: 'Import',
		backgroundImageSrc: Background2,
		title: 'Import Services – Bringing the World to Your Doorstep',
		subtitle:
			'Our import services are designed to bring the world to your doorstep. We offer a comprehensive range of import services, including transportation, customs clearance, and warehousing, to ensure that your goods are delivered safely and efficiently.',
	},
];

export default function BasicSlider() {
	return (
		<div id="Home">
			<HeroSlider
				height={'100vh'}
				autoplay
				animations={{
					shouldManageAnimationSequence: true,
				}}
				accessability={{
					orientation: 'horizontal',
					shouldDisplayButtons: false,
				}}
				controller={{
					initialSlide: 1,
					slidingDuration: 500,
					slidingDelay: 100,
					onSliding: (nextSlide) => console.debug('onSliding(nextSlide): ', nextSlide),
					onBeforeSliding: (previousSlide, nextSlide) =>
						console.debug('onBeforeSliding(previousSlide, nextSlide): ', previousSlide, nextSlide),
					onAfterSliding: (nextSlide) => console.debug('onAfterSliding(nextSlide): ', nextSlide),
				}}
			>
				<Overlay>
					{slides.map((slide, index) => (
						<Slide
							key={index}
							shouldRenderMask
							label={slide.label}
							background={{
								backgroundImageSrc: slide.backgroundImageSrc,
								backgroundAnimation: 'zoom',
								backgroundColor: 'rgba(0, 0, 0, 0.5)',
								backgroundImageBlendMode: 'darken',
								shouldLazyLoad: true,
							}}
						>
							<div className="flex flex-col justify-center items-center h-full p-0 sm:p-20 text-center">
								<motion.div
									className="h-screen flex items-end w-full md:justify-center justify-end flex-col"
									initial={{ opacity: 0, x: -50 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ type: 'spring', duration: 0.5 }}
								>
									<div className=" w-full md:w-1/3 md:mr-20 md:mb-0 mb-5 px-10 md:mx-0">
										<h1 className="text-white text-uppercase text-left text-2xl font-bold">
											{slide.title}
										</h1>
										<h2 className="text-white  text-left font-light text-xl">{slide.subtitle}</h2>
									</div>
								</motion.div>
							</div>
						</Slide>
					))}
				</Overlay>

				<SideNav
					isPositionedRight={false}
					position={{
						top: '50%',
						left: '0',
						transform: 'translateY(-50%)',
					}}
				/>

				<SideNav />
			</HeroSlider>
		</div>
	);
}

// https://github.com/cruip/tailwind-landing-page-template
