import Image from 'next/image';
import { Container, Nav, Navbar } from 'react-bootstrap';
import styles from './Header.module.scss';
import Logo from '/assets/logo.png';
import { useUser } from '@auth0/nextjs-auth0';
import ProfileOptions from './ProfileOptions';

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
          <Nav.Link className={styles['nav-link']} href='/'>
            Home
          </Nav.Link>
          <Nav.Link className={styles['nav-link']} href='/events'>
            Events
          </Nav.Link>
          {user ? (
            <ProfileOptions />
          ) : (
            <Nav.Link className={styles['nav-link']} href='/api/auth/login'>
              Login
            </Nav.Link>
          )}
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
