import { FunctionComponent } from 'react';
import Event from '../../../interfaces/GraphQL/Event';
import EventCategories from '../../EventCategories';
import EventsChartSwitch from '../../EventsChartSwitch';

interface IGuestDashboardProps {
  events: Event[];
}

const GuestDashboard: FunctionComponent<IGuestDashboardProps> = ({
  events,
}) => {
  return (
    <div className='d-flex w-full flex-column'>
      <div className='d-flex flex-column mb-4'>
        <p className='h3 font-weight-normal mb-3'>Statistic</p>
        <EventsChartSwitch events={events} />
      </div>
      <div className='d-flex flex-column mb-4'>
        <p className='h3 font-weight-normal mb-3'>Events</p>
        <EventCategories events={events} />
      </div>
    </div>
  );
};

export default GuestDashboard;
