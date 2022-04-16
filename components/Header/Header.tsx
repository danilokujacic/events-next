import Image from 'next/image';
import { Container, Nav, Navbar } from 'react-bootstrap';
import styles from './Header.module.scss';
import Logo from '/assets/logo.png';
import { useUser } from '@auth0/nextjs-auth0';
import ProfileOptions from './ProfileOptions';
import Link from 'next/link';

const Header: React.FC = () => {
  const { user } = useUser();
  return (
    <header className={styles['header']}>
      <Navbar bg='primary' className={styles['header-typography']}>
        <Container>
          <Navbar.Brand className={styles['navbar-brand']}>
            <Image src={Logo} className='d-inline-block align-top' />
            <h1>ookie events</h1>
          </Navbar.Brand>
        </Container>
        <Nav className={styles['navigation-link']}>
          <Link href='/'>
            <a className={styles['nav-link']}>Home</a>
          </Link>
          <Link href='/events'>
            <a className={styles['nav-link']}>Events</a>
          </Link>
          {user ? (
            <ProfileOptions />
          ) : (
            <Link href='/api/auth/login'>
              <a className={styles['nav-link']}>Login</a>
            </Link>
          )}
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
