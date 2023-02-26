export const scaleRotate = {
	scale: [10, 1, 1, 1, 20],
	rotate: [0, 0, 270, 270, 0],
	borderRadius: ['20%', '20%', '50%', '50%', '50%'],
	transition: {
		scale: { duration: 12 },
		rotate: { duration: 4 },
		borderRadius: { duration: 8 },
	},
};

export const scaleBg = (width: string) => {
	return {
		height: ['0vh', '90vh'],
		width: ['0%', width],
		transition: {
			height: { duration: 0.5 },
			width: { duration: 0.5 },
		},
	};
};
export const reduceScaleBg = {
	height: ['85vh', '0vh'],
	width: ['50vw', '0vw'],
	transition: {
		height: { duration: 0.5 },
		width: { duration: 0.5 },
	},
};

export const scale = (delay: number, duration: number) => {
	const animateScale = {
		scale: [0, 1.5, 1],
		transition: {
			scale: { duration, delay, ease: 'easeInOut' },
		},
	};
	return animateScale;
};

export const fadeIn = {
	opacity: [0, 1],
	transition: {
		opacity: { duration: 3 },
	},
};

export const fadeInFast = {
	opacity: [0, 1],
	transition: {
		opacity: { duration: 1, exit: 0 },
	},
};

export const slideUp = (delay: number, duration: number) => {
	const animateSlideUp = {
		opacity: [0, 1],
		y: [100, 0],
		transition: {
			y: { duration, delay },
			opacity: { duration, delay },
		},
	};
	return animateSlideUp;
};

export const fadeSlide = (direction: number) => {
	return {
		initial: { opacity: 0, y: direction },
		animate: { opacity: 1, y: 0 },
	};
};

export const slideLeft = {
	x: ['0%', '100%'],
	opacity: [1, 0],
	exit: {
		x: ['-100%'],
		opacity: [0],
	},
	transition: {
		exit: { duration: 2 },
		x: { duration: 2 },
	},
};
