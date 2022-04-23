import { FunctionComponent } from 'react';

interface IDashboardHeaderProps {
  title: string | JSX.Element;
}

const DashboardHeader: FunctionComponent<IDashboardHeaderProps> = ({
  title,
}) => {
  return (
    <div className='mb-4'>
      <p className='font-weight-bold h3'>{title}</p>
    </div>
  );
};

export default DashboardHeader;
