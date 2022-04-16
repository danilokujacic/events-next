import Footer from '../Footer';
import { FunctionComponent } from 'react';
import Header from '../Header';

const Layout: FunctionComponent<{ children: any }> = ({ children }) => {
  return (
    <>
      <Header></Header>
      <div className='wrapper'>{children}</div>
      <Footer></Footer>
    </>
  );
};

export default Layout;
