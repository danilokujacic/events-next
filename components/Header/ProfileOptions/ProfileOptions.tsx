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

const ProfileOptions: FunctionComponent = () => {
  const { user } = useUser();

  if (!user) {
    return <></>;
  }
  return (
    <NavDropdown
      align='end'
      id='basic-nav-dropdown'
      className={`${styles['nav-link']} navigation-dropdown`}
      title='Profile'>
      <NavDropdown.Item
        href={`/user/${user?.nickname}`}
        className={styles['nav-bar-item']}>
        <FontAwesomeIcon
          className={styles['nav-bar-icon']}
          icon={faUserAstronaut}
        />
        View profile
      </NavDropdown.Item>
      <NavDropdown.Item href='/create-event' className={styles['nav-bar-item']}>
        <FontAwesomeIcon className={styles['nav-bar-icon']} icon={faPlus} />
        New event
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item
        href={`/api/auth/logout`}
        className={styles['nav-bar-item']}>
        <FontAwesomeIcon className={styles['nav-bar-icon']} icon={faPowerOff} />
        Logout
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default ProfileOptions;
