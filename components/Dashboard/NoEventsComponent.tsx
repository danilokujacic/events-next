import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import noEvents from '../../assets/no_events.png';
import styles from './Dashboard.module.scss';
import { motion } from 'framer-motion';

const parentContainerVariants = {
  popIn: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      type: 'spring',
      stiffness: 200,
    },
  },
  popOut: {
    opacity: 0,
    scale: 0.5,
  },
};

const NoEventsComponent: FunctionComponent = () => {
  return (
    <motion.div
      exit='popOut'
      animate='popIn'
      initial='popOut'
      variants={parentContainerVariants}
      className={`container w-100 d-flex flex-column justify-content-center align-items-center ${styles['no-events-container']}`}>
      <h1 className='fs-2'>
        You have no events currently, please&nbsp;
        <Link href='/create-event'>
          <a className='text-primary'>add one</a>
        </Link>
      </h1>
      <div className={styles['no-events-image']}>
        <Image src={noEvents} />
      </div>
    </motion.div>
  );
};

export default NoEventsComponent;
