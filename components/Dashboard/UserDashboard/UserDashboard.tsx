import { FunctionComponent } from 'react';
import useEventList from '../../../hooks/useEventsList';
import EventsList from '../../EventsList';
import ActionMenu from '../ActionMenu';
import styles from '../Dashboard.module.scss';

const DesktopDashboard: FunctionComponent = () => {
  return (
    <div className={`${styles['dashboard']} ${styles['desktop']} pl-4`}>
      <ActionMenu />
      <div className={styles['events-container']}>
        <EventsList />
      </div>
    </div>
  );
};

export default DesktopDashboard;
