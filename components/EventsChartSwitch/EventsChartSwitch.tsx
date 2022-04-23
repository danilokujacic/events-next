import { FunctionComponent, useRef } from 'react';
import Event from '../../interfaces/GraphQL/Event';
import { ChartType } from '../../types/Chart';
import EventsChart from '../EventsChart/EventsChart';
import SwitchActions from './SwitchActions';

interface IEventsChartSwitch {
  events: Event[];
}

const EventsChartSwitch: FunctionComponent<IEventsChartSwitch> = ({
  events,
}) => {
  const chartsRef = useRef();

  const handleChartsSwitch = (type: ChartType) => {
    if (chartsRef.current) {
      const { setChartType } = chartsRef.current as { setChartType: Function };
      setChartType(type);
    }
  };

  return (
    <div className='d-flex flex-column'>
      <SwitchActions handleChartsSwitch={handleChartsSwitch} />
      <EventsChart events={events} ref={chartsRef} />
    </div>
  );
};

export default EventsChartSwitch;
