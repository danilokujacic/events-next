import Image from 'next/image';
import { FunctionComponent } from 'react';
import noEvents from '../../assets/no_events.png';
import { motion } from 'framer-motion';

const variants = {
  fadeIn: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  fadeOut: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const NoEventsComponent: FunctionComponent = () => {
  return (
    <motion.div
      exit='fadeOut'
      animate='fadeIn'
      variants={variants}
      className='d-flex w-100 align-items-center justify-content-center flex-column'>
      <Image width='800' height='500' src={noEvents} />
      <h1>No events here </h1>
    </motion.div>
  );
};

export default NoEventsComponent;
