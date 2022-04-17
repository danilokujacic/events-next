import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { FunctionComponent } from 'react';
import Event from '../../interfaces/GraphQL/Event';
import EventComponent from '../Event';

const EventsList: FunctionComponent<{ events: Event[] }> = ({ events }) => {
  if (!events) {
    return <div>Currently no events</div>;
  }

  console.log(events);

  return (
    <>
      <AnimatePresence>
        <LayoutGroup>
          {events.map((event) => (
            <EventComponent {...event} id={event.key} />
          ))}
        </LayoutGroup>
      </AnimatePresence>
    </>
  );
};

export default EventsList;
