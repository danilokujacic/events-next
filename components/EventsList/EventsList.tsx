import { AnimatePresence } from 'framer-motion';
import { FunctionComponent } from 'react';
import Event from '../../interfaces/GraphQL/Event';
import { EventCard } from '../Event';
import NoEventsComponent from './NoEventsComponent';

const EventsList: FunctionComponent<{ events: Event[] }> = ({ events }) => {
  if (!events || !events.length) {
    return (
      <AnimatePresence exitBeforeEnter>
        <NoEventsComponent />
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence exitBeforeEnter>
      {events.map((event) => (
        <EventCard {...event} id={event.key} />
      ))}
    </AnimatePresence>
  );
};

export default EventsList;
