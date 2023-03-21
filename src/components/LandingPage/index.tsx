import { motion } from 'framer-motion';
import HeroSlider, { Overlay, Slide, MenuNav, SideNav } from 'hero-slider';
import Wrapper from '@/components/LandingPage/Hero/Wrapper';
import Subtitle from '@/components/LandingPage/Hero/Subtitle';
import { GoodsImg, cargoBG, Background7, Background2 } from '@/assets';

const slides = [
  {
    label: "Giau Pass - Italy",
    backgroundImageSrc: GoodsImg,
    title: "Giau Pass",
    subtitle: "A stunning pass through the Dolomite Mountains in northern Italy.",
  },
  {
    label: "Bogliasco - Italy",
    backgroundImageSrc: cargoBG,
    title: "Bogliasco",
    subtitle: "A charming fishing village on the Ligurian coast of Italy.",
  },
  {
    label: "County Clare - Ireland",
    backgroundImageSrc: Background7,
    title: "County Clare",
    subtitle: "A beautiful county on the west coast of Ireland, home to the Cliffs of Moher.",
  },
  {
    label: "Crater Rock, OR - United States",
    backgroundImageSrc: Background2,
    title: "Crater Rock",
    subtitle: "An extinct volcano in southern Oregon with a stunning crater at its summit.",
  },
];


export default function BasicSlider() {
  return (
    <HeroSlider
      height={'100vh'}
      autoplay
      animations={{
        shouldManageAnimationSequence:true,

      }}
      accessability={{
        orientation:'horizontal',
        shouldDisplayButtons:false,
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
      <Overlay >

      {slides.map((slide, index) => (
        <Slide
          key={index}
          shouldRenderMask
          label={slide.label}
          background={{
            backgroundImageSrc: slide.backgroundImageSrc,
            backgroundAnimation:'zoom', 
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backgroundImageBlendMode:'darken',
            shouldLazyLoad:true
          }}
        >
          
          <motion.div
  className='h-screen flex items-center justify-end'
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ type: "spring", duration: 0.5 }}
>
  <Wrapper>
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
    >
      <h1 className='text-white mx-auto pr-20 text-uppercase w-90 text-left text-5xl'>{slide.title}</h1>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", duration: 0.5, delay: 0.4 }}
    >
      <h2 className='text-white mx-auto mt-6 pt-0 w-80 pr-20 text-left text-xl'>{slide.subtitle}</h2>
    </motion.div>
  </Wrapper>
</motion.div>

        </Slide>
      ))}
      </Overlay>

      <SideNav
    isPositionedRight={false}
    position={{
      top: '50%',
      left: '0',
      transform: 'translateY(-50%)'
    }}
  />

  <SideNav />
    </HeroSlider>
  );
}

// https://github.com/cruip/tailwind-landing-page-template

