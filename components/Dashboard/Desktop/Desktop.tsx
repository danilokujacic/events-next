import { FunctionComponent } from 'react';
import useEventList from '../../../hooks/useEventsList';
import EventsList from '../../EventsList';
import ActionMenu from '../ActionMenu';
import styles from '../Dashboard.module.scss';

const DesktopDashboard: FunctionComponent = () => {
  const { events, actions } = useEventList();
  return (
    <div className={`${styles['dashboard']} ${styles['desktop']} pl-4`}>
      <ActionMenu actions={actions} />
      <div className={styles['events-container']}>
        <EventsList events={events} />
      </div>
    </div>
  );
};

export default DesktopDashboard;
