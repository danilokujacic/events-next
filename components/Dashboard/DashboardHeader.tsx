import { useUser } from '@auth0/nextjs-auth0';
import { FunctionComponent } from 'react';

const DashboardHeader: FunctionComponent = () => {
  const { user } = useUser();
  return (
    <div className='mb-4'>
      <h1 className='font-weight-bold text-lg-left'>
        Welcome, <span className='text-primary'>{user?.nickname}</span>! Here is
        your events list
      </h1>
    </div>
  );
};

export default DashboardHeader;
