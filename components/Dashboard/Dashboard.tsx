import { FunctionComponent, useState } from 'react';
import Event from '../../interfaces/GraphQL/Event';
import EventDashboardContext from '../../helpers/eventsDashboardContext';
import DashboardHeader from './DashboardHeader';
import UserDashboard from './UserDashboard';
import NoEventsComponent from './NoEventsComponent';
import { useUser } from '@auth0/nextjs-auth0';
import GuestDashboard from './GuestDashboard';

const Dashboard: FunctionComponent<{ events: Event[] }> = ({ events }) => {
  const [clientEvents, setClientEvents] = useState(events);
  const userData = useUser();

  let template;
  let title;

  if (!events || !events.length) {
    template = <NoEventsComponent />;
  } else if (!userData.user) {
    title = (
      <>
        Welcome! This is events dashboard. <br /> If you want to create event,
        please register or login.
      </>
    );
    template = <GuestDashboard events={events} />;
  } else {
    title = (
      <>
        Welcome, <span className='text-primary'>{userData.user?.nickname}</span>
        ! Here is your events list
      </>
    );
    template = <UserDashboard />;
  }

  return (
    <EventDashboardContext.Provider value={{ clientEvents, setClientEvents }}>
      {title ? <DashboardHeader title={title} /> : <></>}
      {template}
    </EventDashboardContext.Provider>
  );
};

export default Dashboard;
