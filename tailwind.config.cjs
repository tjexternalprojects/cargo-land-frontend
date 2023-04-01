/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			// screens: {
			// 	sm: '340px',
			// 	// => @media (min-width: 640px) { ... }

			// 	md: '768px',
			// 	// => @media (min-width: 768px) { ... }

			// 	lg: '1024px',
			// 	// => @media (min-width: 1024px) { ... }

			// 	xl: '1280px',
			// 	// => @media (min-width: 1280px) { ... }

			// 	'2xl': '1536px',
			// 	// => @media (min-width: 1536px) { ... }
			// },
			maxWidth: {
				'50-screen': '50vw',
				'60-screen': '60vw',
				'70-screen': '70vw',
				'72-screen': '72vw',
				'80-screen': '80vw',
				'90-screen': '90vw',
				'120-screen': '120vw',
				'140-screen': '140vw',
				'150-screen': '150vw',
				'160-screen': '160vw',
				'170-screen': '170vw',
				'180-screen': '180vw',
				'190-screen': '190vw',
				'200-screen': '200vw',
				'210-screen': '210vw',
				'220-screen': '220vw',
				'230-screen': '230vw',
				'240-screen': '240vw',
				'w-screen-xs': '425px',
			},
			maxHeight: {
				'50-screen': '50vh',
				'60-screen': '60vh',
				'70-screen': '70vh',
				'72-screen': '72vh',
				'80-screen': '80vh',
				'90-screen': '90vh',
				'120-screen': '120vh',
				'140-screen': '140vh',
				'150-screen': '150vh',
				'160-screen': '160vh',
				'170-screen': '170vh',
				'180-screen': '180vh',
				'190-screen': '190vh',
				'200-screen': '200vh',
				'210-screen': '210vh',
				'220-screen': '220vh',
				'230-screen': '230vh',
				'240-screen': '240vh',
			},
			height: {
				18: '4.5rem',
				22: '5.5rem',
				26: '6.5rem',
				112: '448px',
				'screen-40': '40vh',
				'screen-50': '50vh',
				'screen-55': '55vh',
				'screen-60': '60vh',
				'screen-70': '70vh',
				'screen-72': '72vh',
				'screen-80': '80vh',
				'screen-82': '82vh',
				'screen-90': '90vh',
				'110-screen': '110vh',
				'120-screen': '120vh',
				'130-screen': '130vh',
				'140-screen': '140vh',
				'150-screen': '150vh',
			},
			minHeight: {
				'50-screen': '50vh',
				'60-screen': '60vh',
				'70-screen': '70vh',
				'72-screen': '72vh',
				'80-screen': '80vh',
				'90-screen': '90vh',
			},
		},
	},
	plugins: [],
};
