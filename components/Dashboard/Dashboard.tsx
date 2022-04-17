import { FunctionComponent, useEffect, useState } from 'react';
import checkMobileDevice from '../../helpers/checkMobileDevice';
import Event from '../../interfaces/GraphQL/Event';
import EventDashboardContext from '../../helpers/eventsDashboardContext';
import DashboardHeader from './DashboardHeader';
import DesktopDashboard from './Desktop';
import MobileDashboard from './Mobile';

const Dashboard: FunctionComponent<{ events: Event[] }> = ({ events }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [clientEvents, setClientEvents] = useState(events);
  useEffect(() => {
    setIsMobile(checkMobileDevice());
  }, [setIsMobile]);
  return (
    <EventDashboardContext.Provider value={{ clientEvents, setClientEvents }}>
      <DashboardHeader />
      {isMobile ? <MobileDashboard /> : <DesktopDashboard />}
    </EventDashboardContext.Provider>
  );
};

export default Dashboard;
