import { UserProfile } from '@auth0/nextjs-auth0';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { FunctionComponent } from 'react';
import { motion } from 'framer-motion';
import measureDateDiffirence from '../../helpers/measureDateDiffirence';
import UserEventsList from '../UserEventsList/UserEventsList';
import styles from './UserDisplay.module.scss';

const UserDisplay: FunctionComponent<{ user: UserProfile }> = ({ user }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.2,
      }}
      className={`d-flex flex-column align-items-center ${styles['user-display-container']}`}>
      <div className={styles['profile-image-container']}>
        <Image
          width='100%'
          height='100%'
          src={user.picture || ''}
          alt='User profile'
        />
      </div>
      <h1 className='mt-2'>{user.name}</h1>
      <h2>
        Last time seen:{' '}
        {measureDateDiffirence(
          Date.now(),
          user.last_login as string,
          'days',
        ) === 0
          ? 'Today'
          : measureDateDiffirence(
              Date.now(),
              user.last_login as string,
              'days',
            )}
      </h2>
      <ul className='d-flex p-0 w-100 mt-4 flex-column align-items-start'>
        <li className='d-flex justify-content-start align-items-center'>
          Email: {user.email}{' '}
          {user.email_verified ? (
            <>
              {' '}
              -&nbsp; <FontAwesomeIcon icon={faCircleCheck} color='green' />
              &nbsp;verified
            </>
          ) : (
            <></>
          )}
        </li>
        <li className='d-flex justify-content-start align-items-center'>
          Nickname: {user.nickname}
        </li>
        <li
          className={`d-flex flex-column justify-content-start align-items-start ${styles['events-property']}`}>
          Events:
          <div className='ml-2'>
            <UserEventsList id={`${user.nickname}`} />
          </div>
        </li>
      </ul>
    </motion.div>
  );
};

export default UserDisplay;
