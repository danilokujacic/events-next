import { FunctionComponent, useState } from 'react';
import Event from '../../interfaces/GraphQL/Event';
import EventDashboardContext from '../../helpers/eventsDashboardContext';
import DashboardHeader from './DashboardHeader';
import DesktopDashboard from './UserDashboard';
import NoEventsComponent from './NoEventsComponent';
import { useUser } from '@auth0/nextjs-auth0';
import GuestDashboard from './GuestDashboard';

const Dashboard: FunctionComponent<{ events: Event[] }> = ({ events }) => {
  const [clientEvents, setClientEvents] = useState(events);
  const userData = useUser();

  let template;

  if (!events || !events.length) {
    template = <NoEventsComponent />;
  } else if (!userData.user) {
    template = <GuestDashboard />;
  } else {
    template = (
      <>
        <DashboardHeader />
        <DesktopDashboard />
      </>
    );
  }

  return (
    <EventDashboardContext.Provider value={{ clientEvents, setClientEvents }}>
      {template}
    </EventDashboardContext.Provider>
  );
};

export default Dashboard;
