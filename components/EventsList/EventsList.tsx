import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { FunctionComponent } from 'react';
import Event from '../../interfaces/GraphQL/Event';
import EventComponent from '../Event';

const EventsList: FunctionComponent<{ events: Event[] }> = ({ events }) => {
  if (!events) {
    return <div>Currently no events</div>;
  }

  return (
    <>
      <AnimatePresence exitBeforeEnter>
          {events.map((event) => (
            <EventComponent {...event} id={event.key} />
          ))}
      </AnimatePresence>
    </>
  );
};

export default EventsList;
