import { FunctionComponent, useEffect, useState } from 'react';
import checkMobileDevice from '../../helpers/checkMobileDevice';
import Event from '../../interfaces/GraphQL/Event';
import EventDashboardContext from '../../helpers/eventsDashboardContext';
import DashboardHeader from './DashboardHeader';
import DesktopDashboard from './Desktop';
import NoEventsComponent from './NoEventsComponent';

const Dashboard: FunctionComponent<{ events: Event[] }> = ({ events }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [clientEvents, setClientEvents] = useState(events);
  useEffect(() => {
    setIsMobile(checkMobileDevice());
  }, [setIsMobile]);
  return (
    <EventDashboardContext.Provider value={{ clientEvents, setClientEvents }}>
      {clientEvents && clientEvents.length ? (
        <>
          <DashboardHeader />
          <DesktopDashboard />
        </>
      ) : (
        <NoEventsComponent />
      )}
    </EventDashboardContext.Provider>
  );
};

export default Dashboard;
