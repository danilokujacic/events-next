import { AnimatePresence } from 'framer-motion';
import { FunctionComponent } from 'react';
import useEventList from '../../hooks/useEventsList';
import { EventCard } from '../Event';
import NoEventsComponent from './NoEventsComponent';

const EventsList: FunctionComponent = () => {
  const { loading, events } = useEventList();
  if (loading) {
    return <div>Loading events...</div>;
  }
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
