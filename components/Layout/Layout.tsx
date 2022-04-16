import React from 'react';
import Footer from '../Footer';
import Header from '../Header';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header></Header>
      <div className='wrapper'>{children}</div>
      <Footer></Footer>
    </>
  );
};

export default Layout;
