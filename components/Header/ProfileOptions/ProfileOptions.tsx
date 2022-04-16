import { FunctionComponent } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useUser } from '@auth0/nextjs-auth0';
import styles from '../Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faUserAstronaut,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const ProfileOptions: FunctionComponent = () => {
  const { user } = useUser();

  if (!user) {
    return <></>;
  }
  return (
    <div className='dropdown show'>
      <a
        className={`btn btn-secondary dropdown-toggle ${styles['nav-link']}`}
        href='#'
        role='button'
        id='dropdownMenuLink'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'>
        Profile
      </a>

      <div
        className={`dropdown-menu ${styles['dropdown-menu']}`}
        aria-labelledby='dropdownMenuLink'>
        <p className='dropdown-item'>
          <FontAwesomeIcon
            className={styles['nav-bar-icon']}
            icon={faUserAstronaut}
          />
          <Link href={`/user/${user?.nickname}`}>View</Link>
        </p>
        <p className='dropdown-item'>
          <FontAwesomeIcon className={styles['nav-bar-icon']} icon={faPlus} />
          <Link href='/create-event'>Create event</Link>
        </p>
        <p className='dropdown-item'>
          <FontAwesomeIcon
            className={styles['nav-bar-icon']}
            icon={faPowerOff}
          />
          <Link href='/api/auth/logout'>Logout</Link>
        </p>
      </div>
    </div>
  );
};

export default ProfileOptions;
