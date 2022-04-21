import { FunctionComponent } from 'react';
import useEventList from '../../../hooks/useEventsList';
import EventsList from '../../EventsList';
import ActionMenu from '../ActionMenu';
import styles from '../Dashboard.module.scss';

const DesktopDashboard: FunctionComponent = () => {
  const { loading, events } = useEventList();
  return (
    <div className={`${styles['dashboard']} ${styles['desktop']} pl-4`}>
      <ActionMenu />
      <div className={styles['events-container']}>
        {!loading ? <EventsList events={events} /> : <></>}
      </div>
    </div>
  );
};

export default DesktopDashboard;
