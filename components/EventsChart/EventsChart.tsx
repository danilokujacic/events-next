import {
  forwardRef,
  FunctionComponent,
  useImperativeHandle,
  useState,
} from 'react';
import Event from '../../interfaces/GraphQL/Event';
import { AnimatePresence } from 'framer-motion';
import renderChart from './renderChart';
import getChartData from '../../utils/getChartData';
import { ChartType } from '../../types/Chart';

interface IEventsChart {
  events: Event[];
}

const EventsChart: FunctionComponent<IEventsChart> = forwardRef(
  ({ events }, ref) => {
    const [data, setData] = useState<any>(getChartData(events));
    const [type, setType] = useState<ChartType>('bar');

    useImperativeHandle(ref, () => ({
      setChartType: (type: ChartType) => {
        setType(type);
      },
    }));

    return (
      <AnimatePresence exitBeforeEnter>
        {renderChart(data, type)}
      </AnimatePresence>
    );
  },
);

export default EventsChart;
