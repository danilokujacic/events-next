import { FunctionComponent } from 'react';
import useEventList from '../../../hooks/useEventsList';
import EventCategories from '../../EventCategories';
const GuestDashboard: FunctionComponent = () => {
  const data = useEventList();

  if (!data.events) {
    return <></>;
  }

  return (
    <div className='d-flex container-xxl flex-column'>
      <EventCategories events={data.events} />
    </div>
  );
};

export default GuestDashboard;
